import { useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp, Users, Repeat, Brain,
  BarChart3, Activity, Award, AlertTriangle,
  Lightbulb, Database, Building2, Target, Zap, CheckCircle2,
} from 'lucide-react';
import adminData from '../data/admin_dashboard_data.json';
import { COLORS, PIE_COLORS, tooltipStyle, KpiCard, SectionCard, InsightItem } from './components';

const data = adminData as any;

const KPI_CONFIG = [
  { icon: Brain, accent: 'bg-teal-50', iconClass: 'text-teal-600' },
  { icon: Zap, accent: 'bg-emerald-50', iconClass: 'text-emerald-600' },
  { icon: Repeat, accent: 'bg-indigo-50', iconClass: 'text-indigo-600' },
  { icon: CheckCircle2, accent: 'bg-amber-50', iconClass: 'text-amber-600' },
];

export default function AnalyticsTab() {
  const insights = useMemo(() => {
    const out: { icon: React.ReactNode; text: string; tone: 'positive' | 'warning' | 'neutral' | 'info' }[] = [];

    const bestConversion = [...data.conversionByChannel].sort((a: any, b: any) => b.conversionRate - a.conversionRate)[0];
    const worstConversion = [...data.conversionByChannel].sort((a: any, b: any) => a.conversionRate - b.conversionRate)[0];
    out.push({
      icon: <Target size={16} />,
      text: `Best free-to-paid channel: "${bestConversion.channel}" at ${bestConversion.conversionRate}% — ${(bestConversion.conversionRate - worstConversion.conversionRate).toFixed(1)}pp above the lowest channel ("${worstConversion.channel}" at ${worstConversion.conversionRate}%).`,
      tone: 'positive',
    });

    const bestCompletion = [...data.profileCompletionByChannel].sort((a: any, b: any) => b.completionRate - a.completionRate)[0];
    const worstCompletion = [...data.profileCompletionByChannel].sort((a: any, b: any) => a.completionRate - b.completionRate)[0];
    out.push({
      icon: <CheckCircle2 size={16} />,
      text: `Highest profile completion: "${bestCompletion.channel}" at ${bestCompletion.completionRate}% (${bestCompletion.totalSignups} signups). "${worstCompletion.channel}" has the lowest at ${worstCompletion.completionRate}% — a ${(bestCompletion.completionRate - worstCompletion.completionRate).toFixed(1)}pp gap worth investigating.`,
      tone: 'info',
    });

    const topIndustry = [...data.programsByIndustry].sort((a: any, b: any) => b.programs - a.programs)[0];
    const totalPrograms = data.programsByIndustry.reduce((s: number, c: any) => s + c.programs, 0);
    out.push({
      icon: <BarChart3 size={16} />,
      text: `Industry with highest program volume: "${topIndustry.industry}" with ${topIndustry.programs} programs — ${((topIndustry.programs / totalPrograms) * 100).toFixed(1)}% of all ${totalPrograms} programs.`,
      tone: 'info',
    });

    const highRisk = data.churnRiskDistribution.find((c: any) => c.risk === 'High');
    const lowRisk = data.churnRiskDistribution.find((c: any) => c.risk === 'Low');
    out.push({
      icon: <AlertTriangle size={16} />,
      text: `Churn risk: ${highRisk.pct}% of program instances are High-risk (${highRisk.count} instances), while ${lowRisk.pct}% are Low-risk (${lowRisk.count}). The High-risk segment represents a significant retention opportunity.`,
      tone: 'warning',
    });

    const seq = data.engagementBySequence;
    out.push({
      icon: <TrendingUp size={16} />,
      text: `Engagement improves from ${seq[0].avgEngagement} (1st program) to ${seq[2].avgEngagement} (3rd program), a ${(seq[2].avgEngagement - seq[0].avgEngagement).toFixed(1)}-point lift — indicating the AI refines matching quality over repeat engagements.`,
      tone: 'positive',
    });

    const profileKpi = data.kpis.find((k: any) => k.label === 'Profile Completion Rate');
    const conversionKpi = data.kpis.find((k: any) => k.label === 'Free-to-Paid Conversion Rate');
    if (profileKpi && conversionKpi) {
      out.push({
        icon: <Zap size={16} />,
        text: `Of the 108 total signups, ${profileKpi.value}% complete their profile (${Math.round(108 * profileKpi.value / 100)} companies). Of those, ${conversionKpi.value}% convert to paid — suggesting onboarding dropoff (${(100 - profileKpi.value).toFixed(1)}%) is the primary growth lever.`,
        tone: 'neutral',
      });
    }

    return out;
  }, []);

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-3xl font-black text-teal-900 mb-1">Analytics Dashboard</h2>
        <p className="text-sm text-slate-500 mb-1">
          Executive overview of platform performance across all CSR programs, companies, and elder care centers.
        </p>
        <p className="text-xs text-slate-400 italic">Synthetic data for demonstration</p>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Programs by Industry + Conversion by Channel */}
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

      {/* Profile Completion Rate by Acquisition Channel */}
      <SectionCard title="Profile Completion Rate by Acquisition Channel" subtitle="% of signups that complete onboarding and reach a first match" icon={<CheckCircle2 size={20} />}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.profileCompletionByChannel} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="#64748b" domain={[0, 100]} unit="%" />
            <YAxis type="category" dataKey="channel" tick={{ fontSize: 9 }} width={120} stroke="#64748b" />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f8fafc' }} formatter={(v: any) => [`${v}%`, 'Completion Rate']} />
            <Bar dataKey="completionRate" fill={COLORS.accent} radius={[0, 6, 6, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {data.profileCompletionByChannel.map((item: any, i: number) => (
            <div key={i} className="bg-slate-50 rounded-xl p-2.5 text-center">
              <div className="text-xs text-slate-500 truncate mb-1">{item.channel.split(' ')[0]}</div>
              <div className="text-sm font-black text-teal-900">{item.completionRate}%</div>
              <div className="text-xs text-slate-400">{item.totalSignups} signups</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Churn Risk + Engagement by Sequence */}
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

        <SectionCard title="Engagement by Program Sequence" subtitle="Does the AI get smarter with repeat matches?" icon={<TrendingUp size={20} />}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.engagementBySequence} margin={{ top: 8, right: 16, left: -8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="sequence" tick={{ fontSize: 11 }} stroke="#64748b" />
              <YAxis tick={{ fontSize: 11 }} stroke="#64748b" domain={[50, 70]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="avgEngagement" stroke={COLORS.primary} strokeWidth={3} dot={{ r: 6, fill: COLORS.primary }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Executive Summary */}
      <SectionCard title="Executive Summary" subtitle="Key findings auto-generated from dashboard data" icon={<Lightbulb size={20} />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <Database size={20} className="text-teal-600 mx-auto mb-2" />
            <div className="text-xs text-slate-500 font-medium mb-1">Total Programs</div>
            <div className="text-2xl font-black text-teal-900">187</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <Building2 size={20} className="text-emerald-600 mx-auto mb-2" />
            <div className="text-xs text-slate-500 font-medium mb-1">Active Companies</div>
            <div className="text-2xl font-black text-emerald-900">78</div>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <Activity size={20} className="text-indigo-600 mx-auto mb-2" />
            <div className="text-xs text-slate-500 font-medium mb-1">Total Signups</div>
            <div className="text-2xl font-black text-indigo-900">108</div>
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

      <div className="pt-2 pb-4 text-center">
        <p className="text-xs text-slate-400">{data.meta.note}</p>
      </div>
    </div>
  );
}
