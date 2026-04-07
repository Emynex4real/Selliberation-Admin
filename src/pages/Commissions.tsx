import { useState } from 'react';
import { Search, Download, DollarSign, Clock, CheckCircle } from 'lucide-react';

interface Commission {
  id: number;
  payer: string;
  beneficiary: string;
  level: number;
  amount: number;
  course: string;
  status: 'pending' | 'withdrawable' | 'withdrawn';
  date: string;
}

const initialCommissions: Commission[] = [
  { id: 1, payer: 'John Doe', beneficiary: 'Sarah Miller', level: 1, amount: 3250, course: 'First ₦50k', status: 'withdrawable', date: '2026-04-05' },
  { id: 2, payer: 'Mike Johnson', beneficiary: 'Lisa Wong', level: 2, amount: 750, course: 'WhatsApp', status: 'pending', date: '2026-04-05' },
  { id: 3, payer: 'Emma Wilson', beneficiary: 'David Brown', level: 1, amount: 3250, course: 'Affiliate', status: 'withdrawn', date: '2026-04-04' },
  { id: 4, payer: 'James Chen', beneficiary: 'John Doe', level: 3, amount: 250, course: 'Reselling', status: 'withdrawable', date: '2026-04-04' },
  { id: 5, payer: 'Lisa Wong', beneficiary: 'Sarah Miller', level: 1, amount: 3250, course: 'First ₦50k', status: 'pending', date: '2026-04-03' },
  { id: 6, payer: 'David Brown', beneficiary: 'Emma Wilson', level: 2, amount: 750, course: 'WhatsApp', status: 'withdrawn', date: '2026-04-03' },
];

const summaryStats = [
  { label: 'Total Commissions', value: '₦2.4M', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Pending', value: '₦450K', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { label: 'Withdrawable', value: '₦890K', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Paid Out', value: '₦1.1M', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-100' },
];

export default function Commissions() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = initialCommissions.filter(c => {
    const matchSearch = c.payer.toLowerCase().includes(search.toLowerCase()) || c.beneficiary.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (filter === 'all' || c.status === filter);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Commissions</h1>
          <p className="text-gray-500 text-sm">Track all commission transactions</p>
        </div>
        <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {summaryStats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={stat.color} size={20} />
              </div>
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-1.5">
            {['all', 'pending', 'withdrawable', 'withdrawn'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  filter === f ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={filter === f ? { background: '#F5820A' } : {}}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-52"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Date', 'Payer', 'Beneficiary', 'Level', 'Course', 'Amount', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-gray-500 text-sm">{c.date}</td>
                  <td className="px-5 py-4 font-medium text-sm">{c.payer}</td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{c.beneficiary}</td>
                  <td className="px-5 py-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Level {c.level}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{c.course}</td>
                  <td className="px-5 py-4 font-bold text-sm" style={{ color: '#1CB957' }}>₦{c.amount.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${
                      c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      c.status === 'withdrawable' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {c.status === 'pending' && <Clock size={11} />}
                      {(c.status === 'withdrawable' || c.status === 'withdrawn') && <CheckCircle size={11} />}
                      {c.status}
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
