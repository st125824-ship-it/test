import React, { useState, useMemo } from 'react';
import {
  Heart, Users, Building2, Search, ChevronRight,
  CheckCircle2, Sparkles, FileText, Download,
  MapPin, Clock, Star, ArrowRight, ShieldCheck,
  Activity, Award, Zap, Home, ClipboardList,
  Phone, Mail, MessageCircle, User, Briefcase, MessageSquare, Contact, BarChart3
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import HostPortal from './host/HostPortal';
import AdminDashboard from './admin/AdminDashboard';
import ContactSection from './components/ContactSection';
import AppFooter from './components/AppFooter';
import SupportWidget from './components/SupportWidget';
import analyticsData from './data/analytics.json';
import programsData from './data/programs.json';
import centersData from './data/centers.json';
import companiesData from './data/companies.json';
import segmentsData from './data/segments.json';

// Derive program chart data grouped by month from programs.json
const _programsByMonth = (() => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const buckets: Record<string, { attendance: number; engagement: number; count: number }> = {};
  (programsData as any[]).forEach((p: any) => {
    if (!p.programDate || !p.matchAccepted) return;
    const d = new Date(p.programDate);
    const key = months[d.getMonth()];
    if (!buckets[key]) buckets[key] = { attendance: 0, engagement: 0, count: 0 };
    buckets[key].attendance += p.attendance || 0;
    if (p.actualEngagementScore) { buckets[key].engagement += p.actualEngagementScore; buckets[key].count += 1; }
  });
  const order = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return order
    .filter(m => buckets[m])
    .map(m => ({ month: m, attendance: buckets[m].attendance, engagement: Math.round(buckets[m].count ? buckets[m].engagement / buckets[m].count : 0) }))
    .slice(-6);
})();

const PROVINCES = [
  "Bangkok", "Chiang Mai", "Phuket", "Khon Kaen", "Chonburi",
  "Nakhon Ratchasima", "Songkhla", "Udon Thani", "Surat Thani", "Ayutthaya"
];

const ACTIVITY_CATEGORIES = [
  "Health & Wellness", "Digital Literacy", "Arts & Crafts",
  "Facility Improvement", "Companionship", "Recreation"
];

const MOCK_CENTERS = [
  { id: 'c1', name: 'Ban Bang Khae Social Welfare Development Center', province: 'Bangkok', resident_count: 150, need_description: 'Requires volunteers to teach basic smartphone usage to seniors to help them connect with families. Also needs facility painting.', activity_categories: ['Digital Literacy', 'Facility Improvement'], rating: 4.5 },
  { id: 'c2', name: 'Chiang Mai Elderly Care Club', province: 'Chiang Mai', resident_count: 85, need_description: 'Looking for regular health screening support and gentle exercise class instructors.', activity_categories: ['Health & Wellness', 'Recreation'], rating: 4.8 },
  { id: 'c3', name: 'Phuket Senior Haven', province: 'Phuket', resident_count: 60, need_description: 'Needs companionship volunteers for weekend activities, board games, and storytelling sessions.', activity_categories: ['Companionship', 'Arts & Crafts'], rating: 4.2 },
  { id: 'c4', name: 'Khon Kaen Golden Age Center', province: 'Khon Kaen', resident_count: 120, need_description: 'Seeking corporate sponsors for a new community garden project. Needs both funding and manual labor.', activity_categories: ['Facility Improvement', 'Recreation'], rating: 4.0 },
  { id: 'c5', name: 'Chonburi Active Seniors', province: 'Chonburi', resident_count: 95, need_description: 'Urgent need for digital literacy workshops to prevent online scams targeting the elderly.', activity_categories: ['Digital Literacy'], rating: 4.7 },
  { id: 'c6', name: 'Korat Elders Community', province: 'Nakhon Ratchasima', resident_count: 200, need_description: 'Large center needing regular medical check-up volunteers and arts & crafts supplies.', activity_categories: ['Health & Wellness', 'Arts & Crafts'], rating: 4.1 },
  { id: 'c7', name: 'Songkhla Heritage Care', province: 'Songkhla', resident_count: 70, need_description: 'Requires structural repairs to the main dining hall and volunteers for weekly music therapy.', activity_categories: ['Facility Improvement', 'Recreation'], rating: 4.6 },
  { id: 'c8', name: 'Udon Thani Silver Club', province: 'Udon Thani', resident_count: 110, need_description: 'Looking for tech-savvy volunteers to set up video call stations for residents.', activity_categories: ['Digital Literacy', 'Facility Improvement'], rating: 4.3 },
  { id: 'c9', name: 'Surat Thani Peace Center', province: 'Surat Thani', resident_count: 50, need_description: 'Small community needing regular companionship and gentle stretching classes.', activity_categories: ['Companionship', 'Health & Wellness'], rating: 4.9 },
  { id: 'c10', name: 'Ayutthaya Historical Elders', province: 'Ayutthaya', resident_count: 80, need_description: 'Needs volunteers to organize local cultural trips and provide transportation support.', activity_categories: ['Recreation', 'Companionship'], rating: 4.4 },
  { id: 'c11', name: 'Thonburi Senior Daycare', province: 'Bangkok', resident_count: 130, need_description: 'Seeking corporate teams for a weekend deep-cleaning and landscaping event.', activity_categories: ['Facility Improvement'], rating: 4.2 },
  { id: 'c12', name: 'Doi Saket Elder Care', province: 'Chiang Mai', resident_count: 45, need_description: 'Rural center needing medical supplies and basic health awareness talks.', activity_categories: ['Health & Wellness'], rating: 4.5 },
  { id: 'c13', name: 'Patong Silver Beach', province: 'Phuket', resident_count: 55, need_description: 'Looking for volunteers to organize arts & crafts workshops, specifically pottery.', activity_categories: ['Arts & Crafts'], rating: 4.1 },
  { id: 'c14', name: 'Isan Elders Hub', province: 'Khon Kaen', resident_count: 140, need_description: 'Needs help setting up a digital library and teaching seniors how to use tablets.', activity_categories: ['Digital Literacy'], rating: 4.6 },
  { id: 'c15', name: 'Pattaya Senior Social', province: 'Chonburi', resident_count: 75, need_description: 'Seeking regular volunteers for bingo nights and social tea times.', activity_categories: ['Companionship', 'Recreation'], rating: 4.8 },
  { id: 'c16', name: 'Khao Yai Nature Seniors', province: 'Nakhon Ratchasima', resident_count: 65, need_description: 'Needs corporate sponsorship for a greenhouse project and volunteers to plant.', activity_categories: ['Facility Improvement', 'Recreation'], rating: 4.7 },
  { id: 'c17', name: 'Hat Yai Wisdom Center', province: 'Songkhla', resident_count: 90, need_description: 'Looking for health professionals for bi-weekly checkups and dietary advice.', activity_categories: ['Health & Wellness'], rating: 4.3 },
  { id: 'c18', name: 'Nong Prajak Elder Park', province: 'Udon Thani', resident_count: 105, need_description: 'Needs volunteers for morning Tai Chi sessions and general companionship.', activity_categories: ['Health & Wellness', 'Companionship'], rating: 4.5 },
  { id: 'c19', name: 'Koh Samui Silver Sands', province: 'Surat Thani', resident_count: 40, need_description: 'Small center needing structural repairs after monsoon season.', activity_categories: ['Facility Improvement'], rating: 4.0 },
  { id: 'c20', name: 'Chao Phraya Elders', province: 'Ayutthaya', resident_count: 115, need_description: 'Seeking volunteers to teach basic internet safety and scam prevention.', activity_categories: ['Digital Literacy'], rating: 4.9 },
];

