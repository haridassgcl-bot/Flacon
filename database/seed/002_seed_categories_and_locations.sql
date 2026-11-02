-- ====================================================================
-- FALCON MARKETPLACE: SEED DATA (TAMIL NADU REGION + CATEGORIES + PLANS)
-- ====================================================================

-- 1. SEED CATEGORIES (English + Tamil)
INSERT INTO categories (id, slug, name_en, name_ta, icon, display_order) VALUES
(1, 'cars-bikes', 'Cars & Bikes', 'கார்கள் மற்றும் பைக்குகள்', 'Car', 1),
(2, 'electronics', 'Electronics & Mobiles', 'மின்னணுவியல் & மொபைல்', 'Smartphone', 2),
(3, 'property', 'Property & Real Estate', 'வீடு & நிலம்', 'Home', 3),
(4, 'home-furniture', 'Home & Furniture', 'வீட்டு உபயோக பொருட்கள்', 'Armchair', 4),
(5, 'fashion', 'Fashion & Lifestyle', 'ஆடை & அலங்காரம்', 'Shirt', 5),
(6, 'industrial-agriculture', 'Industrial & Agriculture', 'தொழில்துறை & விவசாயம்', 'Tractor', 6),
(7, 'services', 'Services', 'சேவைகள்', 'Wrench', 7),
(8, 'jobs-business', 'Jobs & Commercial', 'வேலைவாய்ப்பு & வணிகம்', 'Briefcase', 8),
(9, 'pets', 'Pets & Pet Care', 'செல்லப்பிராணிகள்', 'Dog', 9),
(10, 'books-sports', 'Books, Sports & Hobbies', 'புத்தகங்கள் & பொழுதுபோக்கு', 'BookOpen', 10)
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED SUBCATEGORIES
INSERT INTO subcategories (id, category_id, slug, name_en, name_ta, display_order) VALUES
-- Cars & Bikes
(1, 1, 'cars', 'Cars', 'கார்கள்', 1),
(2, 1, 'motorcycles', 'Motorcycles & Scooters', 'மோட்டார் சைக்கிள்கள் & ஸ்கூட்டர்கள்', 2),
(3, 1, 'commercial-vehicles', 'Commercial Vehicles', 'வணிக வாகனங்கள்', 3),
(4, 1, 'auto-spare-parts', 'Spare Parts & Accessories', 'உதிரி பாகங்கள்', 4),

-- Electronics
(5, 2, 'mobile-phones', 'Mobile Phones', 'கைப்பேசிகள் (மொபைல்)', 1),
(6, 2, 'laptops-computers', 'Laptops & Computers', 'மடிக்கணினி & கணினிகள்', 2),
(7, 2, 'tvs-video-audio', 'TVs, Audio & Video', 'டிவி & ஆடியோ', 3),
(8, 2, 'cameras-lenses', 'Cameras & Accessories', 'கேமராக்கள்', 4),

-- Property
(9, 3, 'apartments-flats', 'Apartments & Flats for Sale', 'விற்பனைக்கு அடுக்குமாடி குடியிருப்புகள்', 1),
(10, 3, 'independent-houses', 'Houses & Villas', 'வீடுகள் & வில்லாக்கள்', 2),
(11, 3, 'plots-land', 'Plots & Land', 'மனைகள் & நிலம்', 3),
(12, 3, 'rental-homes', 'Houses & Apartments for Rent', 'வாடகை வீடுகள்', 4),
(13, 3, 'commercial-property', 'Commercial Real Estate', 'வணிக வளாகங்கள்', 5),

-- Home & Furniture
(14, 4, 'sofas-dining', 'Sofas & Dining', 'சோஃபா & டைனிங்', 1),
(15, 4, 'beds-wardrobes', 'Beds & Wardrobes', 'படுக்கைகள் & அலமாரிகள்', 2),
(16, 4, 'home-appliances', 'Home Appliances (Fridges, AC, Washing Machines)', 'வீட்டு உபயோக சாதனங்கள்', 3),

-- Services
(17, 7, 'home-repair', 'Home Repair & Electrician/Plumber', 'வீட்டு பழுதுபார்த்தல்', 1),
(18, 7, 'it-software', 'IT, Design & Marketing', 'தகவல் தொழில்நுட்ப சேவைகள்', 2),

