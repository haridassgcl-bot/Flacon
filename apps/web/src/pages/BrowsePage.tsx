import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { MOCK_LISTINGS, MOCK_CATEGORIES, TAMIL_NADU_DISTRICTS } from '../data/mockData';
import { AdCard } from '../components/AdCard';

interface BrowsePageProps {
  language: 'en' | 'ta';
}

export const BrowsePage: React.FC<BrowsePageProps> = ({ language }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const districtParam = searchParams.get('district') || '';
  const featuredParam = searchParams.get('featured') === 'true';

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  // Filter listings
  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter(ad => {
      // Search text filter
      if (queryParam) {
        const text = `${ad.title} ${ad.description} ${ad.category} ${ad.locality}`.toLowerCase();
        if (!text.includes(queryParam.toLowerCase())) return false;
      }

      // Category filter
      if (categoryParam) {
        const catObj = MOCK_CATEGORIES.find(c => c.slug === categoryParam);
        if (catObj && ad.category !== catObj.name_en) return false;
      }

      // District filter
      if (districtParam && districtParam !== 'All Tamil Nadu') {
        if (ad.district.toLowerCase() !== districtParam.toLowerCase()) return false;
      }

      // Price filter
      if (minPrice && ad.price < Number(minPrice)) return false;
      if (maxPrice && ad.price > Number(maxPrice)) return false;

      // Condition filter
      if (selectedCondition && ad.condition !== selectedCondition) return false;

      // Featured filter
      if (featuredParam && !ad.is_featured && !ad.is_top_ad) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      // Default: top ads first, then featured
      if (a.is_top_ad !== b.is_top_ad) return a.is_top_ad ? -1 : 1;
      return 0;
    });
  }, [queryParam, categoryParam, districtParam, featuredParam, minPrice, maxPrice, selectedCondition, sortBy]);

  const clearFilters = () => {
    setSearchParams({});
    setMinPrice('');
    setMaxPrice('');
    setSelectedCondition('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-200 mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {categoryParam 
              ? `${MOCK_CATEGORIES.find(c => c.slug === categoryParam)?.name_en || categoryParam} in Tamil Nadu` 
              : queryParam 
                ? `Results for "${queryParam}"` 
                : 'All Classifieds in Tamil Nadu'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showing {filteredListings.length} verified listings
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold self-end sm:self-auto">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="newest">Featured & Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="space-y-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              Filters
            </span>
            <button 
              onClick={clearFilters}
              className="text-xs text-emerald-600 hover:underline font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* District Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Location / District</label>
            <select
              value={districtParam || 'All Tamil Nadu'}
              onChange={(e) => {
                const val = e.target.value;
                const next = new URLSearchParams(searchParams);
                if (val === 'All Tamil Nadu') next.delete('district');
                else next.set('district', val);
                setSearchParams(next);
              }}
              className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:outline-none"
            >
              {TAMIL_NADU_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Category</label>
            <div className="space-y-1">
              <button
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  next.delete('category');
                  setSearchParams(next);
                }}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition ${
                  !categoryParam ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Categories
              </button>
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    const next = new URLSearchParams(searchParams);
                    next.set('category', cat.slug);
                    setSearchParams(next);
                  }}
                  className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition ${
                    categoryParam === cat.slug 
                      ? 'bg-emerald-50 text-emerald-700 font-bold' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{language === 'en' ? cat.name_en : cat.name_ta}</span>
                  {categoryParam === cat.slug && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Price Range (₹)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 text-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Item Condition</label>
            <div className="space-y-1.5 text-xs text-gray-600">
              {['new', 'like_new', 'used_good'].map((c) => (
                <label key={c} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    checked={selectedCondition === c}
                    onChange={() => setSelectedCondition(selectedCondition === c ? '' : c)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="capitalize">{c.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Only Toggle */}
          <div className="pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={featuredParam}
                onChange={(e) => {
                  const next = new URLSearchParams(searchParams);
                  if (e.target.checked) next.set('featured', 'true');
                  else next.delete('featured');
                  setSearchParams(next);
                }}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Featured & Top Ads only</span>
            </label>
          </div>
        </aside>

        {/* Listings Grid */}
        <main className="lg:col-span-3">
          {filteredListings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No advertisements match your filters</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Try widening your price range, choosing another district, or resetting the filters to see all available items.
              </p>
              <button
                onClick={clearFilters}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((ad) => (
                <AdCard key={ad.id} ad={ad} language={language} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

