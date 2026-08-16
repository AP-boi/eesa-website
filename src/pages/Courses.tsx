import React, { useState } from 'react';
import {
  BookOpen, CheckCircle2, Clock, Download, Sparkles, Filter, ChevronRight
} from 'lucide-react';
import { Course } from '../types/database';
import { GooeyInput } from '@/components/ui/gooey-input';

interface CoursesProps {
  courses: Course[];
  onOpenDemoModal: (courseId?: string, bookingType?: 'free_demo' | 'diagnostic_test' | 'profile_evaluation' | 'mock_interview' | 'prospectus_download' | 'contact') => void;
}

export const Courses: React.FC<CoursesProps> = ({ courses, onOpenDemoModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration = selectedDuration === 'all'
      ? true
      : selectedDuration === 'short'
      ? c.duration_weeks <= 4
      : c.duration_weeks > 4;

    return matchesCategory && matchesSearch && matchesDuration;
  });

  return (
    <div className="space-y-12 py-8 sm:py-12">
      
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 bg-blue-900/80 text-blue-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-700">
            <BookOpen className="w-4 h-4 text-blue-400" /> Master Curriculum Directory
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Explore All Programs & Modules
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            From foundational Spoken English and Corporate Interview Prep to high-stakes IELTS 8.0+, PTE 79+, OET Healthcare, and Classes III-VIII Academic Tutoring.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenDemoModal(undefined, 'prospectus_download')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl shadow-lg transition-all text-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Prospectus (PDF)</span>
            </button>

            <button
              onClick={() => onOpenDemoModal(undefined, 'free_demo')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Demo Class</span>
            </button>
          </div>
        </div>
      </section>

      {/* FILTER & GOOEY SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Gooey Search Input (5 Cols) */}
            <div className="md:col-span-5 flex justify-start items-center">
              <GooeyInput
                placeholder="Search courses (IELTS, PTE, OET)..."
                value={searchQuery}
                onValueChange={(val) => setSearchQuery(val)}
                collapsedWidth={160}
                expandedWidth={240}
              />
            </div>

            {/* Category Select (4 Cols) */}
            <div className="md:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Course Categories</option>
                <option value="spoken_english">Spoken English & Fluency</option>
                <option value="international_test_prep">International Test Prep (IELTS/PTE/OET)</option>
                <option value="academic_tutoring">Classes III-VIII Academic Tutoring</option>
                <option value="career_services">Study Abroad & Career Services</option>
              </select>
            </div>

            {/* Duration Select (3 Cols) */}
            <div className="md:col-span-3">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Any Duration</option>
                <option value="short">Fast-Track (≤ 4 Weeks)</option>
                <option value="long">Comprehensive (&gt; 4 Weeks)</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Showing <strong>{filteredCourses.length}</strong> matching programs</span>
            <span className="text-emerald-700 font-semibold">📍 All courses available at Dashrath Puri Campus & Online</span>
          </div>

        </div>
      </section>

      {/* MASTER COURSES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                    {course.category.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{course.duration_weeks} Weeks Duration</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {course.full_description}
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Target Audience:
                  </span>
                  <p className="text-xs font-semibold text-slate-800">{course.target_audience}</p>
                </div>

                {/* Outcomes */}
                <div>
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block mb-2">
                    Key Learning Outcomes:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.learning_outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {course.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-200"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>

              </div>

              <div className="pt-6 border-t border-slate-200 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Transparent Fee</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{course.package_fee_inr ? course.package_fee_inr.toLocaleString('en-IN') : 'Custom'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">package fee</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenDemoModal(course.id, 'free_demo')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enquire & Reserve Demo Seat</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD PROSPECTUS PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-3xl p-8 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">Need the Complete Print Catalog?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Download the official EESA Academy syllabus brochure containing detailed weekly breakdown & fee structures.
            </p>
          </div>

          <button
            onClick={() => onOpenDemoModal(undefined, 'prospectus_download')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-7 py-3.5 rounded-xl shadow-lg transition-all text-xs flex items-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Prospectus PDF</span>
          </button>
        </div>
      </section>

    </div>
  );
};
