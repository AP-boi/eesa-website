import React, { useState } from 'react';
import {
  Globe, Stethoscope, Award, CheckCircle2, FileText, Compass, Sparkles,
  ArrowRight, ShieldCheck, Clock, Users, Building, Phone
} from 'lucide-react';
import { Course } from '../types/database';

interface StudyAbroadProps {
  courses: Course[];
  onOpenDemoModal: (courseId?: string, bookingType?: 'free_demo' | 'diagnostic_test' | 'profile_evaluation' | 'mock_interview' | 'prospectus_download' | 'contact') => void;
}

export const StudyAbroad: React.FC<StudyAbroadProps> = ({ courses, onOpenDemoModal }) => {
  const [activeTestTab, setActiveTestTab] = useState<'ielts' | 'pte' | 'oet' | 'celpip' | 'det'>('oet');

  return (
    <div className="space-y-16 py-8 sm:py-12">
      
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border border-emerald-800">
            <Globe className="w-4 h-4 text-emerald-400" /> Overseas Test Prep & Placement Division
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Study Abroad & High-Stakes Test Prep Hub
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Specialized coaching for <strong className="text-white">IELTS (Band 8.0+)</strong>, <strong className="text-white">PTE Academic (79+)</strong>, <strong className="text-white">OET Healthcare Grade B</strong>, CELPIP, and university admissions in UK, Canada, Australia, and USA.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenDemoModal(undefined, 'profile_evaluation')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-7 py-4 rounded-xl shadow-lg transition-all text-xs sm:text-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Overseas Profile & Diagnostic Assessment</span>
            </button>
          </div>
        </div>
      </section>

      {/* OET HEALTHCARE SPECIALIZATION SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4">
            <Stethoscope className="w-4 h-4 text-emerald-400" /> Dedicated Healthcare Division
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                OET Healthcare Specialization (Nurses & Doctors)
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Targeting Grade B / Band 350+ for UK NHS, Ireland Nursing Board (NMBI), and Australian AHPRA registration. Tailored for working hospital staff with shift flexibility.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-xs text-white block">Shift-Friendly Timings</strong>
                    <span className="text-[11px] text-slate-400">Batches running 7:00 AM to 8:00 PM</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-xs text-white block">Medical Referral Correction</strong>
                    <span className="text-[11px] text-slate-400">Daily discharge letter evaluation</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-xs text-white block">Clinical Patient Roleplays</strong>
                    <span className="text-[11px] text-slate-400">1-on-1 hospital interaction drills</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-xs text-white block">UK NHS Job Guidance</strong>
                    <span className="text-[11px] text-slate-400">Placement support post-OET</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onOpenDemoModal('c4', 'free_demo')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3.5 rounded-xl shadow-lg text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enquire for OET Nurse Specialization Batch</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/90 p-6 rounded-2xl border border-slate-700 text-xs space-y-4">
              <h4 className="font-bold text-white text-sm border-b border-slate-700 pb-2">
                OET Sub-Test Mastery at EESA:
              </h4>

              <div className="space-y-2">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <strong className="text-emerald-400 block mb-0.5">OET Writing:</strong>
                  <p className="text-slate-300 text-[11px]">Transforming case notes into structured referral, transfer, or discharge letters with strict medical grammar.</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <strong className="text-blue-400 block mb-0.5">OET Speaking:</strong>
                  <p className="text-slate-300 text-[11px]">Recorded patient consultation roleplays with immediate feedback on empathy, clinical explanations, and reassurance.</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <strong className="text-emerald-400 block mb-0.5">OET Listening & Reading:</strong>
                  <p className="text-slate-300 text-[11px]">Medical dialogue speed exercises and health consultation comprehension techniques.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HIGH-STAKES TEST DEEP-DIVE TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Target Exam Modules
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
            International Exam Preparation Breakdown
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'oet', label: 'OET Medical (Nurses/Doctors)' },
            { id: 'ielts', label: 'IELTS Academic & General' },
            { id: 'pte', label: 'PTE Academic (AI Software Lab)' },
            { id: 'celpip', label: 'CELPIP (Canada PR)' },
            { id: 'det', label: 'Duolingo English Test (DET)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTestTab(t.id as 'ielts' | 'pte' | 'oet' | 'celpip' | 'det')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                activeTestTab === t.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
          {activeTestTab === 'ielts' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">IELTS Academic & General Training</h3>
                  <p className="text-xs text-slate-500 mt-1">Target Band 7.5 - 8.5 with daily essay correction & speaking mock interviews.</p>
                </div>
                <button
                  onClick={() => onOpenDemoModal('c2', 'free_demo')}
                  className="bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs"
                >
                  Book Free IELTS Class
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm text-blue-700">Writing Task 1 & 2</h4>
                  <p className="text-xs text-slate-600 mt-1">Line graph analysis, complex sentence templates, lexical resource enrichment.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm text-blue-700">Speaking Cue Cards</h4>
                  <p className="text-xs text-slate-600 mt-1">1-on-1 mock panel daily with Prashant Sir for fluency and accent calibration.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm text-blue-700">Reading Speed Drills</h4>
                  <p className="text-xs text-slate-600 mt-1">Skimming, scanning, True/False/Not Given shortcuts and time management.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm text-blue-700">Listening Strategy</h4>
                  <p className="text-xs text-slate-600 mt-1">Accent familiarity (British, Australian, American) and keyword tracking.</p>
                </div>
              </div>
            </div>
          )}

          {activeTestTab === 'pte' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">PTE Academic Masterclass</h3>
                  <p className="text-xs text-slate-500 mt-1">Target 79+ score with dedicated computer practice lab & AI scoring shortcuts.</p>
                </div>
                <button
                  onClick={() => onOpenDemoModal('c3', 'free_demo')}
                  className="bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs"
                >
                  Book Free PTE Lab Demo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm">Read Aloud & Repeat Sentence</h4>
                  <p className="text-xs text-slate-600 mt-1">Oral fluency tuning to ensure high AI speech recognition scoring.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm">Write From Dictation</h4>
                  <p className="text-xs text-slate-600 mt-1">Shortcuts and memory techniques to score maximum points in writing/listening.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm">Full Computer Lab Access</h4>
                  <p className="text-xs text-slate-600 mt-1">Practice on exact exam software patterns at Dashrath Puri campus.</p>
                </div>
              </div>
            </div>
          )}

          {activeTestTab === 'oet' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900">OET Healthcare Specialization Details</h3>
              <p className="text-xs text-slate-600">See spotlight section above for complete OET Nurse/Doctor training roadmap.</p>
            </div>
          )}

          {activeTestTab === 'celpip' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900">CELPIP General (Canadian PR Visa)</h3>
              <p className="text-xs text-slate-600">Computer-delivered Canadian English test coaching with high-scoring template banks.</p>
            </div>
          )}

          {activeTestTab === 'det' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900">Duolingo English Test (DET Speed Course)</h3>
              <p className="text-xs text-slate-600">Adaptive computer test strategies for rapid university admissions in USA & Europe.</p>
            </div>
          )}
        </div>
      </section>

      {/* OVERSEAS COUNSELING & PLACEMENT SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              End-to-End Overseas Placement
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
              Study Abroad Counseling & Visa Filing
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Guiding students through university shortlisting, SOP polish, scholarship aid, and visa interview prep.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <Compass className="w-8 h-8 text-blue-600" />
              <h4 className="font-bold text-slate-900 text-sm">University Shortlisting</h4>
              <p className="text-xs text-slate-500">Mapping academic background to top UK, Canada, Australia, and US universities.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <FileText className="w-8 h-8 text-emerald-600" />
              <h4 className="font-bold text-slate-900 text-sm">SOP & LOR Editing</h4>
              <p className="text-xs text-slate-500">Crafting compelling Statements of Purpose and Recommendation Letters.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
              <h4 className="font-bold text-slate-900 text-sm">Visa Filing Assistance</h4>
              <p className="text-xs text-slate-500">100% compliant visa file compilation and mock visa interview sessions.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <Award className="w-8 h-8 text-emerald-600" />
              <h4 className="font-bold text-slate-900 text-sm">Scholarship Guidance</h4>
              <p className="text-xs text-slate-500">Helping students secure partial and full merit tuition waivers.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
