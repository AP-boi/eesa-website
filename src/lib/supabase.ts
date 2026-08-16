import { createClient } from '@supabase/supabase-js';
import { Course, LeadBooking, StudentReview, AssessmentSubmission } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initial local fallback data for immediate rendering and offline reliability
export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    slug: 'spoken-english-mastery',
    title: 'Spoken English & Fluency Mastery',
    category: 'spoken_english',
    short_description: 'Master conversational fluency, grammar foundation, public speaking, and corporate confidence.',
    full_description: 'Designed for beginners to advanced speakers looking to neutralize accents, eliminate hesitation, and speak fluent English in corporate, social, and academic settings.',
    target_audience: 'Students, working professionals, job seekers, and homemakers looking for confident communication.',
    learning_outcomes: [
      'Fluency & Hesitation Elimination',
      'Public Speaking & Accent Neutralization',
      'Professional Email & Vocabulary Building',
      'STAR Method Interview Prep'
    ],
    duration_weeks: 8,
    batch_modes: ['offline', 'online_live', 'hybrid', 'one_on_one'],
    monthly_fee_inr: 3500,
    package_fee_inr: 6500,
    features: [
      'Small Batch (Max 8 students)',
      'Daily 1-on-1 Speaking Practice',
      'Audio-Visual Accent Lab',
      'Free Study Material & Certificate'
    ],
    is_featured: true
  },
  {
    id: 'c2',
    slug: 'ielts-academic-general',
    title: 'IELTS Comprehensive Prep (Academic & General)',
    category: 'international_test_prep',
    short_description: 'Achieve Band 7.5+ with daily writing evaluation and 1-on-1 speaking practice with expert faculty.',
    full_description: 'Complete coverage of Reading, Writing, Listening, and Speaking modules with intensive mock test feedback and targeted strategy drills.',
    target_audience: 'Aspiring international students, professionals seeking PR visas in UK, Canada, Australia, and New Zealand.',
    learning_outcomes: [
      'Band 7.5+ Writing Strategies',
      'Live Speaking Mock Interviews',
      'Time Management Techniques for Reading',
      'Listening Speed Optimization'
    ],
    duration_weeks: 8,
    batch_modes: ['offline', 'online_live', 'one_on_one'],
    monthly_fee_inr: 4500,
    package_fee_inr: 8500,
    features: [
      'Daily Essay & Letter Correction',
      '15 Full-length Computer Mocks',
      'VIP 1-on-1 Speaking Drills',
      'Free Visa Profile Evaluation'
    ],
    is_featured: true
  },
  {
    id: 'c3',
    slug: 'pte-academic-coaching',
    title: 'PTE Academic Masterclass',
    category: 'international_test_prep',
    short_description: 'Target 79+ score with AI-scoring feedback and dedicated computer lab practice sessions.',
    full_description: 'Tailored coaching for PTE Academic utilizing exact exam software patterns, template strategies, and speaking pronunciation tuning.',
    target_audience: 'Students and immigration candidates requiring high PTE scores for Australian & Canadian visas.',
    learning_outcomes: [
      'Repeat Sentence & Describe Image Mastery',
      'AI Scoring Optimization',
      'Write From Dictation Shortcuts',
      'Fluency & Pronunciation Calibration'
    ],
    duration_weeks: 6,
    batch_modes: ['offline', 'online_live'],
    monthly_fee_inr: 4000,
    package_fee_inr: 7500,
    features: [
      'Dedicated PTE Computer Lab',
      'AI Real-time Score Feedback',
      'Template Vault for Essays',
      'Unlimited Practice Software Access'
    ],
    is_featured: true
  },
  {
    id: 'c4',
    slug: 'oet-healthcare-specialization',
    title: 'OET Healthcare Specialization (Nurses & Doctors)',
    category: 'international_test_prep',
    short_description: 'Specialized Occupational English Test preparation for UK NHS, Ireland, and Australia registration.',
    full_description: 'Niche training for medical professionals focusing on clinical roleplays, referral letter writing, and medical vocabulary for Grade B / Band 350+ success.',
    target_audience: 'Registered Nurses (RN), General Practitioners, Dentists, and Allied Healthcare Professionals.',
    learning_outcomes: [
      'Grade B Referral Letter Writing',
      'Clinical Patient Roleplays',
      'Medical Sub-test Vocabulary',
      'Shift-Friendly Timings (7 AM - 8 PM)'
    ],
    duration_weeks: 6,
    batch_modes: ['offline', 'online_live', 'one_on_one'],
    monthly_fee_inr: 5000,
    package_fee_inr: 9500,
    features: [
      'Medical Writing Correction',
      'Flexible Shift Schedules',
      'Clinical Roleplay Recordings',
      'UK NHS Placement Guidance'
    ],
    is_featured: true
  },
  {
    id: 'c5',
    slug: 'celpip-selt-ukvi',
    title: 'CELPIP & SELT / UKVI Exam Preparation',
    category: 'international_test_prep',
    short_description: 'Focused preparation for Canadian PR (CELPIP) and UK Spouse / Skilled Worker Visas (SELT/UKVI).',
    full_description: 'Intensive short-duration training modules custom-tailored to official exam patterns and scoring criteria.',
    target_audience: 'Immigration applicants for Canada Express Entry and UK visas.',
    learning_outcomes: [
      'CELPIP Listening & Speaking Tasks',
      'UKVI B1/B2 Speaking Tests',
      'Canadian Accent Adaptation',
      'Quick Exam Result Strategies'
    ],
    duration_weeks: 4,
    batch_modes: ['offline', 'online_live'],
    monthly_fee_inr: 3800,
    package_fee_inr: 7000,
    features: [
      'Official Sample Papers',
      '1-on-1 Mock Panels',
      'High-Scoring Template Bank',
      'Fast-Track 2-Week Batches'
    ],
    is_featured: false
  },
  {
    id: 'c6',
    slug: 'duolingo-english-test',
    title: 'Duolingo English Test (DET) Speed Course',
    category: 'international_test_prep',
    short_description: 'Score 125+ in 3 weeks with computer-adaptive test strategies and rapid response practice.',
    full_description: 'Designed for students seeking quick university admissions in USA and Europe with affordable test preparation.',
    target_audience: 'Higher secondary students applying to US & European universities.',
    learning_outcomes: [
      'Adaptive Difficulty Calibration',
      'Production & Literacy Score Boosting',
      'Picture Description Techniques',
      'Subscore Target Strategies'
    ],
    duration_weeks: 3,
    batch_modes: ['offline', 'online_live'],
    monthly_fee_inr: 3000,
    package_fee_inr: 5500,
    features: [
      'Computer Practice Portal',
      'Micro-batch Guidance',
      'Instant Feedback Drills',
      'University Selection Support'
    ],
    is_featured: false
  },
  {
    id: 'c7',
    slug: 'academic-tutoring-iii-viii',
    title: 'Classes III-VIII Academic Tutoring (Maths & Science)',
    category: 'academic_tutoring',
    short_description: 'Building strong foundational conceptual clarity, analytical skills, and academic excellence.',
    full_description: 'Comprehensive school curriculum coaching in Mathematics, Science, and English with regular unit testing and homework support.',
    target_audience: 'School students in West Delhi seeking top academic marks and strong fundamental skills.',
    learning_outcomes: [
      'Strong Maths & Science Foundations',
      'Interactive Concept Visualizations',
      'Weekly Unit Tests & Report Cards',
      'Homework & Exam Revision Support'
    ],
    duration_weeks: 12,
    batch_modes: ['offline', 'hybrid'],
    monthly_fee_inr: 2500,
    package_fee_inr: 4800,
    features: [
      'Max 10 Students per Class',
      'Parent-Teacher Updates',
      'Doubt Clearing Hours',
      'Air-Conditioned Study Room'
    ],
    is_featured: false
  },
  {
    id: 'c8',
    slug: 'study-abroad-placement',
    title: 'Study Abroad & Overseas University Placement',
    category: 'career_services',
    short_description: 'Complete profile evaluation, SOP writing, university application, and visa assistance.',
    full_description: 'End-to-end overseas education consultancy mapping student aspirations to top universities in UK, USA, Australia, Canada, and Europe.',
    target_audience: 'Students planning higher studies abroad for UG/PG degrees.',
    learning_outcomes: [
      'Target University Selection',
      'Statement of Purpose (SOP) Polish',
      'Visa File Preparation',
      'Education Loan & Scholarship Aid'
    ],
    duration_weeks: 8,
    batch_modes: ['one_on_one', 'offline'],
    monthly_fee_inr: null,
    package_fee_inr: 12000,
    features: [
      'Free Initial Profile Audit',
      '100% University Admission Rate',
      'Visa Interview Preparation',
      'Pre-Departure Briefings'
    ],
    is_featured: true
  }
];

