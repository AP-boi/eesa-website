import React, { useState, useEffect } from 'react';
import { MessageSquare, Menu as MobileMenuIcon, X, Sparkles, LogIn, UserPlus, UserCheck, Sun, Moon, Search, Phone, HelpCircle } from 'lucide-react';
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
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  user,
  theme = 'light',
  onToggleTheme,
  onNavigate,
  onOpenDemoModal,
  onOpenAuthModal,
  onLogout,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHoverMenu, setActiveHoverMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic sticky header styling on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'study-abroad', label: 'Study Abroad' },
    { id: 'about', label: 'About' },
    { id: 'founder', label: 'Founder' },
    { id: 'franchise', label: 'Franchise (B2B)' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-b border-slate-200/90 dark:border-slate-800'
          : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-800/60'
      }`}
    >
      <div className="w-full max-w-[1536px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-16 sm:h-20'
          } gap-2 lg:gap-3 xl:gap-4`}
        >
          {/* 1. Brand Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-900 p-0.5 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img
                src="/images/eesa/eesa-logo.jpg"
                alt="EESA Academy Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <span className="text-sm sm:text-base lg:text-lg font-black text-slate-900 dark:text-white tracking-tight font-sans block leading-none">
                EESA ACADEMY
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium tracking-wide hidden sm:block mt-0.5 whitespace-nowrap">
                Expert Educational Services Academy
              </span>
            </div>
          </div>

          {/* 2. Aceternity Center Hover Navigation Menu */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <Menu setActive={setActiveHoverMenu}>
              <MenuItem item="Programs & Courses">
                <div className="grid grid-cols-2 gap-6 p-2 text-xs">
                  <ProductItem
                    title="Spoken English"
                    href="#"
                    onClick={() => onNavigate('courses')}
                    src="/images/eesa/eesa-student-activity-1.jpeg"
                    description="Fluency, accent neutralization & public speaking."
                  />
                  <ProductItem
                    title="IELTS Prep (Band 8.0+)"
                    href="#"
                    onClick={() => onNavigate('study-abroad')}
                    src="/images/eesa/eesa-ielts-session-1.jpeg"
                    description="Academic & General training with 1-on-1 mocks."
                  />
                  <ProductItem
                    title="PTE Academic"
                    href="#"
                    onClick={() => onNavigate('study-abroad')}
                    src="/images/eesa/eesa-classroom-1.jpeg"
                    description="AI scoring feedback & computer practice lab."
                  />
                  <ProductItem
                    title="OET Healthcare"
                    href="#"
                    onClick={() => onNavigate('study-abroad')}
                    src="/images/eesa/eesa-batch-1.jpeg"
                    description="Nurses & Doctors Grade B shift-friendly batches."
                  />
                </div>
              </MenuItem>

              <MenuItem item="Study Abroad">
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

              <MenuItem item="About & Founder">
                <div className="flex flex-col space-y-2 text-xs w-48">
                  <HoveredLink href="#" onClick={() => onNavigate('founder')}>
                    Meet Founder Neetu Devi
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('about')}>
                    Institutional Vision & Pedagogy
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('reviews')}>
                    Verified Scorecards (4.9★)
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('franchise')}>
                    Franchise Opportunities (B2B)
                  </HoveredLink>
                </div>
              </MenuItem>

              <MenuItem item="Contact & Location">
                <div className="flex flex-col space-y-2 text-xs w-48">
                  <HoveredLink href="#" onClick={() => onNavigate('contact')}>
                    Dashrath Puri Campus Map
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('contact')}>
                    Book Campus Appointment
                  </HoveredLink>
                  <HoveredLink href="#" onClick={() => onNavigate('franchise')}>
                    Franchise Partner Desk
                  </HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>

          {/* 3. Desktop Action CTAs & Tools (Visible on lg and above) */}
          <div className="hidden lg:flex items-center gap-1.5 2xl:gap-2 shrink-0">
            
            {/* Site Search Button (Ctrl+K) */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search website"
                title="Search website (Ctrl + K)"
                className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 text-xs font-medium transition-all cursor-pointer shadow-2xs group shrink-0"
              >
                <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <span className="hidden 2xl:inline text-slate-500 dark:text-slate-400 text-xs">Search</span>
                <kbd className="hidden 2xl:inline text-[9px] font-mono bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  Ctrl K
                </kbd>
              </button>
            )}

            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs shrink-0"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            )}

            {/* Auth State Buttons */}
            {!user ? (
              <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shrink-0">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-2 py-1 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => onOpenAuthModal('signup')}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 transition-all flex items-center gap-1 shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5 text-blue-400 dark:text-white" />
                  <span>Sign Up</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white shrink-0">
                <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="truncate max-w-[100px]">{user.fullName || user.email.split('@')[0]}</span>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-red-600 text-[10px] ml-1 font-semibold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}

            {/* WhatsApp CTA */}
            <MagneticButton strength={0.4} maxDistance={30}>
              <a
                href="https://wa.me/919810126691?text=Hi%20EESA%20Academy,%20I%20want%20to%20enquire%20about%20your%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 2xl:px-3 2xl:py-2 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer border border-emerald-500 shrink-0 whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span className="hidden 2xl:inline">WhatsApp</span>
              </a>
            </MagneticButton>

            {/* Book Free 1-on-1 Strategy Session Primary CTA */}
            <MagneticButton strength={0.4} maxDistance={30}>
              <button
                onClick={() => onOpenDemoModal()}
                className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 2xl:px-3.5 2xl:py-2 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-on-1 Counselling</span>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile & Tablet Right Controls (Visible below lg) */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-1.5 shrink-0">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search"
                className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Search className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            )}

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
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-xl">
          
          {/* Quick Search inside Mobile Drawer */}
          {onOpenSearch && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search courses, IELTS, OET, fees...</span>
              </div>
              <kbd className="text-[10px] font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                Search
              </kbd>
            </button>
          )}

          {/* Navigation Links */}
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
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Auth & CTAs */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid gap-2">
            {!user ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold py-2.5 rounded-lg text-xs border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => {
                    onOpenAuthModal('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-blue-400 dark:text-white" />
                  <span>Sign Up</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                  Logged in: {user.fullName || user.email}
                </span>
                <button onClick={onLogout} className="text-xs text-red-600 font-bold cursor-pointer">
                  Logout
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="https://wa.me/919810126691?text=Hi%20EESA%20Academy,%20I%20want%20to%20enquire%20about%20your%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919810126691"
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold py-2.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Call Campus</span>
              </a>
            </div>

            <button
              onClick={() => {
                onOpenDemoModal();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Free 1-on-1 Strategy Session</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
