import React from 'react';
import { MapPin, Phone, Mail, Clock, GraduationCap, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenDemoModal: (courseId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDemoModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Institutional Footprint */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-md overflow-hidden border border-slate-700">
                <img
                  src="/images/eesa/eesa-logo.jpg"
                  alt="EESA Academy Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">EESA ACADEMY</h3>
                <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
                  Expert Educational Services Academy Pvt. Ltd.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              West Delhi's premier institute for Spoken English fluency, IELTS (8.0+ Band target), PTE Academic, OET Healthcare specialization, and Study Abroad placement. Est. 2022.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Government Registered Private Limited Education Company</span>
            </div>
          </div>

          {/* Col 2: Quick Links & Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'courses', label: 'All Courses & Syllabus' },
                { id: 'study-abroad', label: 'Study Abroad & OET Specialization' },
                { id: 'about', label: 'About EESA & Faculty Spotlight' },
                { id: 'reviews', label: 'Verified Student Reviews & Scorecards' },
                { id: 'contact', label: 'Contact Us & Campus Directions' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 text-left group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programs & Coaching */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Test Prep & Training
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('courses')} className="text-slate-400 hover:text-blue-400 transition-colors">
                  • Spoken English & Fluency Mastery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('study-abroad')} className="text-slate-400 hover:text-blue-400 transition-colors">
                  • IELTS Academic & General (Band 7.5+)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('study-abroad')} className="text-slate-400 hover:text-blue-400 transition-colors">
                  • PTE Academic Coaching (Lab Mocks)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('study-abroad')} className="text-slate-400 hover:text-blue-400 transition-colors">
                  • OET Healthcare (Nurses & Doctors)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('study-abroad')} className="text-slate-400 hover:text-blue-400 transition-colors">
                  • CELPIP & SELT/UKVI Preparation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="text-slate-400 hover:text-blue-400 transition-colors">
                  • Classes III-VIII Academic Tutoring
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Address, Metro Landmark & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Campus Footprint
            </h4>
            
            <div className="text-sm text-slate-300 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white">Registered Office & Campus:</strong>
                  <p className="text-xs text-slate-400 mt-0.5">
                    RZ-A-1/14B, First Floor, Vijay Enclave, Opp. Shani Dev Mandir, Dabri-Palam Road, New Delhi - 110045.
                  </p>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">
                    🎯 Landmark: Right opposite Shani Dev Mandir, adjacent to Dashrath Puri Metro Station Gate No. 1.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="text-xs">
                  <a href="tel:+919810126691" className="hover:text-blue-400 font-bold text-white block">
                    +91 98101 26691
                  </a>
                  <a href="tel:01144757111" className="hover:text-blue-400 text-slate-400 block">
                    Landline: 011 44757111
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="text-xs text-slate-400">
                  <a href="mailto:info@expert-educational.com" className="hover:text-blue-400 block">
                    info@expert-educational.com
                  </a>
                  <a href="mailto:eesaacademy22@gmail.com" className="hover:text-blue-400 block">
                    eesaacademy22@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="text-xs text-slate-300">
                  <span>Mon-Sat: 7:00 AM – 8:00 PM</span>
                  <span className="block text-slate-500">Sunday: Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metro Directions Banner */}
        <div className="bg-slate-800/90 rounded-xl p-4 mb-8 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-900/80 flex items-center justify-center text-blue-400 font-bold">
              🚇
            </div>
            <div>
              <p className="text-sm font-bold text-white">How to reach EESA Academy via Delhi Metro?</p>
              <p className="text-xs text-slate-400">
                Take Magenta Line to <strong>Dashrath Puri Metro Station</strong> → Exit Gate No. 1 → Walk 50 meters towards Shani Dev Mandir.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0"
          >
            <span>View Google Map & Directions</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Expert Educational Services Academy Private Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300">Terms of Enrollment</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300">Campus Hours</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
