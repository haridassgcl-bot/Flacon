// ====================================================================
// FALCON SHARED TYPES & DATA INTERFACES
// ====================================================================

export type SupportedLanguage = 'en' | 'ta';

export type UserRole = 
  | 'super_admin' 
  | 'operations_admin' 
  | 'content_moderator' 
  | 'finance_admin' 
  | 'support_agent' 
  | 'user';

export interface UserProfile {
  id: string;
  phone: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  whatsapp_number: string | null;
  is_verified: boolean;
  is_suspended: boolean;
  language_preference: SupportedLanguage;
  created_at: string;
  updated_at: string;
}

export interface LocationItem {
  id: number;
  state: string;
  district: string;
  city: string;
  locality: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
}

export interface Category {
  id: number;
  slug: string;
  name_en: string;
  name_ta: string;
  icon?: string;
  display_order: number;
  is_active: boolean;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  category_id: number;
  slug: string;
  name_en: string;
  name_ta: string;
  display_order: number;
  is_active: boolean;
  fields?: CategoryField[];
}

export type FieldType = 
  | 'text' 
  | 'number' 
  | 'select' 
  | 'multiselect' 
  | 'radio' 
  | 'checkbox' 
  | 'date' 
  | 'boolean';

export interface CategoryField {
  id: number;
  subcategory_id: number;
  field_name: string;
  label_en: string;
  label_ta: string;
  field_type: FieldType;
  options: string[];
  is_required: boolean;
  is_filterable: boolean;
  display_order: number;
}

export type ListingCondition = 'new' | 'like_new' | 'used_good' | 'used_fair';
export type ListingStatus = 'draft' | 'pending_moderation' | 'active' | 'rejected' | 'expired' | 'sold';
export type PromotionType = 'featured' | 'premium' | 'top_ad';

export interface ListingAttribute {
  id?: number;
  listing_id?: string;
  field_id: number;
  field_name?: string;
  label_en?: string;
  label_ta?: string;
  value_text?: string | null;
  value_number?: number | null;
  value_json?: any;
}

export interface ListingImage {
  id?: number;
  listing_id?: string;
  image_url: string;
  thumbnail_url?: string;
  display_order: number;
  is_cover: boolean;
}

export interface Listing {
  id: string;
  seller_id: string;
  seller?: Partial<UserProfile>;
  subcategory_id: number;
  subcategory?: Subcategory;
  location_id: number;
  location?: LocationItem;
  title: string;
  description: string;
  price: number;
  is_negotiable: boolean;
  item_condition?: ListingCondition;
  status: ListingStatus;
  rejection_reason?: string | null;
  view_count: number;
  is_featured: boolean;
  is_premium: boolean;
  is_top_ad: boolean;
  expires_at: string;
  created_at: string;
  updated_at: string;
  images: ListingImage[];
  attributes: Record<string, any>;
}

export interface SearchListingFilter {
  query?: string;
  categoryId?: number;
  subcategoryId?: number;
  district?: string;
  city?: string;
  locality?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: ListingCondition;
  isFeatured?: boolean;
  isVerifiedSeller?: boolean;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
  page?: number;
  limit?: number;
  attributes?: Record<string, string | number>;
}

export interface Conversation {
  id: string;
  listing_id?: string;
  listing?: Partial<Listing>;
  buyer_id: string;
  buyer?: Partial<UserProfile>;
  seller_id: string;
  seller?: Partial<UserProfile>;
  last_message?: string;
  unread_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  sent_at: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  plan_type: 'ad_promotion' | 'business_subscription';
  price_inr: number;
  duration_days: number;
  active_listing_limit?: number;
  features: string[];
  is_active: boolean;
}

export interface PaymentOrder {
  order_id: string;
  amount_inr: number;
  currency: string;
  key_id: string;
  plan_name: string;
}

