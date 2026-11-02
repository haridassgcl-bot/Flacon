-- SELLORA MARKETPLACE
-- Migration 004: Initial category seed

insert into public.categories (name_en, name_ta, slug, icon, sort_order) values
('Mobiles & Electronics','மொபைல் மற்றும் மின்னணு பொருட்கள்','electronics','smartphone',1),
('Cars & Vehicles','கார்கள் மற்றும் வாகனங்கள்','vehicles','car',2),
('Property','நிலம் மற்றும் வீடுகள்','property','house',3),
('Furniture','மரச்சாமான்கள்','furniture','sofa',4),
('Fashion','ஆடை மற்றும் அலங்காரம்','fashion','shirt',5),
('Home Appliances','வீட்டு உபயோகப் பொருட்கள்','appliances','refrigerator',6),
('Jobs','வேலைவாய்ப்புகள்','jobs','briefcase',7),
('Services','சேவைகள்','services','wrench',8),
('Agriculture','விவசாயம்','agriculture','tractor',9),
('Business & Industry','வணிகம் மற்றும் தொழிற்துறை','business','factory',10),
('Books & Education','புத்தகங்கள் மற்றும் கல்வி','education','book',11),
('Sports & Hobbies','விளையாட்டு மற்றும் பொழுதுபோக்கு','hobbies','bike',12)
on conflict (slug) do nothing;

