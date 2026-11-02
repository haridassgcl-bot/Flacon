import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { supabase } from '../lib/supabase';

const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_placeholder'
});

// GET all active monetization packages & pricing plans
router.get('/plans', async (req: Request, res: Response) => {
  try {
    const { data: plans, error } = await supabase
      .from('plans')
      .select('*')
      .eq('is_active', true)
      .order('price_inr', { ascending: true });

    if (error) throw error;
    res.json(plans);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST Create Razorpay Order
router.post('/create-order', async (req: Request, res: Response) => {
  const { plan_id, listing_id, user_id } = req.body;

  try {
    // 1. Fetch Plan
    const { data: plan, error: planErr } = await supabase
      .from('plans')
      .select('*')
      .eq('id', plan_id)
      .single();

    if (planErr || !plan) {
      return res.status(404).json({ error: 'Selected plan not found' });
    }

    // 2. Create Razorpay Order
    const amountInPaise = Math.round(Number(plan.price_inr) * 100);
    const receiptNo = `rcpt_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: receiptNo,
      notes: {
        plan_id: String(plan.id),
        plan_name: plan.name,
        listing_id: listing_id || '',
        user_id: user_id || ''
      }
    });

    // 3. Store pending payment transaction
    await supabase.from('payments').insert({
      user_id,
      razorpay_order_id: order.id,
      amount_inr: plan.price_inr,
      status: 'pending',
      plan_id: plan.id,
      listing_id: listing_id || null,
      receipt_no: receiptNo
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
      plan_name: plan.name
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST Verify Razorpay Payment Signature
router.post('/verify', async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const key_secret = process.env.RAZORPAY_KEY_SECRET || '';
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature verification failed.' });
    }

    // Mark payment successful
    const { data: payment, error: payErr } = await supabase
      .from('payments')
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: 'successful',
        verified_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .select('*, plans(*)')
      .single();

    if (payErr || !payment) {
      return res.status(404).json({ error: 'Payment transaction record not found' });
    }

    // If this payment was for an ad promotion, activate it on the listing
    if (payment.listing_id && payment.plans) {
      const planName = payment.plans.name.toLowerCase();
      let updateFields: any = {};
      let promoType: 'featured' | 'premium' | 'top_ad' = 'featured';

      if (planName.includes('top ad')) {
        updateFields.is_top_ad = true;
        promoType = 'top_ad';
      } else if (planName.includes('premium')) {
        updateFields.is_premium = true;
        promoType = 'premium';
      } else {
        updateFields.is_featured = true;
        promoType = 'featured';
      }

      await supabase.from('listings').update(updateFields).eq('id', payment.listing_id);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (payment.plans.duration_days || 7));

      await supabase.from('promotions').insert({
        listing_id: payment.listing_id,
        promotion_type: promoType,
        payment_id: payment.id,
        expires_at: expiresAt.toISOString()
      });
    }

    res.json({
      success: true,
      message: 'Payment verified and service successfully activated.'
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

