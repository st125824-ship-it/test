import { useState } from 'react';
import { Heart, ArrowLeft, Database, BarChart3, Users, Gauge } from 'lucide-react';
import adminData from '../data/admin_dashboard_data.json';
import AnalyticsTab from './AnalyticsTab';
import ReferralsTab from './ReferralsTab';
import BenchmarkingTab from './BenchmarkingTab';

const data = adminData as any;

type TabId = 'analytics' | 'referrals' | 'benchmarking';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  { id: 'referrals', label: 'Referrals & Partnerships', icon: <Users size={18} /> },
  { id: 'benchmarking', label: 'Benchmarking', icon: <Gauge size={18} /> },
];

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<TabId>('analytics');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-teal-700 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <div className="w-px h-6 bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                <Heart size={18} />
              </div>
              <div>
                <span className="font-bold text-teal-900 text-sm">CSRConnect</span>
                <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <Database size={16} />
            <span>{data.meta.datasetSize}</span>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex gap-1 -mb-px">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'referrals' && <ReferralsTab />}
        {activeTab === 'benchmarking' && <BenchmarkingTab />}
      </div>
    </div>
  );
}
