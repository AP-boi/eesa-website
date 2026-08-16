import React, { useState } from 'react';
import { MessageSquare, Menu as MobileMenuIcon, X, Sparkles, LogIn, UserPlus, UserCheck, Sun, Moon } from 'lucide-react';
import { HoveredLink, Menu, MenuItem, ProductItem } from '@/components/ui/navbar-menu';
import { MagneticButton } from '@/components/ui/magnetic-button';

interface NavbarProps {
  activePage: string;
  user: { email: string; fullName?: string } | null;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onNavigate: (page: string) => void;
  onOpenDemoModal: (courseId?: string) => void;
  onOpenAuthModal: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  user,
  theme = 'light',
  onToggleTheme,
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all">
      {/* Main Navbar Header: Spacious & Perfectly Balanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4 sm:gap-6">
          
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-slate-900 p-0.5 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img
                src="/images/eesa/eesa-logo.jpg"
                alt="EESA Academy Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight font-sans block leading-none">
                EESA ACADEMY
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide hidden sm:block mt-0.5">
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
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            )}

            {!user ? (
              <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => onOpenAuthModal('signup')}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 transition-all flex items-center gap-1 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5 text-blue-400 dark:text-white" />
                  <span>Sign Up</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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

          {/* Mobile Menu Toggle & Theme Toggle for Mobile */}
          <div className="flex xl:hidden items-center gap-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400 fill-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MobileMenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
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
                      ? 'bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid gap-2">
            {!user ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold py-2.5 rounded-lg text-xs border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => {
                    onOpenAuthModal('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5 text-blue-400 dark:text-white" />
                  <span>Sign Up</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Logged in: {user.fullName || user.email}</span>
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

