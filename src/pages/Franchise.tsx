import React, { useState } from 'react';
import {
  Building2, TrendingUp, Users, ShieldCheck, CheckCircle2, ArrowRight,
  Sparkles, Award, MapPin, Calculator, Download, Phone, Mail, FileText,
  Briefcase, DollarSign, PieChart, Clock
} from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { submitLeadBooking } from '@/lib/supabase';
import { sanitizeText, FranchiseInquirySchema, checkSubmissionRateLimit } from '@/lib/security';

interface FranchiseProps {
  onNavigate: (page: string) => void;
  onOpenDemoModal: (courseId?: string, bookingType?: 'free_demo' | 'diagnostic_test' | 'profile_evaluation' | 'mock_interview' | 'prospectus_download' | 'contact') => void;
}

export const Franchise: React.FC<FranchiseProps> = ({ onNavigate, onOpenDemoModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    targetCity: '',
    investmentBudget: '15-25L',
    hasRealEstate: 'no',
    honeypot: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Bot detection check
    if (formData.honeypot) {
      console.warn('[Security] Bot honeypot triggered on Franchise form');
      setIsSubmitted(true);
      return;
    }

    // Rate limiting (3 submissions per 5 min)
    const rateCheck = checkSubmissionRateLimit('franchise_apply', 3, 300000);
    if (!rateCheck.allowed) {
      setErrorMessage(`Submission limit reached. Please wait ${rateCheck.retryAfterSec} seconds before retrying.`);
      return;
    }

    // Input sanitization
    const cleanName = sanitizeText(formData.fullName);
    const cleanEmail = sanitizeText(formData.email);
    const cleanPhone = formData.phone.replace(/[\s-+()]/g, '');
    const cleanCity = sanitizeText(formData.targetCity);

    // Schema Validation
    const validation = FranchiseInquirySchema.safeParse({
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      city: cleanCity,
      netWorthBracket: formData.investmentBudget,
      honeypot: formData.honeypot,
    });

    if (!validation.success) {
      const firstErr = validation.error.issues[0]?.message || 'Invalid form input';
      setErrorMessage(firstErr);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLeadBooking({
        full_name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        booking_type: 'prospectus_download',
        preferred_mode: 'offline',
        notes: `[Franchise Inquiry] City: ${cleanCity} | Budget: ${formData.investmentBudget} | Real Estate: ${formData.hasRealEstate}`,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Franchise lead submission failed:', err);
      setErrorMessage('Unable to dispatch deck. Please contact franchise@eesaacademy.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      <SEO
        title="Franchise Opportunities & Edu-Entrepreneurship"
        description="Partner with EESA Academy & Founder Neetu Devi. Launch an English & Test Prep franchise in your city with proven unit economics, turn-key curriculum, and operational SOPs."
        canonicalUrl="/franchise"
        keywords={[
          'EESA Academy franchise',
          'Education franchise India',
          'IELTS coaching franchise opportunity',
          'Spoken English franchise Delhi NCR',
          'Edu-entrepreneurship investment',
          'Neetu Devi franchise partner'
        ]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-14 lg:p-20 border border-slate-800 shadow-2xl">
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 bg-emerald-900/80 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-700">
              <Building2 className="w-4 h-4 text-emerald-400" /> B2B Franchise Network
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-900/60 text-blue-300 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-700">
              <ShieldCheck className="w-3.5 h-3.5" /> High ROI EdTech Model
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            Build an <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">EESA Academy</span> in Your City.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
            Partner with Founder & Managing Director <strong className="text-white">Neetu Devi</strong> to scale India's most student-centric English & test preparation institute. Turn-key curriculum, operational blueprints, and teacher certification included.
          </p>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-slate-300">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block">6-9 Mo.</span>
              <span className="text-xs text-slate-400">Target Break-even</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-xl sm:text-2xl font-black text-blue-400 block">60%+</span>
              <span className="text-xs text-slate-400">Gross Margin Potential</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-xl sm:text-2xl font-black text-amber-400 block">100%</span>
              <span className="text-xs text-slate-400">Curriculum & SOPs</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-xl sm:text-2xl font-black text-purple-400 block">Pan-India</span>
              <span className="text-xs text-slate-400">Territory Exclusivity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Franchise With EESA Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
            The Franchise Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Investors Choose EESA Academy
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A battle-tested operational engine that eliminates guesswork for edu-entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Founder-Supervised Quality</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every instructor at your branch undergoes Neetu Devi's strict 30-day certification program. Maintain West Delhi's 4.9★ benchmark at your center from day one.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multi-Revenue Streams</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Monetize across 4 high-demand verticals: Spoken English fluency, IELTS/PTE/OET test prep, school academic tutoring (Classes III-VIII), and overseas study consulting.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-800">
              <PieChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Turn-Key Marketing & Tech</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Get localized lead generation playbooks, digital marketing ad assets, CRM integration, and student diagnostic portals pre-configured for your territory.
            </p>
          </div>
        </div>
      </section>

      {/* Prospectus & Discovery Call Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-800">
                Direct Founder Channel
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Download Franchise Information Deck & Schedule Discovery Call
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Receive the confidential unit-economics breakdown, capex requirement schedules, and territory availability matrix directly in your inbox.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Confidential Financial Disclosure & Capex Sheet</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Territory Exclusivity Mapping</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1-on-1 Strategy Call with Neetu Devi</span>
                </div>
              </div>

              {/* Founder Executive Endorsement */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 mt-4">
                <img
                  src="/images/eesa/neetu-devi-founder.jpg"
                  alt="Neetu Devi"
                  className="w-14 h-14 rounded-full object-cover object-top border-2 border-emerald-400/80 shadow-md shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">Neetu Devi</h4>
                  <p className="text-xs text-emerald-400 font-semibold">Founder & Managing Director</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 italic">
                    "We personally guide and mentor every franchise partner to ensure academic excellence."
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Information Deck Dispatched</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Thank you for your interest. Our franchise development desk has received your request and will contact you via WhatsApp / Phone within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Security Honeypot */}
                  <input
                    type="text"
                    name="website_hp"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorMessage && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Franchise Partner Inquiry
                  </h3>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singhania"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="investor@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Proposed City / Region *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jaipur, Lucknow, Gurgaon"
                        value={formData.targetCity}
                        onChange={(e) => setFormData({ ...formData, targetCity: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Investment Budget *
                      </label>
                      <select
                        value={formData.investmentBudget}
                        onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white cursor-pointer"
                      >
                        <option value="10-15L">₹10 Lakh - ₹15 Lakh</option>
                        <option value="15-25L">₹15 Lakh - ₹25 Lakh (Standard)</option>
                        <option value="25-50L">₹25 Lakh - ₹50 Lakh (Multi-unit)</option>
                        <option value="50L+">₹50 Lakh+ (State Master)</option>
                      </select>
                    </div>
                  </div>

                  <MagneticButton strength={0.2} maxDistance={30}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Request Franchise Information Deck</span>
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
