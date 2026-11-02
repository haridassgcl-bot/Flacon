import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// GET all pending moderation listings
router.get('/pending', async (req: Request, res: Response) => {
  try {
    const { data: listings, error } = await supabase
      .from('listings')
      .select(`
        id, title, description, price, item_condition, created_at, status,
        subcategory:subcategories(name_en, name_ta),
        seller:profiles(id, full_name, phone),
        location:locations(district, locality),
        images:listing_images(image_url)
      `)
      .eq('status', 'pending_moderation')
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(listings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST review action: 'approve' or 'reject'
router.post('/:id/review', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { action, rejection_reason, admin_id } = req.body;

  if (!['approve', 'reject'].includes(action)) {
    return res.status(400).json({ error: 'Action must be approve or reject' });
  }

  try {
    const newStatus = action === 'approve' ? 'active' : 'rejected';

    const { data: listing, error: updateErr } = await supabase
      .from('listings')
      .update({
        status: newStatus,
        moderated_by: admin_id || null,
        rejection_reason: action === 'reject' ? rejection_reason : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (updateErr) throw updateErr;

    // Record in admin audit log
    await supabase.from('admin_audit_logs').insert({
      admin_id: admin_id || null,
      action: `${action}_listing`,
      target_table: 'listings',
      target_id: id,
      metadata: { reason: rejection_reason || null }
    });

    res.json({
      success: true,
      message: `Listing has been ${action}d.`,
      listing
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

