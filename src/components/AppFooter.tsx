import { Heart, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="bg-teal-950 text-white">
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
                <Heart size={18} className="text-white" />
              </div>
              <span className="text-lg font-black tracking-tight">CSRConnect</span>
            </div>
            <p className="text-sm text-teal-300/70 leading-relaxed">
              Connecting businesses, volunteers, and elder care communities across Thailand.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 group">
                <Mail size={15} className="text-teal-400 shrink-0" />
                <div>
                  <p className="text-xs text-teal-400/70">General Enquiries</p>
                  <a href="mailto:hello@csrconnect.org" className="text-sm text-teal-100 hover:text-emerald-400 transition-colors">
                    hello@csrconnect.org
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-teal-400 shrink-0" />
                <div>
                  <p className="text-xs text-teal-400/70">Support</p>
                  <a href="mailto:support@csrconnect.org" className="text-sm text-teal-100 hover:text-emerald-400 transition-colors">
                    support@csrconnect.org
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-teal-400 shrink-0" />
                <div>
                  <p className="text-xs text-teal-400/70">Partnerships</p>
                  <a href="mailto:partnerships@csrconnect.org" className="text-sm text-teal-100 hover:text-emerald-400 transition-colors">
                    partnerships@csrconnect.org
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4">More</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <MessageCircle size={15} className="text-teal-400 shrink-0" />
                <div>
                  <p className="text-xs text-teal-400/70">LINE Official</p>
                  <span className="text-sm text-teal-100">@csrconnect</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-teal-400 shrink-0" />
                <div>
                  <p className="text-xs text-teal-400/70">Phone</p>
                  <a href="tel:+6621234567" className="text-sm text-teal-100 hover:text-emerald-400 transition-colors">
                    +66 (0)2 123 4567
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="text-teal-400 shrink-0" />
                <div>
                  <p className="text-xs text-teal-400/70">Office</p>
                  <span className="text-sm text-teal-100">Bangkok, Thailand</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-500">
          <span>© 2026 CSRConnect. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <Heart size={11} className="text-emerald-500" /> Made with care for Thailand's elderly.
          </span>
        </div>
      </div>
    </footer>
  );
}
