import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, Sparkles, MessageSquare } from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'general' | 'ielts_pte' | 'spoken_english' | 'oet_abroad' | 'fees_batches';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'f1',
    category: 'general',
    question: 'Where is EESA Academy located and how do I reach via Delhi Metro?',
    answer: 'EESA Academy is located at RZ-A-1/14B, First Floor, Vijay Enclave, Opp. Shani Dev Mandir, Dabri-Palam Road, New Delhi - 110045. It is directly adjacent to Dashrath Puri Metro Station (Magenta Line) Gate No. 1. Walk only 50 meters towards Shani Dev Mandir.',
  },
  {
    id: 'f2',
    category: 'general',
    question: 'How do I book a free demo class & diagnostic test?',
    answer: 'You can book an obligation-free 1-on-1 demo class by clicking the "Book Free Demo" button on the website, calling +91 98101 26691, or texting us on WhatsApp. Our admissions desk will schedule a convenient morning or evening slot.',
  },
  {
    id: 'f3',
    category: 'spoken_english',
    question: 'I have severe hesitation when speaking English. Can EESA help me?',
    answer: 'Absolutely. Over 80% of our alumni began with speech anxiety. Our unique conversational method focuses on small micro-batches (max 8 students), daily 1-on-1 speaking drills, accent neutralization, and real-life roleplay scenarios with zero judgment.',
  },
  {
    id: 'f4',
    category: 'ielts_pte',
    question: 'What band score guarantee or track record does EESA Academy offer for IELTS?',
    answer: 'Our IELTS training program is specifically designed to achieve Band 7.5 to 8.5+. We provide 15+ full-length computer-based mock tests, daily essay and letter corrections by senior faculty, and personalized 1-on-1 speaking interview practice.',
  },
  {
    id: 'f5',
    category: 'ielts_pte',
    question: 'Does EESA Academy provide specialized PTE computer lab practice?',
    answer: 'Yes! We have an in-house computer lab equipped with the latest PTE Academic exam practice software, AI scoring feedback for Repeat Sentences and Describe Image, and verified template shortcuts.',
  },
  {
    id: 'f6',
    category: 'oet_abroad',
    question: 'What is the OET Healthcare course and is it suitable for working nurses?',
    answer: 'Our OET course specializes in preparing Doctors and Nurses for UK NMC, Ireland, and Australia healthcare registration (Targeting Grade B / 350+ points). We offer flexible morning, evening, and weekend shift-friendly batches with clinical case study drills.',
  },
  {
    id: 'f7',
    category: 'fees_batches',
    question: 'What are the batch timings and fee structures?',
    answer: 'Batches run from 7:00 AM to 8:00 PM (Monday to Saturday) with morning, afternoon, evening, and weekend options. Monthly plans start from ₹3,500/month with comprehensive 2-month packages at ₹6,500 - ₹8,500. We also offer 1-on-1 personalized mentorship.',
  },
  {
    id: 'f8',
    category: 'fees_batches',
    question: 'Are study materials, books, and certificates included?',
    answer: 'Yes! All enrolled students receive printed study modules, digital mock test access, vocabulary workbooks, and an official Government Registered Private Limited course completion certificate upon graduation.',
  },
];

interface FAQSectionProps {
  onOpenDemoModal?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenDemoModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('f1');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Frequently Asked Questions</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Everything You Need to Know About EESA
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Have questions about our syllabus, batch timings, IELTS band scoring, or metro location? We've got answers.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs mb-8 space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., demo class, batch timings, IELTS score, metro)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1 text-xs">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'general', label: 'Campus & Location' },
            { id: 'spoken_english', label: 'Spoken English' },
            { id: 'ielts_pte', label: 'IELTS & PTE' },
            { id: 'oet_abroad', label: 'OET & Study Abroad' },
            { id: 'fees_batches', label: 'Fees & Batches' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No matching questions found for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still have questions CTA */}
      <div className="mt-8 bg-blue-50 dark:bg-slate-900/80 border border-blue-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Have a specific question not answered here?
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Talk directly to our admissions & academic counselors.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://wa.me/919810126691?text=Hi%20EESA%20Academy,%20I%20have%20a%20question%20about%20your%20courses."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>Ask on WhatsApp</span>
          </a>
          {onOpenDemoModal && (
            <button
              onClick={onOpenDemoModal}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Demo</span>
            </button>
          )}
        </div>
      </div>

    </section>
  );
};
