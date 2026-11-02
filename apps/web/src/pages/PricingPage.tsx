import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, Zap, Building2, CheckCircle2 } from 'lucide-react';

interface PricingPageProps {
  language: 'en' | 'ta';
}

export const PricingPage: React.FC<PricingPageProps> = ({ language }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const adPacks = [
    {
      id: 'free',
      name: 'Free Seller',
      price: 0,
      duration: '30 Days',
      badge: 'Basic',
      color: 'gray',
      features: [
        '3 Active Advertisements',
        'Standard Search Ranking',
        'Direct Phone & WhatsApp Inquiry',
        'Basic Seller Profile',
        '30-day Listing Duration'
      ]
    },
    {
      id: 'featured',
      name: 'Featured Ad',
      price: 99,
      duration: '7 Days',
      badge: 'Popular',
      color: 'emerald',
      features: [
        'Highlighted Green Border & Badge',
        'Ranked above standard listings',
        '3x more buyer inquiries',
        '7 days of prime visibility',
        'Direct WhatsApp Click-to-Chat'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Ad',
      price: 199,
      duration: '15 Days',
      badge: 'Best Value',
      color: 'teal',
      features: [
        'Top Category Placement',
        'Featured in Homepage Carousel',
        'Gold Badge & Verified Tag',
        '15 days of extended promotion',
        'Instant SMS alerts on inquiry'
      ]
    },
    {
      id: 'top_ad',
      name: 'Top Ad',
      price: 299,
      duration: '30 Days',
      badge: 'Maximum Reach',
      color: 'amber',
      features: [
        'Absolute #1 Rank in District Searches',
        'Exclusive Top-of-Page Placement',
        '30 days priority ranking',
        'Highest response & fast sale',
        'Full analytics on views & clicks'
      ]
    }
  ];

  const businessPlans = [
    {
      id: 'biz_monthly',
      name: 'Business Pro Monthly',
      price: 999,
      period: '/ month',
      description: 'Ideal for local stores, vehicle dealers, and real estate consultants.',
      features: [
        'Up to 50 active listings simultaneously',
        'Official Verified Business Badge',
        'Dedicated Flacon Store URL (flacon.in/store/your-name)',
        'Direct WhatsApp button prominently displayed',
        'Detailed viewer insights & lead phone numbers',
        'Priority content moderation (Approved within 15 mins)'
      ]
    },
    {
      id: 'biz_annual',
      name: 'Business Pro Annual',
      price: 9999,
      period: '/ year',
      description: 'Best for volume dealers, retail franchises, and property promoters.',
      savings: 'Save ₹2,000 / year',
      features: [
        'Unlimited active listings',
        'Official Verified Business Gold Seal',
        '12 Free Featured Ad Vouchers (worth ₹1,188)',
        'Custom Brand Logo, Header & Google Maps location',
        'Dedicated Flacon Business Account Manager',
        'Export leads & customer CSVs'
      ]
    }
  ];

  const handleCheckout = (planId: string) => {
    setSelectedPlan(planId);
    setCheckoutModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span>Flacon Monetization & Paid Promotion Plans</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Accelerate Your Sales in Tamil Nadu
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Reach genuine local buyers faster with priority ad placement, or supercharge your commercial dealership with a Flacon Business subscription.
        </p>
      </div>

      {/* Part 1: Individual Ad Promotion Packages */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-extrabold text-slate-900">Per-Advertisement Promotion Packs</h2>
          </div>
          <span className="text-xs text-gray-500 font-medium">One-time purchase per listing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adPacks.map((pack) => (
            <div 
              key={pack.id}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg relative ${
                pack.id === 'top_ad' 
                  ? 'border-amber-400 ring-2 ring-amber-300' 
                  : pack.id === 'featured'
                    ? 'border-emerald-300 ring-1 ring-emerald-200'
                    : 'border-gray-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{pack.name}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    pack.id === 'top_ad' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {pack.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl font-black text-slate-900">₹{pack.price}</span>
                  <span className="text-xs text-gray-500">/ {pack.duration}</span>
                </div>

                <ul className="space-y-2.5 my-6 text-xs text-gray-600">
                  {pack.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleCheckout(pack.id)}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition ${
                  pack.price === 0 
                    ? 'bg-gray-100 hover:bg-gray-200 text-slate-800' 
                    : pack.id === 'top_ad'
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                }`}
              >
                {pack.price === 0 ? 'Current Default Plan' : `Upgrade for ₹${pack.price}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Falcon Business Dealer Subscriptions */}
      <div className="space-y-6 pt-6">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-extrabold text-slate-900">Flacon Business & Dealer Subscriptions</h2>
          </div>
          <span className="text-xs text-gray-500 font-medium">Billed monthly or annually</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {businessPlans.map((biz) => (
            <div 
              key={biz.id}
              className="bg-white rounded-2xl border-2 border-slate-900 p-8 flex flex-col justify-between shadow-md relative"
            >
              {biz.savings && (
                <span className="absolute -top-3 right-6 bg-emerald-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow">
                  {biz.savings}
                </span>
              )}

              <div>
                <h3 className="text-lg font-black text-slate-900">{biz.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{biz.description}</p>

                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-black text-slate-900">₹{biz.price}</span>
                  <span className="text-xs font-semibold text-gray-500">{biz.period}</span>
                </div>

                <ul className="space-y-3 my-6 text-xs text-gray-700">
                  {biz.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleCheckout(biz.id)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition shadow"
              >
                Subscribe via Razorpay &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Razorpay Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-sm">
                  F
                </div>
                <span className="font-extrabold text-slate-900 text-sm">Razorpay Secure Checkout</span>
              </div>
              <button 
                onClick={() => setCheckoutModalOpen(false)}
                className="text-xs text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Merchant:</span>
                <span className="font-bold text-slate-900">Flacon Marketplace TN</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Selected Package:</span>
                <span className="font-bold text-slate-900 capitalize">{selectedPlan?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-xs border-t border-gray-200 pt-2 font-bold">
                <span className="text-slate-800">Total Payable:</span>
                <span className="text-emerald-700 text-sm">
                  {selectedPlan === 'top_ad' ? '₹299' : selectedPlan === 'featured' ? '₹99' : selectedPlan === 'biz_monthly' ? '₹999' : '₹199'}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>Supported Payment Methods:</p>
              <div className="flex gap-2 text-[10px] font-semibold text-gray-700">
                <span className="bg-gray-100 px-2 py-1 rounded">UPI (GPay / PhonePe / Paytm)</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Credit/Debit Cards</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Net Banking</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Razorpay Order & Webhook Simulated: Promotion Activated Successfully!');
                setCheckoutModalOpen(false);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-xs shadow-md transition"
            >
              Simulate Successful Payment &rarr;
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

