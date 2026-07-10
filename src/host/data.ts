// Mock data for the Host / Elder Care Center Portal.
// No persistence — all data is static for demo purposes.

export const HOST_ORG = {
  name: 'Ban Bang Khae Social Welfare Development Center',
  type: 'Government Social Welfare Center',
  established: '2008',
  province: 'Bangkok',
  district: 'Bang Khae',
  address: '128 Phetkasem Rd, Bang Khae, Bangkok 10160',
  residents: 150,
  staff: 22,
  operatingHours: '08:00 - 17:00 (Mon-Sat)',
  phone: '02-808-1234',
  email: 'info@bankhae.or.th',
  lineId: '@bankhae',
  website: 'www.bankhae.or.th',
  licenseNo: 'SWD-BKK-2008-0142',
  licenseStatus: 'Active',
  licenseExpiry: '2027-08-31',
  verified: true,
  verificationDate: '2023-09-15',
  rating: 4.5,
  totalRatings: 12,
  description:
    'A government-supported social welfare center serving 150 elderly residents in western Bangkok. We provide daily care, health monitoring, recreational activities, and community engagement programs for seniors, many of whom live alone or have limited family support.',
  photos: [
    'https://images.pexels.com/photos/7550/people-sitting-furniture-door.jpg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8460150/pexels-photo-8460150.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8460446/pexels-photo-8460446.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
};

export const HOST_PARTNERS = [
  { id: 'p1', company: 'TechFlow Solutions', industry: 'Technology', program: 'Digital Seniors 2024', status: 'Active', startDate: '2024-01-15', volunteers: 45 },
  { id: 'p2', company: 'Bangkok Bank CSR Team', industry: 'Banking', program: 'Financial Literacy Workshops', status: 'Active', startDate: '2024-03-01', volunteers: 12 },
  { id: 'p3', company: 'SCG Cement Foundation', industry: 'Manufacturing', program: 'Facility Garden Project', status: 'Completed', startDate: '2023-06-01', volunteers: 30 },
  { id: 'p4', company: 'AIA Thailand', industry: 'Insurance', program: 'Health First Fridays', status: 'In Review', startDate: '2025-02-01', volunteers: 20 },
];

export const HOST_REQUESTS = [
  { id: 'r1', title: 'Smartphone Basics for Seniors', category: 'Digital Literacy', priority: 'High', volunteers: 15, budget: 25000, status: 'Open', preferredDates: 'Weekends, Jan-Feb 2025', description: 'Teach residents how to use smartphones for video calls with family, LINE messaging, and emergency contacts.' },
  { id: 'r2', title: 'Weekly Health Check-up Clinic', category: 'Health Programs', priority: 'High', volunteers: 8, budget: 40000, status: 'Open', preferredDates: 'Every Friday morning', description: 'Regular blood pressure, blood sugar screening, and basic health consultations for 150 residents.' },
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

export const HOST_APPLICATIONS = [
  { id: 'a1', company: 'TechFlow Solutions', industry: 'Technology', volunteerCapacity: 50, proposedSupport: '15 employee volunteers for weekend smartphone workshops over 6 weeks', status: 'New', opportunity: 'Digital Literacy Training Program', date: '2024-12-15' },
  { id: 'a2', company: 'SCG Digital Team', industry: 'Manufacturing', volunteerCapacity: 80, proposedSupport: '10 tech-savvy volunteers, tablets loaned for duration of program', status: 'New', opportunity: 'Digital Literacy Training Program', date: '2024-12-18' },
  { id: 'a3', company: 'Bangkok Hospital Group', industry: 'Healthcare', volunteerCapacity: 30, proposedSupport: '8 nurses for weekly BP and blood sugar screening every Friday', status: 'Under Review', opportunity: 'Weekly Health Screening Support', date: '2024-12-12' },
  { id: 'a4', company: 'AIA Thailand', industry: 'Insurance', volunteerCapacity: 200, proposedSupport: '20 volunteers + medical supplies sponsorship for health program', status: 'Under Review', opportunity: 'Weekly Health Screening Support', date: '2024-12-20' },
  { id: 'a5', company: 'SCG Cement Foundation', industry: 'Manufacturing', volunteerCapacity: 100, proposedSupport: '25 volunteers, all paint and materials provided for dining hall', status: 'Accepted', opportunity: 'Facility Painting Weekend', date: '2024-11-20' },
  { id: 'a6', company: 'Grab Thailand', industry: 'Technology', volunteerCapacity: 60, proposedSupport: '10 driver volunteers for hospital transport, fuel costs covered', status: 'New', opportunity: 'Hospital Transportation Volunteers', date: '2024-12-22' },
];

export const HOST_CALENDAR = [
  { id: 'e1', title: 'Digital Literacy Workshop Session 3', type: 'Training', date: '2025-01-18', time: '09:00 - 12:00', partner: 'TechFlow Solutions', attendees: 30 },
  { id: 'e2', title: 'Health Screening Friday', type: 'Health', date: '2025-01-17', time: '08:30 - 11:30', partner: 'Bangkok Hospital Group', attendees: 80 },
  { id: 'e3', title: 'CSR Visit - Garden Project Review', type: 'CSR Visit', date: '2025-01-20', time: '14:00 - 15:30', partner: 'SCG Cement Foundation', attendees: 8 },
  { id: 'e4', title: 'Companion Games Saturday', type: 'Volunteer', date: '2025-01-25', time: '13:00 - 16:00', partner: 'Open Application', attendees: 20 },
  { id: 'e5', title: 'Dining Hall Painting Kickoff', type: 'Volunteer', date: '2025-02-01', time: '08:00 - 17:00', partner: 'SCG Cement Foundation', attendees: 25 },
  { id: 'e6', title: 'Smartphone Workshop Final Session', type: 'Training', date: '2025-02-15', time: '09:00 - 12:00', partner: 'TechFlow Solutions', attendees: 45 },
  { id: 'e7', title: 'Arts & Crafts Exhibition', type: 'Volunteer', date: '2025-03-15', time: '10:00 - 15:00', partner: 'TBD', attendees: 50 },
];

export const HOST_IMPACT_METRICS = [
  { label: 'Volunteers Received', value: '327', icon: 'users', color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Volunteer Hours', value: '2,140', icon: 'clock', color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Residents Impacted', value: '142', icon: 'heart', color: 'text-rose-500', bg: 'bg-rose-50' },
  { label: 'Donations Received', value: '185K', icon: 'gift', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Programs Completed', value: '11', icon: 'check', color: 'text-teal-500', bg: 'bg-teal-50' },
  { label: 'Active Partners', value: '4', icon: 'handshake', color: 'text-purple-500', bg: 'bg-purple-50' },
];

export const HOST_IMPACT_TREND = [
  { month: 'Jul', volunteers: 25, hours: 180 },
  { month: 'Aug', volunteers: 30, hours: 220 },
  { month: 'Sep', volunteers: 28, hours: 200 },
  { month: 'Oct', volunteers: 45, hours: 360 },
  { month: 'Nov', volunteers: 52, hours: 410 },
  { month: 'Dec', volunteers: 48, hours: 380 },
  { month: 'Jan', volunteers: 60, hours: 390 },
];

export const HOST_IMPACT_BY_CATEGORY = [
  { name: 'Digital Literacy', value: 4, color: '#0ea5e9' },
  { name: 'Health Programs', value: 3, color: '#059669' },
  { name: 'Facility Improvement', value: 2, color: '#f59e0b' },
  { name: 'Companion Activities', value: 1, color: '#e11d48' },
  { name: 'Arts & Recreation', value: 1, color: '#8b5cf6' },
];

export const HOST_MESSAGES = [
  { id: 'm1', from: 'TechFlow Solutions', role: 'Company', preview: 'Hi! Our team is confirmed for the Jan 18 workshop session...', time: '10:24', unread: true, avatar: 'TF' },
  { id: 'm2', from: 'ElderMatch Admin', role: 'Admin', preview: 'Your facility verification has been renewed through 2027.', time: '09:15', unread: true, avatar: 'EM' },
  { id: 'm3', from: 'AIA Thailand', role: 'Company', preview: 'We would like to discuss the health screening partnership...', time: 'Yesterday', unread: false, avatar: 'AI' },
  { id: 'm4', from: 'SCG Cement Foundation', role: 'Company', preview: 'Paint materials are ready for delivery next week.', time: 'Yesterday', unread: false, avatar: 'SC' },
  { id: 'm5', from: 'Bangkok Hospital Group', role: 'Company', preview: 'Can we move the Friday clinic to 9 AM start?', time: '2 days ago', unread: false, avatar: 'BH' },
];

export const HOST_PREVIOUS_PROJECTS = [
  { id: 'pp1', company: 'TechFlow Solutions', project: 'Digital Seniors 2024', year: '2024', rating: 5, outcome: '45 seniors learned to use smartphones for video calls' },
  { id: 'pp2', company: 'SCG Cement Foundation', project: 'Community Garden', year: '2024', rating: 5, outcome: 'Built greenhouse with 30 volunteers, now grows vegetables for kitchen' },
  { id: 'pp3', company: 'Bangkok Bank', project: 'Financial Literacy', year: '2023', rating: 4, outcome: '12 sessions on scam prevention and basic finance for 60 residents' },
  { id: 'pp4', company: 'PTT Reforestation', project: 'Tree Planting Day', year: '2023', rating: 4, outcome: 'Planted 50 trees around facility grounds with 40 volunteers' },
];

export const HOST_RATINGS = [
  { id: 'rt1', partner: 'TechFlow Solutions', rating: 5, comment: 'Excellent communication and well-prepared volunteers. Residents loved the patience shown.', date: '2024-06-20' },
  { id: 'rt2', partner: 'SCG Cement Foundation', rating: 5, comment: 'Professional team, delivered everything promised. The garden is beautiful.', date: '2024-07-15' },
  { id: 'rt3', partner: 'Bangkok Bank', rating: 4, comment: 'Good program overall, would appreciate more consistency in volunteer attendance.', date: '2023-12-01' },
  { id: 'rt4', partner: 'PTT Reforestation', rating: 4, comment: 'Great energy and enthusiasm. Follow-up could be improved.', date: '2023-08-10' },
];

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
export const REQUEST_STATUS_STYLES = {
  Draft: 'bg-slate-100 text-slate-600',
  Open: 'bg-emerald-100 text-emerald-700',
  Matched: 'bg-blue-100 text-blue-700',
  Completed: 'bg-teal-100 text-teal-700',
};
export const OPPORTUNITY_STATUS_STYLES = {
  Draft: 'bg-slate-100 text-slate-600',
  Open: 'bg-emerald-100 text-emerald-700',
  'In Review': 'bg-amber-100 text-amber-700',
  Matched: 'bg-blue-100 text-blue-700',
  Completed: 'bg-teal-100 text-teal-700',
};
export const APPLICATION_STATUS_STYLES = {
  New: 'bg-emerald-100 text-emerald-700',
  'Under Review': 'bg-amber-100 text-amber-700',
  Accepted: 'bg-teal-100 text-teal-700',
  Declined: 'bg-rose-100 text-rose-700',
};
