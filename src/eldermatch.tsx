import React, { useState, useMemo } from 'react';
import { 
  Heart, Users, Building2, Search, ChevronRight, 
  CheckCircle2, Sparkles, FileText, Download, 
  MapPin, Clock, Star, ArrowRight, ShieldCheck, 
  Activity, Award, Zap, Home, ClipboardList
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

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
    contactRole: 'CSR Liaison',
    phone: '080-000-0000',
    email: 'contact@eldercenter.or.th',
    lineId: '@eldercenter',
    contactHours: '09:00 - 17:00'
  },

  c1: {
    contactPerson: 'Suda Chanthong',
    contactRole: 'Center Director',
    phone: '081-234-5678',
    email: 'suda@bankhae.or.th',
    lineId: '@bankhae',
    contactHours: '09:00 - 17:00'
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

const MOCK_HISTORICAL_PROGRAMS = [
  { id: 'p1', centerId: 'c1', name: 'Digital Seniors 2024', status: 'Completed', startDate: '2024-01-15', endDate: '2024-06-15', totalVolunteers: 45, totalHours: 360, impactScore: 85 },
  { id: 'p2', centerId: 'c11', name: 'Thonburi Revamp', status: 'Completed', startDate: '2024-03-01', endDate: '2024-03-02', totalVolunteers: 60, totalHours: 480, impactScore: 92 },
  { id: 'p3', centerId: 'c5', name: 'Cyber Safe Seniors', status: 'Completed', startDate: '2024-08-10', endDate: '2024-11-10', totalVolunteers: 30, totalHours: 240, impactScore: 88 },
  { id: 'p4', centerId: 'c2', name: 'Health First Q1', status: 'Completed', startDate: '2025-01-10', endDate: '2025-03-30', totalVolunteers: 20, totalHours: 160, impactScore: 78 },
  { id: 'p5', centerId: 'c8', name: 'Udon Tech Connect', status: 'Completed', startDate: '2025-05-05', endDate: '2025-08-05', totalVolunteers: 25, totalHours: 200, impactScore: 82 },
];

const MOCK_SESSION_DATA = [
  { month: 'Jan', attendance: 65, engagement: 70 },
  { month: 'Feb', attendance: 75, engagement: 75 },
  { month: 'Mar', attendance: 82, engagement: 80 },
  { month: 'Apr', attendance: 78, engagement: 85 },
  { month: 'May', attendance: 85, engagement: 88 },
  { month: 'Jun', attendance: 90, engagement: 92 },
];

const pastPrograms = [
  { activity: "Music Therapy", centerSize: "Medium", industry: "Banking", frequency: "Weekly", attendanceRate: 88, engagementScore: 84 },
  { activity: "Music Therapy", centerSize: "Small", industry: "Tech", frequency: "Monthly", attendanceRate: 75, engagementScore: 70 },
  { activity: "Music Therapy", centerSize: "Large", industry: "FMCG", frequency: "Weekly", attendanceRate: 91, engagementScore: 89 },
  { activity: "Cognitive Games",centerSize: "Medium", industry: "Retail", frequency: "Weekly", attendanceRate: 82, engagementScore: 78 },
  { activity: "Cognitive Games",centerSize: "Small", industry: "Insurance", frequency: "One-time", attendanceRate: 65, engagementScore: 58 },
  { activity: "Cognitive Games",centerSize: "Large", industry: "Tech", frequency: "Monthly", attendanceRate: 79, engagementScore: 74 },
  { activity: "Light Exercise", centerSize: "Medium", industry: "Manufacturing", frequency: "Weekly", attendanceRate: 85, engagementScore: 80 },
  { activity: "Light Exercise", centerSize: "Small", industry: "Banking", frequency: "One-time", attendanceRate: 68, engagementScore: 60 },
  { activity: "Light Exercise", centerSize: "Large", industry: "FMCG", frequency: "Monthly", attendanceRate: 77, engagementScore: 72 },
  { activity: "Tech Literacy", centerSize: "Medium", industry: "Tech", frequency: "Weekly", attendanceRate: 90, engagementScore: 88 },
  { activity: "Tech Literacy", centerSize: "Small", industry: "Retail", frequency: "One-time", attendanceRate: 62, engagementScore: 55 },
  { activity: "Tech Literacy", centerSize: "Large", industry: "Insurance", frequency: "Monthly", attendanceRate: 80, engagementScore: 76 },
  { activity: "Art Therapy", centerSize: "Medium", industry: "FMCG", frequency: "Weekly", attendanceRate: 87, engagementScore: 83 },
  { activity: "Art Therapy", centerSize: "Small", industry: "Manufacturing", frequency: "Monthly", attendanceRate: 71, engagementScore: 66 },
  { activity: "Language Class", centerSize: "Large", industry: "Banking", frequency: "Weekly", attendanceRate: 89, engagementScore: 85 },
  { activity: "Language Class", centerSize: "Medium", industry: "Tech", frequency: "One-time", attendanceRate: 66, engagementScore: 59 },
];

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

const Sidebar = ({ company, currentView, setCurrentView, handleCompanyUpdate }) => (
  <div className="w-64 bg-white border-r border-teal-100 min-h-screen flex flex-col hidden md:flex shrink-0">
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

    <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
      <NavItem icon={<Home size={20} />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
      <NavItem icon={<Search size={20} />} label="Discover Centers" active={currentView === 'discover'} onClick={() => setCurrentView('discover')} />
      
      {company.tier === 'Premium' && (
        <NavItem 
          icon={<Sparkles size={20} className="text-amber-500" />} 
          label="AI Matching" 
          active={currentView === 'match' || currentView === 'match_results'} 
          onClick={() => setCurrentView('match')} 
          highlight
        />
      )}
      
      <NavItem icon={<ClipboardList size={20} />} label="Activity Log" active={currentView === 'activity_log'} onClick={() => setCurrentView('activity_log')} />
      <NavItem icon={<FileText size={20} />} label="Impact Reports" active={currentView === 'report'} onClick={() => setCurrentView('report')} />
      <NavItem icon={<Building2 size={20} />} label="Company Profile" active={currentView === 'onboarding'} onClick={() => setCurrentView('onboarding')} />
    </nav>
    
    <div className="p-4 border-t border-teal-100">
      <button 
        onClick={() => handleCompanyUpdate({ tier: company.tier === 'Free' ? 'Premium' : 'Free' })}
        className="w-full text-sm text-teal-600 hover:text-teal-800 font-medium py-2"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
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
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">CSR Frequency</label>
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
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
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

const DashboardView = ({ company, setCurrentView }) => (
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
        { label: 'Active Programs', value: '2', icon: <Activity size={24} className="text-emerald-500" /> },
        { label: 'Total Volunteers', value: '155', icon: <Users size={24} className="text-blue-500" /> },
        { label: 'Hours Contributed', value: '1,440', icon: <Clock size={24} className="text-amber-500" /> },
        { label: 'Elders Impacted', value: '280', icon: <Heart size={24} className="text-rose-500" /> },
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
      <p className="text-slate-600">Browse and filter CSRConnect centers needing support across Thailand.</p>
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
              {index === 0 && (
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
  const prediction = useMemo(() => {
    if (!selectedCenter) return null;


    const residentCount = selectedCenter.resident_count;
    let centerSize = "Medium";
    if (residentCount < 70) centerSize = "Small";
    else if (residentCount > 120) centerSize = "Large";

    const rawCategory = selectedCenter.activity_categories[0] || "Recreation";
    const activityMap = {
      "Digital Literacy": "Tech Literacy",
      "Health & Wellness": "Light Exercise",
      "Arts & Crafts": "Art Therapy",
      "Facility Improvement": "Cognitive Games",
      "Companionship": "Language Class",
      "Recreation": "Music Therapy"
    };
    const mappedActivity = activityMap[rawCategory] || "Music Therapy";

    const filtered = pastPrograms.filter(p => p.activity === mappedActivity);
    const dataSet = filtered.length > 0 ? filtered : pastPrograms;
    const isFallback = filtered.length === 0;

    let weightedSum = 0;
    let weightTotal = 0;

    dataSet.forEach(p => {
      let weight = 1;
      if (p.centerSize === centerSize) weight += 1;
      if (p.industry === company.industry) weight += 1;
      if (p.frequency === frequency) weight += 1;

      weightedSum += (p.engagementScore * weight);
      weightTotal += weight;
    });

    const baseScore = weightTotal > 0 ? (weightedSum / weightTotal) : 0;

    let freqMod = 0;
    let freqFactorScore = 50;
    if (frequency === "Weekly") { freqMod = 4; freqFactorScore = 80; }
    else if (frequency === "One-time") { freqMod = -6; freqFactorScore = 20; }

    let durationWeeks = 0;
    if (frequency !== "One-time") {
      if (duration === "1 Month") durationWeeks = 4;
      else if (duration === "3 Months") durationWeeks = 12;
      else if (duration === "6 Months") durationWeeks = 24;
    }

    let durMod = durationWeeks >= 8 ? 3 : 0;

    const optimal = selectedCenter.resident_count * 0.3;
    const volDeviation = Math.abs(volunteers - optimal) / optimal;
    const volMod = Math.max(-5, Math.min(5, 5 - volDeviation * 10));

    const rawFinal = baseScore + freqMod + durMod + volMod;
    const finalScore = Math.max(0, Math.min(100, Math.round(rawFinal)));

    const fitSum = dataSet.reduce((acc, p) => acc + p.engagementScore, 0);
    const factorFit = dataSet.length > 0 ? Math.round(fitSum / dataSet.length) : 0;

    const matchingIndustryCount = dataSet.filter(p => p.industry === company.industry).length;
    const factorFamiliarity = dataSet.length > 0 ? Math.round((matchingIndustryCount / dataSet.length) * 100) : 0;

    const factorFrequency = freqFactorScore;

    const respSum = dataSet.reduce((acc, p) => acc + p.attendanceRate, 0);
    const factorResponsiveness = dataSet.length > 0 ? Math.round(respSum / dataSet.length) : 0;

    let colorClass = "text-amber-500";
    let bgClass = "bg-amber-50";
    let label = "Moderate Expected Engagement";
    if (finalScore < 40) {
      colorClass = "text-red-500";
      bgClass = "bg-red-50";
      label = "Low Expected Engagement";
    } else if (finalScore > 70) {
      colorClass = "text-emerald-500";
      bgClass = "bg-emerald-50";
      label = "High Expected Engagement";
    }

    return {
      score: finalScore,
      colorClass,
      bgClass,
      label,
      caption: isFallback ? "Based on limited historical data" : `Based on ${filtered.length} similar past programs`,
      factors: [
        { name: "Activity-Center Fit", value: factorFit },
        { name: "Company-Industry Familiarity", value: factorFamiliarity },
        { name: "Frequency Effect", value: factorFrequency },
        { name: "Center Responsiveness History", value: factorResponsiveness }
      ]
    };
  }, [selectedCenter, company.industry, frequency, duration, volunteers]);

if (!selectedCenter) return null;

const centerContact =
  CENTER_CONTACTS[selectedCenter.id] || CENTER_CONTACTS.default;

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

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden animate-in slide-in-from-bottom-8 duration-300 my-auto shadow-2xl max-h-[90vh]">
        
        <div className="w-full md:w-1/2 p-8 border-r border-slate-100 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-900">Program Setup</h2>
            <button onClick={() => setShowCommitModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>

          <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-1">{selectedCenter.name}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14}/> {selectedCenter.province}</p>
          </div>
          
          <div className="mb-6 p-4 bg-white rounded-xl border border-slate-200">
  <h3 className="font-bold text-slate-800 mb-4">
    Contact Information
  </h3>

  <div className="grid grid-cols-2 gap-4 text-sm">

    <div>
      <p className="text-slate-500">Contact Person</p>
      <p className="font-semibold">
        {centerContact.contactPerson}
      </p>
    </div>

    <div>
      <p className="text-slate-500">Position</p>
      <p className="font-semibold">
        {centerContact.contactRole}
      </p>
    </div>

    <div>
      <p className="text-slate-500">Phone</p>
      <p className="font-semibold">
        {centerContact.phone}
      </p>
    </div>

    <div>
      <p className="text-slate-500">Email</p>
      <p className="font-semibold break-all">
        {centerContact.email}
      </p>
    </div>

    <div>
      <p className="text-slate-500">LINE ID</p>
      <p className="font-semibold">
        {centerContact.lineId}
      </p>
    </div>

    <div>
      <p className="text-slate-500">Contact Hours</p>
      <p className="font-semibold">
        {centerContact.contactHours}
      </p>
    </div>

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

        <div className="w-full md:w-1/2 bg-slate-50 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex-1 p-8 overflow-y-auto relative z-10 pb-28">
            <div className="flex items-center gap-2 mb-2 text-teal-800 font-bold">
              <Zap size={20} className="text-amber-500" /> Engagement Prediction Engine
            </div>
            <p className="text-sm text-slate-600 mb-8">
              Based on historical data of similar programs, here is the predicted success of this configuration. Adjust settings to optimize.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 text-center">
              <div className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">Predicted Score</div>
              <div className="flex items-end justify-center gap-2">
                <span className={`text-6xl font-black ${prediction.colorClass}`}>{prediction.score}</span>
                <span className="text-2xl text-slate-400 mb-1">/100</span>
              </div>
              <div className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-bold ${prediction.bgClass} ${prediction.colorClass}`}>
                {prediction.label}
              </div>
              <div className="text-xs text-slate-400 mt-4 font-medium">
                {prediction.caption}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-700 mb-2">Impact Factors</h4>
              {prediction.factors.map((factor, idx) => (
                <FactorBar key={idx} label={factor.name} value={factor.value} />
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-100/90 backdrop-blur-sm border-t border-slate-200 z-20">
            <p className="text-[11px] text-slate-500 text-center leading-relaxed font-medium">
              Generated from our pilot dataset for demonstration. At scale, the same model runs on live session data, sharpening with every match.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ElderMatchApp() {
  const [currentView, setCurrentView] = useState('onboarding');
  const [company, setCompany] = useState(MOCK_COMPANY);
  const [sessions, setSessions] = useState([]);
  
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <Sidebar 
        company={company} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        handleCompanyUpdate={handleCompanyUpdate} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="md:hidden bg-white border-b border-teal-100 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-emerald-500" />
            <span className="font-bold text-teal-900">ElderMatch</span>
          </div>
          <button className="text-slate-500">Menu</button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {currentView === 'onboarding' && (
            <OnboardingView company={company} handleCompanyUpdate={handleCompanyUpdate} setCurrentView={setCurrentView} />
          )}
          {currentView === 'dashboard' && (
            <DashboardView company={company} setCurrentView={setCurrentView} />
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
        </div>
      </main>

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