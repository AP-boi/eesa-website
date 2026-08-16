import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Award, ArrowRight, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';
import { Course } from '../../types/database';
import { submitAssessment } from '../../lib/supabase';

interface DiagnosticQuizProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

interface Question {
  id: number;
  question: string;
  options: { text: string; points: number }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Choose the correct sentence to complete formal business correspondence:",
    options: [
      { text: "I look forward to hear from you soon.", points: 1 },
      { text: "I look forward to hearing from you soon.", points: 3 },
      { text: "I am looking forward for hearing from you.", points: 0 },
      { text: "I look forward for your reply.", points: 1 },
    ],
  },
  {
    id: 2,
    question: "Select the correct conditional sentence structure:",
    options: [
      { text: "If I would have known about the test, I would study harder.", points: 1 },
      { text: "If I had known about the test, I would have studied harder.", points: 3 },
      { text: "If I knew about the test, I would had studied harder.", points: 0 },
      { text: "If I have known about the test, I will study harder.", points: 1 },
    ],
  },
  {
    id: 3,
    question: "How comfortable are you speaking in front of an audience or in job interviews?",
    options: [
      { text: "I hesitate frequently, stumble over vocabulary, and feel nervous.", points: 1 },
      { text: "I can communicate basic ideas but lack formal polish and accent control.", points: 2 },
      { text: "I am confident in basic speech but need Band 8.0 / OET Grade B precision.", points: 3 },
    ],
  },
  {
    id: 4,
    question: "Identify the word nearest in meaning to 'METICULOUS':",
    options: [
      { text: "Careless or hasty", points: 0 },
      { text: "Extremely careful and precise", points: 3 },
      { text: "Overly dramatic", points: 0 },
      { text: "Hesitant in speech", points: 1 },
    ],
  },
  {
    id: 5,
    question: "What is your primary target objective at EESA Academy?",
    options: [
      { text: "Fluency, Accent Neutralization & Corporate Confidence", points: 2 },
      { text: "IELTS / PTE / DET Academic Exam Preparation (University Admissions)", points: 3 },
      { text: "OET Healthcare Specialization (Nursing / Medical Registration)", points: 3 },
      { text: "School Academic Excellence (Classes 3-8 Maths & Science)", points: 2 },
    ],
  },
];

export const DiagnosticQuiz: React.FC<DiagnosticQuizProps> = ({ courses, onSelectCourse }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSelectOption = (points: number) => {
    const nextAnswers = [...answers, points];
    setAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const totalPoints = answers.reduce((a, b) => a + b, 0);

  // Evaluate Level & Recommendation
  let level = 'Beginner / Foundation Level';
  let recommendedCourseId = 'c1'; // Spoken English
  let badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';

  if (totalPoints >= 7 && totalPoints <= 11) {
    level = 'Intermediate Fluency';
    recommendedCourseId = 'c1';
    badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
  } else if (totalPoints > 11) {
    level = 'Advanced / Exam-Ready Candidate';
    recommendedCourseId = 'c2'; // IELTS / Test Prep
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  }

  const recommendedCourse = courses.find((c) => c.id === recommendedCourseId) || courses[0];

  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    setIsSubmitting(true);
    await submitAssessment({
      full_name: leadName,
      phone: leadPhone,
      grammar_score: totalPoints,
      recommended_course_id: recommendedCourse.id,
      estimated_fee: recommendedCourse.package_fee_inr || 7500,
    });
    setIsSubmitting(false);
    setSubmittedSuccess(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
    setSubmittedSuccess(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Instant Diagnostic Tool
            </span>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">5-Minute English & Level Diagnostic Quiz</h4>
          </div>
        </div>

        {!isCompleted && (
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
            Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
          </div>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          <h5 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
            {QUIZ_QUESTIONS[currentStep].question}
          </h5>

          <div className="grid gap-3">
            {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.points)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all font-medium text-slate-800 dark:text-slate-200 text-sm flex items-center justify-between group cursor-pointer"
              >
                <span>{opt.text}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-7 h-7" />
            </div>
            <h5 className="text-2xl font-black text-slate-900 dark:text-white">Diagnostic Assessment Complete!</h5>
            
            <div className={`inline-block px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${badgeColor}`}>
              Calculated Skill Profile: {level} (Score: {totalPoints}/15)
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Based on your response syntax and target goals, Prashant Sir recommends enrolling in:
            </p>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-left max-w-md mx-auto shadow-xs">
              <h6 className="font-bold text-slate-900 dark:text-white text-base">{recommendedCourse.title}</h6>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{recommendedCourse.short_description}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-bold">
                <span>Duration: {recommendedCourse.duration_weeks} Weeks</span>
                <span>Small Batch (Max 8)</span>
              </div>
            </div>
          </div>

          {/* Form to capture result */}
          {!submittedSuccess ? (
            <form onSubmit={handleSaveResult} className="bg-blue-50/70 dark:bg-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-800 space-y-3">
              <h6 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Save Diagnostic Result & Get Free Consultation
              </h6>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Your Full Name"
                  className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="tel"
                  required
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="WhatsApp Mobile Number"
                  className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? 'Saving...' : 'Get Personalized Faculty Report'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                Diagnostic Report Saved! Our lead mentor will share detailed feedback on {leadPhone}.
              </p>
              <button
                onClick={() => onSelectCourse(recommendedCourse.id)}
                className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm hover:bg-emerald-700 cursor-pointer"
              >
                View Recommended Course Details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
