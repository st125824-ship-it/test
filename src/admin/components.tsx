export const COLORS = {
  primary: '#0d9488',
  secondary: '#059669',
  accent: '#6366f1',
  warning: '#f59e0b',
  danger: '#e11d48',
  success: '#10b981',
};

export const PIE_COLORS = ['#10b981', '#f59e0b', '#e11d48'];

export const tooltipStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  fontSize: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

export function KpiCard({ icon, label, sublabel, value, format, accent }: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  value: number;
  format?: string;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
          {icon}
        </div>
        <span className="text-3xl font-black text-teal-900">
          {format === 'percent' ? `${value}%` : format === 'baht' ? `฿${value.toLocaleString()}` : value.toLocaleString()}
        </span>
      </div>
      <h3 className="text-sm font-bold text-slate-800 mb-1">{label}</h3>
      <p className="text-xs text-slate-500">{sublabel}</p>
    </div>
  );
}

export function SectionCard({ title, subtitle, icon, children, className }: {
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

export function InsightItem({ icon, text, tone }: {
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

export function LeaderboardTable({ rows, metricLabel, valueSuffix = '' }: {
  rows: { rank: number; name: string; value: number; secondary?: string }[];
  metricLabel: string;
  valueSuffix?: string;
}) {
  const medals = ['🥇', '🥈', '🥉'];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs text-slate-500 uppercase tracking-wider">
            <th className="py-3 pr-2 font-medium">#</th>
            <th className="py-3 px-2 font-medium">Name</th>
            <th className="py-3 px-2 font-medium text-right">{metricLabel}</th>
            <th className="py-3 pl-2 font-medium text-right">Detail</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.rank} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="py-3 pr-2 font-bold text-slate-400">
                {row.rank <= 3 ? <span className="text-lg">{medals[row.rank - 1]}</span> : row.rank}
              </td>
              <td className="py-3 px-2 font-semibold text-slate-800">{row.name}</td>
              <td className="py-3 px-2 text-right font-black text-teal-900">
                {row.value}{valueSuffix}
              </td>
              <td className="py-3 pl-2 text-right text-xs text-slate-500">{row.secondary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MetricRow({ label, value, max, suffix = '', color = COLORS.primary }: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  color?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="font-black text-teal-900">{value}{suffix}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
