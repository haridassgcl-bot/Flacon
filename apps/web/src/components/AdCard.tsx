import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdCardProps {
  ad: {
    id: string;
    title: string;
    price: number;
    district: string;
    locality: string;
    date: string;
    image: string;
    is_featured?: boolean;
    is_top_ad?: boolean;
    is_verified_seller?: boolean;
    attributes?: Record<string, any>;
  };
  language: 'en' | 'ta';
}

export const AdCard: React.FC<AdCardProps> = ({ ad, language }) => {
  const { isFavourite, toggleFavourite } = useAuth();
  const saved = isFavourite(ad.id);
  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className={`group bg-white rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col relative ${ad.is_top_ad
        ? 'border-amber-400 ring-1 ring-amber-300'
        : ad.is_featured
          ? 'border-emerald-300'
          : 'border-gray-200 hover:border-gray-300'
      }`}>
      {/* Top badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {ad.is_top_ad && (
          <span className="bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-slate-950" />
            TOP AD
          </span>
        )}
        {ad.is_featured && !ad.is_top_ad && (
          <span className="bg-emerald-600 text-white font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded shadow">
            FEATURED
          </span>
        )}
      </div>

      {/* Favourite Button */}
      <button
        className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full shadow-sm backdrop-blur-sm transition ${saved
            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
            : 'bg-white/90 hover:bg-white text-gray-500 hover:text-rose-500'
          }`}
        title={saved ? 'Remove from Favourites' : 'Save to Favourites'}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavourite(ad.id);
        }}
      >
        <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Image Container */}
      <Link to={`/ad/${ad.id}`} className="relative h-48 w-full bg-gray-100 overflow-hidden block">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              {formatPrice(ad.price)}
            </span>
            {ad.is_verified_seller && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={`/ad/${ad.id}`}>
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-emerald-600 transition mb-2">
              {ad.title}
            </h3>
          </Link>

          {/* Dynamic Snippet info if available (e.g. 2021 • Diesel • 34,000 km) */}
          {ad.attributes && (
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-gray-500 mb-3">
              {ad.attributes.year && <span>{ad.attributes.year}</span>}
              {ad.attributes.km_driven && <span>• {ad.attributes.km_driven}</span>}
              {ad.attributes.fuel_type && <span>• {ad.attributes.fuel_type}</span>}
              {ad.attributes.bhk && <span>{ad.attributes.bhk}</span>}
              {ad.attributes.sqft && <span>• {ad.attributes.sqft}</span>}
              {ad.attributes.storage && <span>{ad.attributes.storage}</span>}
            </div>
          )}
        </div>

        {/* Location & Relative Time Footer */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-1 truncate max-w-[65%]">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{ad.locality}, {ad.district}</span>
          </div>
          <span className="flex-shrink-0 text-gray-400 font-medium">
            {ad.date}
          </span>
        </div>
      </div>
    </div>
  );
};

