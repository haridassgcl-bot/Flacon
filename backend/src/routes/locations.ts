import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// GET unique list of districts (Tamil Nadu)
router.get('/districts', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('district')
      .eq('is_active', true);

    if (error) throw error;
    const districts = [...new Set((data || []).map(item => item.district))].sort();
    res.json(districts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET localities by district
router.get('/', async (req: Request, res: Response) => {
  const { district } = req.query;
  try {
    let query = supabase.from('locations').select('*').eq('is_active', true);
    if (district) {
      query = query.ilike('district', `%${district}%`);
    }
    const { data, error } = await query.order('locality', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

