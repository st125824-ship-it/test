import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';
import {
  Send, Building2, Home, Percent, Crown, Filter, Trophy, Rss,
} from 'lucide-react';
import referralData from '../data/referral_data.json';
import { COLORS, tooltipStyle, KpiCard, SectionCard, LeaderboardTable } from './components';

const data = referralData as any;

const KPI_CONFIG = [
  { icon: Send, accent: 'bg-teal-50', iconClass: 'text-teal-600' },
  { icon: Building2, accent: 'bg-emerald-50', iconClass: 'text-emerald-600' },
  { icon: Home, accent: 'bg-indigo-50', iconClass: 'text-indigo-600' },
  { icon: Percent, accent: 'bg-amber-50', iconClass: 'text-amber-600' },
  { icon: Crown, accent: 'bg-rose-50', iconClass: 'text-rose-600' },
];

const FUNNEL_COLORS = [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.warning, COLORS.danger];

const ACTIVITY_STYLES: Record<string, { dot: string; label: string }> = {
  premium: { dot: 'bg-rose-500', label: 'Premium Upgrade' },
  host: { dot: 'bg-indigo-500', label: 'Host Referred' },
  verify: { dot: 'bg-teal-500', label: 'Profile Verified' },
  program: { dot: 'bg-emerald-500', label: 'First Program' },
  invite: { dot: 'bg-slate-400', label: 'Invite Sent' },
  register: { dot: 'bg-amber-500', label: 'Registered' },
};

export default function ReferralsTab() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-3xl font-black text-teal-900 mb-1">Referrals & Partnerships</h2>
        <p className="text-sm text-slate-500 mb-1">
          Track platform growth from existing Companies, Hosts, and Partners inviting new organizations.
        </p>
        <p className="text-xs text-slate-400 italic">Synthetic data for demonstration</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.kpis.map((kpi: any, i: number) => {
          const cfg = KPI_CONFIG[i];
          const Icon = cfg.icon;
          return (
            <KpiCard
              key={i}
              icon={<Icon size={24} className={cfg.iconClass} />}
              label={kpi.label}
              sublabel={kpi.sublabel}
              value={kpi.value}
              format={kpi.format}
              accent={cfg.accent}
            />
          );
        })}
      </div>

      {/* Referral Funnel */}
      <SectionCard title="Referral Funnel" subtitle="Invite → Register → Verify → First Program → Premium" icon={<Filter size={20} />}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.funnel} margin={{ top: 20, right: 16, left: -8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="stage" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {data.funnel.map((_: any, i: number) => (
                <Bar key={i} dataKey="count" fill={FUNNEL_COLORS[i]} />
              ))}
              {data.funnel.map((_: any, i: number) => (
                <LabelList key={`l${i}`} dataKey="pct" position="top" formatter={(v: any) => `${v}%`} style={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
          {data.funnel.map((stage: any, i: number) => (
            <div key={i} className="bg-slate-50 rounded-xl p-3 text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-1.5" style={{ background: FUNNEL_COLORS[i] }} />
              <div className="text-xs text-slate-500 mb-0.5">{stage.stage}</div>
              <div className="text-lg font-black text-teal-900">{stage.count}</div>
              <div className="text-xs text-slate-400">{stage.pct}%</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Company Referral Leaderboard" subtitle="Top referring companies by invite count" icon={<Building2 size={20} />}>
          <LeaderboardTable rows={data.companyLeaderboard} metricLabel="Invites" />
        </SectionCard>
        <SectionCard title="Host Referral Leaderboard" subtitle="Top referring hosts by invite count" icon={<Home size={20} />}>
          <LeaderboardTable rows={data.hostLeaderboard} metricLabel="Invites" />
        </SectionCard>
        <SectionCard title="Partner Referral Leaderboard" subtitle="Top partners by invite count" icon={<Trophy size={20} />}>
          <LeaderboardTable rows={data.partnerLeaderboard} metricLabel="Invites" />
        </SectionCard>
      </div>

      {/* Referral Activity Feed */}
      <SectionCard title="Referral Activity Feed" subtitle="Latest referral events across the platform" icon={<Rss size={20} />}>
        <div className="space-y-2">
          {data.activityFeed.map((item: any, i: number) => {
            const style = ACTIVITY_STYLES[item.type];
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:bg-slate-50/50 transition-colors">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${style.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">{item.actor}</span>{' '}
                    {item.action}
                    {item.target !== '—' && <span className="font-semibold text-teal-700"> {item.target}</span>}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{style.label}</span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="pt-2 pb-4 text-center">
        <p className="text-xs text-slate-400">{data.meta.note}</p>
      </div>
    </div>
  );
}
