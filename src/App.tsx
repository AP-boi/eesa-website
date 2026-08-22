import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Course, StudentReview } from './types/database';
import { getCourses, getStudentReviews } from './lib/supabase';
import { initUtmTracking } from './lib/utm';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';
import { LeadModal } from './components/widgets/LeadModal';
import { AuthModal } from './components/widgets/AuthModal';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { CookieBanner } from './components/ui/CookieBanner';
import { SiteSearchModal } from './components/ui/SiteSearchModal';
import { FloatingContact } from './components/ui/FloatingContact';
import { ConfirmationModal } from './components/ui/ConfirmationModal';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { StudyAbroad } from './pages/StudyAbroad';
import { Reviews } from './pages/Reviews';
import { Contact } from './pages/Contact';
import { Founder } from './pages/Founder';
import { Franchise } from './pages/Franchise';

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Compute activePage from current URL path
  const getActivePage = (pathname: string): string => {
    const clean = pathname.replace(/^\//, '').split('/')[0] || 'home';
    return clean;
  };

  const activePage = getActivePage(location.pathname);

  const [courses, setCourses] = useState<Course[]>([]);
  const [reviews, setReviews] = useState<StudentReview[]>([]);
  const [loading, setLoading] = useState(true);

  // Search Modal State (Ctrl + K)
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Logout Confirmation Modal State
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // Cookie Banner Reopen Key
  const [cookieBannerKey, setCookieBannerKey] = useState(0);

  // Theme State (Dark / Light) with Persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('eesa_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('eesa_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // User Auth State
  const [user, setUser] = useState<{ email: string; fullName?: string } | null>(() => {
    const saved = localStorage.getItem('eesa_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Demo Modal State
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [modalCourseId, setModalCourseId] = useState<string | undefined>(undefined);
  const [modalBookingType, setModalBookingType] = useState<
    'free_demo' | 'diagnostic_test' | 'profile_evaluation' | 'mock_interview' | 'prospectus_download' | 'contact'
  >('free_demo');

  // Initialize UTM Tracking & Data
  useEffect(() => {
    initUtmTracking();

    async function loadData() {
      setLoading(true);
      const [fetchedCourses, fetchedReviews] = await Promise.all([
        getCourses(),
        getStudentReviews(),
      ]);
      setCourses(fetchedCourses);
      setReviews(fetchedReviews);
      setLoading(false);
    }
    loadData();

    // Listen for custom search event
    const handleOpenSearch = () => setSearchModalOpen(true);
    window.addEventListener('open-site-search', handleOpenSearch);
    return () => window.removeEventListener('open-site-search', handleOpenSearch);
  }, []);

  const handleNavigate = (page: string) => {
    if (page === 'home' || page === '/') {
      navigate('/');
    } else if (page.startsWith('/')) {
      navigate(page);
    } else {
      navigate(`/${page}`);
    }
  };

  const handleOpenDemoModal = (
    courseId?: string,
    bookingType: 'free_demo' | 'diagnostic_test' | 'profile_evaluation' | 'mock_interview' | 'prospectus_download' | 'contact' = 'free_demo'
  ) => {
    setModalCourseId(courseId);
    setModalBookingType(bookingType);
    setDemoModalOpen(true);
  };

  const handleOpenAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData: { email: string; fullName?: string }) => {
    setUser(userData);
    localStorage.setItem('eesa_user', JSON.stringify(userData));
  };

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    setUser(null);
    localStorage.removeItem('eesa_user');
    setLogoutConfirmOpen(false);
  };

  const handleReopenCookieBanner = () => {
    localStorage.removeItem('eesa_cookie_consent');
    setCookieBannerKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-200">
      
      {/* Accessible Skip to Content ↓ Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content ↓
      </a>

      {/* Fixed Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        user={user}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={handleNavigate}
        onOpenDemoModal={() => handleOpenDemoModal()}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogoutClick}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main View Area with Routes */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                courses={courses}
                reviews={reviews}
                onNavigate={handleNavigate}
                onOpenDemoModal={handleOpenDemoModal}
              />
            }
          />
          <Route
            path="/courses"
            element={
              <Courses
                courses={courses}
                loading={loading}
                onOpenDemoModal={handleOpenDemoModal}
              />
            }
          />
          <Route
            path="/study-abroad"
            element={
              <StudyAbroad
                courses={courses}
                onOpenDemoModal={handleOpenDemoModal}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                onNavigate={handleNavigate}
                onOpenDemoModal={() => handleOpenDemoModal()}
              />
            }
          />
          <Route
            path="/founder"
            element={
              <Founder
                onNavigate={handleNavigate}
                onOpenDemoModal={handleOpenDemoModal}
              />
            }
          />
          <Route
            path="/reviews"
            element={
              <Reviews
                reviews={reviews}
                onOpenDemoModal={() => handleOpenDemoModal()}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <Contact
                courses={courses}
              />
            }
          />
          <Route
            path="/franchise"
            element={
              <Franchise
                onNavigate={handleNavigate}
                onOpenDemoModal={handleOpenDemoModal}
              />
            }
          />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDemoModal={() => handleOpenDemoModal()}
        onOpenCookieBanner={handleReopenCookieBanner}
      />

      {/* Sticky Mobile Actions Bar */}
      <MobileStickyBar
        onOpenDemoModal={() => handleOpenDemoModal()}
      />

      {/* Scroll to Top Floating Button (^) */}
      <ScrollToTop />

      {/* Multi-Action Floating Contact Button */}
      <FloatingContact
        onOpenDemoModal={() => handleOpenDemoModal()}
      />

      {/* Cookie Consent Banner (🍪) */}
      <CookieBanner key={cookieBannerKey} />

      {/* Global Site Search Modal (Ctrl + K) */}
      <SiteSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        courses={courses}
        reviews={reviews}
        onNavigate={handleNavigate}
        onOpenDemoModal={(courseId) => handleOpenDemoModal(courseId, 'free_demo')}
      />

      {/* Lead Generation & Booking Modal */}
      <LeadModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        courses={courses}
        initialCourseId={modalCourseId}
        defaultBookingType={modalBookingType}
      />

      {/* Auth Modal (Log In & Sign Up) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={logoutConfirmOpen}
        title="Sign Out of Student Account"
        message="Are you sure you want to log out of your student portal session?"
        confirmLabel="Yes, Sign Out"
        cancelLabel="Stay Logged In"
        variant="warning"
        onConfirm={handleConfirmLogout}
        onCancel={() => setLogoutConfirmOpen(false)}
      />
    </div>
  );
};

export default App;
