import React, { useState } from 'react';
import { User, Phone, Globe, Shield, Trash2, LogOut, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AccountPageProps {
  language: 'en' | 'ta';
  onToggleLanguage: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ language, onToggleLanguage }) => {
  const { user, isLoggedIn, logout, deleteAccount, setAuthModalOpen } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-3xl border border-gray-200 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign in to your Flacon Account</h2>
        <p className="text-xs text-gray-500">
          Manage your advertisements, buyer inquiries, and favourite items with verified mobile access.
        </p>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition"
        >
          Sign In / Register with OTP
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Profile & Account Settings</h1>
        <p className="text-xs text-gray-500 mt-1">Manage your identity, language preference, and privacy.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-7 shadow-sm space-y-6">
        {/* User Card */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-2xl flex items-center justify-center shadow-inner">
              {user.fullName.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{user.fullName}</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>+91 {user.phone}</span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-xl transition font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Regional Preferences</h4>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Preferred Interface Language</span>
                <span className="text-[11px] text-gray-500">Currently active: {language === 'en' ? 'English' : 'தமிழ் (Tamil)'}</span>
              </div>
            </div>
            <button
              onClick={onToggleLanguage}
              className="text-xs bg-white border border-gray-300 font-bold px-3 py-1.5 rounded-xl text-slate-800 hover:bg-emerald-50 hover:border-emerald-500 transition"
            >
              Switch to {language === 'en' ? 'தமிழ்' : 'English'}
            </button>
          </div>
        </div>

        {/* Privacy & Account Deletion (Checklist requirement) */}
        <div className="pt-6 border-t border-gray-100 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Data Privacy & Account Controls</h4>
          <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-rose-900 block">Permanent Account & Data Deletion</span>
              <span className="text-[11px] text-rose-700 block">
                Permanently erase your active listings, chats, and mobile phone profile in compliance with data privacy standards.
              </span>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 flex-shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Account Deletion</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Are you sure you want to permanently delete your Flacon account associated with <strong>+91 {user.phone}</strong>? All your advertisements and chat logs will be removed immediately.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-xs text-gray-500 hover:text-gray-800 px-3 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteAccount();
                  setShowDeleteConfirm(false);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

