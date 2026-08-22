import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X, ChevronRight, Check } from 'lucide-react';
import { getConsentPreferences, saveConsentPreferences } from '@/lib/consent';

interface CookieBannerProps {
  onOpenPrivacyModal?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacyModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(true);

  useEffect(() => {
    // Check if consent has already been given
    const consent = getConsentPreferences();
    if (!consent) {
      // Delay display slightly for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsConsent(consent.analytics);
      setMarketingConsent(consent.marketing);
    }
    return undefined;
  }, []);

  const handleAcceptAll = () => {
    saveConsentPreferences({
      essential: true,
      analytics: true,
      marketing: true,
    });
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    saveConsentPreferences({
      essential: true,
      analytics: false,
      marketing: false,
    });
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    saveConsentPreferences({
      essential: true,
      analytics: analyticsConsent,
      marketing: marketingConsent,
    });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-fadeIn"
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl shrink-0">
              🍪
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Cookie & Privacy Choices
              </h4>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                EESA Academy Experience
              </span>
            </div>
          </div>

          <button
            onClick={handleAcceptEssential}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Text */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          We use cookies to enhance navigation, analyze site traffic, remember your theme preference, and personalize test preparation recommendations.
        </p>

        {/* Optional Preferences Accordion */}
        {showPreferences && (
          <div className="mb-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Essential Cookies</span>
                <span className="text-[10px] text-slate-500">Theme, auth sessions & security</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">Always Active</span>
            </div>

            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Analytics Cookies</span>
                <span className="text-[10px] text-slate-500">Anonymous page visits & metrics</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Marketing & Attribution</span>
                <span className="text-[10px] text-slate-500">UTM campaign tracking & offers</span>
              </div>
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 text-xs">
          {!showPreferences ? (
            <>
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept All</span>
              </button>

              <button
                onClick={handleAcceptEssential}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold py-2 px-3 rounded-xl transition-all"
              >
                Essential Only
              </button>

              <button
                onClick={() => setShowPreferences(true)}
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold py-2 px-1 text-center"
              >
                Preferences
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSaveCustom}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl transition-all shadow-xs"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold py-2 px-3 rounded-xl"
              >
                Back
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
