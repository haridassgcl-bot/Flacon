import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Layers, 
  Users, 
  IndianRupee, 
  FileText, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { ModerationQueue } from './pages/ModerationQueue';
import { CategoryFieldBuilder } from './pages/CategoryFieldBuilder';

function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard & Metrics', path: '/', icon: LayoutDashboard },
    { name: 'Moderation Queue', path: '/moderation', icon: ShieldCheck, badge: '3' },
    { name: 'Dynamic Category Builder', path: '/category-builder', icon: Layers },
    { name: 'User Management', path: '/users', icon: Users },
    { name: 'Payments & Plans', path: '/payments', icon: IndianRupee },
    { name: 'Audit Logs', path: '/audit-logs', icon: FileText }
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0">
        <div className="space-y-6">
          
          {/* Admin Brand */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#558ba6] to-[#6ea4bf] flex items-center justify-center font-black text-white text-lg">
              F
            </div>
            <div>
              <div className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                FLACON
                <span className="text-[10px] bg-[#6ea4bf]/20 text-[#6ea4bf] font-bold px-1.5 py-0.2 rounded border border-[#6ea4bf]/30">
                  ADMIN
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Control Center</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Site link */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium transition"
          >
            <span>Open Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>

          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-emerald-400 border border-slate-700">
              SA
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">Super Admin</div>
              <div className="text-[10px] text-slate-500">Tamil Nadu Region</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/moderation" element={<ModerationQueue />} />
          <Route path="/category-builder" element={<CategoryFieldBuilder />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>

    </div>
  );
}

export function App() {
  return (
    <Router basename="/admin">
      <AdminLayout />
    </Router>
  );
}

export default App;

