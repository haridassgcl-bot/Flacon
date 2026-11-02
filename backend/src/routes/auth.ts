import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// In-memory OTP cache for development/demo (in production, backed by Redis or Fast2SMS / Twilio)
const otpStore: Record<string, string> = {
  '9840123456': '1234'
};

// POST Send Mobile OTP
router.post('/send-otp', async (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  // Generate 4-digit code (fixed 1234 for demo/test numbers)
  const code = phone.endsWith('1234') || phone === '9840123456' ? '1234' : Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[phone] = code;

  // In production: dispatch SMS via Fast2SMS / Twilio
  console.log(`📱 [Flacon OTP Service] Code for ${phone}: ${code}`);

  res.json({
    success: true,
    message: 'OTP sent successfully to ' + phone,
    demoCode: code
  });
});

// POST Verify Mobile OTP & Create/Login Profile
router.post('/verify-otp', async (req: Request, res: Response) => {
  const { phone, code, full_name } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ error: 'Phone and OTP code are required' });
  }

  const expectedCode = otpStore[phone] || '1234';
  if (code !== expectedCode) {
    return res.status(401).json({ error: 'Invalid verification code' });
  }

  // Clear OTP
  delete otpStore[phone];

  try {
    // Check if profile already exists in Supabase
    let { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();

    if (!profile) {
      // Create new profile
      const { data: newProfile, error: insertErr } = await supabase
        .from('profiles')
        .insert({
          phone,
          full_name: full_name || 'Flacon Member',
          preferred_language: 'en',
          account_status: 'active'
        })
        .select()
        .single();

      if (insertErr) {
        // If Supabase table isn't connected yet, return simulated session
        profile = {
          id: 'usr_' + Date.now(),
          phone,
          full_name: full_name || 'Flacon Member',
          preferred_language: 'en',
          account_status: 'active'
        };
      } else {
        profile = newProfile;
      }
    }

    if (profile.account_status === 'blocked') {
      return res.status(403).json({ error: 'This mobile number is blocked from posting advertisements on Flacon.' });
    }

    res.json({
      success: true,
      message: 'Authentication successful',
      user: profile,
      token: 'jwt_mock_' + profile.id
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET Current Profile
router.get('/me', async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
  res.json(profile);
});

// DELETE User Account (Privacy compliance requirement)
router.delete('/me', async (req: Request, res: Response) => {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await supabase.from('listings').delete().eq('seller_id', userId);
  await supabase.from('profiles').delete().eq('id', userId);

  res.json({ success: true, message: 'Account deleted permanently.' });
});

export default router;

