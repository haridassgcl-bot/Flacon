import React, { useState } from 'react';
import { X, Phone, Lock, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, login } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!authModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '1234' && otp.length < 4) {
      setError('Please enter the 4-digit OTP (Test code: 1234).');
      return;
    }
    setError('');
    login(phoneNumber, fullName || 'Flacon Member');
    setStep('phone');
    setPhoneNumber('');
    setOtp('');
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-gray-100 max-w-md w-full p-7 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#558ba6] to-[#6ea4bf] flex items-center justify-center text-white font-black text-xl shadow-md">
            F
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Flacon Account</h2>
            <p className="text-xs text-gray-500">Buy, sell & connect directly with verified phone numbers</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Step 1: Phone input */}
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Mobile Number (Tamil Nadu & India)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-xs font-bold text-gray-500">+91</span>
                <input
                  type="tel"
                  required
                  placeholder="98401 23456"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Your Full Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Karthik Raja"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Send 4-Digit OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[11px] text-gray-500 justify-center pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>We never share your mobile number without your permission</span>
            </div>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5 text-center">
              <p className="text-xs text-gray-600">
                We sent a 4-digit verification code to <strong className="text-slate-900">+91 {phoneNumber}</strong>
              </p>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-[11px] text-emerald-600 hover:underline font-semibold"
              >
                Change mobile number
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider text-center block">
                Enter Verification Code
              </label>
              <input
                type="text"
                maxLength={4}
                required
                autoFocus
                placeholder="• • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center text-2xl font-black tracking-widest py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 focus:bg-white"
              />
            </div>

            <button
              type="button"
              onClick={() => setOtp('1234')}
              className="w-full py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-lg border border-amber-200 transition"
            >
              Demo Auto-Fill OTP (1234)
            </button>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Verify & Log In</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

