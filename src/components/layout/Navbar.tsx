import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageSquare, Menu as MobileMenuIcon, X, GraduationCap, Sparkles, LogIn, UserPlus, UserCheck } from 'lucide-react';
import { HoveredLink, Menu, MenuItem, ProductItem } from '@/components/ui/navbar-menu';
import { MagneticButton } from '@/components/ui/magnetic-button';

interface NavbarProps {
  activePage: string;
  user: { email: string; fullName?: string } | null;
  onNavigate: (page: string) => void;
  onOpenDemoModal: (courseId?: string) => void;
  onOpenAuthModal: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  user,
  onNavigate,
  onOpenDemoModal,
  onOpenAuthModal,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'study-abroad', label: 'Study Abroad' },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="bg-emerald-600/90 text-white px-2 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider">
              Metro Access
            </span>
            <span className="text-slate-200">
              Dashrath Puri Metro Station (Gate 1), West Delhi
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="hidden md:inline-block">Mon-Sat: 7 AM - 8 PM</span>
            
            <a
              href="tel:+919810126691"
              className="flex items-center gap-1.5 text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>+91 98101 26691</span>
            </a>

            {/* Top Bar Auth Status */}
            <div className="flex items-center gap-3 border-l border-slate-700 pl-3">
              {user ? (
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Hi, {user.fullName || user.email.split('@')[0]}</span>
                  <button
                    onClick={onLogout}
                    className="text-slate-400 hover:text-red-400 text-[10px] underline ml-1"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onOpenAuthModal('login')}
                    className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold transition-colors"
                  >
                    <LogIn className="w-3 h-3" />
                    <span>Log In</span>
                  </button>

                  <button
                    onClick={() => onOpenAuthModal('signup')}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold transition-colors"
                  >
                    <UserPlus className="w-3 h-3" />
                    <span>Sign Up</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar Header: Spacious & Perfectly Balanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-6">
          
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-0.5 border border-slate-200/80 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img
                src="/images/eesa/eesa-logo.jpg"
                alt="EESA Academy Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-sans block leading-none">
                EESA ACADEMY
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide hidden sm:block mt-0.5">
                Expert Educational Services Academy
              </span>
            </div>
          </div>

          {/* Aceternity Hover Menu Navbar */}
          <div className="hidden xl:block">
            <Menu setActive={setActiveHoverMenu}>
              <MenuItem setActive={setActiveHoverMenu} active={activeHoverMenu} item="Programs & Courses">
                <div className="grid grid-cols-2 gap-6 p-2 text-xs">
                  <ProductItem
                    title="Spoken English"
                    href="#"
                    onClick={() => onNavigate('courses')}
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&auto=format&fit=crop&q=80"
                    description="Fluency, accent neutralization & public speaking."
                  />
                  <ProductItem
                    title="IELTS Prep (Band 8.0+)"
                    href="#"
                    onClick={() => onNavigate('study-abroad')}
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&auto=format&fit=crop&q=80"
                    description="Academic & General training with 1-on-1 mocks."
                  />
                  <ProductItem
                    title="PTE Academic"
                    href="#"
                    onClick={() => onNavigate('study-abroad')}
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&auto=format&fit=crop&q=80"
                    description="AI scoring feedback & computer practice lab."
                  />
                  <ProductItem
                    title="OET Healthcare"
                    href="#"
                    onClick={() => onNavigate('study-abroad')}
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&auto=format&fit=crop&q=80"
                    description="Nurses & Doctors Grade B shift-friendly batches."
                  />
                </div>
              </MenuItem>

              <MenuItem setActive={setActiveHoverMenu} active={activeHoverMenu} item="Study Abroad">
                <div className="flex flex-col space-y-2 text-xs w-48">
                  <HoveredLink href="#" onClick={() => onNavigate('study-abroad')}>
                    University Shortlisting & SOP
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('study-abroad')}>
                    UK, Canada, Australia PR Visas
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('study-abroad')}>
                    Scholarship Guidance
                  </HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActiveHoverMenu} active={activeHoverMenu} item="About & Reviews">
                <div className="flex flex-col space-y-2 text-xs w-44">
                  <HoveredLink href="#" onClick={() => onNavigate('about')}>
                    Institutional Vision & Faculty
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('reviews')}>
                    Verified Scorecards (4.9★)
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('about')}>
                    Campus Photo Tour
                  </HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActiveHoverMenu} active={activeHoverMenu} item="Contact & Location">
                <div className="flex flex-col space-y-2 text-xs w-48">
                  <HoveredLink href="#" onClick={() => onNavigate('contact')}>
                    Dashrath Puri Campus Map
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('contact')}>
                    Book Campus Appointment
                  </HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>

          {/* Action CTAs: Perfectly Spaced & Uncluttered */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-2.5 shrink-0">
            {!user ? (
              <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-white transition-all flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => onOpenAuthModal('signup')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center gap-1 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5 text-blue-400" />
                  <span>Sign Up</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>{user.fullName || user.email.split('@')[0]}</span>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-red-600 text-[10px] ml-1 font-semibold"
                >
                  Logout
                </button>
              </div>
            )}

            <MagneticButton strength={0.4} maxDistance={60}>
              <a
                href="https://wa.me/919810126691?text=Hi%20EESA%20Academy,%20I%20want%20to%20enquire%20about%20your%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer border border-emerald-500"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </a>
            </MagneticButton>

            <MagneticButton strength={0.4} maxDistance={60}>
              <button
                onClick={() => onOpenDemoModal()}
                className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Free Demo</span>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MobileMenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="grid gap-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-100 text-blue-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 grid gap-2">
            {!user ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-slate-100 text-slate-800 font-bold py-2.5 rounded-lg text-xs border border-slate-200 flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => {
                    onOpenAuthModal('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5 text-blue-400" />
                  <span>Sign Up</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Logged in: {user.fullName || user.email}</span>
                <button onClick={onLogout} className="text-xs text-red-600 font-bold">Logout</button>
              </div>
            )}

            <button
              onClick={() => {
                onOpenDemoModal();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg text-xs shadow-xs"
            >
              Book Free Demo Class
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
