import React, { useState } from 'react';
import {
  Home, Building2, ClipboardList, Sparkles, Users,
  Activity, MessageSquare, ShieldCheck, ChevronRight, Heart,
  MapPin, Clock, Star, Phone, Mail, MessageCircle, Globe,
  Award, CheckCircle2, XCircle, Eye, ArrowRight, Plus,
  FileText, BadgeCheck, AlertCircle, TrendingUp, Handshake,
  Gift, Briefcase, CalendarDays, Send
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  HOST_ORG, HOST_PARTNERS, HOST_REQUESTS, HOST_OPPORTUNITIES,
  HOST_APPLICATIONS, HOST_CALENDAR, HOST_IMPACT_METRICS,
  HOST_IMPACT_TREND, HOST_IMPACT_BY_CATEGORY, HOST_MESSAGES,
  HOST_PREVIOUS_PROJECTS, HOST_RATINGS, HOST_NAV_ITEMS,
  REQUEST_CATEGORIES, PRIORITY_LEVELS, REQUEST_STATUS_STYLES,
  OPPORTUNITY_STATUS_STYLES, APPLICATION_STATUS_STYLES
} from './data';

const ICON_MAP: Record<string, React.ReactNode> = {
  home: <Home size={20} />,
  building: <Building2 size={20} />,
  clipboard: <ClipboardList size={20} />,
  sparkles: <Sparkles size={20} />,
  users: <Users size={20} />,
  calendar: <CalendarDays size={20} />,
  activity: <Activity size={20} />,
  message: <MessageSquare size={20} />,
  shield: <ShieldCheck size={20} />,
};

const METRIC_ICON_MAP: Record<string, React.ReactNode> = {
  users: <Users size={24} />,
  clock: <Clock size={24} />,
  heart: <Heart size={24} />,
  gift: <Gift size={24} />,
  check: <CheckCircle2 size={24} />,
  handshake: <Handshake size={24} />,
};

const HostSidebar = ({ currentView, setCurrentView, onSwitchRole }: {
  currentView: string;
  setCurrentView: (v: string) => void;
  onSwitchRole: () => void;
}) => (
  <div className="w-64 bg-white border-r border-teal-100 min-h-screen flex flex-col hidden md:flex shrink-0">
    <div className="p-6 flex items-center gap-3">
      <div className="bg-emerald-500 text-white p-2 rounded-xl">
        <Heart size={24} />
      </div>
      <div>
        <span className="text-xl font-bold text-teal-900 tracking-tight block leading-none">ElderMatch</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Host Portal</span>
      </div>
    </div>

    <div className="px-4 pb-4">
      <div className="bg-teal-50 rounded-lg p-4">
        <p className="text-sm font-semibold text-teal-900 truncate">{HOST_ORG.name}</p>
        <div className="flex items-center gap-2 mt-1.5">
          {HOST_ORG.verified && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
              <BadgeCheck size={12} /> Verified
            </span>
          )}
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
            {HOST_ORG.type.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>

    <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
      {HOST_NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => setCurrentView(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            currentView === item.id
              ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm'
              : 'text-slate-600 hover:bg-slate-50 hover:text-teal-700'
          }`}
        >
          {ICON_MAP[item.icon]}
          <span>{item.label}</span>
          {currentView === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
        </button>
      ))}
    </nav>

    <div className="p-4 border-t border-teal-100">
      <button
        onClick={onSwitchRole}
        className="w-full text-sm text-teal-600 hover:text-teal-800 font-medium py-2 flex items-center justify-center gap-2"
      >
        <ArrowRight size={16} /> Switch to Company Portal
      </button>
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
    <div>
      <h1 className="text-3xl font-bold text-teal-900 mb-1">{title}</h1>
      {subtitle && <p className="text-slate-600">{subtitle}</p>}
    </div>
    {action}
  </div>
);

const StatusBadge = ({ status, styleMap }: { status: string; styleMap: Record<string, string> }) => {
  const cls = styleMap[status] || 'bg-slate-100 text-slate-600';
  return <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${cls}`}>{status}</span>;
};

