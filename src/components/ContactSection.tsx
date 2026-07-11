import { useState } from 'react';
import {
  Heart, Mail, Phone, MapPin, MessageCircle, ArrowRight,
  Building2, Users, Handshake, Calendar, CheckCircle2, X,
} from 'lucide-react';

const CONTACT_ITEMS = [
  { label: 'General Enquiries', value: 'hello@csrconnect.org', icon: Mail, href: 'mailto:hello@csrconnect.org' },
  { label: 'Support', value: 'support@csrconnect.org', icon: Mail, href: 'mailto:support@csrconnect.org' },
  { label: 'Business Partnerships', value: 'partnerships@csrconnect.org', icon: Handshake, href: 'mailto:partnerships@csrconnect.org' },
  { label: 'LINE Official', value: '@csrconnect', icon: MessageCircle, href: '#' },
  { label: 'Phone', value: '+66 (0)2 123 4567', icon: Phone, href: 'tel:+6621234567' },
  { label: 'Office', value: 'Bangkok, Thailand', icon: MapPin, href: '#' },
];

type ModalType = 'contact' | 'partnership' | 'demo' | null;

function ContactModal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [message, setMessage] = useState('');

  if (!type) return null;

  const config = {
    contact: {
      title: 'Contact Us',
      subtitle: "Send us a message and we'll get back to you within 1 business day.",
      icon: <Mail size={22} className="text-teal-600" />,
      messagePlaceholder: "Tell us about your enquiry…",
      cta: 'Send Message',
    },
    partnership: {
      title: 'Request Partnership',
      subtitle: 'Tell us about your organisation and how you envision working together.',
      icon: <Handshake size={22} className="text-emerald-600" />,
      messagePlaceholder: "Describe the partnership opportunity…",
      cta: 'Submit Request',
    },
    demo: {
      title: 'Book a Demo',
      subtitle: "See the CSRConnect platform in action. We'll walk you through everything.",
      icon: <Calendar size={22} className="text-indigo-600" />,
      messagePlaceholder: "Preferred dates or times, and any specific areas you'd like to see…",
      cta: 'Book Demo',
    },
  }[type];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.55)' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-teal-900 mb-2">We've received your message!</h3>
            <p className="text-sm text-slate-500 mb-6">Our team will get back to you at <strong>{email}</strong> within 1 business day.</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center">
                {config.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-teal-900">{config.title}</h3>
                <p className="text-xs text-slate-500">{config.subtitle}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your Name</label>
                  <input
                    required value={name} onChange={e => setName(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                    placeholder="Somchai P."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Organisation</label>
                  <input
                    value={org} onChange={e => setOrg(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                    placeholder="Company / NGO / Center"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                <input
                  required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
                  placeholder="you@organisation.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message</label>
                <textarea
                  required value={message} onChange={e => setMessage(e.target.value)} rows={4}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition resize-none"
                  placeholder={config.messagePlaceholder}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              {config.cta} <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <section className="w-full bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 py-20 px-6 relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-teal-700/30 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-700/30 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-4">
              <Heart size={14} className="text-emerald-400" />
              Get in Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Work With CSRConnect
            </h2>
            <p className="text-teal-100/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you're an elder care centre looking for support, a company planning CSR initiatives,
              or an organization interested in partnership opportunities, we'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Organisation card */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <Heart size={26} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">CSRConnect</h3>
                  <p className="text-teal-200/70 text-sm">Connecting businesses, volunteers, and elder care communities across Thailand.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {CONTACT_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center shrink-0">
                      <item.icon size={17} className="text-teal-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-teal-300/70 font-medium">{item.label}</p>
                      <p className="text-sm text-white font-semibold truncate group-hover:text-emerald-300 transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA + audience cards */}
            <div className="space-y-4">
              {/* Who we work with */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: Building2, label: 'Companies', desc: 'CSR & ESG programs' },
                  { icon: Heart, label: 'Care Centers', desc: 'Receive support' },
                  { icon: Users, label: 'NGOs & Partners', desc: 'Collaborate on impact' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                      <item.icon size={20} className="text-emerald-400" />
                    </div>
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="text-xs text-teal-200/60 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 space-y-3">
                <h4 className="text-base font-bold text-white mb-4">Ready to get started?</h4>
                <button
                  onClick={() => setModal('contact')}
                  className="w-full flex items-center justify-between px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-emerald-500/25 group"
                >
                  <span className="flex items-center gap-2"><Mail size={18} /> Contact Us</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setModal('partnership')}
                  className="w-full flex items-center justify-between px-5 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-sm transition-all border border-white/20 group"
                >
                  <span className="flex items-center gap-2"><Handshake size={18} /> Request Partnership</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setModal('demo')}
                  className="w-full flex items-center justify-between px-5 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-sm transition-all border border-white/20 group"
                >
                  <span className="flex items-center gap-2"><Calendar size={18} /> Book a Demo</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal type={modal} onClose={() => setModal(null)} />
    </>
  );
}
