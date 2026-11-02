import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, HelpCircle, FileText } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'ta';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-16 border-t border-slate-800">
      {/* Trust Highlights */}
      <div className="border-b border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">
                {language === 'en' ? 'Direct Buyer-Seller Deals' : 'நேரடி கொள்முதல் மற்றும் விற்பனை'}
              </h4>
              <p className="text-xs text-slate-400">Zero middlemen commission. Chat or call directly.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">
                {language === 'en' ? 'Verified Tamil Nadu Community' : 'சரிபார்க்கப்பட்ட பயனர் சமூகம்'}
              </h4>
              <p className="text-xs text-slate-400">Mobile OTP verified accounts across all 38 districts.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold">
                {language === 'en' ? 'Moderated & Safe' : 'பாதுகாப்பான விளம்பரங்கள்'}
              </h4>
              <p className="text-xs text-slate-400">Human & automated moderation to prevent fraud.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#6ea4bf] flex items-center justify-center text-slate-950 font-black">
              F
            </div>
            <span className="text-xl font-black text-white tracking-tight">FLACON</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Tamil Nadu's dedicated peer-to-peer classifieds marketplace. Buy. Sell. Connect. Connecting local buyers and sellers across Chennai, Coimbatore, Madurai, Trichy, and beyond.
          </p>
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Flacon Marketplace. All rights reserved.
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Popular Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/browse?category=cars-bikes" className="hover:text-emerald-400 transition">Cars & Bikes in TN</Link></li>
            <li><Link to="/browse?category=electronics" className="hover:text-emerald-400 transition">Used Mobiles & Laptops</Link></li>
            <li><Link to="/browse?category=property" className="hover:text-emerald-400 transition">Flats & Land for Sale</Link></li>
            <li><Link to="/browse?category=home-furniture" className="hover:text-emerald-400 transition">Home Furniture & Sofas</Link></li>
            <li><Link to="/browse?category=jobs-business" className="hover:text-emerald-400 transition">Local Jobs & Drivers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Top Locations</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/browse?district=Chennai" className="hover:text-emerald-400 transition">Chennai (Anna Nagar, OMR, Velachery)</Link></li>
            <li><Link to="/browse?district=Coimbatore" className="hover:text-emerald-400 transition">Coimbatore (RS Puram, Gandhipuram)</Link></li>
            <li><Link to="/browse?district=Madurai" className="hover:text-emerald-400 transition">Madurai (KK Nagar, Anna Nagar)</Link></li>
            <li><Link to="/browse?district=Tiruchirappalli" className="hover:text-emerald-400 transition">Tiruchirappalli (Thillai Nagar)</Link></li>
            <li><Link to="/browse?district=Salem" className="hover:text-emerald-400 transition">Salem & Tiruppur</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Flacon Business</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/pricing" className="hover:text-emerald-400 transition font-medium text-amber-400">Premium Advertisement Plans</Link></li>
            <li><Link to="/pricing" className="hover:text-emerald-400 transition">Business Subscription (₹999/mo)</Link></li>
            <li><Link to="/help" className="hover:text-emerald-400 transition">Safety Tips & Help Center</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400 transition">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

