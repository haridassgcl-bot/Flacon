# Sellora Database Architecture (PostgreSQL / Supabase)

## Tables & Primary Keys
All tables utilize `UUID` primary keys with PostgreSQL `pgcrypto` / `gen_random_uuid()`.

1. **`profiles`**: User details (full_name, phone, preferred_language 'en'|'ta', account_status).
2. **`user_roles`**: Administrative roles (`super_admin`, `admin`, `moderator`, `finance`, `support`).
3. **`locations`**: Tamil Nadu regional hierarchy (state, district, city, locality, postal_code).
4. **`categories`**: Hierarchical categories (`parent_id`), dual-language names, icons, slugs.
5. **`category_fields`**: Dynamic form attributes (`field_key`, `field_type`, `options`, `is_required`, `filterable`).
6. **`listings`**: Ad records (`status`: draft, pending, active, rejected, sold, expired, archived), `attributes` (JSONB), `price`, `condition`.
7. **`listing_images`**: S3 / Supabase storage paths.
8. **`favourites`**: User saved listings.
9. **`conversations` & `messages`**: Direct buyer-seller chat history.
10. **`reports`**: Moderation and abuse reporting.
11. **`subscription_plans` & `subscriptions`**: Monetization packages.
12. **`payments`**: Razorpay transaction lifecycle (`created`, `authorized`, `captured`, `failed`, `refunded`).
13. **`promotions`**: Featured, Premium, Top Ad visibility activations.
14. **`admin_audit_logs`**: Administrative audit trail.

## Migrations Order
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_user_trigger.sql`
3. `supabase/migrations/003_rls.sql`
4. `supabase/migrations/004_seed_categories.sql`
5. `supabase/seed.sql`

