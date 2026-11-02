export interface CustomField {
  field_name: string;
  label_en: string;
  label_ta: string;
  field_type: 'text' | 'number' | 'select';
  options: string[];
  is_required: boolean;
}

export interface SubCategory {
  id: number;
  slug: string;
  name_en: string;
  name_ta: string;
  fields: CustomField[];
}

export interface Category {
  id: number;
  slug: string;
  name_en: string;
  name_ta: string;
  icon: string;
  subcategories: SubCategory[];
}

export const ADMIN_CATEGORIES: Category[] = [
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
          { field_name: 'laptop_brand', label_en: 'Brand', label_ta: 'பிராண்ட்', field_type: 'select', options: ['Dell', 'HP', 'Lenovo', 'Apple MacBook', 'Asus', 'Acer'], is_required: true },
          { field_name: 'processor', label_en: 'Processor', label_ta: 'செயலி', field_type: 'select', options: ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Apple M1/M2/M3', 'AMD Ryzen 5', 'AMD Ryzen 7'], is_required: true }
        ]
      }
    ]
  },
  {
    id: 3,
    slug: 'properties',
    name_en: 'Properties & Real Estate',
    name_ta: 'ரியல் எஸ்டேட் & வீடுகள்',
    icon: 'Home',
    subcategories: [
      {
        id: 3,
        slug: 'houses-apartments-for-sale',
        name_en: 'Houses & Apartments for Sale',
        name_ta: 'விற்பனைக்கு உள்ள வீடுகள்',
        fields: [
          { field_name: 'bhk', label_en: 'Bedrooms (BHK)', label_ta: 'படுக்கையறை (BHK)', field_type: 'select', options: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'], is_required: true },
          { field_name: 'furnishing', label_en: 'Furnishing', label_ta: 'மரச்சாமான்கள்', field_type: 'select', options: ['Furnished', 'Semi-Furnished', 'Unfurnished'], is_required: true },
          { field_name: 'carpet_area_sqft', label_en: 'Carpet Area (sq ft)', label_ta: 'பரப்பளவு (சதுர அடி)', field_type: 'number', options: [], is_required: true }
        ]
      }
    ]
  }
];
