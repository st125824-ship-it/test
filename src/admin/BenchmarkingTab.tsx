import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  TrendingUp, Activity, Target, Clock, Repeat, Brain,
  BarChart3, Building2, Home, MapPin, Lightbulb, Award, Gauge,
} from 'lucide-react';
import benchmarkData from '../data/benchmarking_data.json';
import { COLORS, tooltipStyle, KpiCard, SectionCard, InsightItem, LeaderboardTable, MetricRow } from './components';

const data = benchmarkData as any;

const KPI_CONFIG = [
  { icon: TrendingUp, accent: 'bg-teal-50', iconClass: 'text-teal-600' },
  { icon: Activity, accent: 'bg-emerald-50', iconClass: 'text-emerald-600' },
  { icon: Target, accent: 'bg-indigo-50', iconClass: 'text-indigo-600' },
  { icon: Clock, accent: 'bg-amber-50', iconClass: 'text-amber-600' },
  { icon: Repeat, accent: 'bg-rose-50', iconClass: 'text-rose-600' },
  { icon: Gauge, accent: 'bg-sky-50', iconClass: 'text-sky-600' },
];

const METRICS = [
  { key: 'engagement', label: 'Engagement', suffix: '%', max: 100 },
  { key: 'attendance', label: 'Attendance', suffix: '%', max: 100 },
  { key: 'impact', label: 'Impact Score', suffix: '', max: 100 },
  { key: 'hours', label: 'Volunteer Hours', suffix: '', max: 350 },
  { key: 'retention', label: 'Retention', suffix: '%', max: 100 },
  { key: 'repeat', label: 'Repeat Program Rate', suffix: '%', max: 100 },
] as const;

const INSIGHT_ICONS: Record<string, React.ReactNode> = {
  trending: <TrendingUp size={16} />,
  alert: <BarChart3 size={16} />,
  info: <Brain size={16} />,
  brain: <Brain size={16} />,
};

