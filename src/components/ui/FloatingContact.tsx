import React, { useState } from 'react';
import { MessageSquare, Phone, Sparkles, X, ChevronUp, Clock, HelpCircle, ExternalLink } from 'lucide-react';
import { getStoredUtmParams } from '@/lib/utm';

interface FloatingContactProps {
  onOpenDemoModal: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ onOpenDemoModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const utm = getStoredUtmParams();
  const utmRef = utm.utm_source ? ` (Source: ${utm.utm_source})` : '';

  const whatsappUrl = `https://wa.me/919810126691?text=${encodeURIComponent(
    `Hi EESA Academy, I am interested in your Spoken English & Exam Prep courses${utmRef}. Please share batch timings & fee details.`
  )}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 print:hidden flex flex-col items-end gap-2">
      
      {/* Popover Menu */}
      {isOpen && (
        <div className="mb-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 animate-fadeIn space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>EESA Admissions Desk</span>
              </h4>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Dashrath Puri Campus · 7 AM - 8 PM
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              aria-label="Close contact options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {/* WhatsApp Direct 1-Click */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-semibold transition-colors border border-emerald-200 dark:border-emerald-800 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <span className="block font-bold">Chat on WhatsApp</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">+91 98101 26691</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Direct Phone Call */}
            <a
              href="tel:+919810126691"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-900 dark:text-blue-200 font-semibold transition-colors border border-blue-200 dark:border-blue-800"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="block font-bold">Call Admissions Team</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400">Mon-Sat: 7:00 AM - 8:00 PM</span>
              </div>
            </a>

            {/* Book Free 1-on-1 Strategy Session Modal */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDemoModal();
              }}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold transition-colors shadow-xs cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-bold">Free 1-on-1 Strategy Session</span>
                <span className="text-[10px] text-blue-300">Diagnostic audit & 60-day roadmap</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button Group */}
      <div className="flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp chat"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-400 group cursor-pointer hover:scale-105 active:scale-95 text-xs font-bold"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline-block">WhatsApp Us</span>
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Quick contact & help options"
          className="flex items-center gap-1.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white p-2.5 sm:p-3 rounded-full shadow-xl transition-all duration-300 border border-slate-700 cursor-pointer hover:scale-105 active:scale-95"
        >
          {isOpen ? <X className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
};
