import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { MOCK_LISTINGS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { AdCard } from '../components/AdCard';

export const FavouritesPage: React.FC = () => {
  const { favourites, toggleFavourite } = useAuth();

  const savedAds = MOCK_LISTINGS.filter(ad => favourites.includes(ad.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Saved Advertisements</h1>
          <p className="text-xs text-gray-500 mt-1">
            Track and compare your favourite vehicles, electronics, and properties across Tamil Nadu.
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {savedAds.length} Items Saved
        </span>
      </div>

      {savedAds.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No favourites saved yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Click the heart icon on any product or car while browsing to save it for quick access later.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition"
          >
            <span>Explore All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedAds.map((ad) => (
            <div key={ad.id} className="relative group">
              <AdCard ad={ad} language="en" />
              <button
                onClick={() => toggleFavourite(ad.id)}
                className="absolute bottom-4 right-4 z-20 p-2 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg border border-gray-200 shadow-sm transition"
                title="Remove from saved"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

