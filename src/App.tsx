import React, { useState, useEffect } from 'react';
import { Course, StudentReview } from './types/database';
import { getCourses, getStudentReviews } from './lib/supabase';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';
import { LeadModal } from './components/widgets/LeadModal';
import { AuthModal } from './components/widgets/AuthModal';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { StudyAbroad } from './pages/StudyAbroad';
import { Reviews } from './pages/Reviews';
import { Contact } from './pages/Contact';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('home');
  const [courses, setCourses] = useState<Course[]>([]);
  const [reviews, setReviews] = useState<StudentReview[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
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
  }, []);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('eesa_user');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        user={user}
        onNavigate={handleNavigate}
        onOpenDemoModal={() => handleOpenDemoModal()}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            courses={courses}
            reviews={reviews}
            onNavigate={handleNavigate}
            onOpenDemoModal={handleOpenDemoModal}
          />
        )}

        {activePage === 'about' && (
          <About
            onNavigate={handleNavigate}
            onOpenDemoModal={() => handleOpenDemoModal()}
          />
        )}

        {activePage === 'courses' && (
          <Courses
            courses={courses}
            onOpenDemoModal={handleOpenDemoModal}
          />
        )}

        {activePage === 'study-abroad' && (
          <StudyAbroad
            courses={courses}
            onOpenDemoModal={handleOpenDemoModal}
          />
        )}

        {activePage === 'reviews' && (
          <Reviews
            reviews={reviews}
            onOpenDemoModal={() => handleOpenDemoModal()}
          />
        )}

        {activePage === 'contact' && (
          <Contact
            courses={courses}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDemoModal={() => handleOpenDemoModal()}
      />

      {/* Sticky Mobile Actions Bar */}
      <MobileStickyBar
        onOpenDemoModal={() => handleOpenDemoModal()}
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
    </div>
  );
};

export default App;
