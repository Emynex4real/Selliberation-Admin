import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, BookOpen, DollarSign, Wallet,
  Settings, LogOut, Menu, X, ChevronRight, BarChart3, TrendingUp, Megaphone,
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/users', icon: Users, label: 'Users', end: false },
  { to: '/courses', icon: BookOpen, label: 'Courses', end: false },
  { to: '/commissions', icon: DollarSign, label: 'Commissions', end: false },
  { to: '/withdrawals', icon: Wallet, label: 'Withdrawals', end: false },
  { to: '/analytics', icon: TrendingUp, label: 'Analytics', end: false },
  { to: '/announcements', icon: Megaphone, label: 'Announcements', end: false },
  { to: '/settings', icon: Settings, label: 'Settings', end: false },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F2F5' }}>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{ background: 'linear-gradient(180deg, #08192E 0%, #050F1C 100%)' }}
      >
        <div className="px-5 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,130,10,0.2)' }}>
              <BarChart3 size={16} style={{ color: '#F5820A' }} />
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-sm font-extrabold">
              <span className="text-white">Sell</span>
              <span style={{ color: '#F5820A' }}>iberation</span>
              <span className="ml-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: 'rgba(245,130,10,0.2)', color: '#F5820A' }}>ADMIN</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={({ isActive }) => isActive
                ? { background: 'rgba(245,130,10,0.15)', color: '#F5820A', borderLeft: '3px solid #F5820A' }
                : { color: 'rgba(255,255,255,0.6)' }
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} style={isActive ? { color: '#F5820A' } : {}} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight size={14} style={{ color: '#F5820A' }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {admin && (
            <div className="px-3 py-2 mb-2">
              <p className="text-xs text-white/40">Signed in as</p>
              <p className="text-sm text-white/80 font-medium truncate">{admin.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-colors hover:bg-red-500/10"
            style={{ color: 'rgba(255,120,120,0.8)' }}
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 lg:left-64 z-20 bg-white/95 backdrop-blur-sm"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', height: '60px' }}
      >
        <div className="flex items-center justify-between px-4 md:px-6 h-full">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <Menu size={20} />
            </button>
            <span className="text-sm font-semibold text-gray-500">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            {admin && (
              <span className="text-sm text-gray-600 hidden sm:block">{admin.name}</span>
            )}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: '#0D2847' }}>
              {admin?.name?.charAt(0) ?? 'A'}
            </div>
          </div>
        </div>
      </header>

      <main className="lg:ml-64 pt-15 min-h-screen">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
