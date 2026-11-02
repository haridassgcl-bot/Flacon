-- ====================================================================
-- SELLORA MARKETPLACE COMPLETE SEED DATA (TAMIL NADU + PLANS + LOCATIONS)
-- ====================================================================

-- 1. Subscription Plans
insert into public.subscription_plans (id, name, billing_period, price, active_listing_limit, features) values
('b0000000-0000-0000-0000-000000000001', 'Free Seller', 'monthly', 0.00, 3, '{"free_ads": 3, "duration_days": 30, "direct_chat": true}'::jsonb),
('b0000000-0000-0000-0000-000000000002', 'Business Monthly', 'monthly', 999.00, 50, '{"active_listings": 50, "verified_badge": true, "store_url": true, "whatsapp_cta": true}'::jsonb),
('b0000000-0000-0000-0000-000000000003', 'Business Annual', 'yearly', 9999.00, 999, '{"unlimited_listings": true, "gold_seal": true, "featured_vouchers": 12, "dedicated_manager": true}'::jsonb)
on conflict (id) do nothing;

-- 2. Tamil Nadu Locations (Districts & Key Localities)
insert into public.locations (district, city, locality, postal_code) values
('Chennai', 'Chennai City', 'Anna Nagar', '600040'),
('Chennai', 'Chennai City', 'T. Nagar', '600017'),
('Chennai', 'Chennai City', 'Velachery', '600042'),
('Chennai', 'Chennai City', 'Adyar', '600020'),
('Chennai', 'Chennai City', 'OMR (Thoraipakkam)', '600097'),
('Coimbatore', 'Coimbatore City', 'RS Puram', '641002'),
('Coimbatore', 'Coimbatore City', 'Gandhipuram', '641012'),
('Coimbatore', 'Coimbatore City', 'Peelamedu', '641004'),
('Madurai', 'Madurai City', 'KK Nagar', '625020'),
('Madurai', 'Madurai City', 'Anna Nagar', '625020'),
('Tiruchirappalli', 'Trichy City', 'Thillai Nagar', '620018'),
('Salem', 'Salem City', 'Fairlands', '636016'),
('Tiruppur', 'Tiruppur City', 'Avinashi Road', '641602');

