import React from 'react';
import { CheckCircle2, MessageSquare, Calendar, Phone, ArrowRight } from 'lucide-react';

interface FormSuccessStateProps {
  title?: string;
  subtitle?: string;
  applicantName?: string;
  bookingType?: string;
  onReset?: () => void;
  onClose?: () => void;
}

export const FormSuccessState: React.FC<FormSuccessStateProps> = ({
  title = 'Request Received Successfully!',
  subtitle = 'Our senior faculty team will connect with you promptly.',
  applicantName,
  bookingType = 'Demo & Consultation',
  onReset,
  onClose,
}) => {
  return (
    <div className="text-center py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Animated Success Badge */}
      <div className="relative mx-auto w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
        <div className="relative w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
      </div>

      {/* Headline & Subtext */}
      <div className="space-y-2">
        <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {title}
        </h4>
        {applicantName && (
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            Thank you, {applicantName}!
          </p>
        )}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Roadmap: What Happens Next? */}
      <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700/80 text-left space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          📋 What Happens Next?
        </span>

        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
              1
            </span>
            <p>
              <strong className="font-semibold">Confirmation Notification:</strong> Details sent to your WhatsApp/Email.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
              2
            </span>
            <p>
              <strong className="font-semibold">Mentor Consultation:</strong> Faculty will call within 2 business hours to schedule your timing.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
              3
            </span>
            <p>
              <strong className="font-semibold">Campus Visit / Online Link:</strong> Receive classroom seat confirmation or live Zoom link.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href="https://wa.me/919810126691?text=Hi%20EESA%20Academy,%20I%20just%20submitted%20a%20booking%20request%20online."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>Confirm on WhatsApp Now</span>
        </a>

        {onClose && (
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};
