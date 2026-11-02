import React from 'react';
import { 
  Users, 
  FileText, 
  IndianRupee, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Registered Users', value: '18,420', change: '+14.2%', icon: Users, color: 'emerald' },
    { title: 'Pending Moderation Ads', value: '42', change: '-8.5%', icon: Clock, color: 'amber' },
    { title: 'Monthly Gross Revenue', value: '₹1,24,450', change: '+22.8%', icon: IndianRupee, color: 'teal' },
    { title: 'Active Business Dealers', value: '64', change: '+5.4%', icon: TrendingUp, color: 'blue' }
  ];

  const recentAudits = [
    { id: 1, admin: 'Moderator_Karthik', action: 'Approved Listing #f101 (Hyundai Creta)', time: '4 mins ago', type: 'approval' },
    { id: 2, admin: 'Moderator_Priya', action: 'Rejected Listing #f109 (Duplicate listing)', time: '18 mins ago', type: 'rejection' },
    { id: 3, admin: 'SuperAdmin_Anand', action: 'Created dynamic field "battery_health" in Mobiles', time: '1 hour ago', type: 'config' },
    { id: 4, admin: 'Finance_Admin', action: 'Verified Razorpay webhook order_Oiqe2938 (₹999)', time: '2 hours ago', type: 'finance' }
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Business Control & Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time health monitor of Flacon Marketplace operations in Tamil Nadu.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{s.title}</span>
                <div className="p-2 rounded-xl bg-slate-700/60 text-emerald-400">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white tracking-tight">{s.value}</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center">
                  {s.change}
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Breakdown & Scenario Target */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Targets (from Falcon PRD) */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            <span>Monthly Revenue Streams</span>
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
              <span className="text-slate-300">Featured Ads (300 @ ₹99)</span>
              <span className="font-bold text-white">₹29,700</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
              <span className="text-slate-300">Premium Ads (150 @ ₹199)</span>
              <span className="font-bold text-white">₹29,850</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
              <span className="text-slate-300">Top Ads (50 @ ₹299)</span>
              <span className="font-bold text-white">₹14,950</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
              <span className="text-slate-300">Business Pro (50 @ ₹999/mo)</span>
              <span className="font-bold text-white">₹49,950</span>
            </div>
            <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-sm font-black">
              <span className="text-emerald-400">Total Run-rate:</span>
              <span className="text-emerald-400">₹1,24,450 / mo</span>
            </div>
          </div>
        </div>

        {/* Recent Admin Audit Activity */}
        <div className="lg:col-span-2 bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Live Administrative Audit Trail</span>
          </h2>
          <div className="divide-y divide-slate-700/60">
            {recentAudits.map((a) => (
              <div key={a.id} className="py-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="text-slate-200 font-semibold">{a.action}</div>
                  <div className="text-slate-400 text-[10px]">By {a.admin}</div>
                </div>
                <span className="text-slate-400 text-[11px] font-medium">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