-- Jobs
(19, 8, 'full-time-jobs', 'Full-time Jobs', 'முழு நேர வேலைகள்', 1),
(20, 8, 'part-time-delivery', 'Part-time, Delivery & Drivers', 'பகுதி நேர & ஓட்டுநர் வேலைகள்', 2)
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED DYNAMIC CATEGORY FIELDS (TEMPLATE ENGINE)
-- Used Cars dynamic fields
INSERT INTO category_fields (subcategory_id, field_name, label_en, label_ta, field_type, options, is_required, is_filterable, display_order) VALUES
(1, 'brand', 'Brand', 'பிராண்ட்', 'select', '["Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Toyota", "Honda", "Kia", "Volkswagen", "Ford", "Renault", "Skoda", "Other"]', TRUE, TRUE, 1),
(1, 'year', 'Year of Manufacture', 'உற்பத்தி ஆண்டு', 'number', '[]', TRUE, TRUE, 2),
(1, 'fuel_type', 'Fuel Type', 'எரிபொருள் வகை', 'select', '["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]', TRUE, TRUE, 3),
(1, 'transmission', 'Transmission', 'கியர் வகை', 'select', '["Manual", "Automatic"]', TRUE, TRUE, 4),
(1, 'km_driven', 'Kilometres Driven', 'ஓடிய தூரம் (கி.மீ)', 'number', '[]', TRUE, TRUE, 5),
(1, 'owners', 'Number of Owners', 'முந்தைய உரிமையாளர்கள்', 'select', '["1st Owner", "2nd Owner", "3rd Owner", "4th Owner & Above"]', TRUE, TRUE, 6),
(1, 'rto_location', 'Registration RTO', 'பதிவு செய்யப்பட்ட ஊர்', 'text', '[]', FALSE, FALSE, 7)
ON CONFLICT (subcategory_id, field_name) DO NOTHING;

-- Mobile Phones dynamic fields
INSERT INTO category_fields (subcategory_id, field_name, label_en, label_ta, field_type, options, is_required, is_filterable, display_order) VALUES
(5, 'mobile_brand', 'Brand', 'பிராண்ட்', 'select', '["Apple", "Samsung", "OnePlus", "Xiaomi / Redmi", "Vivo", "Oppo", "Realme", "Google Pixel", "Motorola", "Nothing", "Other"]', TRUE, TRUE, 1),
(5, 'storage_capacity', 'Storage Capacity', 'சேமிப்புத் திறன்', 'select', '["32 GB", "64 GB", "128 GB", "256 GB", "512 GB", "1 TB"]', TRUE, TRUE, 2),
(5, 'ram', 'RAM', 'ரேம்', 'select', '["4 GB", "6 GB", "8 GB", "12 GB", "16 GB+"]', FALSE, TRUE, 3),
(5, 'original_box_bill', 'Original Box & Bill Available?', 'அசல் பில் மற்றும் பெட்டி உள்ளதா?', 'select', '["Both Box & Bill", "Only Box", "Only Bill", "Device Only"]', FALSE, FALSE, 4)
ON CONFLICT (subcategory_id, field_name) DO NOTHING;

-- Apartments & Flats dynamic fields
INSERT INTO category_fields (subcategory_id, field_name, label_en, label_ta, field_type, options, is_required, is_filterable, display_order) VALUES
(9, 'bhk_type', 'BHK Type', 'பி.எச்.கே வகை', 'select', '["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"]', TRUE, TRUE, 1),
(9, 'super_built_up_area', 'Super Built-up Area (sq ft)', 'பரப்பளவு (சதுர அடி)', 'number', '[]', TRUE, TRUE, 2),
(9, 'furnishing', 'Furnishing', 'ஃபர்னிஷிங் நிலை', 'select', '["Unfurnished", "Semi-Furnished", "Fully Furnished"]', TRUE, TRUE, 3),
(9, 'car_parking', 'Car Parking', 'கார் பார்க்கிங்', 'select', '["Covered", "Open", "None"]', FALSE, TRUE, 4),
(9, 'facing', 'Facing Direction', 'திசை', 'select', '["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]', FALSE, FALSE, 5)
ON CONFLICT (subcategory_id, field_name) DO NOTHING;

-- 4. SEED TAMIL NADU LOCATIONS (TOP DISTRICTS & LOCALITIES)
INSERT INTO locations (state, district, city, locality, pincode) VALUES
-- Chennai
('Tamil Nadu', 'Chennai', 'Chennai City', 'T. Nagar', '600017'),
('Tamil Nadu', 'Chennai', 'Chennai City', 'Anna Nagar', '600040'),
('Tamil Nadu', 'Chennai', 'Chennai City', 'Velachery', '600042'),
('Tamil Nadu', 'Chennai', 'Chennai City', 'Adyar', '600020'),
('Tamil Nadu', 'Chennai', 'Chennai City', 'Mylapore', '600004'),
('Tamil Nadu', 'Chennai', 'Chennai City', 'Tambaram', '600045'),
('Tamil Nadu', 'Chennai', 'Chennai City', 'OMR (Thoraipakkam / Sholinganallur)', '600097'),
('Tamil Nadu', 'Chennai', 'Chennai City', 'Porur', '600116'),
('Tamil Nadu', 'Chennai', 'Chennai City', 'Vadapalani', '600026'),
('Tamil Nadu', 'Chennai', 'Chennai City', 'Ambattur', '600053'),

