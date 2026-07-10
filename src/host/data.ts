// Host / Elder Care Center Portal — data derived from JSON imports.
import centersJson from '../data/centers.json';
import programsJson from '../data/programs.json';
import analyticsJson from '../data/analytics.json';
import companiesJson from '../data/companies.json';
import segmentsJson from '../data/segments.json';

const centers = centersJson as any[];
const programs = programsJson as any[];
const analytics = analyticsJson as any;
const companies = companiesJson as any[];
export const segmentsData = segmentsJson as any;
export const companiesData = companies;
export const analyticsData = analytics;
export const centersData = centers;
export const programsData = programs;

// Use first center as the demo host org
const _c = centers[0];
const _cProgs = programs.filter(p => p.centerName === _c.name);
const _acceptedProgs = _cProgs.filter(p => p.matchAccepted);
const _totalHours = _acceptedProgs.reduce((s, p) => s + (p.volunteerHours || 0), 0);
const _totalAttendance = _acceptedProgs.reduce((s, p) => s + (p.attendance || 0), 0);
const _uniqueCompanies = [...new Set(_acceptedProgs.map(p => p.companyName))];
const _totalBudget = _acceptedProgs.reduce((s, p) => s + (p.budgetTHB || 0), 0);

export const HOST_ORG = {
  name: _c.name,
  type: 'Community Day Care Center',
  established: '2010',
  province: _c.province,
  district: _c.province,
  address: `123 Main Rd, ${_c.province}, Thailand`,
  residents: 80,
  staff: 12,
  operatingHours: _c.contactHours || '09:00 - 17:00 (Mon-Sat)',
  phone: _c.phone || '080-000-0000',
  email: _c.email || 'contact@center.or.th',
  lineId: _c.lineId || '@center',
  website: 'www.eldermatch.or.th',
  licenseNo: `SWD-${_c.province.toUpperCase().slice(0, 3)}-2010-0101`,
  licenseStatus: 'Active',
  licenseExpiry: '2027-12-31',
  verified: true,
  verificationDate: '2023-09-15',
  rating: parseFloat((_c.avgActualEngagement ? (_c.avgActualEngagement / 20).toFixed(1) : '4.2')) || 4.2,
  totalRatings: _c.acceptedPrograms || 5,
  description:
    `A community day care center in ${_c.province} supporting elderly residents through structured activities, health monitoring, and CSR-funded programs. We have hosted ${_c.acceptedPrograms} successful programs across ${(_c.programTypes || []).join(', ')}.`,
  photos: [
    'https://images.pexels.com/photos/7550/people-sitting-furniture-door.jpg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8460150/pexels-photo-8460150.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8460446/pexels-photo-8460446.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
};

export const HOST_PARTNERS = _uniqueCompanies.slice(0, 4).map((name, i) => {
  const prog = _acceptedProgs.find(p => p.companyName === name)!;
  const co = companies.find(c => c.name === name);
  return {
    id: `p${i + 1}`,
    company: name as string,
    industry: prog?.industry || 'Various',
    program: `${prog?.programType} Program`,
    status: i < 2 ? 'Active' : i === 2 ? 'Completed' : 'In Review',
    startDate: prog?.programDate || '2025-01-01',
    volunteers: prog?.volunteerHours || 10,
  };
});

// Derive impact metrics from programs data across all centers
const _allAccepted = programs.filter(p => p.matchAccepted);
const _allHours = _allAccepted.reduce((s, p) => s + (p.volunteerHours || 0), 0);
const _allAttendance = _allAccepted.reduce((s, p) => s + (p.attendance || 0), 0);
const _allBudget = _allAccepted.reduce((s, p) => s + (p.budgetTHB || 0), 0);

export const HOST_IMPACT_METRICS = [
  { label: 'Volunteers Received', value: String(analytics.summary.companies), icon: 'users', color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Volunteer Hours', value: _allHours.toLocaleString(), icon: 'clock', color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Residents Impacted', value: _allAttendance.toLocaleString(), icon: 'heart', color: 'text-rose-500', bg: 'bg-rose-50' },
  { label: 'Budget Deployed', value: `${Math.round(_allBudget / 1000)}K`, icon: 'gift', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Programs Completed', value: String(_allAccepted.length), icon: 'check', color: 'text-teal-500', bg: 'bg-teal-50' },
  { label: 'Partner Companies', value: String(analytics.summary.companies), icon: 'handshake', color: 'text-purple-500', bg: 'bg-purple-50' },
];

// Derive monthly trend from programs data
const _months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const _trend: Record<string, { volunteers: number; hours: number }> = {};
_allAccepted.forEach(p => {
  if (!p.programDate) return;
  const m = _months[new Date(p.programDate).getMonth()];
  if (!_trend[m]) _trend[m] = { volunteers: 0, hours: 0 };
  _trend[m].volunteers += 1;
  _trend[m].hours += p.volunteerHours || 0;
});
const _sortedMonths = _months.filter(m => _trend[m]);
export const HOST_IMPACT_TREND = _sortedMonths.length >= 4
  ? _sortedMonths.slice(-7).map(m => ({ month: m, ..._trend[m] }))
  : [
      { month: 'Jul', volunteers: 25, hours: 180 },
      { month: 'Aug', volunteers: 30, hours: 220 },
      { month: 'Sep', volunteers: 28, hours: 200 },
      { month: 'Oct', volunteers: 45, hours: 360 },
      { month: 'Nov', volunteers: 52, hours: 410 },
      { month: 'Dec', volunteers: 48, hours: 380 },
      { month: 'Jan', volunteers: 60, hours: 390 },
    ];

// Derive program category breakdown from programs data
const _catCount: Record<string, number> = {};
_allAccepted.forEach(p => { _catCount[p.programType] = (_catCount[p.programType] || 0) + 1; });
const _catColors: Record<string, string> = {
  'Technology Training': '#0ea5e9',
  'Education / Specific Domain Knowledge': '#059669',
  'Exercise': '#f59e0b',
  'Cooking': '#e11d48',
  'Music Therapy': '#8b5cf6',
  'Arts & Crafts': '#06b6d4',
  'English Language': '#84cc16',
  'Gardening': '#f97316',
  'Custom': '#6366f1',
};
export const HOST_IMPACT_BY_CATEGORY = Object.entries(_catCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([name, value]) => ({ name, value, color: _catColors[name] || '#94a3b8' }));

// Industry performance from segments.json
export const HOST_INDUSTRY_PERF = (segmentsJson as any).performanceByIndustry || [];
export const HOST_CHANNEL_PERF = (segmentsJson as any).performanceByAcquisitionChannel || [];

// Static portal data (non-derivable from JSON)
export const HOST_REQUESTS = [
  { id: 'r1', title: 'Smartphone Basics for Seniors', category: 'Digital Literacy', priority: 'High', volunteers: 15, budget: 25000, status: 'Open', preferredDates: 'Weekends, Jan-Feb 2025', description: 'Teach residents how to use smartphones for video calls with family, LINE messaging, and emergency contacts.' },
  { id: 'r2', title: 'Weekly Health Check-up Clinic', category: 'Health Programs', priority: 'High', volunteers: 8, budget: 40000, status: 'Open', preferredDates: 'Every Friday morning', description: 'Regular blood pressure, blood sugar screening, and basic health consultations for residents.' },
  { id: 'r3', title: 'Dining Hall Repainting', category: 'Facility Improvements', priority: 'Medium', volunteers: 25, budget: 60000, status: 'Matched', preferredDates: 'Feb 2025 weekend', description: 'Repaint the main dining hall (200 sqm) including walls, ceiling, and touch-up of common areas.' },
  { id: 'r4', title: 'Hospital Visit Transportation', category: 'Transportation Support', priority: 'Medium', volunteers: 10, budget: 15000, status: 'Open', preferredDates: 'Ongoing - weekday mornings', description: 'Volunteers with vehicles to accompany elderly residents to hospital appointments.' },
  { id: 'r5', title: 'Weekend Companion Activities', category: 'Companion Activities', priority: 'Low', volunteers: 20, budget: 5000, status: 'Open', preferredDates: 'Saturday afternoons', description: 'Board games, storytelling, and friendly conversation with residents who receive few visitors.' },
  { id: 'r6', title: 'Pottery & Arts Workshop', category: 'Arts & Recreation', priority: 'Low', volunteers: 12, budget: 12000, status: 'Draft', preferredDates: 'March 2025', description: 'A 4-session arts and crafts workshop culminating in a small exhibition of resident artwork.' },
];

export const HOST_OPPORTUNITIES = [
  { id: 'o1', title: 'Digital Literacy Training Program', category: 'Digital Literacy', status: 'Open', postedDate: '2024-12-01', deadline: '2025-01-20', applicants: 4, volunteers: 15, budget: 25000 },
  { id: 'o2', title: 'Weekly Health Screening Support', category: 'Health Programs', status: 'Open', postedDate: '2024-12-10', deadline: '2025-02-01', applicants: 2, volunteers: 8, budget: 40000 },
  { id: 'o3', title: 'Facility Painting Weekend', category: 'Facility Improvements', status: 'Matched', postedDate: '2024-11-15', deadline: '2025-01-15', applicants: 5, volunteers: 25, budget: 60000 },
  { id: 'o4', title: 'Hospital Transportation Volunteers', category: 'Transportation Support', status: 'Open', postedDate: '2024-12-20', deadline: '2025-03-01', applicants: 1, volunteers: 10, budget: 15000 },
  { id: 'o5', title: 'Companion & Games Saturdays', category: 'Companion Activities', status: 'Open', postedDate: '2024-12-05', deadline: '2025-02-15', applicants: 3, volunteers: 20, budget: 5000 },
  { id: 'o6', title: 'Arts & Crafts Workshop Series', category: 'Arts & Recreation', status: 'Draft', postedDate: '—', deadline: '—', applicants: 0, volunteers: 12, budget: 12000 },
  { id: 'o7', title: 'Garden Greenhouse Build', category: 'Facility Improvements', status: 'Completed', postedDate: '2024-05-01', deadline: '2024-06-30', applicants: 6, volunteers: 30, budget: 80000 },
  { id: 'o8', title: 'Cyber Safety for Seniors', category: 'Digital Literacy', status: 'In Review', postedDate: '2024-12-28', deadline: '2025-02-10', applicants: 2, volunteers: 18, budget: 30000 },
];

// Populate from real companies data
export const HOST_APPLICATIONS = [
  { id: 'a1', company: companies[0]?.name || 'TechFlow Solutions', industry: companies[0]?.industry || 'Retail & Consumer', volunteerCapacity: 50, proposedSupport: '15 employee volunteers for weekend smartphone workshops over 6 weeks', status: 'New', opportunity: 'Digital Literacy Training Program', date: '2024-12-15' },
  { id: 'a2', company: companies[1]?.name || 'Asoke Textiles', industry: companies[1]?.industry || 'Manufacturing', volunteerCapacity: 80, proposedSupport: '10 tech-savvy volunteers, tablets loaned for duration of program', status: 'New', opportunity: 'Digital Literacy Training Program', date: '2024-12-18' },
  { id: 'a3', company: companies[2]?.name || 'Bangkok Hospital Group', industry: companies[2]?.industry || 'Food & Beverage', volunteerCapacity: 30, proposedSupport: '8 staff for weekly health screening every Friday', status: 'Under Review', opportunity: 'Weekly Health Screening Support', date: '2024-12-12' },
  { id: 'a4', company: companies[3]?.name || 'AIA Thailand', industry: companies[3]?.industry || 'Tourism & Hospitality', volunteerCapacity: 200, proposedSupport: '20 volunteers + medical supplies sponsorship for health program', status: 'Under Review', opportunity: 'Weekly Health Screening Support', date: '2024-12-20' },
  { id: 'a5', company: companies[4]?.name || 'SCG Cement Foundation', industry: companies[4]?.industry || 'Tourism & Hospitality', volunteerCapacity: 100, proposedSupport: '25 volunteers, all materials provided for dining hall', status: 'Accepted', opportunity: 'Facility Painting Weekend', date: '2024-11-20' },
  { id: 'a6', company: companies[5]?.name || 'Grab Thailand', industry: companies[5]?.industry || 'Real Estate & Construction', volunteerCapacity: 60, proposedSupport: '10 driver volunteers for hospital transport, fuel costs covered', status: 'New', opportunity: 'Hospital Transportation Volunteers', date: '2024-12-22' },
];

export const HOST_CALENDAR = [
  { id: 'e1', title: 'Digital Literacy Workshop Session 3', type: 'Training', date: '2025-01-18', time: '09:00 - 12:00', partner: companies[0]?.name || 'TechFlow Solutions', attendees: 30 },
  { id: 'e2', title: 'Health Screening Friday', type: 'Health', date: '2025-01-17', time: '08:30 - 11:30', partner: companies[2]?.name || 'Bangkok Hospital Group', attendees: 80 },
  { id: 'e3', title: 'CSR Visit - Garden Project Review', type: 'CSR Visit', date: '2025-01-20', time: '14:00 - 15:30', partner: companies[1]?.name || 'SCG Cement Foundation', attendees: 8 },
  { id: 'e4', title: 'Companion Games Saturday', type: 'Volunteer', date: '2025-01-25', time: '13:00 - 16:00', partner: 'Open Application', attendees: 20 },
  { id: 'e5', title: 'Dining Hall Painting Kickoff', type: 'Volunteer', date: '2025-02-01', time: '08:00 - 17:00', partner: companies[4]?.name || 'SCG Cement Foundation', attendees: 25 },
  { id: 'e6', title: 'Smartphone Workshop Final Session', type: 'Training', date: '2025-02-15', time: '09:00 - 12:00', partner: companies[0]?.name || 'TechFlow Solutions', attendees: 45 },
  { id: 'e7', title: 'Arts & Crafts Exhibition', type: 'Volunteer', date: '2025-03-15', time: '10:00 - 15:00', partner: 'TBD', attendees: 50 },
];

export const HOST_MESSAGES = [
  { id: 'm1', from: companies[0]?.name || 'TechFlow Solutions', role: 'Company', preview: 'Hi! Our team is confirmed for the Jan 18 workshop session...', time: '10:24', unread: true, avatar: (companies[0]?.name || 'TF').slice(0, 2).toUpperCase() },
  { id: 'm2', from: 'ElderMatch Admin', role: 'Admin', preview: 'Your facility verification has been renewed through 2027.', time: '09:15', unread: true, avatar: 'EM' },
  { id: 'm3', from: companies[3]?.name || 'AIA Thailand', role: 'Company', preview: 'We would like to discuss the health screening partnership...', time: 'Yesterday', unread: false, avatar: (companies[3]?.name || 'AI').slice(0, 2).toUpperCase() },
  { id: 'm4', from: companies[4]?.name || 'SCG Foundation', role: 'Company', preview: 'Paint materials are ready for delivery next week.', time: 'Yesterday', unread: false, avatar: (companies[4]?.name || 'SC').slice(0, 2).toUpperCase() },
  { id: 'm5', from: companies[2]?.name || 'Bangkok Hospital', role: 'Company', preview: 'Can we move the Friday clinic to 9 AM start?', time: '2 days ago', unread: false, avatar: (companies[2]?.name || 'BH').slice(0, 2).toUpperCase() },
];

export const HOST_PREVIOUS_PROJECTS = programs
  .filter(p => p.matchAccepted && p.actualEngagementScore && p.impactReportGenerated)
  .slice(0, 4)
  .map((p, i) => ({
    id: `pp${i + 1}`,
    company: p.companyName,
    project: `${p.programType} — ${p.centerName.split(' ').slice(0, 3).join(' ')}`,
    year: new Date(p.programDate).getFullYear().toString(),
    rating: p.actualEngagementScore >= 70 ? 5 : p.actualEngagementScore >= 55 ? 4 : 3,
    outcome: `${p.attendance} residents attended, engagement score ${Math.round(p.actualEngagementScore)}%`,
  }));

export const HOST_RATINGS = programs
  .filter(p => p.matchAccepted && p.residentFeedbackScore)
  .slice(0, 4)
  .map((p, i) => ({
    id: `rt${i + 1}`,
    partner: p.companyName,
    rating: Math.round(p.residentFeedbackScore),
    comment: p.residentFeedbackScore >= 4 ? 'Excellent engagement, residents were very enthusiastic.' : 'Good program overall, residents appreciated the effort.',
    date: p.programDate,
  }));

export const HOST_NAV_ITEMS = [
  { id: 'host_dashboard', label: 'Host Dashboard', icon: 'home' },
  { id: 'host_profile', label: 'Organization Profile', icon: 'building' },
  { id: 'host_requests', label: 'Needs & Requests', icon: 'clipboard' },
  { id: 'host_opportunities', label: 'CSR Opportunities', icon: 'sparkles' },
  { id: 'host_applications', label: 'Applications', icon: 'users' },
  { id: 'host_calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'host_impact', label: 'Impact Tracking', icon: 'activity' },
  { id: 'host_messages', label: 'Messages', icon: 'message' },
  { id: 'host_verification', label: 'Verification', icon: 'shield' },
];

export const REQUEST_CATEGORIES = [
  'Digital Literacy Training',
  'Health Programs',
  'Facility Improvements',
  'Transportation Support',
  'Companion Activities',
  'Arts & Recreation',
];

export const PRIORITY_LEVELS = ['Low', 'Medium', 'High'];
export const REQUEST_STATUS_STYLES: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-600',
  Open: 'bg-emerald-100 text-emerald-700',
  Matched: 'bg-blue-100 text-blue-700',
  Completed: 'bg-teal-100 text-teal-700',
};
export const OPPORTUNITY_STATUS_STYLES: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-600',
  Open: 'bg-emerald-100 text-emerald-700',
  'In Review': 'bg-amber-100 text-amber-700',
  Matched: 'bg-blue-100 text-blue-700',
  Completed: 'bg-teal-100 text-teal-700',
};
export const APPLICATION_STATUS_STYLES: Record<string, string> = {
  New: 'bg-emerald-100 text-emerald-700',
  'Under Review': 'bg-amber-100 text-amber-700',
  Accepted: 'bg-teal-100 text-teal-700',
  Declined: 'bg-rose-100 text-rose-700',
};
