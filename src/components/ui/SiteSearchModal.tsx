import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Globe, Award, HelpCircle, MapPin, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { Course, StudentReview } from '@/types/database';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Course' | 'Study Abroad' | 'Review' | 'FAQ' | 'Page' | 'Contact';
  action: () => void;
  badgeColor: string;
}

interface SiteSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  reviews: StudentReview[];
  onNavigate: (page: string) => void;
  onOpenDemoModal: (courseId?: string) => void;
}

export const SiteSearchModal: React.FC<SiteSearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  reviews,
  onNavigate,
  onOpenDemoModal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open search
          const event = new CustomEvent('open-site-search');
          window.dispatchEvent(event);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compile search items
  const allItems: SearchResultItem[] = [
    // Pages
    {
      id: 'page-home',
      title: 'Home Page',
      subtitle: 'Overview of courses, faculty mentorship, fee structure & reviews',
      category: 'Page',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
      action: () => { onNavigate('home'); onClose(); },
    },
    {
      id: 'page-courses',
      title: 'Courses Directory',
      subtitle: 'Spoken English, IELTS, PTE, OET & Academic coaching syllabus',
      category: 'Page',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
      action: () => { onNavigate('courses'); onClose(); },
    },
    {
      id: 'page-study-abroad',
      title: 'Study Abroad & OET Specialization',
      subtitle: 'UK, Canada, Australia PR Visas & Healthcare nurse placement',
      category: 'Page',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      action: () => { onNavigate('study-abroad'); onClose(); },
    },
    {
      id: 'page-about',
      title: 'About EESA Academy & Founder',
      subtitle: 'Pedagogy, Founder Neetu Devi, classroom tour & credentials',
      category: 'Page',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
      action: () => { onNavigate('about'); onClose(); },
    },
    {
      id: 'page-reviews',
      title: 'Verified Student Reviews & Scorecards',
      subtitle: '315+ Justdial 4.9★ reviews & verified IELTS/PTE/OET scorecards',
      category: 'Page',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      action: () => { onNavigate('reviews'); onClose(); },
    },
    {
      id: 'page-contact',
      title: 'Contact Campus & Metro Directions',
      subtitle: 'Dashrath Puri Metro Gate No. 1, Vijay Enclave, Dabri-Palam Road',
      category: 'Contact',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
      action: () => { onNavigate('contact'); onClose(); },
    },

    // Courses
    ...courses.map((course) => ({
      id: `course-${course.id}`,
      title: course.title,
      subtitle: course.short_description,
      category: 'Course' as const,
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
      action: () => {
        onNavigate('courses');
        onClose();
      },
    })),

    // Common FAQ & Search Queries
    {
      id: 'faq-metro',
      title: 'How to reach EESA Academy via Metro?',
      subtitle: 'Take Magenta Line to Dashrath Puri Metro Station → Gate No. 1 (50m walk)',
      category: 'FAQ',
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
      action: () => { onNavigate('contact'); onClose(); },
    },
    {
      id: 'faq-demo',
      title: 'How to book a Free Demo Class?',
      subtitle: 'Schedule an obligation-free 1-on-1 trial class with our academic team',
      category: 'FAQ',
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
      action: () => { onOpenDemoModal(); onClose(); },
    },
    {
      id: 'faq-oet',
      title: 'OET Healthcare Preparation for Nurses',
      subtitle: 'Grade B (350+ points) training for UK NMC and Australian registration',
      category: 'Study Abroad',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      action: () => { onNavigate('study-abroad'); onClose(); },
    },
    {
      id: 'faq-fees',
      title: 'Fee Structure & Monthly Package Calculator',
      subtitle: 'Transparent pricing starting at ₹3,500/month with small batches',
      category: 'Course',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
      action: () => { onNavigate('home'); onClose(); },
    },

    // Student Reviews
    ...reviews.map((rev) => ({
      id: `rev-${rev.id}`,
      title: `${rev.student_name} (${rev.score_achieved})`,
      subtitle: rev.review_text.substring(0, 80) + '...',
      category: 'Review' as const,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      action: () => {
        onNavigate('reviews');
        onClose();
      },
    })),
  ];

  // Filter items
  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 7)
    : allItems.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search courses, IELTS, OET, fees, metro location, reviews..."
            className="w-full bg-transparent text-sm sm:text-base outline-none text-slate-900 dark:text-white placeholder-slate-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 flex-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching results found for "{query}"
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Try searching for 'IELTS', 'Spoken English', 'OET', 'Fees', or 'Metro'.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-blue-100'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${item.badgeColor}`}>
                        {item.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
                    <span className="text-[10px] hidden sm:inline-block">Jump</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-mono text-[9px]">↑</kbd>
              <kbd className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-mono text-[9px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-mono text-[9px]">Enter</kbd>
              Select
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenDemoModal();
            }}
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Demo</span>
          </button>
        </div>

      </div>
    </div>
  );
};