const HostDashboard = ({ setCurrentView }: { setCurrentView: (v: string) => void }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div>
      <h1 className="text-3xl font-bold text-teal-900 mb-1">Center Overview</h1>
      <p className="text-slate-600">Welcome back, {HOST_ORG.name.split(' ').slice(0, 3).join(' ')}.</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'Active CSR Partners', value: HOST_PARTNERS.filter(p => p.status === 'Active').length, icon: <Handshake size={24} className="text-emerald-500" /> },
        { label: 'Open Requests', value: HOST_REQUESTS.filter(r => r.status === 'Open').length, icon: <ClipboardList size={24} className="text-blue-500" /> },
        { label: 'Upcoming Activities', value: HOST_CALENDAR.length, icon: <CalendarDays size={24} className="text-amber-500" /> },
        { label: 'New Applications', value: HOST_APPLICATIONS.filter(a => a.status === 'New').length, icon: <Users size={24} className="text-rose-500" /> },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-teal-50 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-50 rounded-xl">{stat.icon}</div>
          <div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-teal-50 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-teal-900">Recent Applications</h3>
          <button onClick={() => setCurrentView('host_applications')} className="text-sm text-teal-600 hover:text-teal-800 font-medium flex items-center gap-1">
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {HOST_APPLICATIONS.slice(0, 4).map(app => (
            <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-teal-100 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-800 truncate">{app.company}</p>
                  <StatusBadge status={app.status} styleMap={APPLICATION_STATUS_STYLES} />
                </div>
                <p className="text-sm text-slate-500 truncate">{app.opportunity}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-sm font-bold text-teal-600">{app.volunteerCapacity} vols</p>
                <p className="text-xs text-slate-400">{app.industry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-teal-50 shadow-sm">
        <h3 className="text-lg font-bold text-teal-900 mb-6">Impact Summary</h3>
        <div className="space-y-4">
          {HOST_IMPACT_METRICS.slice(0, 5).map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${m.bg}`}>
                <span className={m.color}>{METRIC_ICON_MAP[m.icon]}</span>
              </div>
              <div className="flex-1 flex justify-between items-baseline">
                <span className="text-sm text-slate-600">{m.label}</span>
                <span className="font-bold text-slate-800">{m.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl border border-teal-50 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-teal-900">Active CSR Partners</h3>
        <button onClick={() => setCurrentView('host_verification')} className="text-sm text-teal-600 hover:text-teal-800 font-medium flex items-center gap-1">
          View all <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HOST_PARTNERS.map(p => (
          <div key={p.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-slate-800">{p.company}</h4>
              <StatusBadge status={p.status} styleMap={REQUEST_STATUS_STYLES} />
            </div>
            <p className="text-sm text-slate-600 mb-3">{p.program}</p>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1"><Briefcase size={12} /> {p.industry}</span>
              <span className="flex items-center gap-1"><Users size={12} /> {p.volunteers} volunteers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HostProfile = () => (
  <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
    <SectionHeader title="Organization Profile" subtitle="Manage your center's public information and verification." />

    <div className="bg-white rounded-2xl border border-teal-100 shadow-sm overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-teal-600 to-emerald-600 relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {HOST_ORG.verified && (
            <span className="bg-white/90 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <BadgeCheck size={14} /> Verified Organization
            </span>
          )}
        </div>
      </div>
      <div className="p-6 md:p-8 -mt-16 relative">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-xl bg-emerald-50 flex items-center justify-center">
              <Building2 size={40} className="text-emerald-600" />
            </div>
          </div>
          <div className="flex-1 pt-12 md:pt-4">
            <h2 className="text-2xl font-bold text-teal-900">{HOST_ORG.name}</h2>
            <p className="text-slate-500 mt-1">{HOST_ORG.type} • Established {HOST_ORG.established}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-600">
              <span className="flex items-center gap-1.5"><MapPin size={15} className="text-emerald-500" /> {HOST_ORG.district}, {HOST_ORG.province}</span>
              <span className="flex items-center gap-1.5"><Users size={15} className="text-emerald-500" /> {HOST_ORG.residents} residents</span>
              <span className="flex items-center gap-1.5"><Star size={15} className="text-amber-400 fill-amber-400" /> {HOST_ORG.rating} ({HOST_ORG.totalRatings} ratings)</span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed mt-6">{HOST_ORG.description}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">
        <h3 className="font-bold text-teal-900 mb-4 flex items-center gap-2"><Building2 size={18} className="text-emerald-500" /> Organization Information</h3>
        <dl className="space-y-3 text-sm">
          {[
            ['Organization Type', HOST_ORG.type],
            ['Established', HOST_ORG.established],
            ['Number of Residents', String(HOST_ORG.residents)],
            ['Staff Members', String(HOST_ORG.staff)],
            ['Operating Hours', HOST_ORG.operatingHours],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between gap-4 py-2 border-b border-slate-50 last:border-0">
              <dt className="text-slate-500">{label}</dt>
              <dd className="font-semibold text-slate-800 text-right">{val}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">
        <h3 className="font-bold text-teal-900 mb-4 flex items-center gap-2"><MapPin size={18} className="text-emerald-500" /> Location & Contact</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 py-2 border-b border-slate-50">
            <dt className="text-slate-500">Address</dt>
            <dd className="font-semibold text-slate-800 text-right">{HOST_ORG.address}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-50">
            <dt className="text-slate-500 flex items-center gap-1.5"><Phone size={14} /> Phone</dt>
            <dd className="font-semibold text-slate-800">{HOST_ORG.phone}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-50">
            <dt className="text-slate-500 flex items-center gap-1.5"><Mail size={14} /> Email</dt>
            <dd className="font-semibold text-slate-800">{HOST_ORG.email}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-50">
            <dt className="text-slate-500 flex items-center gap-1.5"><MessageCircle size={14} /> LINE</dt>
            <dd className="font-semibold text-slate-800">{HOST_ORG.lineId}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2">
            <dt className="text-slate-500 flex items-center gap-1.5"><Globe size={14} /> Website</dt>
            <dd className="font-semibold text-slate-800">{HOST_ORG.website}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">
      <h3 className="font-bold text-teal-900 mb-4">Facility Photos</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {HOST_ORG.photos.map((photo, i) => (
          <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-100 group cursor-pointer">
            <img src={photo} alt={`Facility ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HostRequests = () => {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState(HOST_REQUESTS);
  const [form, setForm] = useState({ title: '', category: REQUEST_CATEGORIES[0], description: '', priority: 'Medium', volunteers: 10, budget: 0, preferredDates: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequests(prev => [{ id: `r${Date.now()}`, status: 'Draft', ...form, budget: Number(form.budget), volunteers: Number(form.volunteers) }, ...prev]);
    setShowForm(false);
    setForm({ title: '', category: REQUEST_CATEGORIES[0], description: '', priority: 'Medium', volunteers: 10, budget: 0, preferredDates: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <SectionHeader
        title="Needs & Requests"
        subtitle="Create and manage support requests for your center."
        action={
          <button onClick={() => setShowForm(!showForm)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap">
            <Plus size={18} /> New Request
          </button>
        }
      />

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 space-y-5 animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                {REQUEST_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                {PRIORITY_LEVELS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Volunteers Needed: {form.volunteers}</label>
              <input type="range" min="1" max="100" value={form.volunteers} onChange={e => setForm({ ...form, volunteers: Number(e.target.value) })} className="w-full accent-emerald-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Budget Need (THB)</label>
              <input type="number" min="0" step="1000" value={form.budget} onChange={e => setForm({ ...form, budget: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Dates</label>
              <input value={form.preferredDates} onChange={e => setForm({ ...form, preferredDates: e.target.value })} placeholder="e.g. Weekends in February" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-medium">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Save as Draft</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {requests.map(req => (
          <div key={req.id} className="bg-white rounded-2xl border border-teal-100 shadow-sm p-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-bold text-lg text-teal-900">{req.title}</h3>
                  <StatusBadge status={req.status} styleMap={REQUEST_STATUS_STYLES} />
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${req.priority === 'High' ? 'bg-rose-100 text-rose-700' : req.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{req.priority} Priority</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{req.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Sparkles size={14} className="text-emerald-500" /> {req.category}</span>
                  <span className="flex items-center gap-1"><Users size={14} className="text-emerald-500" /> {req.volunteers} volunteers</span>
                  <span className="flex items-center gap-1"><Gift size={14} className="text-emerald-500" /> {req.budget.toLocaleString()} THB</span>
                  <span className="flex items-center gap-1"><CalendarDays size={14} className="text-emerald-500" /> {req.preferredDates}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HostOpportunities = () => {
  const [filter, setFilter] = useState('All');
  const statuses = ['All', 'Draft', 'Open', 'In Review', 'Matched', 'Completed'];
  const filtered = filter === 'All' ? HOST_OPPORTUNITIES : HOST_OPPORTUNITIES.filter(o => o.status === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <SectionHeader title="CSR Opportunity Listings" subtitle="All published opportunities and their matching status." />

      <div className="flex flex-wrap gap-2">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`}>{s}</button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-teal-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Opportunity</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Applicants</th>
                <th className="px-6 py-4 text-center">Volunteers</th>
                <th className="px-6 py-4 text-right">Budget</th>
                <th className="px-6 py-4">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(opp => (
                <tr key={opp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{opp.title}</td>
                  <td className="px-6 py-4"><span className="text-xs uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{opp.category}</span></td>
                  <td className="px-6 py-4"><StatusBadge status={opp.status} styleMap={OPPORTUNITY_STATUS_STYLES} /></td>
                  <td className="px-6 py-4 text-center font-medium text-blue-600">{opp.applicants}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{opp.volunteers}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-700">{opp.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-500">{opp.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const HostApplications = () => {
  const [apps, setApps] = useState(HOST_APPLICATIONS);
  const [selected, setSelected] = useState<typeof HOST_APPLICATIONS[0] | null>(null);

  const updateStatus = (id: string, status: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    setSelected(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <SectionHeader title="Applications" subtitle="Companies interested in supporting your center." />

      <div className="space-y-4">
        {apps.map(app => (
          <div key={app.id} className="bg-white rounded-2xl border border-teal-100 shadow-sm p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-bold text-lg text-teal-900">{app.company}</h3>
                  <StatusBadge status={app.status} styleMap={APPLICATION_STATUS_STYLES} />
                </div>
                <p className="text-sm text-slate-600 mb-2">{app.proposedSupport}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Briefcase size={14} className="text-emerald-500" /> {app.industry}</span>
                  <span className="flex items-center gap-1"><Users size={14} className="text-emerald-500" /> {app.volunteerCapacity} capacity</span>
                  <span className="flex items-center gap-1"><CalendarDays size={14} className="text-emerald-500" /> {app.date}</span>
                  <span className="flex items-center gap-1"><Sparkles size={14} className="text-emerald-500" /> {app.opportunity}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setSelected(app)} className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium flex items-center gap-1.5 transition-colors">
                  <Eye size={16} /> View Profile
                </button>
                {app.status === 'New' && (
                  <>
                    <button onClick={() => updateStatus(app.id, 'Accepted')} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
                      <CheckCircle2 size={16} /> Accept
                    </button>
                    <button onClick={() => updateStatus(app.id, 'Declined')} className="px-4 py-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 text-sm font-medium flex items-center gap-1.5 transition-colors">
                      <XCircle size={16} /> Decline
                    </button>
                  </>
                )}
                {app.status === 'Under Review' && (
                  <button onClick={() => updateStatus(app.id, 'Accepted')} className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium flex items-center gap-1.5 transition-colors">
                    <CalendarDays size={16} /> Schedule Discussion
                  </button>
                )}
                {app.status === 'Accepted' && (
                  <button className="px-4 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm font-medium flex items-center gap-1.5 transition-colors">
                    <CalendarDays size={16} /> Schedule
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Building2 size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-teal-900">{selected.company}</h2>
                <p className="text-sm text-slate-500">{selected.industry} Industry</p>
              </div>
            </div>
            <dl className="space-y-3 text-sm mb-6">
              {[
                ['Applied For', selected.opportunity],
                ['Volunteer Capacity', `${selected.volunteerCapacity} employees`],
                ['Application Date', selected.date],
                ['Proposed Support', selected.proposedSupport],
                ['Current Status', selected.status],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between gap-4 py-2 border-b border-slate-50">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="font-semibold text-slate-800 text-right">{val}</dd>
                </div>
              ))}
            </dl>
            <div className="flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 px-5 py-2.5 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-medium">Close</button>
              {selected.status !== 'Accepted' && selected.status !== 'Declined' && (
                <button onClick={() => updateStatus(selected.id, 'Accepted')} className="flex-1 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Accept Application</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HostCalendar = () => {
  const typeColors: Record<string, string> = {
    Training: 'bg-blue-50 border-blue-200 text-blue-700',
    Health: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    'CSR Visit': 'bg-amber-50 border-amber-200 text-amber-700',
    Volunteer: 'bg-rose-50 border-rose-200 text-rose-700',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <SectionHeader title="Calendar" subtitle="Upcoming volunteer events, CSR visits, and activities." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HOST_CALENDAR.map(evt => (
          <div key={evt.id} className={`rounded-2xl border p-5 ${typeColors[evt.type] || 'bg-slate-50 border-slate-200 text-slate-700'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">{evt.type}</span>
              <span className="text-xs font-bold bg-white/60 px-2 py-0.5 rounded-md">{evt.attendees} attendees</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-2 leading-tight">{evt.title}</h3>
            <div className="space-y-1.5 text-sm">
              <p className="flex items-center gap-1.5 opacity-80"><CalendarDays size={14} /> {evt.date}</p>
              <p className="flex items-center gap-1.5 opacity-80"><Clock size={14} /> {evt.time}</p>
              <p className="flex items-center gap-1.5 opacity-80"><Handshake size={14} /> {evt.partner}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HostImpact = () => (
  <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
    <SectionHeader title="Impact Tracking" subtitle="Metrics and analytics from CSR partnerships." />

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {HOST_IMPACT_METRICS.map((m, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-teal-50 shadow-sm">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${m.bg}`}>
            <span className={m.color}>{METRIC_ICON_MAP[m.icon]}</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{m.value}</p>
          <p className="text-xs text-slate-500 font-medium mt-1">{m.label}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-teal-50 shadow-sm">
        <h3 className="text-lg font-bold text-teal-900 mb-6 flex items-center gap-2"><TrendingUp className="text-emerald-500" /> Volunteer & Hour Trends</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HOST_IMPACT_TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend />
              <Line type="monotone" name="Volunteers" dataKey="volunteers" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" name="Hours" dataKey="hours" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-teal-50 shadow-sm">
        <h3 className="text-lg font-bold text-teal-900 mb-6">Programs by Category</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={HOST_IMPACT_BY_CATEGORY} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {HOST_IMPACT_BY_CATEGORY.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl border border-teal-50 shadow-sm">
      <h3 className="text-lg font-bold text-teal-900 mb-6">Monthly Volunteer Hours</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={HOST_IMPACT_TREND}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="hours" name="Volunteer Hours" fill="#059669" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const HostMessages = () => {
  const [activeMsg, setActiveMsg] = useState(HOST_MESSAGES[0]);
  const [reply, setReply] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <SectionHeader title="Messages" subtitle="Communication center for partners, center, and admin." />

      <div className="bg-white rounded-2xl border border-teal-100 shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px]">
        <div className="w-full md:w-72 border-r border-slate-100 overflow-y-auto shrink-0">
          {HOST_MESSAGES.map(msg => (
            <button
              key={msg.id}
              onClick={() => setActiveMsg(msg)}
              className={`w-full flex items-start gap-3 p-4 border-b border-slate-50 text-left transition-colors ${activeMsg.id === msg.id ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
            >
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center shrink-0">
                {msg.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-semibold text-sm text-slate-800 truncate">{msg.from}</span>
                  {msg.unread && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                </div>
                <p className="text-xs text-slate-500 truncate">{msg.preview}</p>
                <p className="text-xs text-slate-400 mt-1">{msg.time}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center">
              {activeMsg.avatar}
            </div>
            <div>
              <p className="font-bold text-slate-800">{activeMsg.from}</p>
              <p className="text-xs text-slate-500">{activeMsg.role}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0">{activeMsg.avatar}</div>
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md shadow-sm">
                <p className="text-sm text-slate-700">{activeMsg.preview}</p>
                <p className="text-xs text-slate-400 mt-2">{activeMsg.time}</p>
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0">BB</div>
              <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-sm p-4 max-w-md shadow-sm">
                <p className="text-sm">Thank you for reaching out. We're excited to collaborate. Let's confirm the schedule details this week.</p>
                <p className="text-xs text-emerald-100 mt-2">09:30</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-100 flex gap-2">
            <input
              value={reply}
              onChange={e => setReply(e.target.value)}
              placeholder="Type a reply..."
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-lg transition-colors flex items-center gap-1.5">
              <Send size={16} /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HostVerification = () => (
  <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
    <SectionHeader title="Verification & Trust" subtitle="Organization verification status, license, and partner history." />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
          <BadgeCheck size={24} />
        </div>
        <h3 className="font-bold text-slate-800 mb-1">Organization Verification</h3>
        <p className="text-sm text-slate-500 mb-3">Verified since {HOST_ORG.verificationDate}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 size={14} /> Verified
        </span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
          <FileText size={24} />
        </div>
        <h3 className="font-bold text-slate-800 mb-1">License Status</h3>
        <p className="text-sm text-slate-500 mb-1">License No: {HOST_ORG.licenseNo}</p>
        <p className="text-sm text-slate-500 mb-3">Expires: {HOST_ORG.licenseExpiry}</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">
          <AlertCircle size={14} /> {HOST_ORG.licenseStatus}
        </span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <Star size={24} />
        </div>
        <h3 className="font-bold text-slate-800 mb-1">Partner Rating</h3>
        <p className="text-sm text-slate-500 mb-3">{HOST_ORG.totalRatings} partner ratings</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(n => (
            <Star key={n} size={18} className={n <= Math.round(HOST_ORG.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
          ))}
          <span className="ml-2 font-bold text-slate-800">{HOST_ORG.rating}</span>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">
      <h3 className="font-bold text-teal-900 mb-4 flex items-center gap-2"><Award size={18} className="text-emerald-500" /> Previous CSR Projects</h3>
      <div className="space-y-3">
        {HOST_PREVIOUS_PROJECTS.map(proj => (
          <div key={proj.id} className="flex items-start justify-between p-4 rounded-xl border border-slate-100 hover:border-teal-100 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-slate-800">{proj.project}</p>
                <span className="text-xs font-medium text-slate-400">{proj.year}</span>
              </div>
              <p className="text-sm text-slate-600">{proj.outcome}</p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Building2 size={12} /> {proj.company}</p>
            </div>
            <div className="flex items-center gap-0.5 shrink-0 ml-4">
              {[1, 2, 3, 4, 5].map(n => (
                <Star key={n} size={14} className={n <= proj.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">
      <h3 className="font-bold text-teal-900 mb-4">Partner Ratings & Reviews</h3>
      <div className="space-y-4">
        {HOST_RATINGS.map(rt => (
          <div key={rt.id} className="p-4 rounded-xl bg-slate-50/50 border border-slate-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-slate-800">{rt.partner}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <Star key={n} size={14} className={n <= rt.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                  ))}
                </div>
              </div>
              <span className="text-xs text-slate-400">{rt.date}</span>
            </div>
            <p className="text-sm text-slate-600 italic">"{rt.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HOST_VIEWS: Record<string, React.ComponentType<any>> = {
  host_dashboard: HostDashboard,
  host_profile: HostProfile,
  host_requests: HostRequests,
  host_opportunities: HostOpportunities,
  host_applications: HostApplications,
  host_calendar: HostCalendar,
  host_impact: HostImpact,
  host_messages: HostMessages,
  host_verification: HostVerification,
};

interface HostPortalProps {
  onSwitchRole: () => void;
}

export default function HostPortal({ onSwitchRole }: HostPortalProps) {
  const [currentView, setCurrentView] = useState('host_dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const CurrentView = HOST_VIEWS[currentView] || HostDashboard;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <HostSidebar currentView={currentView} setCurrentView={setCurrentView} onSwitchRole={onSwitchRole} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="md:hidden bg-white border-b border-teal-100 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-emerald-500" />
            <span className="font-bold text-teal-900">ElderMatch Host</span>
          </div>
          <button onClick={() => setMobileNavOpen(true)} className="text-slate-500 font-medium">Menu</button>
        </header>

        {mobileNavOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)}>
            <div className="w-64 h-full bg-white p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2 mb-6">
                <Heart size={20} className="text-emerald-500" />
                <span className="font-bold text-teal-900">ElderMatch Host</span>
              </div>
              <div className="space-y-2">
                {HOST_NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentView(item.id); setMobileNavOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === item.id ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {ICON_MAP[item.icon]}
                    <span>{item.label}</span>
                  </button>
                ))}
                <button onClick={onSwitchRole} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-teal-600 hover:bg-teal-50 font-medium mt-4 border-t border-slate-100 pt-4">
                  <ArrowRight size={20} /> Switch to Company
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <CurrentView setCurrentView={setCurrentView} />
        </div>
      </main>
    </div>
  );
}
