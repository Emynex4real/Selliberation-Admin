import { useState, useEffect } from 'react';
import { Save, CreditCard, DollarSign, Eye, EyeOff, Bell, Globe, Shield } from 'lucide-react';
import type { PlatformSettings } from '../types';

const defaultSettings: PlatformSettings = {
  paystack: { publicKey: '', secretKey: '', planId: '' },
  bank: { bankName: '', accountNumber: '', accountName: '' },
  commissions: { level1: 65, level2: 15, level3: 5, level4: 3, level5: 2, level6: 1 },
  general: { trialDays: 7, minWithdrawal: 10000, subscriptionPrice: 5000, platformName: 'Selliberation', supportEmail: 'support@selliberation.com' },
};

const tabs = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'paystack', label: 'Paystack', icon: CreditCard },
  { id: 'bank', label: 'Bank Account', icon: Shield },
  { id: 'commissions', label: 'Commissions', icon: DollarSign },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function Settings() {
  const [settings, setSettings] = useState<PlatformSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [showKeys, setShowKeys] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('selliberation_platform_settings');
    if (stored) setSettings(JSON.parse(stored) as PlatformSettings);
  }, []);

  const handleSave = () => {
    localStorage.setItem('selliberation_platform_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = <S extends keyof PlatformSettings>(section: S, field: string, value: string | number) => {
    setSettings(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:border-amber-500 text-sm";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Platform Settings</h1>
          <p className="text-gray-500 text-sm">Configure your platform settings</p>
        </div>
        <button
          onClick={handleSave}
          className="text-white font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-lg"
          style={{ background: '#F5820A', boxShadow: '0 4px 20px rgba(245,130,10,0.3)' }}
        >
          <Save size={17} /> Save All Changes
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
          <Save size={16} /> Settings saved successfully!
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-sm ${
                  activeTab === tab.id ? 'font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={activeTab === tab.id ? { background: 'rgba(245,130,10,0.08)', color: '#F5820A' } : {}}
              >
                <tab.icon size={17} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-base font-bold">General Settings</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Platform Name</label>
                  <input className={inputClass} value={settings.general.platformName} onChange={e => update('general', 'platformName', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Support Email</label>
                  <input type="email" className={inputClass} value={settings.general.supportEmail} onChange={e => update('general', 'supportEmail', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Trial Duration (days)</label>
                  <input type="number" className={inputClass} value={settings.general.trialDays} onChange={e => update('general', 'trialDays', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subscription Price (₦/month)</label>
                  <input type="number" className={inputClass} value={settings.general.subscriptionPrice} onChange={e => update('general', 'subscriptionPrice', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Minimum Withdrawal (₦)</label>
                  <input type="number" className={inputClass} value={settings.general.minWithdrawal} onChange={e => update('general', 'minWithdrawal', parseInt(e.target.value))} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'paystack' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
              <h2 className="text-base font-bold">Paystack Integration</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                Create your Paystack account at paystack.com and get your API keys from the developer settings.
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Public Key</label>
                <input className={inputClass + ' font-mono'} value={settings.paystack.publicKey} onChange={e => update('paystack', 'publicKey', e.target.value)} placeholder="pk_live_xxxxxxxxxxxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Secret Key</label>
                <div className="relative">
                  <input type={showKeys ? 'text' : 'password'} className={inputClass + ' font-mono pr-12'} value={settings.paystack.secretKey} onChange={e => update('paystack', 'secretKey', e.target.value)} placeholder="sk_live_xxxxxxxxxxxxx" />
                  <button type="button" onClick={() => setShowKeys(!showKeys)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showKeys ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Plan ID</label>
                <input className={inputClass + ' font-mono'} value={settings.paystack.planId} onChange={e => update('paystack', 'planId', e.target.value)} placeholder="PLN_xxxxxxxxxxxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Webhook URL</label>
                <input className={inputClass + ' font-mono bg-gray-50 text-gray-500'} value="https://selliberation.com/api/webhooks/paystack" disabled />
                <p className="text-xs text-gray-500 mt-1">Add this URL in your Paystack webhook settings</p>
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
              <div>
                <h2 className="text-base font-bold">Admin Bank Account</h2>
                <p className="text-sm text-gray-500 mt-0.5">Where subscription payments will be received.</p>
              </div>
              {[
                { key: 'bankName', label: 'Bank Name', placeholder: 'Guaranty Trust Bank (GTBank)' },
                { key: 'accountNumber', label: 'Account Number', placeholder: '0123456789' },
                { key: 'accountName', label: 'Account Name', placeholder: 'Digital World Tech Academy' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  <input className={inputClass} value={settings.bank[f.key as keyof typeof settings.bank]} onChange={e => update('bank', f.key, e.target.value)} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'commissions' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
              <div>
                <h2 className="text-base font-bold">Commission Rates</h2>
                <p className="text-sm text-gray-500 mt-0.5">Configure percentages for each referral level.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: 'level1', label: 'Level 1 (Direct Referral)' },
                  { key: 'level2', label: 'Level 2' },
                  { key: 'level3', label: 'Level 3' },
                  { key: 'level4', label: 'Level 4' },
                  { key: 'level5', label: 'Level 5' },
                  { key: 'level6', label: 'Level 6' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <label className="font-medium text-gray-700 text-sm">{item.label}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={settings.commissions[item.key as keyof typeof settings.commissions]}
                        onChange={e => update('commissions', item.key, parseInt(e.target.value))}
                        className="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-center text-sm"
                      />
                      <span className="text-gray-500 text-sm">%</span>
                      <span className="text-xs text-gray-400 w-16">
                        ₦{(settings.general.subscriptionPrice * (settings.commissions[item.key as keyof typeof settings.commissions] / 100)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-4 text-sm" style={{ background: 'rgba(245,130,10,0.08)', border: '1px solid rgba(245,130,10,0.2)' }}>
                <span className="font-semibold" style={{ color: '#F5820A' }}>Total Commission: </span>
                <span style={{ color: '#c26200' }}>
                  {Object.values(settings.commissions).reduce((a, b) => a + b, 0)}% —{' '}
                  ₦{(settings.general.subscriptionPrice * Object.values(settings.commissions).reduce((a, b) => a + b, 0) / 100).toLocaleString()} per subscription
                </span>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
              <div>
                <h2 className="text-base font-bold">Email Notifications</h2>
                <p className="text-sm text-gray-500 mt-0.5">Configure notifications sent to users.</p>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'welcome', label: 'Welcome email on registration', enabled: true },
                  { id: 'trial_end', label: 'Trial ending reminder (Day 5)', enabled: true },
                  { id: 'payment', label: 'Payment confirmation', enabled: true },
                  { id: 'commission', label: 'Commission earned', enabled: true },
                  { id: 'withdrawal', label: 'Withdrawal processed', enabled: true },
                  { id: 'referral', label: 'New referral signup', enabled: false },
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <span className="text-gray-700 text-sm">{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-amber-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
