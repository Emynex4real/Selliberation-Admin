import { Link } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Users, DollarSign, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, AlertCircle } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,458', change: '+12%', up: true, icon: Users, color: '#F5820A', bg: 'rgba(245,130,10,0.1)' },
  { label: 'Active Subscribers', value: '3,245', change: '+8%', up: true, icon: DollarSign, color: '#1CB957', bg: 'rgba(28,185,87,0.1)' },
  { label: 'Monthly Revenue', value: '₦16.2M', change: '+24%', up: true, icon: TrendingUp, color: '#0D2847', bg: 'rgba(13,40,71,0.1)' },
  { label: 'Pending Withdrawals', value: '₦450K', change: '-5%', up: false, icon: Wallet, color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
];

const revenueData = [
  { month: 'Oct', revenue: 8200000, users: 210 },
  { month: 'Nov', revenue: 9800000, users: 280 },
  { month: 'Dec', revenue: 11400000, users: 340 },
  { month: 'Jan', revenue: 12900000, users: 410 },
  { month: 'Feb', revenue: 14100000, users: 490 },
  { month: 'Mar', revenue: 15600000, users: 560 },
  { month: 'Apr', revenue: 16200000, users: 620 },
];

const commissionData = [
  { level: 'L1', amount: 1850000 },
  { level: 'L2', amount: 620000 },
  { level: 'L3', amount: 210000 },
  { level: 'L4', amount: 130000 },
  { level: 'L5', amount: 90000 },
  { level: 'L6', amount: 40000 },
];

const subscriptionData = [
  { name: 'Active', value: 3245, color: '#1CB957' },
  { name: 'Trial', value: 5820, color: '#F5820A' },
  { name: 'Expired', value: 3393, color: '#EF4444' },
];

const recentUsers = [
  { name: 'John Doe', email: 'john@example.com', date: '2026-04-05', status: 'active' },
  { name: 'Sarah Miller', email: 'sarah@example.com', date: '2026-04-05', status: 'trial' },
  { name: 'Mike Johnson', email: 'mike@example.com', date: '2026-04-04', status: 'active' },
  { name: 'Lisa Wong', email: 'lisa@example.com', date: '2026-04-04', status: 'active' },
  { name: 'David Brown', email: 'david@example.com', date: '2026-04-03', status: 'trial' },
];

const recentPayments = [
  { user: 'John Doe', amount: 5000, date: '2026-04-05' },
  { user: 'Sarah Miller', amount: 5000, date: '2026-04-05' },
  { user: 'Mike Johnson', amount: 5000, date: '2026-04-04' },
  { user: 'Lisa Wong', amount: 5000, date: '2026-04-04' },
];

const pendingWithdrawals = [
  { user: 'John Doe', amount: 15000 },
  { user: 'Mike Johnson', amount: 8000 },
];

const formatNaira = (value: number) => `₦${(value / 1000000).toFixed(1)}M`;

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">Platform overview — April 2026</p>
      </div>

      {/* Stat cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pending withdrawals alert */}
      {pendingWithdrawals.length > 0 && (
        <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(245,130,10,0.08)', border: '1px solid rgba(245,130,10,0.25)' }}>
          <AlertCircle size={20} className="shrink-0" style={{ color: '#F5820A' }} />
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: '#c26200' }}>
              {pendingWithdrawals.length} withdrawal requests pending review
            </p>
            <p className="text-xs" style={{ color: '#d97706' }}>
              Total: ₦{pendingWithdrawals.reduce((s, w) => s + w.amount, 0).toLocaleString()} awaiting your approval
            </p>
          </div>
          <Link to="/withdrawals" className="px-4 py-2 rounded-lg text-sm font-semibold text-white shrink-0" style={{ background: '#F5820A' }}>
            Review Now
          </Link>
        </div>
      )}

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Revenue Trend</h2>
              <p className="text-xs text-gray-500">Monthly revenue (last 7 months)</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
              <ArrowUpRight size={11} /> +24% vs last month
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5820A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F5820A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatNaira} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={50} />
              <Tooltip formatter={(val) => [`₦${Number(val).toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#F5820A" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ fill: '#F5820A', r: 3 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Subscriptions</h2>
            <p className="text-xs text-gray-500">Current status breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={subscriptionData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {subscriptionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(val) => [Number(val).toLocaleString(), '']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {subscriptionData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-900">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900 text-sm">New User Growth</h2>
            <p className="text-xs text-gray-500">Monthly new signups</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D2847" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0D2847" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip formatter={(val) => [val, 'New Users']} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Area type="monotone" dataKey="users" stroke="#0D2847" strokeWidth={2.5} fill="url(#userGrad)" dot={{ fill: '#0D2847', r: 3 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Commission by Level</h2>
            <p className="text-xs text-gray-500">Total payouts per referral level</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={commissionData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="level" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v: number) => `₦${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={46} />
              <Tooltip formatter={(val) => [`₦${Number(val).toLocaleString()}`, 'Commissions']} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {commissionData.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? '#F5820A' : i === 1 ? '#0D2847' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-sm">Recent Signups</h2>
            <Link to="/users" className="text-xs font-medium hover:underline" style={{ color: '#F5820A' }}>View All</Link>
          </div>
          {/* Mobile card layout */}
          <div className="sm:hidden divide-y divide-gray-100">
            {recentUsers.map((u, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: '#0D2847' }}>
                    {u.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{u.name}</p>
                    <p className="text-xs text-gray-400">{u.date}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {u.status}
                </span>
              </div>
            ))}
          </div>
          {/* Desktop table */}
          <table className="hidden sm:table w-full">
            <thead className="bg-gray-50">
              <tr>
                {['User', 'Date', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentUsers.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#0D2847' }}>
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">{u.date}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-sm">Recent Payments</h2>
            <Link to="/commissions" className="text-xs font-medium hover:underline" style={{ color: '#F5820A' }}>View All</Link>
          </div>
          {/* Mobile card layout */}
          <div className="sm:hidden divide-y divide-gray-100">
            {recentPayments.map((p, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.user}</p>
                  <p className="text-xs text-gray-400">{p.date}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold" style={{ color: '#1CB957' }}>₦{p.amount.toLocaleString()}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                    <Clock size={10} /> Success
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop table */}
          <table className="hidden sm:table w-full">
            <thead className="bg-gray-50">
              <tr>
                {['User', 'Amount', 'Date', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentPayments.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm font-medium">{p.user}</td>
                  <td className="px-5 py-3 text-sm font-bold" style={{ color: '#1CB957' }}>₦{p.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-xs text-gray-500">{p.date}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                      <Clock size={10} /> Success
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