-- Coimbatore
('Tamil Nadu', 'Coimbatore', 'Coimbatore City', 'Gandhipuram', '641012'),
('Tamil Nadu', 'Coimbatore', 'Coimbatore City', 'RS Puram', '641002'),
('Tamil Nadu', 'Coimbatore', 'Coimbatore City', 'Peelamedu', '641004'),
('Tamil Nadu', 'Coimbatore', 'Coimbatore City', 'Saravanampatti', '641035'),
('Tamil Nadu', 'Coimbatore', 'Coimbatore City', 'Saibaba Colony', '641011'),
('Tamil Nadu', 'Coimbatore', 'Coimbatore City', 'Singanallur', '641005'),

-- Madurai
('Tamil Nadu', 'Madurai', 'Madurai City', 'Anna Nagar', '625020'),
('Tamil Nadu', 'Madurai', 'Madurai City', 'KK Nagar', '625020'),
('Tamil Nadu', 'Madurai', 'Madurai City', 'Simmakkal', '625001'),
('Tamil Nadu', 'Madurai', 'Madurai City', 'Goripalayam', '625002'),
('Tamil Nadu', 'Madurai', 'Madurai City', 'Sellur', '625002'),

-- Tiruchirappalli (Trichy)
('Tamil Nadu', 'Tiruchirappalli', 'Trichy City', 'Thillai Nagar', '620018'),
('Tamil Nadu', 'Tiruchirappalli', 'Trichy City', 'Srirangam', '620006'),
('Tamil Nadu', 'Tiruchirappalli', 'Trichy City', 'Cantonment', '620001'),
('Tamil Nadu', 'Tiruchirappalli', 'Trichy City', 'K.K. Nagar', '620021'),

-- Salem
('Tamil Nadu', 'Salem', 'Salem City', 'Hasthampatti', '636007'),
('Tamil Nadu', 'Salem', 'Salem City', 'Fairlands', '636016'),
('Tamil Nadu', 'Salem', 'Salem City', 'Suramangalam', '636005'),

-- Tiruppur
('Tamil Nadu', 'Tiruppur', 'Tiruppur City', 'Avinashi Road', '641602'),
('Tamil Nadu', 'Tiruppur', 'Tiruppur City', 'Palladam Road', '641604'),

-- Erode
('Tamil Nadu', 'Erode', 'Erode City', 'Perundurai Road', '638011'),
('Tamil Nadu', 'Erode', 'Erode City', 'Brough Road', '638001'),

-- Tirunelveli
('Tamil Nadu', 'Tirunelveli', 'Tirunelveli City', 'Palayamkottai', '627002'),
('Tamil Nadu', 'Tirunelveli', 'Tirunelveli City', 'Vannarpettai', '627003'),

-- Vellore
('Tamil Nadu', 'Vellore', 'Vellore City', 'Katpadi', '632007'),
('Tamil Nadu', 'Vellore', 'Vellore City', 'Sathuvachari', '632009');

-- 5. SEED MONETIZATION PLANS (AS PER FALCON PRD)
INSERT INTO plans (id, name, plan_type, price_inr, duration_days, active_listing_limit, features) VALUES
(1, 'Free Seller', 'ad_promotion', 0.00, 30, 3, '["3 active listings", "Standard search ranking", "Direct chat & WhatsApp", "30-day listing period"]'::jsonb),
(2, 'Featured Ad', 'ad_promotion', 99.00, 7, 1, '["Highlighted badge", "Top 5 category placement", "3x more buyer inquiries", "7 days validity"]'::jsonb),
(3, 'Premium Ad', 'ad_promotion', 199.00, 15, 1, '["Gold border & Premium tag", "Featured on Home screen carousel", "Top category placement", "15 days validity"]'::jsonb),
(4, 'Top Ad', 'ad_promotion', 299.00, 30, 1, '["Absolute #1 rank in district searches", "Maximum visibility badge", "Instant SMS/WhatsApp notification alert", "30 days validity"]'::jsonb),
(5, 'Business Pro Monthly', 'business_subscription', 999.00, 30, 50, '["Up to 50 active listings", "Verified Business Badge", "Dedicated Seller Store URL", "Listing views & lead analytics", "Direct WhatsApp Click-to-Chat CTA", "Priority customer support"]'::jsonb),
(6, 'Business Pro Annual', 'business_subscription', 9999.00, 365, 999, '["Unlimited active listings", "Verified Business Gold Seal", "Custom brand logo & header", "12 Free Featured Ad vouchers", "Dedicated account manager", "365 days of business growth"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

