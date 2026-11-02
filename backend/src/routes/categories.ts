import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// GET all categories with subcategories
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select(`
        id, slug, name_en, name_ta, icon, display_order,
        subcategories (
          id, slug, name_en, name_ta, display_order
        )
      `)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET dynamic custom fields for a specific subcategory
router.get('/subcategories/:subcategoryId/fields', async (req: Request, res: Response) => {
  const { subcategoryId } = req.params;
  try {
    const { data: fields, error } = await supabase
      .from('category_fields')
      .select('*')
      .eq('subcategory_id', subcategoryId)
      .order('display_order', { ascending: true });

    if (error) throw error;
    res.json(fields);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Add dynamic field to subcategory without code changes
router.post('/fields', async (req: Request, res: Response) => {
  const { subcategory_id, field_name, label_en, label_ta, field_type, options, is_required, is_filterable, display_order } = req.body;
  try {
    const { data, error } = await supabase
      .from('category_fields')
      .insert({
        subcategory_id,
        field_name,
        label_en,
        label_ta,
        field_type: field_type || 'text',
        options: options || [],
        is_required: !!is_required,
        is_filterable: is_filterable !== false,
        display_order: display_order || 0
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

