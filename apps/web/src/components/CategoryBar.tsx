import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Smartphone, 
  Home, 
  Armchair, 
  Wrench, 
  Briefcase, 
  Sparkles,
  Layers
} from 'lucide-react';
import { MOCK_CATEGORIES } from '../data/mockData';

interface CategoryBarProps {
  language: 'en' | 'ta';
  activeCategory?: string;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Car': return <Car className="w-5 h-5" />;
    case 'Smartphone': return <Smartphone className="w-5 h-5" />;
    case 'Home': return <Home className="w-5 h-5" />;
    case 'Armchair': return <Armchair className="w-5 h-5" />;
    case 'Wrench': return <Wrench className="w-5 h-5" />;
    case 'Briefcase': return <Briefcase className="w-5 h-5" />;
    default: return <Layers className="w-5 h-5" />;
  }
};

export const CategoryBar: React.FC<CategoryBarProps> = ({ language, activeCategory }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-sm font-medium">
          <Link
            to="/browse"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition ${
              !activeCategory 
                ? 'bg-emerald-600 text-white border-emerald-600' 
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'All Categories' : 'அனைத்து பிரிவுகள்'}</span>
          </Link>

          {MOCK_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <Link
                key={cat.id}
                to={`/browse?category=${cat.slug}`}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition ${
                  isActive 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-500 hover:text-emerald-700'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-emerald-600'}>
                  {getCategoryIcon(cat.icon)}
                </span>
                <span>{language === 'en' ? cat.name_en : cat.name_ta}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

