-- SELLORA MARKETPLACE
-- Migration 003: Row-level security (RLS)

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.favourites enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reports enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;
alter table public.promotions enable row level security;

-- Profiles: public information is visible, only account owner can update own record.
create policy "Read profiles" on public.profiles for select using (true);
create policy "Update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- Listings
create policy "Read active listings" on public.listings for select using (
  status = 'active' or seller_id = auth.uid()
);
create policy "Create own listing" on public.listings for insert with check (seller_id = auth.uid());
create policy "Update own listing" on public.listings for update using (seller_id = auth.uid()) with check (seller_id = auth.uid());
create policy "Delete own listing" on public.listings for delete using (seller_id = auth.uid());

-- Listing Images
create policy "Read listing images" on public.listing_images for select using (true);
create policy "Insert listing images" on public.listing_images for insert with check (
  exists (select 1 from public.listings l where l.id = listing_id and l.seller_id = auth.uid())
);
create policy "Delete listing images" on public.listing_images for delete using (
  exists (select 1 from public.listings l where l.id = listing_id and l.seller_id = auth.uid())
);

-- Favourites
create policy "Manage own favourites" on public.favourites for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Conversations
create policy "Participants read conversations" on public.conversations for select using (
  buyer_id = auth.uid() or seller_id = auth.uid()
);
create policy "Buyer creates conversation" on public.conversations for insert with check (
  buyer_id = auth.uid() and buyer_id <> seller_id
);

-- Messages
create policy "Participants read messages" on public.messages for select using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id
    and auth.uid() in (c.buyer_id, c.seller_id)
  )
);
create policy "Participants send messages" on public.messages for insert with check (
  sender_id = auth.uid() and
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id
    and auth.uid() in (c.buyer_id, c.seller_id)
  )
);

-- Payments: owners can read only their payments.
create policy "Read own payments" on public.payments for select using (user_id = auth.uid());

-- Subscriptions: owners can read only their subscriptions.
create policy "Read own subscriptions" on public.subscriptions for select using (user_id = auth.uid());

-- Public reports are never exposed.
create policy "Submit report" on public.reports for insert with check (reporter_id = auth.uid());

