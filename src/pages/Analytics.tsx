import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const monthlyData = [
  { month: 'Oct', revenue: 8200000, users: 210, conversions: 142 },
  { month: 'Nov', revenue: 9800000, users: 280, conversions: 198 },
  { month: 'Dec', revenue: 11400000, users: 340, conversions: 254 },
  { month: 'Jan', revenue: 12900000, users: 410, conversions: 318 },
  { month: 'Feb', revenue: 14100000, users: 490, conversions: 389 },
  { month: 'Mar', revenue: 15600000, users: 560, conversions: 441 },
  { month: 'Apr', revenue: 16200000, users: 620, conversions: 510 },
];

const commissionByLevel = [
  { level: 'L1', amount: 1850000, count: 412 },
  { level: 'L2', amount: 620000, count: 198 },
  { level: 'L3', amount: 210000, count: 87 },
  { level: 'L4', amount: 130000, count: 54 },
  { level: 'L5', amount: 90000, count: 32 },
  { level: 'L6', amount: 40000, count: 18 },
];

const topReferrers = [
  { name: 'James Chen', referrals: 25, revenue: 81250, stage: 5 },
  { name: 'Lisa Wong', referrals: 18, revenue: 58500, stage: 4 },
  { name: 'John Doe', referrals: 12, revenue: 39000, stage: 3 },
  { name: 'Tom Wilson', referrals: 9, revenue: 29250, stage: 3 },
  { name: 'Emma Wilson', referrals: 7, revenue: 22750, stage: 2 },
];

const kpis = [
  { label: 'Total Revenue', value: '₦88.2M', change: '+24%', up: true, icon: DollarSign, color: '#F5820A', bg: 'rgba(245,130,10,0.1)' },
  { label: 'Total Users', value: '2,910', change: '+18%', up: true, icon: Users, color: '#0D2847', bg: 'rgba(13,40,71,0.1)' },
  { label: 'Conversion Rate', value: '82.3%', change: '+3.4%', up: true, icon: TrendingUp, color: '#1CB957', bg: 'rgba(28,185,87,0.1)' },
  { label: 'Avg. Revenue/User', value: '₦30.3K', change: '-2%', up: false, icon: DollarSign, color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
];

const fmt = (v: number) => `₦${(v / 1000000).toFixed(1)}M`;

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Analytics
        </h1>
        <p className="text-gray-500 text-sm">Platform performance overview — last 7 months</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: kpi.bg }}>
                <kpi.icon size={20} style={{ color: kpi.color }} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue vs Users chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="mb-5">
          <h2 className="font-bold text-gray-900 text-sm">Revenue & User Growth</h2>
          <p className="text-xs text-gray-500">Monthly revenue compared to new users</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tickFormatter={fmt} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={52} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={40} />
            <Tooltip
              formatter={(val: number, name: string) => [name === 'revenue' ? `₦${val.toLocaleString()}` : val, name === 'revenue' ? 'Revenue' : 'New Users']}
              contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#F5820A" strokeWidth={2.5} dot={{ fill: '#F5820A', r: 3 }} activeDot={{ r: 5 }} name="revenue" />
            <Line yAxisId="right" type="monotone" dataKey="users" stroke="#0D2847" strokeWidth={2.5} dot={{ fill: '#0D2847', r: 3 }} activeDot={{ r: 5 }} name="users" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Conversions + Commission by Level */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Trial → Paid Conversions</h2>
            <p className="text-xs text-gray-500">Monthly trial-to-subscription conversions</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1CB957" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1CB957" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={32} />
              <Tooltip formatter={(val: number) => [val, 'Conversions']} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Area type="monotone" dataKey="conversions" stroke="#1CB957" strokeWidth={2.5} fill="url(#convGrad)" dot={{ fill: '#1CB957', r: 3 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Commissions by Referral Level</h2>
            <p className="text-xs text-gray-500">Total payouts per level this period</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={commissionByLevel} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="level" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v: number) => `₦${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={48} />
              <Tooltip formatter={(val: number) => [`₦${val.toLocaleString()}`, 'Commissions']} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Bar dataKey="amount" fill="#F5820A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Referrers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-sm">Top Referrers</h2>
          <p className="text-xs text-gray-500 mt-0.5">Users generating the most revenue through referrals</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Rank', 'User', 'Stage', 'Total Referrals', 'Revenue Generated'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topReferrers.map((user, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white inline-flex ${i === 0 ? '' : i === 1 ? '' : ''}`}
                      style={{ background: i === 0 ? '#F5820A' : i === 1 ? '#94a3b8' : i === 2 ? '#b45309' : '#e5e7eb', color: i >= 3 ? '#6b7280' : 'white' }}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: '#0D2847' }}>
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">Stage {user.stage}</span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-sm">{user.referrals}</td>
                  <td className="px-5 py-4 font-bold text-sm" style={{ color: '#1CB957' }}>₦{user.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