export default function BenchmarkingTab() {
  const [companyMetric, setCompanyMetric] = useState<typeof METRICS[number]['key']>('engagement');
  const [hostMetric, setHostMetric] = useState<typeof METRICS[number]['key']>('engagement');
  const [industryMetric, setIndustryMetric] = useState<typeof METRICS[number]['key']>('engagement');
  const [provinceMetric, setProvinceMetric] = useState<typeof METRICS[number]['key']>('engagement');

  const activeMetric = (key: string) => METRICS.find(m => m.key === key)!;
  const cm = activeMetric(companyMetric);
  const hm = activeMetric(hostMetric);
  const im = activeMetric(industryMetric);
  const pm = activeMetric(provinceMetric);

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-3xl font-black text-teal-900 mb-1">Benchmarking</h2>
        <p className="text-sm text-slate-500 mb-1">
          Compare performance across companies, hosts, industries, and provinces. Retention-focused metrics.
        </p>
        <p className="text-xs text-slate-400 italic">Synthetic data for demonstration</p>
      </div>

      {/* Platform Benchmark KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* Company Benchmark Ranking */}
      <SectionCard title="Company Benchmark Ranking" subtitle="Top companies by selected metric" icon={<Building2 size={20} />}>
        <div className="flex flex-wrap gap-2 mb-4">
          {METRICS.map(m => (
            <button
              key={m.key}
              onClick={() => setCompanyMetric(m.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                companyMetric === m.key ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.companyRanking} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b" domain={[0, cm.max]} unit={cm.suffix === '%' ? '%' : ''} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={130} stroke="#64748b" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} formatter={(v: any) => [`${v}${cm.suffix}`, cm.label]} />
            <Bar dataKey={companyMetric} fill={COLORS.primary} radius={[0, 6, 6, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Host Benchmark Ranking */}
      <SectionCard title="Host Benchmark Ranking" subtitle="Top hosts by selected metric" icon={<Home size={20} />}>
        <div className="flex flex-wrap gap-2 mb-4">
          {METRICS.map(m => (
            <button
              key={m.key}
              onClick={() => setHostMetric(m.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                hostMetric === m.key ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.hostRanking} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b" domain={[0, hm.max]} unit={hm.suffix === '%' ? '%' : ''} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={130} stroke="#64748b" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} formatter={(v: any) => [`${v}${hm.suffix}`, hm.label]} />
            <Bar dataKey={hostMetric} fill={COLORS.secondary} radius={[0, 6, 6, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Industry Benchmarking */}
      <SectionCard title="Industry Benchmarking" subtitle="Average metrics by industry sector" icon={<BarChart3 size={20} />}>
        <div className="flex flex-wrap gap-2 mb-4">
          {METRICS.map(m => (
            <button
              key={m.key}
              onClick={() => setIndustryMetric(m.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                industryMetric === m.key ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.industryBenchmark} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="industry" tick={{ fontSize: 9 }} angle={-35} textAnchor="end" height={80} interval={0} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" domain={[0, im.max]} unit={im.suffix === '%' ? '%' : ''} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} formatter={(v: any) => [`${v}${im.suffix}`, im.label]} />
            <Bar dataKey={industryMetric} fill={COLORS.accent} radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Province Benchmarking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Province Benchmarking" subtitle="Average metrics by province" icon={<MapPin size={20} />}>
          <div className="flex flex-wrap gap-2 mb-4">
            {METRICS.map(m => (
              <button
                key={m.key}
                onClick={() => setProvinceMetric(m.key)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  provinceMetric === m.key ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.provinceBenchmark} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b" domain={[0, pm.max]} unit={pm.suffix === '%' ? '%' : ''} />
              <YAxis type="category" dataKey="province" tick={{ fontSize: 10 }} width={80} stroke="#64748b" />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} formatter={(v: any) => [`${v}${pm.suffix}`, pm.label]} />
              <Bar dataKey={provinceMetric} fill={COLORS.warning} radius={[0, 6, 6, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Province detail table */}
        <SectionCard title="Province Detail" subtitle="Programs and all-metric snapshot" icon={<MapPin size={20} />}>
          <div className="space-y-3">
            {data.provinceBenchmark.map((p: any, i: number) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-800">{p.province}</span>
                  <span className="text-xs text-slate-500">{p.programs} programs</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  <MetricRow label="Engagement" value={p.engagement} max={100} suffix="%" color={COLORS.primary} />
                  <MetricRow label="Attendance" value={p.attendance} max={100} suffix="%" color={COLORS.secondary} />
                  <MetricRow label="Impact" value={p.impact} max={100} color={COLORS.accent} />
                  <MetricRow label="Retention" value={p.retention} max={100} suffix="%" color={COLORS.warning} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Retention Metrics Trend */}
      <SectionCard title="Retention Metrics Trend" subtitle="Quarterly cohort retention and repeat program rate" icon={<Repeat size={20} />}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data.retentionTrend} margin={{ top: 8, right: 16, left: -8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="cohort" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" domain={[55, 85]} unit="%" />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => `${v}%`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="retention" name="Retention Rate" stroke={COLORS.primary} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            <Line type="monotone" dataKey="repeatProgram" name="Repeat Program Rate" stroke={COLORS.secondary} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* AI Benchmark Insights */}
      <SectionCard title="AI Benchmark Insights" subtitle="Auto-generated findings from benchmarking data" icon={<Lightbulb size={20} />}>
        <div className="space-y-2">
          {data.aiInsights.map((ins: any, i: number) => (
            <InsightItem key={i} icon={INSIGHT_ICONS[ins.icon] || <Brain size={16} />} text={ins.text} tone={ins.tone} />
          ))}
        </div>
      </SectionCard>

      <div className="pt-2 pb-4 text-center">
        <p className="text-xs text-slate-400">{data.meta.note}</p>
      </div>
    </div>
  );
}