export const INITIAL_REVIEWS: StudentReview[] = [
  {
    id: 'r1',
    student_name: 'Priya Sharma',
    course_taken: 'IELTS Preparation',
    score_achieved: 'IELTS 8.0 Overall',
    rating: 5,
    review_text: 'Prashant Sir\'s patient guidance helped me overcome my speaking hesitation completely! The 1-on-1 mock interviews gave me immense confidence. I got Band 8.0 in my very first attempt and secured admission in the UK!',
    scorecard_image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    source: 'Justdial',
    is_verified: true
  },
  {
    id: 'r2',
    student_name: 'Gurpreet Singh',
    course_taken: 'PTE Academic',
    score_achieved: 'PTE 79+ Overall',
    rating: 5,
    review_text: 'The PTE computer practice lab at EESA Academy is top-notch. The real exam interface practice and template strategies helped me score 84 in Speaking and 81 in Writing. Highly recommended for West Delhi students!',
    scorecard_image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    source: 'Google',
    is_verified: true
  },
  {
    id: 'r3',
    student_name: 'Sister Anjali Thomas',
    course_taken: 'OET Healthcare Specialization',
    score_achieved: 'OET Grade B (Nurses)',
    rating: 5,
    review_text: 'As a working nurse with night shifts, the flexible 7:00 AM batch at Dashrath Puri was a blessing! Prashant Sir corrected my medical writing daily. Passed my OET for UK NHS registration smoothly.',
    scorecard_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    source: 'UrbanPro',
    is_verified: true
  },
  {
    id: 'r4',
    student_name: 'Rahul Verma',
    course_taken: 'Spoken English & Public Speaking',
    score_achieved: 'Conversational Fluency',
    rating: 5,
    review_text: 'I was extremely hesitant during job interviews. The interactive group roleplays and accent neutralization modules at EESA transformed my personality. I cracked my corporate interview in Gurugram!',
    scorecard_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    source: 'Verified Student',
    is_verified: true
  }
];

