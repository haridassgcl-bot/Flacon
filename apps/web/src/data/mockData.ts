export interface MockCategory {
  id: number;
  slug: string;
  name_en: string;
  name_ta: string;
  icon: string;
  subcategories: {
    id: number;
    slug: string;
    name_en: string;
    name_ta: string;
    fields: {
      field_name: string;
      label_en: string;
      label_ta: string;
      field_type: 'text' | 'number' | 'select';
      options: string[];
      is_required: boolean;
    }[];
  }[];
}

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: 1,
    slug: 'cars-bikes',
    name_en: 'Cars & Bikes',
    name_ta: 'கார்கள் & பைக்குகள்',
    icon: 'Car',
    subcategories: [
      {
        id: 1,
        slug: 'cars',
        name_en: 'Cars & Used Cars',
        name_ta: 'கார்கள்',
        fields: [
          { field_name: 'brand', label_en: 'Brand', label_ta: 'பிராண்ட்', field_type: 'select', options: ['Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra', 'Toyota', 'Honda', 'Kia'], is_required: true },
          { field_name: 'year', label_en: 'Year', label_ta: 'உற்பத்தி ஆண்டு', field_type: 'number', options: [], is_required: true },
          { field_name: 'fuel_type', label_en: 'Fuel Type', label_ta: 'எரிபொருள்', field_type: 'select', options: ['Petrol', 'Diesel', 'Electric', 'CNG'], is_required: true },
          { field_name: 'transmission', label_en: 'Transmission', label_ta: 'கியர் வகை', field_type: 'select', options: ['Manual', 'Automatic'], is_required: true },
          { field_name: 'km_driven', label_en: 'KM Driven', label_ta: 'ஓடிய தூரம்', field_type: 'number', options: [], is_required: true },
          { field_name: 'owners', label_en: 'Owners', label_ta: 'உரிமையாளர்கள்', field_type: 'select', options: ['1st Owner', '2nd Owner', '3rd Owner+'], is_required: true }
        ]
      },
      {
        id: 2,
        slug: 'motorcycles',
        name_en: 'Motorcycles & Scooters',
        name_ta: 'இருசக்கர வாகனங்கள்',
        fields: [
          { field_name: 'brand', label_en: 'Brand', label_ta: 'பிராண்ட்', field_type: 'select', options: ['Royal Enfield', 'Yamaha', 'Honda', 'TVS', 'Bajaj', 'KTM', 'Hero'], is_required: true },
          { field_name: 'year', label_en: 'Year', label_ta: 'உற்பத்தி ஆண்டு', field_type: 'number', options: [], is_required: true },
          { field_name: 'km_driven', label_en: 'KM Driven', label_ta: 'ஓடிய தூரம்', field_type: 'number', options: [], is_required: true }
        ]
      }
    ]
  },
  {
    id: 2,
    slug: 'electronics',
    name_en: 'Electronics & Mobiles',
    name_ta: 'மின்னணுவியல் & மொபைல்',
    icon: 'Smartphone',
    subcategories: [
      {
        id: 5,
        slug: 'mobile-phones',
        name_en: 'Mobile Phones',
        name_ta: 'கைப்பேசிகள் (மொபைல்)',
        fields: [
          { field_name: 'mobile_brand', label_en: 'Brand', label_ta: 'பிராண்ட்', field_type: 'select', options: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'Realme', 'Google Pixel'], is_required: true },
          { field_name: 'storage', label_en: 'Storage', label_ta: 'சேமிப்பகம்', field_type: 'select', options: ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'], is_required: true },
          { field_name: 'ram', label_en: 'RAM', label_ta: 'ரேம்', field_type: 'select', options: ['4 GB', '6 GB', '8 GB', '12 GB+'], is_required: false }
        ]
      },
      {
        id: 6,
        slug: 'laptops-computers',
        name_en: 'Laptops & Computers',
        name_ta: 'கணினிகள்',
        fields: [
          { field_name: 'brand', label_en: 'Brand', label_ta: 'பிராண்ட்', field_type: 'select', options: ['Apple MacBook', 'Dell', 'Lenovo', 'HP', 'Asus', 'Acer'], is_required: true },
          { field_name: 'processor', label_en: 'Processor', label_ta: 'செயலி', field_type: 'select', options: ['Intel Core i5', 'Intel Core i7', 'Apple M1/M2/M3', 'AMD Ryzen 5', 'AMD Ryzen 7'], is_required: true }
        ]
      }
    ]
  },
  {
    id: 3,
    slug: 'property',
    name_en: 'Property & Real Estate',
    name_ta: 'வீடு & நிலம்',
    icon: 'Home',
    subcategories: [
      {
        id: 9,
        slug: 'apartments-flats',
        name_en: 'Flats & Apartments for Sale',
        name_ta: 'அடுக்குமாடி குடியிருப்பு',
        fields: [
          { field_name: 'bhk', label_en: 'BHK', label_ta: 'பி.எச்.கே', field_type: 'select', options: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'], is_required: true },
          { field_name: 'sqft', label_en: 'Super Built-up Area (sq ft)', label_ta: 'பரப்பளவு (சதுர அடி)', field_type: 'number', options: [], is_required: true },
          { field_name: 'furnishing', label_en: 'Furnishing', label_ta: 'ஃபர்னிஷிங் நிலை', field_type: 'select', options: ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'], is_required: true }
        ]
      }
    ]
  },
  {
    id: 4,
    slug: 'home-furniture',
    name_en: 'Home & Furniture',
    name_ta: 'வீட்டு உபயோக பொருட்கள்',
    icon: 'Armchair',
    subcategories: [
      { id: 14, slug: 'sofas', name_en: 'Sofas & Living Room', name_ta: 'சோஃபா', fields: [] },
      { id: 15, slug: 'appliances', name_en: 'Appliances (AC, Fridge, Washing)', name_ta: 'மின்சாதனங்கள்', fields: [] }
    ]
  },
  {
    id: 5,
    slug: 'services',
    name_en: 'Services',
    name_ta: 'சேவைகள்',
    icon: 'Wrench',
    subcategories: [
      { id: 17, slug: 'home-repair', name_en: 'Electricians, Plumbers & Carpenters', name_ta: 'பழுதுபார்த்தல்', fields: [] },
      { id: 18, slug: 'it-services', name_en: 'Web Design & Tech Support', name_ta: 'தொழில்நுட்ப சேவைகள்', fields: [] }
    ]
  },
  {
    id: 6,
    slug: 'jobs-business',
    name_en: 'Jobs & Commercial',
    name_ta: 'வேலைவாய்ப்பு & வணிகம்',
    icon: 'Briefcase',
    subcategories: [
      { id: 19, slug: 'full-time', name_en: 'Full Time Jobs', name_ta: 'முழு நேர வேலைகள்', fields: [] },
      { id: 20, slug: 'drivers-delivery', name_en: 'Delivery & Drivers', name_ta: 'டெலிவரி மற்றும் ஓட்டுநர்கள்', fields: [] }
    ]
  }
];

export const TAMIL_NADU_DISTRICTS = [
  'All Tamil Nadu',
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Tiruchirappalli',
  'Salem',
  'Tiruppur',
  'Erode',
  'Vellore',
  'Tirunelveli',
  'Thanjavur',
  'Dindigul',
  'Kanchipuram',
  'Chengalpattu',
  'Thoothukudi'
];

export const MOCK_LISTINGS = [
  {
    id: 'f101',
    title: 'Hyundai Creta SX (O) 1.5 Diesel Automatic 2021 Sunroof',
    price: 1385000,
    category: 'Cars & Bikes',
    subcategory: 'Cars & Used Cars',
    district: 'Chennai',
    locality: 'Anna Nagar',
    date: '2 hours ago',
    condition: 'used_good',
    is_featured: true,
    is_top_ad: true,
    is_verified_seller: true,
    seller_name: 'Karthik Raja',
    phone: '+91 98401 23456',
    whatsapp: '919840123456',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    attributes: {
      brand: 'Hyundai',
      year: '2021',
      fuel_type: 'Diesel',
      transmission: 'Automatic',
      km_driven: '34,200 km',
      owners: '1st Owner',
      insurance: 'Valid till Nov 2027'
    },
    description: 'Single owner Hyundai Creta in immaculate mint condition. Complete authorized service history available with Hyundai OMR. Panoramic sunroof, ventilated front seats, Bose sound system. Genuine buyers only.'
  },
  {
    id: 'f102',
    title: 'iPhone 15 Pro Max 256GB Natural Titanium (With Bill & Box)',
    price: 94000,
    category: 'Electronics & Mobiles',
    subcategory: 'Mobile Phones',
    district: 'Coimbatore',
    locality: 'RS Puram',
    date: '5 hours ago',
    condition: 'like_new',
    is_featured: true,
    is_top_ad: false,
    is_verified_seller: true,
    seller_name: 'Suresh Kumar',
    phone: '+91 94432 98765',
    whatsapp: '919443298765',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
    ],
    attributes: {
      mobile_brand: 'Apple',
      storage: '256 GB',
      battery_health: '98%',
      warranty: 'AppleCare till Jan 2027'
    },
    description: 'Selling pristine condition iPhone 15 Pro Max in Natural Titanium. 100% scratch-free, always used with Spigen case and tempered glass. Comes with Indian invoice, original box, and unused USB-C braided cable.'
  },
  {
    id: 'f103',
    title: 'Luxury 3 BHK Flat 1650 Sq.Ft with 2 Car Parkings near OMR Toll',
    price: 8800000,
    category: 'Property & Real Estate',
    subcategory: 'Flats & Apartments for Sale',
    district: 'Chennai',
    locality: 'Velachery / OMR',
    date: '1 day ago',
    condition: 'new',
    is_featured: true,
    is_top_ad: false,
    is_verified_seller: true,
    seller_name: 'Falcon Realty Promoters',
    phone: '+91 99620 44556',
    whatsapp: '919962044556',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
    ],
    attributes: {
      bhk: '3 BHK',
      sqft: '1650 sq ft',
      furnishing: 'Semi-Furnished',
      facing: 'North-East',
      approval: 'CMDA Approved'
    },
    description: 'CMDA and RERA approved ready-to-move 3 BHK luxury apartment. Close to major IT corridors, top schools, and metro station. Swimming pool, clubhouse, gymnasium, 24x7 security, and 100% power backup.'
  },
  {
    id: 'f104',
    title: 'Royal Enfield Classic 350 Stealth Black Dual ABS 2022',
    price: 175000,
    category: 'Cars & Bikes',
    subcategory: 'Motorcycles & Scooters',
    district: 'Madurai',
    locality: 'KK Nagar',
    date: '1 day ago',
    condition: 'used_good',
    is_featured: false,
    is_top_ad: false,
    is_verified_seller: false,
    seller_name: 'Vignesh M',
    phone: '+91 97890 11223',
    whatsapp: '919789011223',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    attributes: {
      brand: 'Royal Enfield',
      year: '2022',
      km_driven: '14,500 km',
      owners: '1st Owner'
    },
    description: 'Single hand driven Royal Enfield Classic 350. Stealth Black matte finish, alloy wheels, tubeless tyres, ceramic coated. No hypothecation, clean papers.'
  },
  {
    id: 'f105',
    title: 'Solid Teak Wood 6-Seater Dining Table with Cushioned Chairs',
    price: 24500,
    category: 'Home & Furniture',
    subcategory: 'Sofas & Living Room',
    district: 'Tiruchirappalli',
    locality: 'Thillai Nagar',
    date: '2 days ago',
    condition: 'used_good',
    is_featured: false,
    is_top_ad: false,
    is_verified_seller: false,
    seller_name: 'Anand Ram',
    phone: '+91 98424 55667',
    whatsapp: '919842455667',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80'
    ],
    attributes: {
      material: '100% Genuine Burma Teak',
      condition: 'Excellent, polished 3 months ago'
    },
    description: 'Genuine heavy Burma teak wood dining table with 6 matching ergonomic chairs. Relocating to Bangalore, selling immediately.'
  },
  {
    id: 'f106',
    title: 'Apple MacBook Air M2 16GB RAM / 512GB SSD Space Grey',
    price: 86000,
    category: 'Electronics & Mobiles',
    subcategory: 'Laptops & Computers',
    district: 'Salem',
    locality: 'Fairlands',
    date: '3 days ago',
    condition: 'like_new',
    is_featured: false,
    is_top_ad: false,
    is_verified_seller: true,
    seller_name: 'Dinesh Babu',
    phone: '+91 94861 77889',
    whatsapp: '919486177889',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    attributes: {
      brand: 'Apple MacBook',
      processor: 'Apple M2 (8-core CPU / 10-core GPU)',
      ram: '16 GB Unified Memory',
      battery_cycle: '42 cycles'
    },
    description: 'Upgraded 16GB RAM model ideal for developers, editors, and students. Zero blemishes, battery health 100%. Comes with MagSafe 3 charger and original box.'
  }
];

