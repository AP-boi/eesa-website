import React, { useState } from 'react';
import {
  Sparkles, Award, Users, ShieldCheck, CheckCircle2, ArrowRight,
  BookOpen, GraduationCap, Target, TrendingUp, Building2, Globe,
  Play, Quote, Star, BarChart3, Briefcase, Heart, Eye, Lightbulb,
  ChevronRight, Handshake, Video, FileText, Mail
} from 'lucide-react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { SEO } from '@/components/common/SEO';

interface FounderProps {
  onNavigate: (page: string) => void;
  onOpenDemoModal: (courseId?: string, bookingType?: 'free_demo' | 'diagnostic_test' | 'profile_evaluation' | 'mock_interview' | 'prospectus_download' | 'contact') => void;
}

export const Founder: React.FC<FounderProps> = ({ onNavigate, onOpenDemoModal }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [activeMethodStep, setActiveMethodStep] = useState(0);

  const methodologySteps = [
    {
      icon: Eye,
      title: 'Diagnostic Assessment',
      description: 'Every student begins with a comprehensive CEFR-aligned evaluation to identify precise gaps in grammar, fluency, pronunciation, and comprehension.',
      color: 'blue',
    },
    {
      icon: Target,
      title: 'Personalized Learning Blueprint',
      description: 'Custom study plans mapped to individual goals — whether Band 7.5+ for IELTS, Grade B for OET, or corporate communication fluency.',
      color: 'emerald',
    },
    {
      icon: BookOpen,
      title: 'Immersive Practice Protocol',
      description: 'Daily 1-on-1 speaking drills, roleplay scenarios, and accent neutralization exercises — no rote memorization, only communicative engagement.',
      color: 'blue',
    },
    {
      icon: TrendingUp,
      title: 'Outcome Verification & Certification',
      description: 'Weekly progress tracking with mock exams, measurable score improvements, and verified digital certificates upon course completion.',
      color: 'emerald',
    },
  ];

  const impactMetrics = [
    { value: '5,000+', label: 'Students Mentored & Graduated', icon: Users },
    { value: '98.4%', label: 'First-Attempt Target Band Rate', icon: Target },
    { value: '100%', label: 'Faculty Trained Under Founder\'s SOP', icon: ShieldCheck },
    { value: '4.9★', label: 'Aggregate Platform Rating', icon: Star },
    { value: '8', label: 'Max Batch Size Policy', icon: Briefcase },
    { value: '10+', label: 'Years of Academic Excellence', icon: Award },
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-24">
      <SEO
        title="Meet the Founder — Neetu Devi | EESA Academy"
        description="Meet Neetu Devi, Founder & Managing Director of EESA Academy. Discover her communicative English methodology, 10+ years of academic excellence, and institutional franchise vision."
        canonicalUrl="/founder"
        ogImage="/images/eesa/neetu-devi-founder.jpg"
        keywords={[
          'Neetu Devi EESA Academy',
          'EESA Academy Founder',
          'About EESA Academy Leadership',
          'Neetu Devi Managing Director',
          'English institute founder Delhi'
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO & POSITIONING
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background gradient with subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Portrait */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-emerald-500/20 blur-sm" />

                <div className="relative w-72 sm:w-80 lg:w-96 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                  <img
                    src="/images/eesa/neetu-devi-founder.jpg"
                    alt="Neetu Devi — Founder & Managing Director, EESA Academy"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Bottom gradient overlay for readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">
                        Founder & Managing Director
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating trust badge */}
                <div className="absolute -right-4 top-8 bg-white dark:bg-slate-900 rounded-xl p-3 shadow-xl border border-slate-200/80 dark:border-slate-700 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">10+ Years</p>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400">Academic Excellence</p>
                    </div>
                  </div>
                </div>

                {/* Floating students badge */}
                <div className="absolute -left-4 bottom-24 bg-white dark:bg-slate-900 rounded-xl p-3 shadow-xl border border-slate-200/80 dark:border-slate-700 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
                      <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">5,000+</p>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400">Students Mentored</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Headline & Positioning */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center gap-2 bg-blue-900/60 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-700">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Meet the Founder
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-900/60 text-emerald-300 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-700">
                  <ShieldCheck className="w-3 h-3" /> Govt. Registered Pvt. Ltd.
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Empowering Voices,{' '}
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Expanding Horizons.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Meet <strong className="text-white">Neetu Devi</strong>, the visionary educator and founder behind
                EESA Academy's communicative excellence and national expansion.
              </p>

              <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Under her leadership, EESA Academy has grown from a single Dashrath Puri classroom to
                West Delhi's most trusted English-language institute — with a vision to bring outcome-driven
                language education to every ambitious city across India.
              </p>

              {/* Quick-nav action links */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
                <MagneticButton strength={0.4} maxDistance={80}>
                  <button
                    onClick={() => onOpenDemoModal(undefined, 'free_demo')}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Book Free Demo Class</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticButton>

                <button
                  onClick={() => {
                    const section = document.getElementById('founder-letter');
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Watch Founder's Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: THE FOUNDING VISION (B2C — Students / Parents)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Story Column */}
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
              <Heart className="w-3.5 h-3.5" /> The Founding Story
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              From Observation to{' '}
              <span className="text-blue-600 dark:text-blue-400">Revolution</span>
            </h2>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Neetu Devi observed a fundamental flaw in how English was taught across suburban India —
              classrooms full of grammar drills and rote memorization, yet students who couldn't hold
              a 2-minute conversation without freezing. The gap wasn't knowledge; it was
              <strong className="text-slate-900 dark:text-white"> confidence, practice, and a safe space to make mistakes</strong>.
            </p>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              In 2022, she founded EESA Academy with a radical premise: <em>no student should have to travel
              hours to expensive commercial hubs just to learn to communicate effectively</em>. She brought
              international-grade test preparation — IELTS, PTE, OET — directly to Dashrath Puri, with
              micro-batches of just 8 students, daily 1-on-1 speaking practice, and a zero-hidden-fee policy.
            </p>

            <blockquote className="bg-blue-50/60 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-400 p-4 rounded-r-xl">
              <p className="text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed">
                "Language isn't a subject to be studied — it's a skill to be lived. Our classrooms
                aren't lecture halls; they're practice arenas where hesitation dies and fluency is born."
              </p>
              <cite className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-2 block not-italic">
                — Neetu Devi, Founder & Managing Director
              </cite>
            </blockquote>
          </div>

          {/* Mission & EESA Standard Card */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center border border-blue-200/60 dark:border-blue-800">
                  <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">The EESA Standard</h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                How Neetu Devi designed the operating framework that makes every EESA center deliver
                consistently exceptional outcomes:
              </p>

              <ul className="space-y-3">
                {[
                  'Max 8–10 students per batch — no overcrowded classrooms',
                  'Daily 1-on-1 speaking evaluations — not weekly, not monthly',
                  'CEFR-aligned diagnostic assessment before enrollment',
                  'Certified instructor onboarding with founder-led training',
                  'Transparent fee structure — every resource included, zero surprises',
                  'Weekly progress reports shared with students & parents',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Stat Pair */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white text-center shadow-lg">
                <p className="text-3xl font-black">2022</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-200 mt-1">Year Founded</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-5 text-white text-center shadow-lg">
                <p className="text-3xl font-black">Pvt. Ltd.</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200 mt-1">MCA Registered</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: LEADERSHIP & METHODOLOGY (Dual Audience)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">

          <div className="max-w-3xl mb-10">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700">
              Proprietary Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
              The Neetu Devi Methodology
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              A 4-stage outcome-driven learning architecture designed to take any student from
              hesitation to fluency in the shortest verified timeframe.
            </p>
          </div>

          {/* Interactive Methodology Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Step Selector */}
            <div className="lg:col-span-4 space-y-3">
              {methodologySteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMethodStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeMethodStep === idx
                      ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                      activeMethodStep === idx
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <h4 className={`text-sm font-bold ${
                      activeMethodStep === idx ? 'text-white' : 'text-slate-300'
                    }`}>
                      {step.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Step Detail */}
            <div className="lg:col-span-8 bg-slate-800/60 rounded-2xl p-6 sm:p-8 border border-slate-700 flex flex-col justify-center min-h-[240px]">
              {(() => {
                const step = methodologySteps[activeMethodStep];
                const StepIcon = step.icon;
                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        step.color === 'blue'
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-700'
                          : 'bg-emerald-600/20 text-emerald-400 border border-emerald-700'
                      }`}>
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Stage {activeMethodStep + 1} of 4
                        </p>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-semibold">
                        Applied consistently across all EESA Academy centers
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Faculty Certification Note */}
          <div className="mt-8 bg-slate-800/40 rounded-xl p-5 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Faculty Selection & Certification</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every EESA trainer undergoes a founder-supervised 30-day certification program covering
                pronunciation accuracy, diagnostic evaluation methodology, and the EESA Standard teaching protocol
                before leading any batch.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: EXECUTIVE IMPACT MATRIX (B2B — Franchise Investors)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800">
            <BarChart3 className="w-3.5 h-3.5" /> Institutional Impact Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Measured Results, Verified Outcomes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A quantitative snapshot of EESA Academy's performance under Neetu Devi's leadership —
            the foundation that makes franchise replication possible.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {impactMetrics.map((metric, idx) => {
            const MetricIcon = metric.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform border border-blue-200/60 dark:border-blue-800">
                  <MetricIcon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{metric.value}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1 leading-tight">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Franchise Feasibility Trigger */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 rounded-2xl p-6 sm:p-8 border border-emerald-200/60 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Interested in replicating this model?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Explore EESA Academy franchise opportunities with proven unit economics and founder-backed operational support.
              </p>
            </div>
          </div>
          <MagneticButton strength={0.3} maxDistance={40}>
            <button
              onClick={() => onOpenDemoModal(undefined, 'contact')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Building2 className="w-4 h-4" />
              <span>Franchise Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticButton>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: FOUNDER'S LETTER / VIDEO (Dual Audience)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="founder-letter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Video / Portrait Side */}
            <div className="relative bg-gradient-to-br from-blue-950 to-slate-900 flex items-center justify-center min-h-[320px] sm:min-h-[400px]">
              <img
                src="/images/eesa/neetu-devi-founder.jpg"
                alt="Neetu Devi addressing students and partners"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Play Button Overlay */}
              <div className="relative z-10 text-center space-y-3">
                <button
                  onClick={() => setVideoPlaying(true)}
                  className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mx-auto hover:bg-white/20 hover:scale-110 transition-all cursor-pointer group"
                >
                  <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                </button>
                <p className="text-xs font-semibold text-white/80">Watch Founder's Address</p>
                <p className="text-[10px] text-white/50">Coming Soon — High-Production Video Message</p>
              </div>
            </div>

            {/* Letter Content Side */}
            <div className="p-8 sm:p-10 lg:p-12 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-700">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">A Message from the Founder</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Neetu Devi · Founder & Managing Director
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Dear Students, Parents, and Prospective Partners,
                </p>
                <p>
                  When I started EESA Academy, I had one conviction: <em className="text-white">that every student,
                  regardless of their background or geography, deserves access to world-class
                  English language education</em>. Not in a distant, overcrowded coaching center — but
                  right in their own neighbourhood, with personal attention and measurable outcomes.
                </p>
                <p>
                  Today, our alumni speak confidently in boardrooms, score Band 8+ in IELTS, and work
                  in hospitals across the UK and Australia. But our mission is only beginning.
                </p>
                <p className="text-white font-semibold">
                  We are now looking for visionary partners who share our passion for transformative
                  education and operational excellence — to bring EESA Academy to every ambitious city
                  across India.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
                <img
                  src="/images/eesa/neetu-devi-founder.jpg"
                  alt="Neetu Devi"
                  className="w-12 h-12 rounded-full object-cover object-top border-2 border-blue-600"
                />
                <div>
                  <p className="text-sm font-bold text-white">Neetu Devi</p>
                  <p className="text-[10px] text-blue-400 font-semibold">Founder & Managing Director, EESA Academy</p>
                  <p className="text-[10px] text-slate-500">Expert Educational Services Academy Pvt. Ltd.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: DUAL CONVERSION HUB — B2C vs B2B
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
            <Globe className="w-3.5 h-3.5" /> Two Paths, One Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Your Journey with EESA Starts Here
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* B2C Card — Student Track */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Start Your Language Journey
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Experience Neetu Devi's teaching methodology first-hand with a free diagnostic assessment
                  and demo class. Discover your current CEFR level and get a personalized learning roadmap.
                </p>
              </div>

              <ul className="space-y-2">
                {[
                  'Free CEFR-aligned diagnostic assessment',
                  'Personalized learning plan & course recommendation',
                  'No-obligation demo class with senior faculty',
                  'Transparent fees — everything included',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <MagneticButton strength={0.3} maxDistance={40}>
                <button
                  onClick={() => onOpenDemoModal(undefined, 'free_demo')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Book Free Demo & Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticButton>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center mt-2">
                For Students & Parents · Academic Counseling Team
              </p>
            </div>
          </div>

          {/* B2B Card — Franchise / Investor Track */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-700 group-hover:scale-110 transition-transform">
                <Handshake className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Partner with Neetu Devi & EESA Academy
                </h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Build an EESA Academy center in your city with a proven franchise model —
                  complete with founder-backed curriculum, operational SOPs, marketing playbooks,
                  and ongoing academic quality support.
                </p>
              </div>

              <ul className="space-y-2">
                {[
                  'Proven unit economics with documented ROI',
                  'Turn-key operational blueprint & SOP manual',
                  'Founder-supervised instructor certification program',
                  'Territory exclusivity & marketing launch support',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <MagneticButton strength={0.3} maxDistance={40}>
                <button
                  onClick={() => onOpenDemoModal(undefined, 'contact')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Explore Franchise Opportunity</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticButton>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                For Investors & Edu-Entrepreneurs · Franchise Development Team
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
