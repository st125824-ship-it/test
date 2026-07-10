import { useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Heart, ArrowLeft, TrendingUp, Users, Repeat, Brain,
  BarChart3, PieChart as PieIcon, Activity, Award, AlertTriangle,
  Lightbulb, Database, Building2, Layers, Target, Zap,
} from 'lucide-react';
import adminData from '../data/admin_dashboard_data.json';

const data = adminData as any;

const COLORS = {
  primary: '#0d9488',
  primaryLight: '#14b8a6',
  secondary: '#059669',
  accent: '#6366f1',
  warning: '#f59e0b',
  danger: '#e11d48',
  success: '#10b981',
  slate: '#94a3b8',
};

const PIE_COLORS = ['#10b981', '#f59e0b', '#e11d48'];
const BENCHMARK_COLORS = ['#0d9488', '#14b8a6', '#94a3b8'];

function KpiCard({ icon, label, sublabel, value, format, accent }: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  value: number;
  format: string;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
          {icon}
        </div>
        <span className="text-3xl font-black text-teal-900">
          {format === 'percent' ? `${value}%` : value}
        </span>
      </div>
      <h3 className="text-sm font-bold text-slate-800 mb-1">{label}</h3>
      <p className="text-xs text-slate-500">{sublabel}</p>
    </div>
  );
}

