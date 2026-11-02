import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  MessageSquare,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MOCK_LISTINGS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface AdDetailPageProps {
  language: 'en' | 'ta';
}

export const AdDetailPage: React.FC<AdDetailPageProps> = ({ language }) => {
  const { id } = useParams<{ id: string }>();
  const [showPhone, setShowPhone] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { isFavourite, toggleFavourite } = useAuth();

  const ad = MOCK_LISTINGS.find(item => item.id === id) || MOCK_LISTINGS[0];
  const [activeImage, setActiveImage] = useState(ad.images[0] || ad.image);
  const saved = isFavourite(ad.id);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${ad.seller_name}, I saw your listing "${ad.title}" on Flacon Marketplace for ${formatPrice(ad.price)}. Is it still available?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <span>&gt;</span>
        <Link to="/browse" className="hover:text-emerald-600">{ad.category}</Link>
        <span>&gt;</span>
        <span className="text-gray-800 font-medium truncate max-w-sm">{ad.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image Gallery, Specs Table & Description */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Photo Gallery */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="relative h-96 sm:h-[480px] bg-slate-950 flex items-center justify-center">
              <img
                src={activeImage}
                alt={ad.title}
                className="max-h-full max-w-full object-contain"
              />
              {ad.is_top_ad && (
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded shadow flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  TOP AD
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {ad.images.length > 1 && (
              <div className="p-3 bg-gray-50 flex items-center gap-2 border-t border-gray-100 overflow-x-auto">
                {ad.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${
                      activeImage === img ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Attributes & Specifications Card */}
          {ad.attributes && Object.keys(ad.attributes).length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3">
                {language === 'en' ? 'Product Specifications' : 'முக்கிய விவரக்குறிப்புகள்'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(ad.attributes).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-bold text-slate-900 block mt-0.5">
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-gray-100 pb-3">
              {language === 'en' ? 'Seller Description' : 'விற்பனையாளர் விளக்கம்'}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {ad.description}
            </p>
          </div>

          {/* Safety Notice Box */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 text-amber-900">
              <h4 className="font-bold">Safety Guidelines for Flacon Buyers</h4>
              <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                <li>Never send advance deposits or transfer money via UPI before inspecting the item in person.</li>
                <li>Meet in public places (metro stations, busy markets, local malls).</li>
                <li>Verify vehicle registration, NOC, and property documentation with authorized authorities.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing, Contact CTA, Seller Card */}
        <div className="space-y-6">
          
          {/* Main Price Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6 sticky top-24">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {formatPrice(ad.price)}
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleShare}
                    className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition"
                    title="Share listing"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => toggleFavourite(ad.id)}
                    className={`p-2 border rounded-full transition ${
                      saved 
                        ? 'border-rose-200 bg-rose-50 text-rose-600' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-rose-500'
                    }`}
                    title={saved ? 'Remove from Saved' : 'Save to Favourites'}
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>

              {copiedLink && (
                <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Link copied to clipboard!
                </div>
              )}

              <h1 className="text-base font-bold text-gray-800 mt-3 leading-snug">
                {ad.title}
              </h1>

              <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{ad.locality}, {ad.district}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{ad.date}</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              
              {/* WhatsApp Direct CTA */}
              <a
                href={`https://wa.me/${ad.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{language === 'en' ? 'Chat on WhatsApp' : 'வாட்ஸ்அப்பில் தொடர்புகொள்க'}</span>
              </a>

              {/* Show Phone Number CTA */}
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{showPhone ? ad.phone : (language === 'en' ? 'Show Phone Number' : 'தொலைபேசி எண் காண்க')}</span>
              </button>

              {/* In-App Falcon Chat */}
              <Link
                to="/messages"
                className="w-full bg-gray-100 hover:bg-gray-200 text-slate-800 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition text-xs"
              >
                <MessageSquare className="w-4 h-4 text-gray-600" />
                <span>{language === 'en' ? 'Start In-App Chat' : 'செயலியில் அரட்டை செய்க'}</span>
              </Link>
            </div>

            {/* Seller Information Card */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-black text-lg flex items-center justify-center">
                {ad.seller_name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">{ad.seller_name}</span>
                  {ad.is_verified_seller && (
                    <span title="Verified Seller">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">Member since 2023 • Verified Mobile</p>
                <Link to="/seller/profile" className="text-xs font-semibold text-emerald-600 hover:underline">
                  View all seller listings &rarr;
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

