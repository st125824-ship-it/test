import { useState } from 'react';
import {
  Headphones, X, ChevronDown, ChevronRight, ChevronUp,
  Mail, Handshake, Calendar, ArrowRight,
} from 'lucide-react';

const FAQS = [
  {
    q: 'How do I register my company?',
    a: "Click \"I'm a Company\" on the landing page and complete the sign-up form. After email verification you'll be taken to the onboarding wizard where you fill in your company profile, ESG focus areas, and preferred program types. Registration takes under 5 minutes.",
  },
  {
    q: 'How do I find elder care centres?',
    a: 'Use the "Discover Centers" section in the Company Portal. You can filter by province, program type, center size, and rating. Each center card shows capacity, available slots, and past engagement scores to help you decide.',
  },
  {
    q: 'How does AI Matching work?',
    a: 'Our AI analyzes your company profile — industry, budget, CSR persona, and preferred activities — alongside each center\'s resident demographics and program history to predict an engagement score before you commit. Matches above 65% are highlighted as top picks.',
  },
  {
    q: 'How do I create a CSR commitment?',
    a: 'From the Discover Centers or AI Match results page, click "Commit" on any center card. A modal guides you through selecting the program type, volunteer count, duration, and frequency. Your commitment is logged in the Activity Log.',
  },
  {
    q: 'How do I generate ESG reports?',
    a: 'Go to "Impact Reports" in the sidebar. The report auto-populates with all your completed sessions — volunteer hours, attendance, feedback scores, and benchmark comparisons. You can export a PDF-ready summary for your annual ESG disclosure.',
  },
  {
    q: 'How do I contact ElderlyConnect?',
    a: 'You can reach us at hello@elderlyconnect.org for general enquiries, support@elderlyconnect.org for technical help, or partnerships@elderlyconnect.org for business opportunities. We\'re also reachable on LINE at @elderlyconnect and by phone at +66 (0)2 123 4567.',
  },
];

type ActionModal = 'contact' | 'partnership' | 'demo' | null;

function ActionForm({ type, onClose }: { type: ActionModal; onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  if (!type) return null;

  const cfg = {
    contact: { title: 'Contact Support', icon: <Mail size={18} />, cta: 'Send' },
    partnership: { title: 'Request Partnership', icon: <Handshake size={18} />, cta: 'Request' },
    demo: { title: 'Book a Demo', icon: <Calendar size={18} />, cta: 'Book' },
  }[type];

  return (
    <div className="border-t border-slate-100 pt-4 mt-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-teal-900 flex items-center gap-2">{cfg.icon} {cfg.title}</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
      </div>
      {done ? (
        <div className="text-center py-4">
          <p className="text-sm font-semibold text-teal-700">Message sent!</p>
          <p className="text-xs text-slate-500 mt-1">We'll get back to you at {email}.</p>
          <button onClick={onClose} className="mt-3 text-xs text-teal-600 font-medium hover:underline">Close</button>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); setDone(true); }} className="space-y-2.5">
          <input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-300" />
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-300" />
          <textarea required value={msg} onChange={e => setMsg(e.target.value)} rows={3} placeholder="How can we help?" className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-300 resize-none" />
          <button type="submit" className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
            {cfg.cta} <ArrowRight size={15} />
          </button>
        </form>
      )}
    </div>
  );
}

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [actionModal, setActionModal] = useState<ActionModal>(null);

  const handleAction = (type: ActionModal) => {
    setActionModal(prev => (prev === type ? null : type));
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 active:translate-y-0"
        aria-label="Open support panel"
      >
        <Headphones size={19} />
        <span>Need Help?</span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[min(calc(100vw-2rem),400px)] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-teal-700 to-emerald-700 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Headphones size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">ElderlyConnect Support</h3>
                <p className="text-xs text-white/70">How can we help you today?</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1 px-5 py-4 space-y-3">
            {/* FAQ label */}
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Frequently Asked Questions</p>

            {/* FAQ accordion */}
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-teal-900 leading-snug pr-2">{faq.q}</span>
                  {expanded === i
                    ? <ChevronUp size={16} className="text-teal-500 shrink-0" />
                    : <ChevronDown size={16} className="text-slate-400 shrink-0" />
                  }
                </button>
                {expanded === i && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Quick actions */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Quick Actions</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'contact' as ActionModal, label: 'Contact Support', icon: <Mail size={17} />, color: 'bg-teal-50 text-teal-700 hover:bg-teal-100' },
                  { key: 'partnership' as ActionModal, label: 'Request Partnership', icon: <Handshake size={17} />, color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
                  { key: 'demo' as ActionModal, label: 'Book a Demo', icon: <Calendar size={17} />, color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
                ].map(btn => (
                  <button
                    key={btn.key}
                    onClick={() => handleAction(btn.key)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs font-semibold transition-colors ${btn.color} ${actionModal === btn.key ? 'ring-2 ring-teal-400' : ''}`}
                  >
                    {btn.icon}
                    <span className="text-center leading-tight">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inline action form */}
            {actionModal && <ActionForm type={actionModal} onClose={() => setActionModal(null)} />}
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/80 rounded-b-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Typical response within 1 business day · support@elderlyconnect.org</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
