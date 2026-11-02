-- SELLORA MARKETPLACE
-- Migration 001: Core schema
create extension if not exists pgcrypto;

-- 1. User profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text unique,
  email text,
  avatar_url text,
  preferred_language text not null default 'en' check (preferred_language in ('en','ta')),
  account_status text not null default 'active' check (account_status in ('active','suspended','blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Admin roles
create table public.user_roles (
  user_id uuid references public.profiles(id) on delete cascade,
  role text not null check (
    role in ('super_admin','admin','moderator','finance','support')
  ),
  primary key (user_id, role)
);

-- 3. Locations
create table public.locations (
  id uuid primary key default gen_random_uuid(),
  state text not null default 'Tamil Nadu',
  district text not null,
  city text not null,
  locality text,
  postal_code text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz default now()
);

-- 4. Categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id),
  name_en text not null,
  name_ta text not null,
  slug text unique not null,
  icon text,
  description text,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 5. Dynamic category fields
create table public.category_fields (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  field_key text not null,
  label_en text not null,
  label_ta text not null,
  field_type text not null check (
    field_type in (
      'text','number','select','boolean',
      'date','multiselect'
    )
  ),
  options jsonb default '[]'::jsonb,
  is_required boolean default false,
  filterable boolean default false,
  sort_order integer default 0,
  unique(category_id, field_key)
);

-- 6. Listings
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id),
  category_id uuid not null references public.categories(id),
  location_id uuid references public.locations(id),
  title text not null,
  description text not null,
  price numeric(14,2) not null check (price >= 0),
  is_price_negotiable boolean default true,
  condition text check (
    condition in ('new','like_new','used','refurbished')
  ),
  listing_type text default 'individual' check (listing_type in ('individual','business')),
  status text not null default 'draft' check (status in (
    'draft','pending','active','rejected',
    'sold','expired','archived'
  )),
  attributes jsonb not null default '{}'::jsonb,
  views_count integer default 0,
  expires_at timestamptz,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 7. Listing images
create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  storage_path text not null,
  sort_order integer default 0,
  is_primary boolean default false,
  created_at timestamptz default now()
);

-- 8. Favourites
create table public.favourites (
  user_id uuid references public.profiles(id) on delete cascade,
  listing_id uuid references public.listings(id) on delete cascade,
  created_at timestamptz default now(),
  primary key(user_id, listing_id)
);

-- 9. Conversations
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id),
  buyer_id uuid not null references public.profiles(id),
  seller_id uuid not null references public.profiles(id),
  created_at timestamptz default now(),
  unique(listing_id, buyer_id, seller_id),
  check (buyer_id <> seller_id)
);

-- 10. Messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  message text not null,
  message_type text default 'text' check (message_type in ('text','image','system')),
  read_at timestamptz,
  created_at timestamptz default now()
);

-- 11. Reports
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id),
  listing_id uuid references public.listings(id),
  reported_user_id uuid references public.profiles(id),
  reason text not null,
  details text,
  status text default 'open' check (status in ('open','investigating','resolved','dismissed')),
  created_at timestamptz default now()
);

-- 12. Subscription plans
create table public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  billing_period text not null check (billing_period in ('monthly','yearly')),
  price numeric(12,2) not null check(price >= 0),
  active_listing_limit integer,
  features jsonb default '{}'::jsonb,
  is_active boolean default true
);

-- 13. Subscriptions
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  plan_id uuid not null references public.subscription_plans(id),
  status text default 'pending' check (status in ('pending','active','expired','cancelled')),
  starts_at timestamptz,
  ends_at timestamptz,
  gateway_subscription_id text,
  created_at timestamptz default now()
);

-- 14. Payments
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  subscription_id uuid references public.subscriptions(id),
  amount numeric(12,2) not null check(amount >= 0),
  currency text default 'INR',
  gateway text default 'razorpay',
  gateway_order_id text unique,
  gateway_payment_id text unique,
  status text default 'created' check (status in (
    'created','authorized','captured','failed','refunded'
  )),
  payment_purpose text not null,
  created_at timestamptz default now()
);

-- 15. Promotions
create table public.promotions (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id),
  user_id uuid not null references public.profiles(id),
  promotion_type text not null,
  payment_id uuid references public.payments(id),
  starts_at timestamptz,
  ends_at timestamptz,
  status text default 'pending'
);

-- 16. Admin audit log
create table public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Performance indexes
create index listings_category_idx on public.listings(category_id);
create index listings_seller_idx on public.listings(seller_id);
create index listings_status_idx on public.listings(status);
create index listings_location_idx on public.listings(location_id);
create index listings_created_idx on public.listings(created_at desc);
create index listings_attributes_idx on public.listings using gin(attributes);
create index messages_conversation_idx on public.messages(conversation_id, created_at);
create index profiles_phone_idx on public.profiles(phone);
create index promotions_listing_idx on public.promotions(listing_id, status);

