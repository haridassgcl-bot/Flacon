import React, { useState } from 'react';
import { Check, X, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PendingAd {
  id: string;
  title: string;
  price: number;
  category: string;
  seller: string;
  phone: string;
  location: string;
  time: string;
  image: string;
}

export const ModerationQueue: React.FC = () => {
  const [pendingAds, setPendingAds] = useState<PendingAd[]>([
    {
      id: 'f-mod-1',
      title: '2022 Royal Enfield Meteor 350 Fireball Yellow with touring seat',
      price: 185000,
      category: 'Cars & Bikes > Motorcycles',
      seller: 'Vasanth Raman',
      phone: '+91 98401 55443',
      location: 'Coimbatore, Peelamedu',
      time: '12 minutes ago',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'f-mod-2',
      title: 'Sony PlayStation 5 Disc Edition with 2 DualSense Controllers & FIFA 24',
      price: 42000,
      category: 'Electronics > Gaming',
      seller: 'Praveen K',
      phone: '+91 97890 22114',
      location: 'Chennai, Adyar',
      time: '25 minutes ago',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'f-mod-3',
      title: 'Brand New Solid Wood Corner Sofa Set (Custom Fabric)',
      price: 19500,
      category: 'Home & Furniture > Sofas',
      seller: 'Madurai Craft Works',
      phone: '+91 94433 88771',
      location: 'Madurai, Simmakkal',
      time: '45 minutes ago',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80'
    }
  ]);

  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Duplicate listing / spam');

  const handleApprove = (id: string) => {
    setPendingAds(prev => prev.filter(item => item.id !== id));
    alert(`Listing #${id} approved successfully and published to live search.`);
  };

  const handleRejectConfirm = () => {
    if (rejectingId) {
      setPendingAds(prev => prev.filter(item => item.id !== rejectingId));
      alert(`Listing #${rejectingId} rejected for reason: "${rejectReason}". Seller notified.`);
      setRejectingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Content Moderation Queue</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review and approve pending advertisements before public visibility.
          </p>
        </div>
        <div className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1.5 rounded-xl">
          {pendingAds.length} Ads Awaiting Review
        </div>
      </div>

      {pendingAds.length === 0 ? (
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-12 text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">All Clear!</h3>
          <p className="text-xs text-slate-400">There are no pending advertisements requiring moderation at this time.</p>
        </div>
      ) : (
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-700/60">
            {pendingAds.map((ad) => (
              <div key={ad.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-750 transition">
                <div className="flex items-start gap-4">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      {ad.category}
                    </span>
                    <h3 className="text-sm font-bold text-white max-w-xl">{ad.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="font-extrabold text-white text-sm">₹{ad.price.toLocaleString('en-IN')}</span>
                      <span>• Seller: <strong className="text-slate-300">{ad.seller}</strong> ({ad.phone})</span>
                      <span>• Location: {ad.location}</span>
                      <span>• Submitted: {ad.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                  <button
                    onClick={() => handleApprove(ad.id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => setRejectingId(ad.id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-bold text-xs px-4 py-2 rounded-xl transition"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Reject Advertisement Reason</span>
            </div>

            <p className="text-xs text-slate-400">
              Select the policy violation reason that will be sent via SMS/Notification to the seller:
            </p>

            <select
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2.5 text-xs focus:outline-none"
            >
              <option value="Duplicate listing / spam">Duplicate listing / spam</option>
              <option value="Prohibited or restricted item">Prohibited or restricted item (e.g. prescription medicines, weapons)</option>
              <option value="Unrealistic or misleading price">Unrealistic or misleading price</option>
              <option value="Low quality or inappropriate photos">Low quality or inappropriate photos</option>
              <option value="Copyright infringement">Copyright infringement / counterfeit product</option>
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectingId(null)}
                className="text-xs text-slate-400 hover:text-white px-3 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectConfirm}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