function SectionCard({ title, subtitle, icon, children, className }: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm ${className || ''}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-teal-900">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function ComparisonCard({ type, commitRate, avgEngagement, isAi }: {
  type: string;
  commitRate: number;
  avgEngagement: number;
  isAi: boolean;
}) {
  const accent = isAi ? 'teal' : 'slate';
  const icon = isAi ? <Brain size={24} /> : <Layers size={24} />;
  const bg = isAi ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-600';
  return (
    <div className={`rounded-2xl p-6 border-2 ${isAi ? 'border-teal-200' : 'border-slate-200'} bg-white`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
        {icon}
      </div>
      <h4 className="text-sm font-bold text-slate-800 mb-4">{type}</h4>
      <div className="space-y-3">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs text-slate-500 font-medium">Commitment Rate</span>
            <span className="text-2xl font-black text-teal-900">{commitRate}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${isAi ? 'bg-teal-500' : 'bg-slate-400'}`} style={{ width: `${commitRate}%` }} />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs text-slate-500 font-medium">Avg Engagement</span>
            <span className="text-2xl font-black text-teal-900">{avgEngagement}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${isAi ? 'bg-emerald-500' : 'bg-slate-400'}`} style={{ width: `${avgEngagement}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightItem({ icon, text, tone }: {
  icon: React.ReactNode;
  text: string;
  tone: 'positive' | 'warning' | 'neutral' | 'info';
}) {
  const tones = {
    positive: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    neutral: 'bg-slate-50 text-slate-700',
    info: 'bg-teal-50 text-teal-700',
  };
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tones[tone]}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-700 leading-relaxed pt-1">{text}</p>
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  fontSize: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const insights = useMemo(() => {
    const out: { icon: React.ReactNode; text: string; tone: 'positive' | 'warning' | 'neutral' | 'info' }[] = [];

    // Best acquisition channel
    const bestChannel = [...data.conversionByChannel].sort((a: any, b: any) => b.conversionRate - a.conversionRate)[0];
    out.push({
      icon: <Target size={16} />,
      text: `Best acquisition channel: "${bestChannel.channel}" with a ${bestChannel.conversionRate}% free-to-paid conversion rate — ${((bestChannel.conversionRate / data.conversionByChannel.reduce((s: number, c: any) => Math.min(s, c.conversionRate), 100) - 1) * 100).toFixed(0)}% lift over the lowest channel.`,
      tone: 'positive',
    });

    // Industry with highest program volume
    const topIndustry = [...data.programsByIndustry].sort((a: any, b: any) => b.programs - a.programs)[0];
    out.push({
      icon: <BarChart3 size={16} />,
      text: `Industry with highest program volume: "${topIndustry.industry}" with ${topIndustry.programs} programs — ${((topIndustry.programs / data.programsByIndustry.reduce((s: number, c: any) => s + c.programs, 0)) * 100).toFixed(1)}% of all programs.`,
      tone: 'info',
    });

    // AI vs Manual performance difference
    const ai = data.manualVsAiMatched.find((m: any) => m.type.includes('AI'));
    const manual = data.manualVsAiMatched.find((m: any) => m.type.includes('Manual'));
    const commitDiff = (ai.commitRate - manual.commitRate).toFixed(1);
    const engDiff = (ai.avgEngagement - manual.avgEngagement).toFixed(1);
    out.push({
      icon: <Brain size={16} />,
      text: `AI-Matched vs Manual: AI achieves ${commitDiff}pp higher commitment rate (${ai.commitRate}% vs ${manual.commitRate}%), though manual browse leads engagement by ${Math.abs(parseFloat(engDiff))} points (${manual.avgEngagement} vs ${ai.avgEngagement}).`,
      tone: engDiff.startsWith('-') ? 'warning' : 'positive',
    });

    // Churn risk observation
    const highRisk = data.churnRiskDistribution.find((c: any) => c.risk === 'High');
    const lowRisk = data.churnRiskDistribution.find((c: any) => c.risk === 'Low');
    out.push({
      icon: <AlertTriangle size={16} />,
      text: `Churn risk: ${highRisk.pct}% of program instances are High-risk (${highRisk.count} instances), while ${lowRisk.pct}% are Low-risk (${lowRisk.count}). The High-risk segment represents a significant retention opportunity.`,
      tone: 'warning',
    });

    // Engagement trend by sequence
    const seq = data.engagementBySequence;
    const trendUp = seq[seq.length - 1].avgEngagement > seq[0].avgEngagement;
    out.push({
      icon: <TrendingUp size={16} />,
      text: `Engagement improves from ${seq[0].avgEngagement} (1st program) to ${seq[2].avgEngagement} (3rd program), a ${(seq[2].avgEngagement - seq[0].avgEngagement).toFixed(1)}-point lift — the AI gets smarter with repeat matches.`,
      tone: 'positive',
    });

    // Benchmark observation
    const topBand = data.benchmarkBandDistribution.find((b: any) => b.band === 'Top 25%');
    const aboveAvg = data.benchmarkBandDistribution.find((b: any) => b.band === 'Above Average');
    out.push({
      icon: <Award size={16} />,
      text: `Benchmark performance: Only ${topBand.pct}% of accepted matches reach Top 25%, while ${aboveAvg.pct}% sit at Above Average — indicating room to push more programs into the top quartile.`,
      tone: 'neutral',
    });

    return out;
  }, []);

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
                <span className="font-bold text-teal-900 text-sm">ElderMatch</span>
                <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <Database size={16} />
            <span>{data.meta.datasetSize}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-black text-teal-900 mb-1">Analytics Dashboard</h1>
          <p className="text-sm text-slate-500">
            Executive overview of platform performance across all CSR programs, companies, and elder care centers.
          </p>
        </div>

        {/* 1. KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard
            icon={<Brain size={24} className="text-teal-600" />}
            label={data.kpis[0].label}
            sublabel={data.kpis[0].sublabel}
            value={data.kpis[0].value}
            format={data.kpis[0].format}
            accent="bg-teal-50"
          />
          <KpiCard
            icon={<Zap size={24} className="text-emerald-600" />}
            label={data.kpis[1].label}
            sublabel={data.kpis[1].sublabel}
            value={data.kpis[1].value}
            format={data.kpis[1].format}
            accent="bg-emerald-50"
          />
          <KpiCard
            icon={<Repeat size={24} className="text-indigo-600" />}
            label={data.kpis[2].label}
            sublabel={data.kpis[2].sublabel}
            value={data.kpis[2].value}
            format={data.kpis[2].format}
            accent="bg-indigo-50"
          />
        </div>

        {/* 2. Programs by Industry + 3. Conversion by Channel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Programs by Industry" subtitle="Total CSR programs per industry sector" icon={<BarChart3 size={20} />}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.programsByIndustry} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="industry" tick={{ fontSize: 10 }} angle={-35} textAnchor="end" height={80} interval={0} stroke="#64748b" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="programs" fill={COLORS.primary} radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Conversion by Acquisition Channel" subtitle="Free-to-paid conversion rate per channel" icon={<Target size={20} />}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.conversionByChannel} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b" domain={[0, 100]} unit="%" />
                <YAxis type="category" dataKey="channel" tick={{ fontSize: 9 }} width={120} stroke="#64748b" />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="conversionRate" fill={COLORS.secondary} radius={[0, 6, 6, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* 4. Churn Risk + 7. Benchmark Band */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Churn Risk Distribution" subtitle="Risk level across all program instances" icon={<AlertTriangle size={20} />}>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={data.churnRiskDistribution} dataKey="count" nameKey="risk" cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={3}>
                    {data.churnRiskDistribution.map((_: any, i: number) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2 w-full">
                {data.churnRiskDistribution.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: PIE_COLORS[i] }} />
                      <span className="text-sm font-medium text-slate-700">{item.risk}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-800">{item.count}</span>
                      <span className="text-xs text-slate-400 ml-1">({item.pct}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Benchmark Band Distribution" subtitle="Performance bands across accepted matches" icon={<Award size={20} />}>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={data.benchmarkBandDistribution} dataKey="pct" nameKey="band" cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={3}>
                    {data.benchmarkBandDistribution.map((_: any, i: number) => (
                      <Cell key={i} fill={BENCHMARK_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2 w-full">
                {data.benchmarkBandDistribution.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: BENCHMARK_COLORS[i] }} />
                      <span className="text-sm font-medium text-slate-700">{item.band}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* 5. Engagement by Program Sequence */}
        <SectionCard title="Engagement by Program Sequence" subtitle="Does the AI get smarter with repeat matches?" icon={<TrendingUp size={20} />}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.engagementBySequence} margin={{ top: 8, right: 16, left: -8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="sequence" tick={{ fontSize: 11 }} stroke="#64748b" />
              <YAxis tick={{ fontSize: 11 }} stroke="#64748b" domain={[50, 70]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="avgEngagement" stroke={COLORS.primary} strokeWidth={3} dot={{ r: 6, fill: COLORS.primary }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* 6. Manual vs AI Match Comparison */}
        <SectionCard title="Manual vs AI Match Comparison" subtitle="Does the AI add value over self-serve browsing?" icon={<Brain size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.manualVsAiMatched.map((item: any, i: number) => (
              <ComparisonCard
                key={i}
                type={item.type}
                commitRate={item.commitRate}
                avgEngagement={item.avgEngagement}
                isAi={item.type.includes('AI')}
              />
            ))}
          </div>
        </SectionCard>

        {/* 8. Executive Summary Panel */}
        <SectionCard title="Executive Summary" subtitle="Key findings auto-generated from dashboard data" icon={<Lightbulb size={20} />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <Database size={20} className="text-teal-600 mx-auto mb-2" />
              <div className="text-xs text-slate-500 font-medium mb-1">Dataset Size</div>
              <div className="text-sm font-bold text-teal-900 leading-tight">{data.meta.datasetSize}</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <Activity size={20} className="text-emerald-600 mx-auto mb-2" />
              <div className="text-xs text-slate-500 font-medium mb-1">Total Programs</div>
              <div className="text-2xl font-black text-emerald-900">187</div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <Building2 size={20} className="text-indigo-600 mx-auto mb-2" />
              <div className="text-xs text-slate-500 font-medium mb-1">Total Companies</div>
              <div className="text-2xl font-black text-indigo-900">78</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <Users size={20} className="text-amber-600 mx-auto mb-2" />
              <div className="text-xs text-slate-500 font-medium mb-1">Industries Covered</div>
              <div className="text-2xl font-black text-amber-900">{data.programsByIndustry.length}</div>
            </div>
          </div>
          <div className="space-y-2">
            {insights.map((insight, i) => (
              <InsightItem key={i} icon={insight.icon} text={insight.text} tone={insight.tone} />
            ))}
          </div>
        </SectionCard>

        {/* Footer */}
        <div className="pt-4 pb-8 text-center">
          <p className="text-xs text-slate-400">{data.meta.note}</p>
        </div>
      </div>
    </div>
  );
}