const CENTER_CONTACTS = {
  default: {
    contactPerson: 'Center Coordinator',
    contactRole: 'CSR Partnership Liaison',
    phone: '02-000-0000',
    email: 'partnerships@eldercenter.or.th',
    lineId: '@eldercenter',
    preferredMethod: 'Email',
    contactHours: 'Mon-Fri, 09:00 - 17:00 ICT'
  },
  c1: {
    contactPerson: 'Suda Chanthong',
    contactRole: 'Center Director',
    phone: '081-234-5678',
    email: 'suda@bankhae.or.th',
    lineId: '@bankhae',
    preferredMethod: 'LINE',
    contactHours: 'Mon-Fri, 09:00 - 17:00 ICT'
  }
};

const MOCK_COMPANY = {
  id: 'comp1',
  name: 'TechFlow Solutions (Thailand)',
  industry: 'Tech',
  location: 'Bangkok',
  budget: 500000,
  budget_band: '50K-100K',
  volunteer_capacity: 50,
  csr_interests: 'We want to bridge the digital divide for the elderly and improve their quality of life through technology. We are also interested in team-building activities like facility renovation.',
  tier: 'Premium',
  set_symbol: '',
  registration_no: '',
  website: '',
  size: 'Medium',
  employees: '',
  esg_focus: [],
  reporting_standard: '',
  csr_frequency: '',
  preferred_locations: [],
  preferred_activities: [],
  employee_skills: [],
  esg_goals: [],
  reporting_preferences: { type: '', format: '' },
  max_distance: 50,
  urgency: 'Medium',
  max_volunteers: 50
};

const MOCK_HISTORICAL_PROGRAMS = (programsData as any[])
  .filter((p: any) => p.matchAccepted && p.actualEngagementScore)
  .slice(0, 5)
  .map((p: any) => ({
    id: p.programID,
    centerId: p.companyID,
    name: `${p.programType} @ ${p.centerName.split(' ').slice(0, 3).join(' ')}`,
    status: 'Completed',
    startDate: p.programDate,
    endDate: p.programDate,
    totalVolunteers: p.volunteerHours,
    totalHours: p.volunteerHours * 8,
    impactScore: Math.round(p.actualEngagementScore),
  }));

const MOCK_SESSION_DATA = _programsByMonth.length >= 3 ? _programsByMonth : [
  { month: 'Jan', attendance: 65, engagement: 70 },
  { month: 'Feb', attendance: 75, engagement: 75 },
  { month: 'Mar', attendance: 82, engagement: 80 },
  { month: 'Apr', attendance: 78, engagement: 85 },
  { month: 'May', attendance: 85, engagement: 88 },
  { month: 'Jun', attendance: 90, engagement: 92 },
];

const pastPrograms = (programsData as any[])
  .filter((p: any) => p.matchAccepted && p.actualEngagementScore)
  .map((p: any) => ({
    activity: p.programType,
    centerSize: 'Medium',
    industry: p.industry,
    frequency: 'Monthly',
    attendanceRate: p.attendance ? Math.round((p.attendance / 30) * 100) : 70,
    engagementScore: Math.round(p.actualEngagementScore),
  }));

