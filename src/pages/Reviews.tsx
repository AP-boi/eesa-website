import React, { useState } from 'react';
import {
  Star, ShieldCheck, Award, Play, CheckCircle2
} from 'lucide-react';
import { StudentReview } from '../types/database';
import { ScorecardLightbox } from '../components/widgets/ScorecardLightbox';
import { VideoModal } from '../components/widgets/VideoModal';

interface ReviewsProps {
  reviews: StudentReview[];
  onOpenDemoModal: () => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, onOpenDemoModal }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedScorecard, setSelectedScorecard] = useState<StudentReview | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<{ open: boolean; title: string }>({
    open: false,
    title: '',
  });

  const filteredReviews = selectedFilter === 'all'
    ? reviews
    : reviews.filter((r) => r.course_taken.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="space-y-16 py-8 sm:py-12">
      
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-center space-y-4">
        <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" /> Student Verification Portal
        </span>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Verified Student Reviews & Official Scorecards
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Real results achieved by West Delhi students under Prashant Sir's mentorship across IELTS, PTE Academic, OET Healthcare, and Spoken English.
        </p>

        {/* MULTI-PLATFORM RATINGS BAR */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs font-bold">
          <div className="bg-slate-800/90 px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2">
            <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span>4.9 / 5.0 on <strong>Justdial</strong> (315+ Reviews)</span>
          </div>

          <div className="bg-slate-800/90 px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span><strong>UrbanPro</strong> Verified Tutor Badge</span>
          </div>

          <div className="bg-slate-800/90 px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span><strong>Google Reviews</strong> 4.9★ Local Rating</span>
          </div>
        </div>
      </section>

      {/* FILTERABLE REVIEWS & SCORECARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Reviews & Scorecards' },
            { id: 'ielts', label: 'IELTS Band 8.0+' },
            { id: 'pte', label: 'PTE 79+ Scores' },
            { id: 'oet', label: 'OET Medical (Nurses)' },
            { id: 'spoken', label: 'Spoken English & Fluency' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                selectedFilter === f.id
                  ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => setSelectedScorecard(rev)}
                  className="relative h-44 rounded-xl overflow-hidden mb-4 cursor-pointer group bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <img
                    src={rev.scorecard_image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'}
                    alt={rev.student_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1">
                    <span>🔍 Zoom Official Scorecard</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow-xs">
                    {rev.score_achieved}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-600 dark:fill-emerald-400 text-emerald-600 dark:text-emerald-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{rev.review_text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between text-xs">
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

      {/* VIDEO TESTIMONIAL GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
              Audio-Visual Transformation Clips
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-3">
              Video Testimonials & Speech Transformations
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Watch real student transformation clips highlighting before-and-after speech hesitation removal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Neha Roy (IELTS 8.0)',
                title: 'From Hesitant Speaker to UK University Admit',
                thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
              },
              {
                name: 'Karan Malhotra (PTE 82)',
                title: 'PTE Speaking Pronunciation & Template Strategy',
                thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
              },
              {
                name: 'Sr. Mary Kurian (OET Grade B)',
                title: 'Working Nurse Shift Batch Experience at EESA',
                thumbnail: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80',
              },
            ].map((vid, idx) => (
              <div
                key={idx}
                onClick={() => setActiveVideoModal({ open: true, title: vid.title })}
                className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 cursor-pointer group hover:border-blue-600 transition-all"
              >
                <div className="relative h-48 bg-slate-950">
                  <img
                    src={vid.thumbnail}
                    alt={vid.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                    {vid.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">{vid.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOXES */}
      <ScorecardLightbox
        review={selectedScorecard}
        onClose={() => setSelectedScorecard(null)}
      />

      <VideoModal
        isOpen={activeVideoModal.open}
        videoTitle={activeVideoModal.title}
        onClose={() => setActiveVideoModal({ open: false, title: '' })}
      />

    </div>
  );
};
