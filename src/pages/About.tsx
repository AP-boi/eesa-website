import React, { useState } from 'react';
import {
  GraduationCap, Award, ShieldCheck, Users, CheckCircle2, MapPin, Building2,
  Sparkles, HeartHandshake, Eye, BookOpen, Clock, Phone
} from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
  onOpenDemoModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate, onOpenDemoModal }) => {
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'classrooms' | 'batches' | 'activities'>('all');

  const galleryImages = [
    {
      category: 'classrooms',
      title: 'EESA Micro-Batch Lecture & Discussion Hall',
      subtitle: 'Dedicated air-conditioned space for focused learning & 1-on-1 interaction',
      url: '/images/eesa/eesa-classroom-1.jpeg',
    },
    {
      category: 'classrooms',
      title: 'Senior Faculty Whiteboard Training Session',
      subtitle: 'Structured grammar deconstruction & speaking drills with mentor Prashant Sir',
      url: '/images/eesa/eesa-classroom-training-1.jpeg',
    },
    {
      category: 'activities',
      title: 'IELTS & Spoken English Speaking Session',
      subtitle: 'Daily cue-card practice and accent neutralization drills with real-time feedback',
      url: '/images/eesa/eesa-ielts-session-1.jpeg',
    },
    {
      category: 'activities',
      title: 'Interactive Group Roleplay & Debate Forum',
      subtitle: 'Students engaging in active communication scenarios to overcome hesitation',
      url: '/images/eesa/eesa-student-activity-1.jpeg',
    },
    {
      category: 'batches',
      title: 'Student Batch Completion & Achievement Celebration',
      subtitle: 'Celebrating high band achievements and corporate job interview placements',
      url: '/images/eesa/eesa-batch-1.jpeg',
    },
    {
      category: 'batches',
      title: 'Official Merit Certificate & Award Presentation',
      subtitle: 'Recognizing outstanding scorecards in IELTS, PTE, and Spoken English',
      url: '/images/eesa/eesa-award-cert.jpeg',
    },
    {
      category: 'classrooms',
      title: 'Interactive Lecture & Concept Clarification',
      subtitle: 'Comprehensive batch coaching at Dashrath Puri Campus',
      url: '/images/eesa/eesa-classroom-2.jpeg',
    },
    {
      category: 'activities',
      title: 'Peer Discussion & Accent Tuning Workshop',
      subtitle: 'Collaborative student speaking panels for fluency building',
      url: '/images/eesa/eesa-student-activity-2.jpeg',
    },
  ];

  const filteredGallery = galleryFilter === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === galleryFilter);

  return (
    <div className="space-y-16 py-8 sm:py-12">
      
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 bg-blue-900/80 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-700">
            <GraduationCap className="w-4 h-4 text-blue-400" /> Institutional Profile & Pedagogy
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            About EESA Academy
          </h1>

          <p className="text-xl font-bold text-emerald-400 italic">
            "A place where dreams are converted into reality."
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Established in 2022 under <strong className="text-white">Expert Educational Services Academy Private Limited</strong>, EESA Academy was founded with a singular mission: to eliminate speech hesitation, empower West Delhi students with international language fluency, and deliver top band scores in IELTS, PTE, OET, and CELPIP exams.
          </p>
        </div>
      </section>

      {/* INSTITUTIONAL STORY & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-4">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
              Our Founding Vision
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Transforming Suburban Education in West Delhi
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Before EESA Academy's launch in Vijay Enclave / Dashrath Puri, students targeting high IELTS scores or OET medical registration had to travel hours to distant commercial coaching hubs. 
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              EESA Academy brought international-grade test preparation, air-conditioned computer labs, and patient 1-on-1 faculty guidance directly adjacent to <strong>Dashrath Puri Metro Station (Gate No. 1)</strong>.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400">5,000+</h4>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">Students Mentored</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">4.9 / 5</h4>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">Justdial Verified Score</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Our Core Vision</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  To be India's most student-centric English language institute, providing accessible, transparent, and result-oriented coaching without hidden fees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Non-Judgmental Learning Environment</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  We believe every student can achieve natural English fluency when provided a supportive, non-judgmental space free of fear or public embarrassment.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FACULTY SPOTLIGHT & PEDAGOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700">
              Lead Mentor Spotlight
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-3">
              Meet Senior Faculty Mentor: Prashant Sir
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Renowned across West Delhi for his patient step-by-step methodology, accent neutralization drills, and personalized 1-on-1 speaking interview corrections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h4 className="font-bold text-white text-base">Step-by-Step Grammar Building</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deconstructing complex English syntax into simple, intuitive conversational patterns without memorizing tedious rules.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h4 className="font-bold text-white text-base">Audio-Visual Accent Neutralization</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eliminating mother-tongue influence (MTI), correcting vowel sounds, and building natural rhythm required for IELTS Band 8.0 & OET Grade B.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h4 className="font-bold text-white text-base">Daily 1-on-1 Mock Panels</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every student receives individual speaking feedback sessions daily, simulating real examiner environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPUS INFRASTRUCTURE GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
            State-of-the-Art Infrastructure
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
            Campus Photo Tour & Facilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2">
            Air-conditioned learning zones, PTE software labs, and quiet study lounges.
          </p>
        </div>

        {/* Gallery Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'classrooms', label: 'AC Classrooms & Lecture Hall' },
            { id: 'activities', label: 'Speaking Sessions & Roleplay' },
            { id: 'batches', label: 'Batches & Felicitations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setGalleryFilter(tab.id as 'all' | 'classrooms' | 'batches' | 'activities')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                galleryFilter === tab.id
                  ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs group">
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORPORATE & ACADEMIC CREDENTIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Government Registered Entity
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Corporate Governance & Zero Hidden Fee Policy
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Official Corporate Registration:</strong> Registered under MCA as Expert Educational Services Academy Private Limited (Est. 2022).
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Transparent Fee Guarantee:</strong> All study kits, mock tests, and 1-on-1 interview evaluations are included with zero surprise extra charges.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Student Safety & CCTV Surveillance:</strong> 24/7 CCTV monitored campus with dedicated female staff support and clean drinking water facilities.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-center space-y-4">
              <Building2 className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Visit Our Registered Campus</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                RZ-A-1/14B, First Floor, Vijay Enclave, Opp. Shani Dev Mandir, Dabri-Palam Road, New Delhi - 110045.
              </p>
              <button
                onClick={onOpenDemoModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md text-xs cursor-pointer"
              >
                Schedule Campus Walkthrough
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
