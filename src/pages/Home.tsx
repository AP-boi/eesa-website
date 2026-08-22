import React, { useState } from 'react';
import {
  Sparkles, Star, Users, Award, ShieldCheck, CheckCircle2, ArrowRight,
  BookOpen, Globe, GraduationCap, ChevronRight, MapPin, Building2, Flame
} from 'lucide-react';
import { Course, StudentReview } from '../types/database';
import { FeeCalculator } from '../components/widgets/FeeCalculator';
import { DiagnosticQuiz } from '../components/widgets/DiagnosticQuiz';
import { ScorecardLightbox } from '../components/widgets/ScorecardLightbox';
import { FAQSection } from '../components/widgets/FAQSection';
import { LastUpdatedBadge } from '../components/ui/LastUpdatedBadge';
import { CopyButton } from '../components/ui/CopyButton';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SEO } from '@/components/common/SEO';

interface HomeProps {
  courses: Course[];
  reviews: StudentReview[];
  onNavigate: (page: string) => void;
  onOpenDemoModal: (courseId?: string, bookingType?: 'free_demo' | 'diagnostic_test' | 'profile_evaluation' | 'mock_interview' | 'prospectus_download' | 'contact') => void;
}

export const Home: React.FC<HomeProps> = ({ courses, reviews, onNavigate, onOpenDemoModal }) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [selectedScorecard, setSelectedScorecard] = useState<StudentReview | null>(null);

  const filteredCourses = activeCategoryTab === 'all'
    ? courses
    : courses.filter((c) => c.category === activeCategoryTab);

  return (
    <div className="space-y-20 sm:space-y-32 pb-24">
      <SEO
        title="Spoken English & Overseas Test Prep Institute in West Delhi"
        description="EESA Academy (Dashrath Puri Metro Gate 1, West Delhi). IELTS Band 8.0+, PTE 79+, OET Grade B & Spoken English fluency with 1-on-1 mentorship."
        canonicalUrl="/"
      />
      
      {/* CLEAN MINIMAL HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 pb-20 bg-gradient-to-b from-slate-100/60 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-blue-50/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 px-3.5 py-1 rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>West Delhi's Premier English & Test Prep Institute</span>
                </div>
                <LastUpdatedBadge dateString="August 2026" version="Curriculum v4.2" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Master English & Ace Exams at{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  Dashrath Puri's Elite Academy
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
                Transforming confidence, IELTS (Band 8.0+), PTE (79+), OET (Grade B), and global careers for{' '}
                <strong className="text-slate-900 dark:text-white font-semibold">5,000+ alumni</strong> across West Delhi with 1-on-1 mentorship designed by Founder <strong className="text-blue-600 dark:text-blue-400 font-semibold">Neetu Devi</strong> and certified master trainers.
              </p>

              {/* Magnetic Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <MagneticButton strength={0.4} maxDistance={80}>
                  <button
                    onClick={() => onOpenDemoModal(undefined, 'free_demo')}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Book Free 1-on-1 Strategy Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticButton>

                <button
                  onClick={() => onNavigate('courses')}
                  className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold px-6 py-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>Explore Programs</span>
                </button>
              </div>

              {/* Minimal Trust Metrics Bar */}
              <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-700 dark:text-slate-300">
                <div className="p-2 rounded-xl hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors">
                  <span className="text-2xl font-black text-slate-900 dark:text-white block">4.9 ★</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">315+ Justdial Reviews</span>
                </div>
                <div className="p-2 rounded-xl hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors">
                  <span className="text-2xl font-black text-slate-900 dark:text-white block">5,000+</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Trained Alumni</span>
                </div>
                <div className="p-2 rounded-xl hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors">
                  <span className="text-2xl font-black text-slate-900 dark:text-white block">Max 8</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Small Batch Limit</span>
                </div>
                <div className="p-2 rounded-xl hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors">
                  <span className="text-2xl font-black text-slate-900 dark:text-white block">100%</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Placement Support</span>
                </div>
              </div>

            </div>

            {/* Right Column: Clean Registration Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200/80 dark:border-slate-800 relative hover:shadow-xl transition-shadow duration-300">
                <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                  1-on-1 Consultation
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                  Book Free 1-on-1 Strategy Session
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Get a personalized 15-minute diagnostic audit and custom 60-day roadmap with certified master mentors.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onOpenDemoModal(undefined, 'free_demo');
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Student Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98101 26691"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Target Program
                    </label>
                    <select className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white cursor-pointer">
                      <option>Spoken English & Fluency</option>
                      <option>IELTS Academic / General (Band 7.5+)</option>
                      <option>PTE Academic Masterclass</option>
                      <option>OET Healthcare (Nurses/Doctors)</option>
                      <option>Classes III-VIII Academic Tutoring</option>
                    </select>
                  </div>

                  <MagneticButton strength={0.3} maxDistance={40}>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-xs transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Claim Free 1-on-1 Strategy Session</span>
                    </button>
                  </MagneticButton>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center flex items-center justify-center gap-2 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Dashrath Puri Metro Gate 1</span>
                    <CopyButton textToCopy="Dashrath Puri Metro Station Gate 1, New Delhi - 110045" iconOnly />
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MINIMAL COURSE CATEGORY HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
            Curriculum Overview
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            English & Test Preparation Programs
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Personalized 1-on-1 and micro-batch modules designed for fluency and score acceleration.
          </p>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Programs' },
            { id: 'spoken_english', label: 'Spoken English' },
            { id: 'international_test_prep', label: 'IELTS / PTE / OET' },
            { id: 'academic_tutoring', label: 'Classes III-VIII' },
            { id: 'career_services', label: 'Study Abroad' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategoryTab === tab.id
                  ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded">
                    {course.category.replace('_', ' ')}
                  </span>
                  {course.is_featured && (
                    <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {course.short_description}
                </p>

                {/* Key Features List */}
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                  {course.learning_outcomes.slice(0, 3).map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-5 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{course.duration_weeks} Weeks</span>

                <MagneticButton strength={0.3} maxDistance={40}>
                  <button
                    onClick={() => onOpenDemoModal(course.id, 'free_demo')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Enquire</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeeCalculator
          courses={courses}
          onUnlockDiscount={(fee, courseId) => onOpenDemoModal(courseId, 'free_demo')}
        />
      </section>

      {/* REAL CAMPUS SESSIONS & CLASSROOM TOUR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider bg-blue-950 px-3.5 py-1 rounded-full border border-blue-800">
                Inside EESA Academy
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
                Real Classroom Sessions & Campus Life
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                Experience the energetic, collaborative, and interactive learning atmosphere at Dashrath Puri Campus.
              </p>
            </div>

            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              <span>View Full Campus Tour</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 group hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">
              <div className="h-44 overflow-hidden bg-slate-950">
                <img
                  src="/images/eesa/eesa-classroom-1.jpeg"
                  alt="EESA AC Classroom Lecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5">
                <h4 className="text-xs font-bold text-white">Micro-Batch Lecture Room</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Air-conditioned, modern seating for max 8 students</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 group hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">
              <div className="h-44 overflow-hidden bg-slate-950">
                <img
                  src="/images/eesa/eesa-ielts-session-1.jpeg"
                  alt="Speaking Practice Session"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5">
                <h4 className="text-xs font-bold text-white">1-on-1 Speaking Panel</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Daily individual feedback & accent calibration</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 group hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">
              <div className="h-44 overflow-hidden bg-slate-950">
                <img
                  src="/images/eesa/eesa-student-activity-1.jpeg"
                  alt="Group Discussion Forum"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5">
                <h4 className="text-xs font-bold text-white">Group Roleplay & Debate</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Confidence building & public speaking exercises</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 group hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">
              <div className="h-44 overflow-hidden bg-slate-950">
                <img
                  src="/images/eesa/eesa-batch-1.jpeg"
                  alt="Student Batch Achievement"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5">
                <h4 className="text-xs font-bold text-white">Batch Felicitations</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Celebrating IELTS Band 8.0 & OET Grade B success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE EESA ADVANTAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 text-white border border-slate-800 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Mentorship Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Why EESA Academy Stands Out
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Parameter</th>
                  <th className="py-3 px-4 font-bold text-emerald-400 bg-slate-800/80 rounded-t-lg">
                    EESA Academy
                  </th>
                  <th className="py-3 px-4 font-bold">Suburban Tutors</th>
                  <th className="py-3 px-4 font-bold">Commercial Hubs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Batch Size Limit</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 bg-slate-800/80">Max 8 Students</td>
                  <td className="py-3.5 px-4 text-slate-400">15 - 25 Students</td>
                  <td className="py-3.5 px-4 text-slate-400">40 - 60+ Students</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">1-on-1 Daily Practice</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 bg-slate-800/80">Guaranteed Daily</td>
                  <td className="py-3.5 px-4 text-slate-400">Rare</td>
                  <td className="py-3.5 px-4 text-slate-400">None</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Metro Access</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 bg-slate-800/80">50m from Gate 1</td>
                  <td className="py-3.5 px-4 text-slate-400">Remote Streets</td>
                  <td className="py-3.5 px-4 text-slate-400">Congested Hubs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC QUIZ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DiagnosticQuiz
          courses={courses}
          onSelectCourse={(courseId) => onOpenDemoModal(courseId, 'free_demo')}
        />
      </section>

      {/* SCORECARDS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
            Verified Results
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Student Scorecards & Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => setSelectedScorecard(rev)}
                  className="relative h-40 rounded-xl overflow-hidden mb-3 cursor-pointer group bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700"
                >
                  <img
                    src={rev.scorecard_image_url || '/images/eesa/ielts-scorecard.jpg'}
                    alt={rev.student_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                    {rev.score_achieved}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed line-clamp-3">
                  "{rev.review_text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{rev.student_name}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{rev.course_taken}</p>
                </div>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200/60 dark:border-blue-800">
                  {rev.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPANDABLE FAQ SECTION */}
      <FAQSection onOpenDemoModal={() => onOpenDemoModal(undefined, 'free_demo')} />

      {/* SCORECARD LIGHTBOX */}
      <ScorecardLightbox
        review={selectedScorecard}
        onClose={() => setSelectedScorecard(null)}
      />

    </div>
  );
};