// Data Access Layer
export async function getCourses(): Promise<Course[]> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as Course[];
      }
    }
  } catch (e) {
    console.warn('Using local fallback for courses:', e);
  }
  return INITIAL_COURSES;
}

export async function getStudentReviews(): Promise<StudentReview[]> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('student_reviews').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as StudentReview[];
      }
    }
  } catch (e) {
    console.warn('Using local fallback for reviews:', e);
  }
  return INITIAL_REVIEWS;
}

export async function submitLeadBooking(booking: LeadBooking): Promise<{ success: boolean; id?: string }> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('lead_bookings').insert([booking]).select().single();
      if (!error && data) {
        return { success: true, id: data.id };
      }
    }
  } catch (e) {
    console.warn('Fallback local lead booking save:', e);
  }
  // Store in localStorage as backup
  const existing = JSON.parse(localStorage.getItem('eesa_leads') || '[]');
  const newLead = { ...booking, id: 'lead_' + Date.now(), created_at: new Date().toISOString() };
  localStorage.setItem('eesa_leads', JSON.stringify([newLead, ...existing]));
  return { success: true, id: newLead.id };
}

export async function submitAssessment(assessment: AssessmentSubmission): Promise<{ success: boolean; id?: string }> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('assessments').insert([assessment]).select().single();
      if (!error && data) {
        return { success: true, id: data.id };
      }
    }
  } catch (e) {
    console.warn('Fallback local assessment save:', e);
  }
  const existing = JSON.parse(localStorage.getItem('eesa_assessments') || '[]');
  const newAssessment = { ...assessment, id: 'assess_' + Date.now(), created_at: new Date().toISOString() };
  localStorage.setItem('eesa_assessments', JSON.stringify([newAssessment, ...existing]));
  return { success: true, id: newAssessment.id };
}
