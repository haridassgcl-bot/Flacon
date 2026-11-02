import { z } from 'zod';

export const createListingSchema = z.object({
  category_id: z.string().uuid("Invalid category ID"),
  location_id: z.string().uuid("Invalid location ID").optional(),
  title: z.string().min(5, "Title must be at least 5 characters").max(150, "Title cannot exceed 150 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().nonnegative("Price must be 0 or positive"),
  is_price_negotiable: z.boolean().default(true),
  condition: z.enum(['new', 'like_new', 'used', 'refurbished']).default('used'),
  listing_type: z.enum(['individual', 'business']).default('individual'),
  attributes: z.record(z.any()).default({}),
  images: z.array(z.string().url()).min(1, "At least 1 image is required").max(10, "Maximum 10 images allowed")
});

export const searchFilterSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  district: z.string().optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
  condition: z.enum(['new', 'like_new', 'used', 'refurbished']).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(20)
});

export const moderationActionSchema = z.object({
  status: z.enum(['active', 'rejected', 'archived']),
  moderation_note: z.string().optional()
});

export const razorpayOrderSchema = z.object({
  plan_id: z.string().uuid("Invalid plan ID"),
  listing_id: z.string().uuid().optional()
});

