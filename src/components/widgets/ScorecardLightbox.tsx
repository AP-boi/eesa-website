import React from 'react';
import { X, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import { StudentReview } from '../../types/database';

interface ScorecardLightboxProps {
  review: StudentReview | null;
  onClose: () => void;
}

export const ScorecardLightbox: React.FC<ScorecardLightboxProps> = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm tracking-tight">Verified Official Scorecard Document</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-[60vh] flex items-center justify-center">
            <img
              src={review.scorecard_image_url || '/images/eesa/ielts-scorecard.jpg'}
              alt={review.student_name + ' Scorecard'}
              className="w-full h-auto object-cover max-h-[60vh]"
            />
          </div>

          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified EESA Alumni
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">{review.student_name}</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5">{review.course_taken}</p>
              <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{review.score_achieved}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "{review.review_text}"
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span>Source: {review.source}</span>
              <span>⭐ {review.rating}.0 / 5.0 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
