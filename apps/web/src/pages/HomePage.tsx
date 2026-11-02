import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp,
  Tag
} from 'lucide-react';
import { MOCK_LISTINGS, MOCK_CATEGORIES, TAMIL_NADU_DISTRICTS } from '../data/mockData';
import { AdCard } from '../components/AdCard';

interface HomePageProps {
  language: 'en' | 'ta';
  selectedDistrict: string;
}

export const HomePage: React.FC<HomePageProps> = ({ language, selectedDistrict }) => {
  const featuredAds = MOCK_LISTINGS.filter(l => l.is_featured || l.is_top_ad);
  const latestAds = MOCK_LISTINGS;

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Showcase */}
      <section className="bg-gradient-to-br from-[#0a141b] via-[#10232e] to-[#1a3e52] text-white py-12 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6ea4bf_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#6ea4bf]/20 border border-[#6ea4bf]/30 text-[#bce0ee] text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {language === 'en' ? 'Flacon: Direct P2P Classifieds in Tamil Nadu' : 'பிளாகான்: தமிழ்நாட்டின் நேரடி கொள்முதல் & விற்பனை சந்தை'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {language === 'en' ? (
              <>Buy. Sell. Connect. Everything Finds a Buyer on <span className="text-[#9acde3]">Flacon</span></>
            ) : (
              <>வாங்கு. விற்பனை செய். இணை. அனைத்தும் விற்பனையாகும் <span className="text-[#9acde3]">பிளாகானில்</span></>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal">
            {language === 'en'
              ? 'Buy and sell cars, mobile phones, real estate, electronics, and home furniture with zero commissions and verified phone contacts.'
              : 'கமிஷன் இன்றி நேரடியாக கார்கள், மொபைல்கள், வீடுகள் மற்றும் வீட்டு பொருட்களை வாங்குங்கள் மற்றும் விற்பனை செய்யுங்கள்.'}
          </p>

          {/* Quick Popular Categories Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'en' ? 'Trending:' : 'பிரபலமானவை:'}
            </span>
            <Link to="/browse?category=cars-bikes" className="bg-slate-800/80 hover:bg-slate-700 text-xs px-3 py-1 rounded-full border border-slate-700 transition">
              Used Cars in Chennai
            </Link>
            <Link to="/browse?category=electronics" className="bg-slate-800/80 hover:bg-slate-700 text-xs px-3 py-1 rounded-full border border-slate-700 transition">
              iPhones in Coimbatore
            </Link>
            <Link to="/browse?category=property" className="bg-slate-800/80 hover:bg-slate-700 text-xs px-3 py-1 rounded-full border border-slate-700 transition">
              Flats near OMR
            </Link>
            <Link to="/browse?category=cars-bikes" className="bg-slate-800/80 hover:bg-slate-700 text-xs px-3 py-1 rounded-full border border-slate-700 transition">
              Classic 350
            </Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Featured & Top Advertisements */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {language === 'en' ? 'Featured & Top Advertisements' : 'முன்னிலைப்படுத்தப்பட்ட விளம்பரங்கள்'}
                </h2>
                <p className="text-xs text-gray-500">Hand-picked premium listings with verified sellers</p>
              </div>
            </div>
            <Link 
              to="/browse?featured=true" 
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
            >
              <span>{language === 'en' ? 'View all featured' : 'அனைத்தையும் பார்'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} language={language} />
            ))}
          </div>
        </section>

        {/* Categories Grid Box */}
        <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {language === 'en' ? 'Explore by Category' : 'பிரிவுகள் வாரியாக ஆராய்க'}
            </h2>
            <Link to="/browse" className="text-xs font-semibold text-emerald-600 hover:underline">
              {language === 'en' ? 'All Categories' : 'அனைத்தும்'}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {MOCK_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/browse?category=${cat.slug}`}
                className="group flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-emerald-50 hover:border-emerald-200 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform mb-2">
                  <Tag className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                  {language === 'en' ? cat.name_en : cat.name_ta}
                </span>
                <span className="text-[10px] text-gray-500 mt-0.5">
                  {cat.subcategories.length} {language === 'en' ? 'Subtypes' : 'வகைகள்'}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Fresh Local Recommendations */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {language === 'en' ? 'Fresh Recommendations' : 'புதிய விளம்பரங்கள்'}
              </h2>
              <p className="text-xs text-gray-500">
                {selectedDistrict !== 'All Tamil Nadu' 
                  ? `Showing ads in ${selectedDistrict}` 
                  : 'Showing latest ads across Tamil Nadu'}
              </p>
            </div>
            <Link 
              to="/browse" 
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
            >
              <span>{language === 'en' ? 'Explore all' : 'அனைத்தும்'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} language={language} />
            ))}
          </div>
        </section>

        {/* Popular Locations in Tamil Nadu */}
        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">
              {language === 'en' ? 'Popular Districts in Tamil Nadu' : 'தமிழ்நாட்டின் முக்கிய மாவட்டங்கள்'}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
            {TAMIL_NADU_DISTRICTS.filter(d => d !== 'All Tamil Nadu').map((dist) => (
              <Link
                key={dist}
                to={`/browse?district=${encodeURIComponent(dist)}`}
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-sm transition flex flex-col justify-between"
              >
                <span className="font-semibold text-slate-800">{dist}</span>
                <span className="text-[10px] text-gray-500 mt-1">Browse Listings &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Sell Banner CTA */}
        <section className="bg-gradient-to-r from-[#4d829d] to-[#6ea4bf] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-black">
              {language === 'en' ? 'Do you have something to sell?' : 'உங்களிடம் விற்க ஏதேனும் உள்ளதா?'}
            </h3>
            <p className="text-sm text-[#dbeef5]">
              {language === 'en'
                ? 'Post your free advertisement in less than 2 minutes. Reach thousands of buyers across Tamil Nadu directly on phone & WhatsApp.'
                : '2 நிமிடங்களில் உங்கள் விளம்பரத்தை இலவசமாக இடுங்கள். ஆயிரக்கணக்கான வாங்குபவர்களை உடனடியாக சென்றடையுங்கள்.'}
            </p>
          </div>
          <Link
            to="/post-ad"
            className="bg-white text-[#1a3e52] hover:bg-[#f0f7fa] font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 whitespace-nowrap text-sm"
          >
            {language === 'en' ? 'Post Free Ad Now' : 'இலவச விளம்பரம் செய்க'}
          </Link>
        </section>

      </div>
    </div>
  );
};

