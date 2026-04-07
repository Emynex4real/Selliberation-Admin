import { useState } from 'react';
import { Plus, Send, Trash2, Users, BookOpen, Bell, X, Save, Megaphone } from 'lucide-react';

type AudienceType = 'all' | 'active' | 'trial' | 'expired';
type ChannelType = 'in-app' | 'email' | 'both';

interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: AudienceType;
  channel: ChannelType;
  status: 'draft' | 'sent';
  sentAt?: string;
  createdAt: string;
}

const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    title: '🎉 New Course Available: Advanced WhatsApp Marketing',
    body: 'We\'ve just launched our most requested course. Learn how to build a 6-figure income using WhatsApp marketing strategies used by top earners.',
    audience: 'active',
    channel: 'both',
    status: 'sent',
    sentAt: '2026-04-04 10:30',
    createdAt: '2026-04-04',
  },
  {
    id: '2',
    title: '⚠️ Your trial ends in 2 days',
    body: 'Don\'t lose access to all your courses and commission earnings. Upgrade to a full subscription today for just ₦5,000/month.',
    audience: 'trial',
    channel: 'email',
    status: 'sent',
    sentAt: '2026-04-05 08:00',
    createdAt: '2026-04-05',
  },
  {
    id: '3',
    title: 'April Commission Payouts Processed',
    body: 'All April commission withdrawals have been processed and sent to your bank accounts. Check your balance for confirmation.',
    audience: 'all',
    channel: 'in-app',
    status: 'draft',
    createdAt: '2026-04-06',
  },
];

const audienceOptions: { value: AudienceType; label: string }[] = [
  { value: 'all', label: 'All Users' },
  { value: 'active', label: 'Active Subscribers' },
  { value: 'trial', label: 'Trial Users' },
  { value: 'expired', label: 'Expired Users' },
];

const channelOptions: { value: ChannelType; label: string }[] = [
  { value: 'in-app', label: 'In-App Only' },
  { value: 'email', label: 'Email Only' },
  { value: 'both', label: 'Both Channels' },
];

const audienceColor = (a: AudienceType) => ({
  all: 'bg-blue-100 text-blue-700',
  active: 'bg-green-100 text-green-700',
  trial: 'bg-yellow-100 text-yellow-700',
  expired: 'bg-red-100 text-red-700',
}[a]);

const audienceIcon = (a: AudienceType) => ({
  all: Users,
  active: Users,
  trial: Bell,
  expired: BookOpen,
}[a]);

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'sent' | 'draft'>('all');

  const [form, setForm] = useState({
    title: '',
    body: '',
    audience: 'all' as AudienceType,
    channel: 'both' as ChannelType,
  });

  const filtered = announcements.filter(a => filter === 'all' || a.status === filter);

  const resetForm = () => setForm({ title: '', body: '', audience: 'all', channel: 'both' });

  const openModal = () => { resetForm(); setShowModal(true); };

  const handleSave = (sendNow: boolean) => {
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      ...form,
      status: sendNow ? 'sent' : 'draft',
      sentAt: sendNow ? new Date().toLocaleString() : undefined,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const handleSendDraft = (id: string) => {
    setAnnouncements(announcements.map(a =>
      a.id === id ? { ...a, status: 'sent', sentAt: new Date().toLocaleString() } : a
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Announcements
          </h1>
          <p className="text-gray-500 text-sm">Send notifications and messages to your users</p>
        </div>
        <button
          onClick={openModal}
          className="text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg"
          style={{ background: '#F5820A', boxShadow: '0 4px 20px rgba(245,130,10,0.3)' }}
        >
          <Plus size={18} /> New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: announcements.length, icon: Megaphone, color: 'text-gray-700', bg: 'bg-gray-100' },
          { label: 'Sent', value: announcements.filter(a => a.status === 'sent').length, icon: Send, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Drafts', value: announcements.filter(a => a.status === 'draft').length, icon: Save, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 p-4 sm:p-5">
            <div className={`w-10 h-10 sm:w-11 sm:h-11 ${stat.bg} rounded-xl flex items-center justify-center shrink-0`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5">
        {(['all', 'sent', 'draft'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
              filter === f ? 'text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
            style={filter === f ? { background: '#F5820A' } : {}}
          >
            {f} {f !== 'all' && `(${announcements.filter(a => a.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Announcements list */}
      <div className="space-y-3">
        {filtered.map(ann => {
          const AudIcon = audienceIcon(ann.audience);
          return (
            <div key={ann.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,130,10,0.1)' }}>
                    <AudIcon size={18} style={{ color: '#F5820A' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{ann.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        ann.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {ann.status === 'sent' ? '✓ Sent' : '✎ Draft'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{ann.body}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${audienceColor(ann.audience)}`}>
                        {audienceOptions.find(a => a.value === ann.audience)?.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {channelOptions.find(c => c.value === ann.channel)?.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {ann.sentAt ? `Sent ${ann.sentAt}` : `Created ${ann.createdAt}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {ann.status === 'draft' && (
                    <button
                      onClick={() => handleSendDraft(ann.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-green-500 hover:bg-green-600"
                    >
                      <Send size={13} /> Send
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(ann.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Megaphone size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No {filter !== 'all' ? filter : ''} announcements yet</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">New Announcement</h3>
              <button onClick={() => setShowModal(false)}>
                <X size={22} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="e.g., 🎉 New course available!"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  value={form.body}
                  onChange={e => setForm({ ...form, body: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  rows={4}
                  placeholder="Write your announcement here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Audience</label>
                  <select
                    value={form.audience}
                    onChange={e => setForm({ ...form, audience: e.target.value as AudienceType })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {audienceOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Channel</label>
                  <select
                    value={form.channel}
                    onChange={e => setForm({ ...form, channel: e.target.value as ChannelType })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {channelOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => handleSave(false)}
                disabled={!form.title.trim()}
                className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm hover:bg-gray-50 flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Save size={15} /> Save as Draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={!form.title.trim() || !form.body.trim()}
                className="flex-1 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
                style={{ background: '#F5820A' }}
              >
                <Send size={15} /> Send Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
