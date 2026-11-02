import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  PlusCircle, 
  User, 
  Globe, 
  Heart, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { TAMIL_NADU_DISTRICTS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  language: 'en' | 'ta';
  onToggleLanguage: () => void;
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  selectedDistrict,
  onSelectDistrict
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, isLoggedIn, setAuthModalOpen, favourites } = useAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Banner for Regional announcement & Pricing */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {language === 'en' 
                ? 'Flacon Marketplace: Fast, direct peer-to-peer buying and selling across Tamil Nadu' 
                : 'பிளாகான் சந்தை: தமிழ்நாடு முழுவதும் நேரடி கொள்முதல்/விற்பனை தளம்'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/pricing" className="text-amber-400 hover:underline flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'en' ? 'Promote Your Ad (From ₹99)' : 'விளம்பரத்தை முன்னிலைப்படுத்துக (₹99 முதல்)'}
            </Link>
            <button 
              onClick={onToggleLanguage}
              className="flex items-center gap-1 text-slate-200 hover:text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700 transition"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#558ba6] to-[#6ea4bf] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
              F
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                FLACON
                <span className="text-xs bg-[#dbeef5] text-[#1a3e52] font-bold px-1.5 py-0.5 rounded ml-1">TN</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium -mt-1 tracking-wider uppercase">
                {language === 'en' ? 'Buy • Sell • Connect' : 'வாங்கு • விற்பனை செய் • இணை'}
              </p>
            </div>
          </Link>

          {/* District Location Picker */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-lg px-2.5 py-2 bg-gray-50 hover:bg-gray-100 transition min-w-[170px]">
            <MapPin className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
            <select
              value={selectedDistrict}
              onChange={(e) => onSelectDistrict(e.target.value)}
              className="bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer w-full"
            >
              {TAMIL_NADU_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={
                  language === 'en' 
                    ? 'Search cars, mobiles, flats, bikes, jobs, furniture...' 
                    : 'கார்கள், மொபைல்கள், வீடுகள், பைக்குகள் தேடுக...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <button 
                type="submit"
                className="absolute right-1.5 p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Action Icons & Post Button */}
          <div className="flex items-center gap-3">
            <Link 
              to="/favourites" 
              className="relative hidden sm:flex p-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition"
              title="Saved Ads"
            >
              <Heart className="w-5 h-5" />
              {favourites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {favourites.length}
                </span>
              )}
            </Link>

            <Link 
              to="/messages" 
              className="hidden sm:flex p-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition"
              title="Chats"
            >
              <MessageSquare className="w-5 h-5" />
            </Link>

            {isLoggedIn ? (
              <Link 
                to="/account" 
                className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-emerald-600 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center">
                  {user?.fullName.charAt(0)}
                </div>
                <span className="hidden lg:inline">{user?.fullName.split(' ')[0]}</span>
              </Link>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-emerald-600 p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <User className="w-5 h-5" />
                <span className="hidden lg:inline">{language === 'en' ? 'Log In / OTP' : 'உள்நுழைக'}</span>
              </button>
            )}

            {/* Post an Ad CTA */}
            <Link
              to="/post-ad"
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition transform active:scale-95 text-sm"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>{language === 'en' ? '+ SELL' : '+ விற்க'}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

