import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

// GET listings with search and dynamic filters
router.get('/', async (req: Request, res: Response) => {
  const {
    query,
    categoryId,
    subcategoryId,
    district,
    locality,
    minPrice,
    maxPrice,
    condition,
    isFeatured,
    sortBy = 'newest',
    page = 1,
    limit = 20
  } = req.query;

  try {
    let q = supabase
      .from('listings')
      .select(`
        id, title, description, price, is_negotiable, item_condition,
        status, view_count, is_featured, is_premium, is_top_ad, created_at,
        subcategory:subcategories ( id, name_en, name_ta, slug ),
        location:locations ( id, district, city, locality ),
        seller:profiles ( id, full_name, is_verified, phone, whatsapp_number ),
        images:listing_images ( id, image_url, thumbnail_url, is_cover, display_order )
      `)
      .eq('status', 'active');

    if (query) {
      q = q.textSearch('title', String(query), { type: 'websearch' });
    }
    if (subcategoryId) {
      q = q.eq('subcategory_id', Number(subcategoryId));
    }
    if (minPrice) {
      q = q.gte('price', Number(minPrice));
    }
    if (maxPrice) {
      q = q.lte('price', Number(maxPrice));
    }
    if (condition) {
      q = q.eq('item_condition', condition);
    }
    if (isFeatured === 'true') {
      q = q.or('is_featured.eq.true,is_premium.eq.true,is_top_ad.eq.true');
    }

    // Sort order: Priority to Top Ads and Featured Ads
    if (sortBy === 'price_asc') {
      q = q.order('price', { ascending: true });
    } else if (sortBy === 'price_desc') {
      q = q.order('price', { ascending: false });
    } else {
      q = q.order('is_top_ad', { ascending: false })
           .order('is_featured', { ascending: false })
           .order('created_at', { ascending: false });
    }

    const pageNum = Math.max(1, Number(page));
    const pageSize = Math.min(50, Number(limit));
    const from = (pageNum - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data: listings, error } = await q.range(from, to);
    if (error) throw error;

    res.json({
      page: pageNum,
      limit: pageSize,
      data: listings
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET single listing details including dynamic attributes
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data: listing, error } = await supabase
      .from('listings')
      .select(`
        *,
        subcategory:subcategories ( id, name_en, name_ta, category_id ),
        location:locations ( id, state, district, city, locality, pincode ),
        seller:profiles ( id, full_name, is_verified, phone, whatsapp_number, avatar_url, created_at ),
        images:listing_images ( id, image_url, thumbnail_url, is_cover, display_order ),
        attributes:listing_attributes (
          id, field_id, value_text, value_number, value_json,
          category_fields ( id, field_name, label_en, label_ta, field_type )
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    // Increment view count asynchronously
    try {
      await supabase.rpc('increment_view_count', { listing_id: id });
    } catch {
      // Ignore background view increment error
    }

    res.json(listing);
  } catch (err: any) {
    res.status(404).json({ error: 'Listing not found or ' + err.message });
  }
});

// POST create listing (multi-step ad post)
router.post('/', async (req: Request, res: Response) => {
  const {
    seller_id,
    subcategory_id,
    location_id,
    title,
    description,
    price,
    is_negotiable,
    item_condition,
    images = [],
    attributes = [] // Array of { field_id, value_text, value_number, value_json }
  } = req.body;

  try {
    // 1. Insert listing header with default status 'pending_moderation'
    const { data: newListing, error: listingError } = await supabase
      .from('listings')
      .insert({
        seller_id,
        subcategory_id,
        location_id,
        title,
        description,
        price,
        is_negotiable: !!is_negotiable,
        item_condition,
        status: 'pending_moderation'
      })
      .select()
      .single();

    if (listingError) throw listingError;

    // 2. Insert uploaded images
    if (images.length > 0) {
      const imageInserts = images.map((img: any, idx: number) => ({
        listing_id: newListing.id,
        image_url: img.image_url,
        thumbnail_url: img.thumbnail_url || img.image_url,
        display_order: idx,
        is_cover: idx === 0
      }));
      await supabase.from('listing_images').insert(imageInserts);
    }

    // 3. Insert dynamic category attributes
    if (attributes.length > 0) {
      const attributeInserts = attributes.map((attr: any) => ({
        listing_id: newListing.id,
        field_id: attr.field_id,
        value_text: attr.value_text ?? null,
        value_number: attr.value_number ?? null,
        value_json: attr.value_json ?? null
      }));
      await supabase.from('listing_attributes').insert(attributeInserts);
    }

    res.status(201).json({
      message: 'Advertisement submitted successfully and is queued for moderation.',
      listing: newListing
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

