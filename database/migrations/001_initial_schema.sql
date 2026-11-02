-- ====================================================================
-- FALCON MARKETPLACE: INITIAL POSTGRESQL / SUPABASE DATABASE SCHEMA
-- Version: 1.0.0
-- Target: PostgreSQL 14+ / Supabase
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('super_admin', 'operations_admin', 'content_moderator', 'finance_admin', 'support_agent', 'user');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE listing_status_enum AS ENUM ('draft', 'pending_moderation', 'active', 'rejected', 'expired', 'sold');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE listing_condition_enum AS ENUM ('new', 'like_new', 'used_good', 'used_fair');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE promotion_type_enum AS ENUM ('featured', 'premium', 'top_ad');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE payment_status_enum AS ENUM ('pending', 'successful', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE field_type_enum AS ENUM ('text', 'number', 'select', 'multiselect', 'radio', 'checkbox', 'date', 'boolean');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. PROFILES & USER ROLES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(150),
    email VARCHAR(255) UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    whatsapp_number VARCHAR(20),
    is_verified BOOLEAN DEFAULT FALSE,
    is_suspended BOOLEAN DEFAULT FALSE,
    language_preference VARCHAR(10) DEFAULT 'en', -- 'en' or 'ta'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role user_role_enum NOT NULL DEFAULT 'user',
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- 4. LOCATIONS (TAMIL NADU REGIONAL STRUCTURE)
CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    state VARCHAR(100) DEFAULT 'Tamil Nadu',
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    locality VARCHAR(150) NOT NULL,
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_locations_district ON locations(district);
CREATE INDEX IF NOT EXISTS idx_locations_city ON locations(city);
CREATE INDEX IF NOT EXISTS idx_locations_locality ON locations(locality);

-- 5. CATEGORIES, SUBCATEGORIES & DYNAMIC FIELD ENGINE
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(150) NOT NULL,
    name_ta VARCHAR(150) NOT NULL,
    icon VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subcategories (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(150) NOT NULL,
    name_ta VARCHAR(150) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin-managed dynamic form fields per subcategory
CREATE TABLE IF NOT EXISTS category_fields (
    id SERIAL PRIMARY KEY,
    subcategory_id INT NOT NULL REFERENCES subcategories(id) ON DELETE CASCADE,
    field_name VARCHAR(100) NOT NULL,
    label_en VARCHAR(150) NOT NULL,
    label_ta VARCHAR(150) NOT NULL,
    field_type field_type_enum NOT NULL DEFAULT 'text',
    options JSONB DEFAULT '[]'::jsonb, -- e.g. ["Petrol", "Diesel", "Electric", "CNG"]
    is_required BOOLEAN DEFAULT FALSE,
    is_filterable BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(subcategory_id, field_name)
);

-- 6. LISTINGS & DYNAMIC ATTRIBUTES
CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    subcategory_id INT NOT NULL REFERENCES subcategories(id) ON DELETE RESTRICT,
    location_id INT NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    is_negotiable BOOLEAN DEFAULT FALSE,
    item_condition listing_condition_enum,
    status listing_status_enum DEFAULT 'pending_moderation',
    moderated_by UUID REFERENCES profiles(id),
    rejection_reason TEXT,
    view_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    is_top_ad BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_listings_seller ON listings(seller_id);
CREATE INDEX IF NOT EXISTS idx_listings_subcat ON listings(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_listings_location ON listings(location_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_promotions ON listings(is_top_ad, is_featured, is_premium);
CREATE INDEX IF NOT EXISTS idx_listings_search ON listings USING gin(to_tsvector('english', title || ' ' || description));

CREATE TABLE IF NOT EXISTS listing_attributes (
    id SERIAL PRIMARY KEY,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    field_id INT NOT NULL REFERENCES category_fields(id) ON DELETE CASCADE,
    value_text TEXT,
    value_number DECIMAL(14, 2),
    value_json JSONB,
    UNIQUE(listing_id, field_id)
);
CREATE INDEX IF NOT EXISTS idx_listing_attributes_lookup ON listing_attributes(field_id, value_number, value_text);

CREATE TABLE IF NOT EXISTS listing_images (
    id SERIAL PRIMARY KEY,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    display_order INT DEFAULT 0,
    is_cover BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_listing_images_listing ON listing_images(listing_id);

-- 7. FAVOURITES, CHAT & DIRECT MESSAGING
CREATE TABLE IF NOT EXISTS favourites (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, listing_id)
);

CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
    buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(listing_id, buyer_id, seller_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, sent_at DESC);

-- 8. MONETIZATION, PLANS, PAYMENTS & PROMOTIONS
CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    plan_type VARCHAR(50) NOT NULL, -- 'ad_promotion' or 'business_subscription'
    price_inr DECIMAL(10, 2) NOT NULL,
    duration_days INT NOT NULL,
    active_listing_limit INT,
    features JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    razorpay_order_id VARCHAR(100) UNIQUE NOT NULL,
    razorpay_payment_id VARCHAR(100) UNIQUE,
    razorpay_signature VARCHAR(255),
    amount_inr DECIMAL(10, 2) NOT NULL,
    status payment_status_enum DEFAULT 'pending',
    plan_id INT REFERENCES plans(id),
    listing_id UUID REFERENCES listings(id),
    receipt_no VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    verified_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS promotions (
    id SERIAL PRIMARY KEY,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    promotion_type promotion_type_enum NOT NULL,
    payment_id UUID REFERENCES payments(id),
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    plan_id INT NOT NULL REFERENCES plans(id),
    payment_id UUID REFERENCES payments(id),
    status VARCHAR(50) DEFAULT 'active',
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    auto_renew BOOLEAN DEFAULT FALSE
);

-- 9. MODERATION, REVIEWS, NOTIFICATIONS & AUDIT LOGS
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
    reported_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reason VARCHAR(100) NOT NULL,
    details TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
    moderator_notes TEXT,
    resolved_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
    rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    body TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id SERIAL PRIMARY KEY,
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    target_table VARCHAR(100) NOT NULL,
    target_id VARCHAR(100) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