const performSemanticMatch = (companyInterests, centers) => {
  const keywords = companyInterests.toLowerCase().match(/\b(\w+)\b/g) || [];

  return centers.map(center => {
    let score = 0;
    let matchReasons = [];
    const desc = center.need_description.toLowerCase();

    if (keywords.includes('digital') || keywords.includes('technology') || keywords.includes('internet')) {
      if (desc.includes('digital') || desc.includes('tech') || desc.includes('smartphone') || desc.includes('internet')) {
        score += 35;
        matchReasons.push("Strong alignment on digital literacy and technology skills.");
      }
    }
    if (keywords.includes('renovation') || keywords.includes('building') || keywords.includes('facility')) {
      if (desc.includes('facility') || desc.includes('repair') || desc.includes('painting') || desc.includes('garden')) {
        score += 30;
        matchReasons.push("Matches your interest in physical facility improvements.");
      }
    }
    if (keywords.includes('health') || keywords.includes('medical')) {
      if (desc.includes('health') || desc.includes('medical') || desc.includes('screening')) {
        score += 25;
        matchReasons.push("Aligns with health and wellness objectives.");
      }
    }

    score += Math.floor(Math.random() * 15);
    score = Math.min(score, 98);

    if (matchReasons.length === 0) {
      matchReasons.push("General alignment with community needs.");
      score = 40 + Math.floor(Math.random() * 20);
    }

    return { ...center, matchScore: score, matchReason: matchReasons[0] };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

const NavItem = ({ icon, label, active, onClick, highlight }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active
        ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm'
        : 'text-slate-600 hover:bg-slate-50 hover:text-teal-700'
    } ${highlight && !active ? 'bg-amber-50/50 hover:bg-amber-50' : ''}`}
  >
    {icon}
    <span>{label}</span>
    {active && <ChevronRight size={16} className="ml-auto opacity-50" />}
  </button>
);

const Sidebar = ({ company, currentView, setCurrentView, handleCompanyUpdate, mobileOpen, setMobileOpen, onSwitchRole }) => (
  <div className={`w-64 bg-white border-r border-teal-100 self-stretch flex flex-col shrink-0 ${mobileOpen ? 'flex fixed inset-0 z-40' : 'hidden'} md:flex md:relative`}>
    <div className="p-6 flex items-center gap-3">
      <div className="bg-emerald-500 text-white p-2 rounded-xl">
        <Heart size={24} />
      </div>
      <span className="text-xl font-bold text-teal-900 tracking-tight">ElderMatch</span>
    </div>

    <div className="px-4 pb-4">
      <div className="bg-teal-50 rounded-lg p-4 mb-4">
        <p className="text-sm font-semibold text-teal-900 truncate">{company.name || "Setup Profile"}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${company.tier === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
            {company.tier} Plan
          </span>
        </div>
      </div>
    </div>

    <nav className="flex-1 px-4 space-y-2">
      <NavItem icon={<Home size={20} />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => { setCurrentView('dashboard'); setMobileOpen(false); }} />
      <NavItem icon={<Search size={20} />} label="Discover Centers" active={currentView === 'discover'} onClick={() => { setCurrentView('discover'); setMobileOpen(false); }} />

      {company.tier === 'Premium' && (
        <NavItem
          icon={<Sparkles size={20} className="text-amber-500" />}
          label="AI Matching"
          active={currentView === 'match' || currentView === 'match_results'}
          onClick={() => { setCurrentView('match'); setMobileOpen(false); }}
          highlight
        />
      )}

      <NavItem icon={<ClipboardList size={20} />} label="Activity Log" active={currentView === 'activity_log'} onClick={() => { setCurrentView('activity_log'); setMobileOpen(false); }} />
      <NavItem icon={<FileText size={20} />} label="Impact Reports" active={currentView === 'report'} onClick={() => { setCurrentView('report'); setMobileOpen(false); }} />
      <NavItem icon={<Award size={20} />} label="Pricing & Plans" active={currentView === 'pricing'} onClick={() => { setCurrentView('pricing'); setMobileOpen(false); }} />
      <NavItem icon={<Building2 size={20} />} label="Company Profile" active={currentView === 'onboarding'} onClick={() => { setCurrentView('onboarding'); setMobileOpen(false); }} />
    </nav>

    <div className="p-4 border-t border-teal-100 space-y-2">
      <button
        onClick={onSwitchRole}
        className="w-full text-sm text-teal-600 hover:text-teal-800 font-medium py-2.5 rounded-lg hover:bg-teal-50 flex items-center justify-center gap-2 transition-colors"
      >
        <ArrowRight size={16} /> Switch to Host Portal
      </button>
      <button
        onClick={() => handleCompanyUpdate({ tier: company.tier === 'Free' ? 'Premium' : 'Free' })}
        className="w-full text-xs text-slate-400 hover:text-slate-600 font-medium py-1"
      >
        Toggle Tier (Dev: Currently {company.tier})
      </button>
    </div>
  </div>
);

const CheckboxList = ({ options, selected, onChange }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {options.map(option => (
      <label key={option} className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-colors ${selected.includes(option) ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
        <input
          type="checkbox"
          className="accent-emerald-600 w-4 h-4"
          checked={selected.includes(option)}
          onChange={() => onChange(option)}
        />
        <span className="text-sm font-medium">{option}</span>
      </label>
    ))}
  </div>
);

const OnboardingView = ({ company, handleCompanyUpdate, setCurrentView }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const toggleArrayItem = (field, item) => {
    const currentArray = company[field] || [];
    if (currentArray.includes(item)) {
      handleCompanyUpdate({ [field]: currentArray.filter(i => i !== item) });
    } else {
      handleCompanyUpdate({ [field]: [...currentArray, item] });
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1: return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-bold text-teal-900 mb-4">Step 1: Company Registration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
              <input type="text" value={company.name || ''} onChange={e => handleCompanyUpdate({ name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
              <input type="text" value={company.industry || ''} onChange={e => handleCompanyUpdate({ industry: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location / HQ</label>
              <input type="text" value={company.location || ''} onChange={e => handleCompanyUpdate({ location: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SET Symbol (Optional)</label>
              <input type="text" value={company.set_symbol || ''} onChange={e => handleCompanyUpdate({ set_symbol: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Registration Number</label>
              <input type="text" value={company.registration_no || ''} onChange={e => handleCompanyUpdate({ registration_no: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Size</label>
              <select value={company.size || 'Medium'} onChange={e => handleCompanyUpdate({ size: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                <option value="Small">{"Small (<50)"}</option>
                <option value="Medium">Medium (50-250)</option>
                <option value="Large">{"Large (>250)"}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Website</label>
              <input type="url" value={company.website || ''} onChange={e => handleCompanyUpdate({ website: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Number of Employees</label>
              <input type="number" value={company.employees || ''} onChange={e => handleCompanyUpdate({ employees: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-bold text-teal-900 mb-4">Step 2: CSR & ESG Profile</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">ESG Focus Areas</label>
            <CheckboxList
              options={["Environment", "Social", "Governance", "Community", "Health", "Education"]}
              selected={company.esg_focus || []}
              onChange={val => toggleArrayItem('esg_focus', val)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CSR Budget</label>
              <select value={company.budget_band || ''} onChange={e => handleCompanyUpdate({ budget_band: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                <option value="">Select Budget...</option>
                <option value="Under 20K">Under 20K</option>
                <option value="20K-50K">20K-50K</option>
                <option value="50K-100K">50K-100K</option>
                <option value="100K+">100K+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CSR Frequency</label>
              <select
                value={company.csr_frequency || ''}
                onChange={e => handleCompanyUpdate({ csr_frequency: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="">Select Frequency...</option>
                <option value="Monthly">Monthly Initiatives</option>
                <option value="Quarterly">Quarterly Events</option>
                <option value="Annual">Annual Day of Service</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Locations</label>
            <CheckboxList
              options={PROVINCES}
              selected={company.preferred_locations || []}
              onChange={val => toggleArrayItem('preferred_locations', val)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Activity Types</label>
            <CheckboxList
              options={ACTIVITY_CATEGORIES}
              selected={company.preferred_activities || []}
              onChange={val => toggleArrayItem('preferred_activities', val)}
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Free Text CSR Interests (Used for AI Match)</label>
             <textarea
                rows={3}
                value={company.csr_interests || ''}
                onChange={(e) => handleCompanyUpdate({ csr_interests: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              />
          </div>
        </div>
      );
      case 3: return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-bold text-teal-900 mb-4">Step 3: Employee Skills</h2>
          <p className="text-sm text-slate-600 mb-4">Select the primary skills your employee volunteers can offer.</p>
          <CheckboxList
            options={["IT / Technology", "Finance / Accounting", "HR / Recruiting", "Healthcare / First Aid", "Marketing / PR", "Foreign Languages", "Music / Entertainment", "Cooking / Nutrition"]}
            selected={company.employee_skills || []}
            onChange={val => toggleArrayItem('employee_skills', val)}
          />
        </div>
      );
      case 4: return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-bold text-teal-900 mb-4">Step 4: ESG Goals</h2>
          <p className="text-sm text-slate-600 mb-4">What outcomes are you hoping to achieve with elderly communities?</p>
          <div className="grid grid-cols-1 gap-3">
            {["Reduce elder loneliness and isolation", "Improve digital literacy and scam awareness", "Encourage physical activity", "Promote social participation across generations", "Support mental well-being and cognitive health"].map(goal => (
              <label key={goal} className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${company.esg_goals?.includes(goal) ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                <input
                  type="checkbox"
                  className="accent-emerald-600 w-5 h-5 mt-0.5"
                  checked={company.esg_goals?.includes(goal) || false}
                  onChange={() => toggleArrayItem('esg_goals', goal)}
                />
                <span className="text-sm font-medium">{goal}</span>
              </label>
            ))}
          </div>
        </div>
      );
      case 5: return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-bold text-teal-900 mb-4">Step 5: Reporting Preferences</h2>
          <div className="max-w-md">
            <label className="block text-sm font-medium text-slate-700 mb-2">Primary Reporting Standard</label>
            <select
              value={company.reporting_standard || ''}
              onChange={e => handleCompanyUpdate({ reporting_standard: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="">Select Standard...</option>
              <option value="SET ESG">SET ESG Ratings</option>
              <option value="GRI">GRI Standards</option>
              <option value="SDG">UN SDGs</option>
              <option value="Internal">Internal Framework</option>
            </select>
          </div>
        </div>
      );
      case 6: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xl font-bold text-teal-900 mb-4">Step 6: AI Matching Preferences</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Maximum Travel Distance (km): {company.max_distance || 50}</label>
            <input
              type="range" min="10" max="500" step="10"
              value={company.max_distance || 50}
              onChange={e => handleCompanyUpdate({ max_distance: e.target.value })}
              className="w-full accent-teal-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Center Urgency Preference</label>
            <select
              value={company.urgency || 'Medium'}
              onChange={e => handleCompanyUpdate({ urgency: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="High">Prioritize Critical Needs</option>
              <option value="Medium">Balanced Matching</option>
              <option value="Low">Long-term Sustainable Projects</option>
            </select>
          </div>

           <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Max Volunteer Capacity</label>
              <input type="number" value={company.volunteer_capacity || 0} onChange={e => handleCompanyUpdate({ volunteer_capacity: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-teal-900 mb-2">Company Profile Setup</h1>
        <p className="text-slate-600">Tell us about your organization to help us find the best community matches.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-teal-100 p-8">
        <div className="mb-8">
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="min-h-[300px]">
          {renderStep()}
        </div>

        <div className="pt-8 mt-4 border-t border-slate-100 flex justify-between">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'text-slate-600 bg-slate-100 hover:bg-slate-200'}`}
            disabled={step === 1}
          >
            Previous
          </button>

          {step < totalSteps ? (
            <button
              onClick={() => setStep(prev => Math.min(totalSteps, prev + 1))}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              Next <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm shadow-emerald-200"
            >
              Finish & Save <CheckCircle2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ActivityLogView = ({ sessions, setSessions }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    centerId: MOCK_CENTERS[0].id,
    activityType: ACTIVITY_CATEGORIES[0],
    attendanceCount: 20,
    volunteerHours: 40,
    engagementScore: 8,
    feedback: '',
    managerNotes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const center = MOCK_CENTERS.find(c => c.id === formData.centerId);
    const newSession = {
      ...formData,
      id: `session-${Date.now()}`,
      centerName: center ? center.name : 'Unknown Center'
    };
    setSessions(prev => [newSession, ...prev]);
    setFormData(prev => ({ ...prev, feedback: '', managerNotes: '' }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-teal-900 mb-2">Activity Log</h1>
        <p className="text-slate-600">Record completed volunteer sessions to generate your ESG impact data.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-teal-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <ClipboardList className="text-emerald-500" /> Log New Session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Center</label>
              <select required value={formData.centerId} onChange={e => setFormData({...formData, centerId: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none truncate">
                {MOCK_CENTERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Activity Type</label>
              <select required value={formData.activityType} onChange={e => setFormData({...formData, activityType: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                {ACTIVITY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Elderly Attendance</label>
              <input type="number" required min="1" value={formData.attendanceCount} onChange={e => setFormData({...formData, attendanceCount: parseInt(e.target.value)})} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Volunteer Hours</label>
              <input type="number" required min="1" value={formData.volunteerHours} onChange={e => setFormData({...formData, volunteerHours: parseInt(e.target.value)})} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Engagement Score (1-10): {formData.engagementScore}</label>
              <input type="range" min="1" max="10" step="1" value={formData.engagementScore} onChange={e => setFormData({...formData, engagementScore: parseInt(e.target.value)})} className="w-full accent-emerald-500 mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Participant Feedback</label>
              <textarea rows={3} value={formData.feedback} onChange={e => setFormData({...formData, feedback: e.target.value})} placeholder="Quotes or general feedback from seniors..." className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Manager Notes</label>
              <textarea rows={3} value={formData.managerNotes} onChange={e => setFormData({...formData, managerNotes: e.target.value})} placeholder="Internal notes for next time..." className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
              Save Session Log
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-teal-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
           <h3 className="font-bold text-teal-900">Recent Sessions</h3>
           <span className="text-sm text-slate-500">{sessions.length} records found</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Center</th>
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4 text-center">Impact (Elders / Hrs)</th>
                <th className="px-6 py-4 text-center">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No sessions logged yet. Submit the form above to start tracking.
                  </td>
                </tr>
              ) : (
                sessions.map(session => (
                  <tr key={session.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">{session.date}</td>
                    <td className="px-6 py-4 text-slate-700">{session.centerName}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{session.activityType}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600">
                      <span className="font-medium text-blue-600">{session.attendanceCount}</span> / <span className="font-medium text-amber-600">{session.volunteerHours}h</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                        {session.engagementScore}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({ company, setCurrentView, sessions }) => {
  const hasSessions = sessions && sessions.length > 0;
  const _totalPrograms = (analyticsData as any).summary.programInstances;
  const _totalCompanies = (analyticsData as any).summary.companies;
  const _acceptedProgs = (programsData as any[]).filter((p: any) => p.matchAccepted);
  const _totalHours = _acceptedProgs.reduce((sum: number, p: any) => sum + (p.volunteerHours || 0), 0);
  const _totalAttendance = _acceptedProgs.reduce((sum: number, p: any) => sum + (p.attendance || 0), 0);
  const activePrograms = hasSessions ? new Set(sessions.map(s => s.centerId)).size : _totalPrograms;
  const totalVolunteers = hasSessions ? sessions.reduce((sum, s) => sum + (Number(s.attendanceCount) || 0), 0) : _totalCompanies;
  const hoursContributed = hasSessions ? sessions.reduce((sum, s) => sum + (Number(s.volunteerHours) || 0), 0) : _totalHours;
  const eldersImpacted = hasSessions ? sessions.reduce((sum, s) => sum + (Number(s.attendanceCount) || 0), 0) : _totalAttendance;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-teal-900 mb-1">Welcome back, {company.name?.split(' ')[0]}</h1>
          <p className="text-slate-600">Here's your ESG impact overview for this year.</p>
        </div>
        <button
          onClick={() => setCurrentView(company.tier === 'Premium' ? 'match' : 'discover')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-emerald-200 flex items-center gap-2"
        >
          {company.tier === 'Premium' ? <><Sparkles size={18} /> Start AI Match</> : <><Search size={18} /> Find Centers</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Programs', value: activePrograms, icon: <Activity size={24} className="text-emerald-500" /> },
          { label: 'Total Volunteers', value: totalVolunteers, icon: <Users size={24} className="text-blue-500" /> },
          { label: 'Hours Contributed', value: hoursContributed.toLocaleString(), icon: <Clock size={24} className="text-amber-500" /> },
          { label: 'Elders Impacted', value: eldersImpacted.toLocaleString(), icon: <Heart size={24} className="text-rose-500" /> },
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

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-teal-50 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-teal-900">Engagement & Attendance Trends</h3>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_SESSION_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend />
              <Line type="monotone" name="Engagement Score" dataKey="engagement" stroke="#059669" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              <Line type="monotone" name="Attendance (%)" dataKey="attendance" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-teal-50 shadow-sm">
        <h3 className="text-lg font-bold text-teal-900 mb-6">Recent Programs</h3>
        <div className="space-y-4">
          {MOCK_HISTORICAL_PROGRAMS.slice(0, 4).map(prog => {
            const center = MOCK_CENTERS.find(c => c.id === prog.centerId);
            return (
              <div key={prog.id} className="p-4 rounded-xl border border-slate-100 hover:border-teal-100 transition-colors bg-slate-50/50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-800 line-clamp-1">{prog.name}</h4>
                  <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">{prog.status}</span>
                </div>
                <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
                  <MapPin size={14} /> {center?.name}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Users size={12}/> {prog.totalVolunteers} vols</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400"/> {prog.impactScore} impact</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>
  );
};

const CenterCard = ({ center, onSelect, premiumData }) => (
  <div className="bg-white rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full overflow-hidden group">
    {premiumData && (
      <div className="bg-emerald-600 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-white font-medium text-sm">
          <Sparkles size={16} /> AI Match
        </div>
        <div className="bg-white/20 px-2 py-0.5 rounded text-white text-xs font-bold">
          {premiumData.matchScore}% Fit
        </div>
      </div>
    )}
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-teal-900 leading-tight group-hover:text-emerald-700 transition-colors">{center.name}</h3>
      </div>

      <div className="flex items-center gap-3 text-sm text-slate-600 mb-4 font-medium">
        <span className="flex items-center gap-1"><MapPin size={14} className="text-emerald-500"/> {center.province}</span>
        <span className="flex items-center gap-1"><Users size={14} className="text-emerald-500"/> {center.resident_count} Elders</span>
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">
        {center.need_description}
      </p>

      {premiumData && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 mb-4">
          <p className="text-xs text-emerald-800 font-medium italic">
            " {premiumData.matchReason} "
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
        {center.activity_categories.map(cat => (
          <span key={cat} className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
            {cat}
          </span>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-2.5 rounded-xl font-medium transition-colors border ${
          premiumData
            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200'
            : 'bg-white text-teal-700 hover:bg-teal-50 border-teal-200'
        }`}
      >
        View & Commit
      </button>
    </div>
  </div>
);

const DiscoverView = ({ company, setCurrentView, searchQuery, setSearchQuery, selectedProvince, setSelectedProvince, selectedCategory, setSelectedCategory, filteredCenters, openCommitModal }) => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div>
      <h1 className="text-3xl font-bold text-teal-900 mb-2">Discover Centers</h1>
      <p className="text-slate-600">Browse and filter elderly care centers needing support across Thailand.</p>
      {company.tier === 'Premium' && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-amber-500" />
            <div>
              <p className="font-semibold text-amber-900 text-sm">You have Premium AI Matching available.</p>
              <p className="text-amber-700 text-xs">Let our AI find the best centers based on your exact ESG goals.</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('match')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            Use AI Match
          </button>
        </div>
      )}
    </div>

    <div className="bg-white p-4 rounded-xl border border-teal-100 shadow-sm flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search centers by name or needs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>
      <div className="flex gap-4">
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 font-medium"
        >
          <option value="All">All Provinces</option>
          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 font-medium"
        >
          <option value="All">All Activities</option>
          {ACTIVITY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCenters.map(center => (
        <CenterCard key={center.id} center={center} onSelect={() => openCommitModal(center)} />
      ))}
    </div>
    {filteredCenters.length === 0 && (
      <div className="text-center py-20">
        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="text-slate-400" size={24} />
        </div>
        <h3 className="text-lg font-medium text-slate-900">No centers found</h3>
        <p className="text-slate-500 mt-1">Try adjusting your filters to see more results.</p>
      </div>
    )}
  </div>
);

const MatchInputView = ({ company, handleCompanyUpdate, runAIMatch, isMatching }) => (
  <div className="max-w-2xl mx-auto py-12 animate-in fade-in duration-500">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-500 mb-6">
        <Sparkles size={32} />
      </div>
      <h1 className="text-3xl font-bold text-teal-900 mb-4">AI Center Matching</h1>
      <p className="text-slate-600 text-lg">
        Describe your ideal CSR initiative, and our AI will find the elderly centers that perfectly align with your goals.
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg border border-teal-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
      <label className="block text-sm font-semibold text-slate-700 mb-3">Your CSR & ESG Interests</label>
      <textarea
        rows={6}
        value={company.csr_interests || ''}
        onChange={(e) => handleCompanyUpdate({ csr_interests: e.target.value })}
        placeholder="E.g., We want to provide digital literacy training and help renovate facilities..."
        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none text-lg leading-relaxed bg-slate-50 focus:bg-white"
      />

      <button
        onClick={runAIMatch}
        disabled={isMatching || (company.csr_interests || '').length < 10}
        className="w-full mt-6 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md shadow-teal-200 flex items-center justify-center gap-2"
      >
        {isMatching ? (
          <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Analyzing Needs...</>
        ) : (
          <><Search size={20} /> Find Perfect Matches</>
        )}
      </button>
    </div>
  </div>
);

const MatchResultsView = ({ company, matchedCenters, openCommitModal, setCurrentView }) => {
  const [threshold, setThreshold] = useState(50);
  const displayedCenters = matchedCenters.filter(c => c.matchScore >= threshold);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-teal-900 mb-2">Top AI Matches</h1>
          <p className="text-slate-600">Based on your interest: <span className="italic">"{(company.csr_interests || '').substring(0, 50)}..."</span></p>
        </div>
        <button
          onClick={() => setCurrentView('match')}
          className="text-teal-600 hover:text-teal-800 font-medium text-sm flex items-center gap-1 whitespace-nowrap"
        >
          Edit Request
        </button>
      </div>

      <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm max-w-xl">
        <label className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
          <span>Minimum Match Confidence:</span>
          <span className="text-teal-600">{threshold}%</span>
        </label>
        <input
          type="range" min="0" max="100" step="5"
          value={threshold}
          onChange={(e) => setThreshold(parseInt(e.target.value))}
          className="w-full accent-teal-600"
        />
      </div>

      {displayedCenters.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No strong matches right now</h3>
          <p className="text-slate-500">Try lowering your minimum match confidence threshold.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCenters.slice(0, 5).map((center, index) => (
            <div key={center.id} className="relative animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
              {center.matchScore >= 70 && index === 0 && (
                <div className="absolute -top-3 -right-3 z-10 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border-2 border-white">
                  <Award size={14} /> Best Fit
                </div>
              )}
              <CenterCard
                center={center}
                onSelect={() => openCommitModal(center)}
                premiumData={{ matchScore: center.matchScore, matchReason: center.matchReason }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReportView = ({ company, handleCompanyUpdate, sessions }) => {
  const [reportPurpose, setReportPurpose] = useState('ESG Disclosure');
  const [esgStandard, setEsgStandard] = useState('SET ESG Ratings');
  const [reportTimestamp, setReportTimestamp] = useState(new Date().toLocaleString());

  const regenerateReport = () => {
    setReportTimestamp(new Date().toLocaleString());
  };

  const hasSessions = sessions && sessions.length > 0;
  const totalHours = hasSessions ? sessions.reduce((sum, s) => sum + (Number(s.volunteerHours) || 0), 0) : '1,440';
  const totalAttendance = hasSessions ? sessions.reduce((sum, s) => sum + (Number(s.attendanceCount) || 0), 0) : '280';
  const avgEngagement = hasSessions ? Math.round(sessions.reduce((sum, s) => sum + (Number(s.engagementScore) || 0), 0) / sessions.length * 10) : '94';
  const centersEngaged = hasSessions ? new Set(sessions.map(s => s.centerId)).size : '88';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-teal-900 mb-2">Impact Reporting</h1>
          <p className="text-slate-600">Generate reports for your stakeholders and ESG disclosures.</p>
        </div>
        {company.tier === 'Premium' && (
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2">
            <Download size={18} /> Export Full ESG Pack
          </button>
        )}
      </div>

      {company.tier === 'Free' ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center max-w-2xl mx-auto mt-12">
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <ShieldCheck className="text-slate-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Basic Reporting Available</h2>
          <p className="text-slate-600 mb-6">Your current plan includes basic activity metrics on the dashboard. Upgrade to Premium for exportable, ESG-ready narrative reports.</p>
          <button
            onClick={() => handleCompanyUpdate({tier: 'Premium'})}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Upgrade to Premium
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 flex flex-col md:flex-row gap-4 items-end">
               <div className="flex-1 w-full">
                 <label className="block text-sm font-medium text-slate-700 mb-1">Report Purpose</label>
                 <select value={reportPurpose} onChange={e => setReportPurpose(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                   <option>ESG Disclosure</option>
                   <option>Internal CSR Report</option>
                   <option>Annual Sustainability Report</option>
                 </select>
               </div>
               <div className="flex-1 w-full">
                 <label className="block text-sm font-medium text-slate-700 mb-1">ESG Standard</label>
                 <select value={esgStandard} onChange={e => setEsgStandard(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none">
                   <option>SET ESG Ratings</option>
                   <option>GRI</option>
                   <option>SDGs</option>
                   <option>Integrated Report</option>
                 </select>
               </div>
               <button onClick={regenerateReport} className="w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap">
                 Regenerate Report
               </button>
            </div>

            <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-teal-900 flex items-center gap-2">
                  <FileText className="text-emerald-500"/> {reportPurpose} ({esgStandard})
                </h3>
                <span className="text-xs text-slate-400 font-medium">Generated: {reportTimestamp}</span>
              </div>
              <div className="prose prose-teal max-w-none">
                <p className="text-slate-600 leading-relaxed">
                  During Q2 2025, <strong>{company.name || "the company"}</strong> successfully executed community initiatives targeting elderly demographics.
                  These programs directly aligned with UN SDG Goal 3 (Good Health and Well-being) and Goal 10 (Reduced Inequalities).
                </p>
                <div className="my-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="font-semibold text-emerald-900 mb-2">Key Social Impact (S-Pillar):</h4>
                  <ul className="list-disc pl-5 text-sm text-emerald-800 space-y-1">
                    <li>Provided {totalHours.toLocaleString?.() || totalHours} hours of volunteer service.</li>
                    <li>Directly improved the daily lives of {totalAttendance.toLocaleString?.() || totalAttendance} elderly residents.</li>
                    <li>Achieved an average beneficiary satisfaction score of {avgEngagement}%.</li>
                    <li>{hasSessions ? `Engaged with ${centersEngaged} unique center(s) across programs.` : `Maintained 88% average volunteer attendance across programs.`}</li>
                  </ul>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  The flagship program focused on impactful engagement, effectively bridging gaps for seniors,
                  enabling them to access better care and maintain community connections.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-5 rounded-2xl border border-teal-100 flex items-center gap-4 cursor-pointer hover:border-emerald-300 transition-colors">
                  <div className="bg-rose-100 p-3 rounded-xl text-rose-600"><FileText size={24}/></div>
                  <div>
                    <p className="font-bold text-slate-800">PDF Report</p>
                    <p className="text-xs text-slate-500">Board-ready format</p>
                  </div>
               </div>
               <div className="bg-white p-5 rounded-2xl border border-teal-100 flex items-center gap-4 cursor-pointer hover:border-emerald-300 transition-colors">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><FileText size={24}/></div>
                  <div>
                    <p className="font-bold text-slate-800">Word Document</p>
                    <p className="text-xs text-slate-500">Editable format</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">
              <h3 className="font-bold text-teal-900 mb-4">Report History</h3>
              <div className="space-y-3">
                {['Q1 2025 Impact Report', '2024 Annual ESG Summary', 'Q4 2024 Highlights'].map((rep, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <FileText size={16} className="text-slate-400" /> {rep}
                    </div>
                    <Download size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FactorBar = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
      <span>{label}</span>
      <span>{value}/100</span>
    </div>
    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-teal-500 transition-all duration-500 ease-out rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const CommitModal = ({
  selectedCenter, company, setShowCommitModal, setSelectedCenter, setCurrentView,
  frequency, setFrequency, duration, setDuration, volunteers, setVolunteers,
  isConfirmed, setIsConfirmed
}) => {


  if (!selectedCenter) return null;

  if (isConfirmed) {
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-teal-900 mb-2">Program Confirmed!</h2>
          <p className="text-slate-600 mb-8">
            You have successfully committed to a {frequency.toLowerCase()} program with {selectedCenter.name}. They will be notified shortly.
          </p>
          <button
            onClick={() => { setShowCommitModal(false); setSelectedCenter(null); setCurrentView('dashboard'); }}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const centerContact =
    CENTER_CONTACTS[selectedCenter.id] || CENTER_CONTACTS.default;
  const isFallback = !CENTER_CONTACTS[selectedCenter.id];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden animate-in slide-in-from-bottom-8 duration-300 my-auto shadow-2xl max-h-[90vh]">

        <div className="w-full p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-900">Program Setup</h2>
            <button onClick={() => setShowCommitModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>

          <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-1">{selectedCenter.name}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14}/> {selectedCenter.province}</p>
          </div>

          <div className="mb-6 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-emerald-50 overflow-hidden shadow-sm">
            <div className="px-5 py-4 bg-gradient-to-r from-teal-700 to-emerald-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-white">
                <Contact size={18} />
                <h3 className="font-bold tracking-tight">Stakeholder Contact</h3>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-teal-100 bg-white/15 px-2.5 py-1 rounded-full">
                CSR Partnership
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-start gap-4 pb-4 mb-4 border-b border-teal-100">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
                  <User size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-teal-600">Primary Contact</p>
                  <p className="font-bold text-slate-800 truncate">{centerContact.contactPerson}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Briefcase size={13} className="text-slate-400" /> {centerContact.contactRole}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Direct Phone</p>
                    <p className="text-sm font-semibold text-slate-800">{centerContact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Email</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{centerContact.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                    <MessageCircle size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">LINE Contact</p>
                    <p className="text-sm font-semibold text-slate-800">{centerContact.lineId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <MessageSquare size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Preferred Method</p>
                    <p className="text-sm font-semibold text-slate-800">{centerContact.preferredMethod}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:col-span-2">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Best Contact Hours</p>
                    <p className="text-sm font-semibold text-slate-800">{centerContact.contactHours}</p>
                  </div>
                </div>
              </div>

              {isFallback && (
                <div className="mt-4 pt-4 border-t border-dashed border-teal-200 flex items-start gap-2.5">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-700">Using fallback contact details</p>
                    <p className="text-xs text-amber-600 leading-relaxed mt-0.5">
                      Center-specific contact information is unavailable. These are default partnership channels — confirm directly before scheduling.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Frequency</label>
              <div className="grid grid-cols-3 gap-2">
                {['One-time', 'Monthly', 'Weekly'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors ${frequency === f ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {['1 Month', '3 Months', '6 Months'].map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    disabled={frequency === 'One-time'}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors ${frequency === 'One-time' ? 'opacity-50 cursor-not-allowed bg-slate-50' : duration === d ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Expected Volunteers per Session: {volunteers}
              </label>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={volunteers}
                onChange={(e) => setVolunteers(parseInt(e.target.value))}
                className="w-full accent-teal-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>5</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsConfirmed(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm"
            >
              Confirm Commitment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingView = ({ company, handleCompanyUpdate }) => {
  const features = [
    { name: 'Signup & Dashboard', free: true, premium: true },
    { name: 'Optional CSR Profile', free: true, premium: true },
    { name: 'Verified CSR Badge', free: true, premium: true },
    { name: 'Browse Centers (Filters)', free: true, premium: true },
    { name: 'Commitment Flow', free: true, premium: true },
    { name: 'Activity Log', free: true, premium: true },
    { name: 'Basic CSR Report + Metrics', free: true, premium: true },
    { name: 'AI Matching Engine', free: false, premium: true },
    { name: 'Match Reasoning (1-line)', free: false, premium: true },
    { name: 'Confidence Slider', free: false, premium: true },
    { name: 'Report Purpose Selector', free: false, premium: true },
    { name: 'ESG-Ready Narrative', free: false, premium: true },
    { name: 'Company Branding', free: false, premium: true },
    { name: 'PDF / Word Export', free: false, premium: true },
    { name: 'Report History', free: false, premium: true },
  ];

  const Cell = ({ on }) => on
    ? <CheckCircle2 className="text-emerald-500 mx-auto" size={20} />
    : <span className="text-slate-300 block text-center">—</span>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-teal-900 mb-2">Choose Your Plan</h1>
        <p className="text-slate-600">Start free. Upgrade to Premium for AI matching, engagement prediction, and ESG-ready reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-white rounded-2xl border-2 p-6 ${company.tier === 'Free' ? 'border-emerald-500 shadow-lg' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-800">Free</h2>
            {company.tier === 'Free' && <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Current</span>}
          </div>
          <p className="text-3xl font-black text-slate-900 mb-1">฿0<span className="text-sm font-medium text-slate-400">/mo</span></p>
          <p className="text-sm text-slate-500 mb-4">Browse centers & log impact manually.</p>
          <button onClick={() => handleCompanyUpdate({ tier: 'Free' })} className="w-full py-2.5 rounded-xl font-medium border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
            {company.tier === 'Free' ? 'Active Plan' : 'Switch to Free'}
          </button>
        </div>

        <div className={`bg-white rounded-2xl border-2 p-6 relative ${company.tier === 'Premium' ? 'border-amber-400 shadow-lg' : 'border-slate-200'}`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={12} /> Most Popular
          </div>
          <div className="flex items-center justify-between mb-2 mt-2">
            <h2 className="text-xl font-bold text-teal-900">Premium</h2>
            {company.tier === 'Premium' && <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Current</span>}
          </div>
          <p className="text-3xl font-black text-teal-900 mb-1">฿4,900<span className="text-sm font-medium text-slate-400">/mo</span></p>
          <p className="text-sm text-slate-500 mb-4">AI matching, prediction & ESG reports.</p>
          <button onClick={() => handleCompanyUpdate({ tier: 'Premium' })} className="w-full py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm">
            {company.tier === 'Premium' ? 'Active Plan' : 'Upgrade to Premium'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-teal-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-slate-700">Feature</th>
              <th className="px-6 py-4 text-center font-semibold text-slate-600 w-28">Free</th>
              <th className="px-6 py-4 text-center font-semibold text-teal-700 w-28">Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {features.map((f, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-3 text-slate-700 font-medium">{f.name}</td>
                <td className="px-6 py-3"><Cell on={f.free} /></td>
                <td className="px-6 py-3 bg-emerald-50/30"><Cell on={f.premium} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LandingView = ({ setCurrentView, setRole }) => (
  <>
  <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex flex-col items-center justify-center p-6">
    <div className="max-w-5xl w-full text-center space-y-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-teal-100">
        <Heart className="text-emerald-500" size={16} />
        <span className="text-sm font-medium text-teal-800">AI-Powered CSR Platform</span>
      </div>

      <h1 className="text-5xl md:text-6xl font-black text-teal-900 leading-tight">
        Connect CSR Budget to<br/>Elderly Care Impact
      </h1>

      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Match Thai companies with elderly day care centers.
        Auto-generate ESG reports. Predict engagement before you commit.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
        <button
          onClick={() => { setRole('company'); setCurrentView('signup'); }}
          className="group bg-white rounded-3xl p-8 text-left border-2 border-teal-100 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <Building2 size={28} />
          </div>
          <h3 className="text-xl font-bold text-teal-900 mb-2">I'm a Company</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Find elderly care centers that match your ESG goals, predict engagement, and generate impact reports.
          </p>
          <span className="text-sm font-bold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Enter Company Portal <ArrowRight size={16} />
          </span>
        </button>

        <button
          onClick={() => { setRole('host'); setCurrentView('host_dashboard'); }}
          className="group bg-white rounded-3xl p-8 text-left border-2 border-teal-100 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <Heart size={28} />
          </div>
          <h3 className="text-xl font-bold text-teal-900 mb-2">I'm an Elder Care Center</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Publish support needs, receive applications from companies, schedule volunteers, and track your impact.
          </p>
          <span className="text-sm font-bold text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Enter Host Portal <ArrowRight size={16} />
          </span>
        </button>

        <button
          onClick={() => { setRole('admin'); setCurrentView('admin_dashboard'); }}
          className="group bg-white rounded-3xl p-8 text-left border-2 border-teal-100 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <BarChart3 size={28} />
          </div>
          <h3 className="text-xl font-bold text-teal-900 mb-2">I'm an Admin</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            View platform-wide analytics, KPIs, churn risk, and benchmark performance across all CSR programs.
          </p>
          <span className="text-sm font-bold text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Enter Admin Portal <ArrowRight size={16} />
          </span>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <button
          onClick={() => { setRole('company'); setCurrentView('dashboard'); }}
          className="text-teal-700 hover:text-teal-900 px-6 py-2.5 rounded-xl font-medium border border-teal-200 bg-white/60 hover:bg-white transition-all"
        >
          View Company Demo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
        {[
          { num: "20%+", label: "Thai population aged 60+" },
          { num: "23%", label: "Seniors living alone" },
          { num: "224", label: "SET companies must report ESG" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm">
            <div className="text-4xl font-black text-emerald-600 mb-2">{stat.num}</div>
            <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  <ContactSection />
  <AppFooter />
  </>
);

const SignUpView = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tier, setTier] = useState('Premium');
  const [agreed, setAgreed] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!agreed) return;
    setCurrentView('verification');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 border border-teal-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-2xl mb-4">
            <Heart size={28} />
          </div>
          <h1 className="text-2xl font-bold text-teal-900 mb-1">Create Your Account</h1>
          <p className="text-sm text-slate-600">Join the ElderMatch CSR platform</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.co.th"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password" required minLength={6} value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Choose Your Plan</label>
            <div className="grid grid-cols-2 gap-3">
              {['Free', 'Premium'].map(t => (
                <button
                  type="button" key={t}
                  onClick={() => setTier(t)}
                  className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                    tier === t
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {t === 'Premium' && <Sparkles size={14} className="inline mr-1 text-amber-500" />}
                  {t}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox" checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-0.5 accent-emerald-600"
            />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <button
            type="submit" disabled={!agreed}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-colors"
          >
            Create Account
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentView('landing')}
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const VerificationView = ({ setCurrentView }) => {
  const [setSymbol, setSetSymbol] = useState('');
  const [regNo, setRegNo] = useState('');
  const [fileName, setFileName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) setFileName(f.name);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center border border-teal-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-bold text-teal-900 mb-2">Business Verified!</h1>
          <p className="text-slate-600 mb-8">
            Your business documents have been verified. You can now set up your company profile.
          </p>
          <button
            onClick={() => setCurrentView('onboarding')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors"
          >
            Continue to Profile Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 border border-teal-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 text-amber-500 rounded-2xl mb-4">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-bold text-teal-900 mb-1">Business Verification</h1>
          <p className="text-sm text-slate-600">Verify your company to unlock all features</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SET Listed Symbol (optional)</label>
            <input
              type="text" value={setSymbol}
              onChange={e => setSetSymbol(e.target.value)}
              placeholder="e.g. CPF, PTT, SCB"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Registration Number</label>
            <input
              type="text" required value={regNo}
              onChange={e => setRegNo(e.target.value)}
              placeholder="13-digit number"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Upload Registration Document</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors">
              <FileText className="text-slate-400 mb-2" size={28} />
              <span className="text-sm text-slate-600 font-medium">
                {fileName || 'Click to upload PDF or Image'}
              </span>
              <input type="file" accept=".pdf,.jpg,.png" onChange={handleFile} className="hidden" />
            </label>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 flex items-start gap-2">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <span>Your data is encrypted and only used for compliance verification.</span>
          </div>

          <button
            type="submit" disabled={isVerifying}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Verifying...</>
            ) : (
              <>Verify Business <ArrowRight size={18} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function ElderMatchApp() {
  const [role, setRole] = useState<'none' | 'company' | 'host' | 'admin'>('none');
  const [currentView, setCurrentView] = useState('landing');
  const [company, setCompany] = useState(MOCK_COMPANY);
  const [sessions, setSessions] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [matchedCenters, setMatchedCenters] = useState([]);
  const [isMatching, setIsMatching] = useState(false);

  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [commitFrequency, setCommitFrequency] = useState('Monthly');
  const [commitDuration, setCommitDuration] = useState('3 Months');
  const [commitVolunteers, setCommitVolunteers] = useState(20);
  const [commitIsConfirmed, setCommitIsConfirmed] = useState(false);

  const filteredCenters = useMemo(() => {
    return MOCK_CENTERS.filter(center => {
      const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            center.need_description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProvince = selectedProvince === 'All' || center.province === selectedProvince;
      const matchesCategory = selectedCategory === 'All' || center.activity_categories.includes(selectedCategory);
      return matchesSearch && matchesProvince && matchesCategory;
    });
  }, [searchQuery, selectedProvince, selectedCategory]);

  const handleCompanyUpdate = (updates) => {
    setCompany(prev => ({ ...prev, ...updates }));
  };

  const runAIMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      const results = performSemanticMatch(company.csr_interests || '', MOCK_CENTERS);
      setMatchedCenters(results);
      setIsMatching(false);
      setCurrentView('match_results');
    }, 1500);
  };

  const openCommitModal = (center) => {
    setSelectedCenter(center);
    setCommitFrequency('Monthly');
    setCommitDuration('3 Months');
    setCommitVolunteers(20);
    setCommitIsConfirmed(false);
    setShowCommitModal(true);
  };

  const switchToHost = () => {
    setRole('host');
    setCurrentView('host_dashboard');
  };

  const switchToCompany = () => {
    setRole('none');
    setCurrentView('landing');
  };

  if (role === 'host') {
    return <HostPortal onSwitchRole={switchToCompany} />;
  }

  if (role === 'admin') {
    return <AdminDashboard onBack={switchToCompany} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {!['landing', 'signup', 'verification'].includes(currentView) && (
        <Sidebar
          company={company}
          currentView={currentView}
          setCurrentView={setCurrentView}
          handleCompanyUpdate={handleCompanyUpdate}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
          onSwitchRole={switchToHost}
        />
      )}

      <main className="flex-1 flex flex-col min-h-screen">
        {!['landing', 'signup', 'verification'].includes(currentView) && (
        <header className="md:hidden bg-white border-b border-teal-100 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-emerald-500" />
            <span className="font-bold text-teal-900">ElderMatch</span>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="text-slate-500 font-medium">Menu</button>
        </header>
        )}

        <div className={`flex-1 ${['landing','signup','verification'].includes(currentView) ? '' : 'p-6 md:p-10'}`}>
          {currentView === 'landing' && <LandingView setCurrentView={setCurrentView} setRole={setRole} />}
          {currentView === 'signup' && <SignUpView setCurrentView={setCurrentView} />}
          {currentView === 'verification' && <VerificationView setCurrentView={setCurrentView} />}
          {currentView === 'onboarding' && (
            <OnboardingView company={company} handleCompanyUpdate={handleCompanyUpdate} setCurrentView={setCurrentView} />
          )}
          {currentView === 'dashboard' && (
            <DashboardView company={company} setCurrentView={setCurrentView} sessions={sessions} />
          )}
          {currentView === 'discover' && (
            <DiscoverView
              company={company} setCurrentView={setCurrentView} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              selectedProvince={selectedProvince} setSelectedProvince={setSelectedProvince}
              selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
              filteredCenters={filteredCenters} openCommitModal={openCommitModal}
            />
          )}
          {currentView === 'match' && (
            <MatchInputView company={company} handleCompanyUpdate={handleCompanyUpdate} runAIMatch={runAIMatch} isMatching={isMatching} />
          )}
          {currentView === 'match_results' && (
            <MatchResultsView company={company} matchedCenters={matchedCenters} openCommitModal={openCommitModal} setCurrentView={setCurrentView} />
          )}
          {currentView === 'activity_log' && (
            <ActivityLogView sessions={sessions} setSessions={setSessions} />
          )}
          {currentView === 'report' && (
            <ReportView company={company} handleCompanyUpdate={handleCompanyUpdate} sessions={sessions} />
          )}
          {currentView === 'pricing' && (
            <PricingView company={company} handleCompanyUpdate={handleCompanyUpdate} />
          )}
        </div>
      </main>

      <SupportWidget />

      {showCommitModal && (
        <CommitModal
          selectedCenter={selectedCenter} company={company} setShowCommitModal={setShowCommitModal} setSelectedCenter={setSelectedCenter}
          setCurrentView={setCurrentView} frequency={commitFrequency} setFrequency={setCommitFrequency}
          duration={commitDuration} setDuration={setCommitDuration} volunteers={commitVolunteers} setVolunteers={setCommitVolunteers}
          isConfirmed={commitIsConfirmed} setIsConfirmed={setCommitIsConfirmed}
        />
      )}
    </div>
  );
}
