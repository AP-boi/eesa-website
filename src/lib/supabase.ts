import { createClient } from '@supabase/supabase-js';
import { Course, LeadBooking, StudentReview, AssessmentSubmission } from '../types/database';
import { getStoredUtmParams } from './utm';

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
      '1-on-1 Speaking Drills',
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
    slug: 'oet-healthcare-professionals',
    title: 'OET for Healthcare Professionals (Nurses & Doctors)',
    category: 'international_test_prep',
    short_description: 'Achieve Grade B in all sub-tests with medical scenario roleplays and referral letter mastery.',
    full_description: 'Specialized medical English training tailored for registered nurses, doctors, and healthcare practitioners aiming for UK NHS, Ireland, Australia, or New Zealand registrations.',
    target_audience: 'Doctors, Staff Nurses, Dentists, and Allied Health Practitioners seeking overseas healthcare registration.',
    learning_outcomes: [
      'Medical Referral & Discharge Letters',
      'Clinical Consultation Roleplays',
      'Healthcare Listening Accents (UK/Aus/NZ)',
      'Medical Journal Reading Skills'
    ],
    duration_weeks: 8,
    batch_modes: ['offline', 'online_live', 'one_on_one'],
    monthly_fee_inr: 5000,
    package_fee_inr: 9500,
    features: [
      'Shift-Friendly Flexible Timings',
      'Medical Referral Letter Corrections',
      'Mock Clinical Speaking Sessions',
      'NHS Hospital Placement Guidance'
    ],
    is_featured: true
  },
  {
    id: 'c5',
    slug: 'cbse-english-academic-tutoring',
    title: 'CBSE & ICSE English (Classes 9th - 12th)',
    category: 'academic_tutoring',
    short_description: 'Score 95%+ in Board Exams with NCERT literature deep dives, grammar mastery, and answer presentation.',
    full_description: 'Comprehensive board syllabus coverage, answer-writing masterclasses, chapter-wise analytical question banks, and regular assessment tests.',
    target_audience: 'Students of Classes 9, 10, 11, and 12 aiming for top marks in Board Exams.',
    learning_outcomes: [
      'NCERT Literature Line-by-Line Analysis',
      'Format Mastery for Notice, Article & Letters',
      'Grammar Foundation & Error Spotting',
      'Past 10 Years Board Papers Solving'
    ],
    duration_weeks: 12,
    batch_modes: ['offline', 'online_live', 'hybrid'],
    monthly_fee_inr: 2500,
    package_fee_inr: 6000,
    features: [
      'Board Exam Answer Writing Techniques',
      'Weekly Chapter Tests & Ranking',
      'Small Focus Batches',
      'Doubt Clearance Sessions'
    ],
    is_featured: false
  },
  {
    id: 'c6',
    slug: 'study-abroad-admissions-visa',
    title: 'Study Abroad Consulting & Visa Filing',
    category: 'career_services',
    short_description: 'End-to-end university applications, scholarship shortlisting, and 100% visa filing assistance.',
    full_description: 'Comprehensive counseling covering university shortlisting across UK, Canada, USA, Australia, and Europe, SOP drafting, financial guidance, and mock visa interviews.',
    target_audience: 'Undergraduate and postgraduate aspirants planning overseas education with scholarships.',
    learning_outcomes: [
      'Profile Evaluation & University Matching',
      'SOP & Letter of Recommendation Editing',
      'Scholarship Application Strategy',
      'Embassy Mock Visa Interviews'
    ],
    duration_weeks: 4,
    batch_modes: ['offline', 'online_live', 'one_on_one'],
    monthly_fee_inr: 0,
    package_fee_inr: 0,
    features: [
      'Tie-ups with 500+ Global Universities',
      '100% Transparent Visa Process',
      'Financial & Education Loan Assistance',
      'Pre-departure & Accommodation Briefing'
    ],
    is_featured: true
  }
];

export const INITIAL_REVIEWS: StudentReview[] = [
  {
    id: 'r1',
    student_name: 'Simran Kaur',
    course_taken: 'IELTS Academic',
    score_achieved: 'Band 8.0 (L: 8.5, R: 8.5, W: 7.5, S: 8.0)',
    review_text: 'The master faculty at EESA gave personal attention to my writing weaknesses. The daily feedback on Task 2 essays helped me jump from Band 6.5 to 8.0 in just 6 weeks!',
    rating: 5,
    source: 'Google Verified',
    scorecard_image_url: '/images/eesa/ielts-scorecard.jpg',
    is_verified: true,
    created_at: '2026-07-14'
  },
  {
    id: 'r2',
    student_name: 'Dr. Rohan Mehra',
    course_taken: 'OET Medicine',
    score_achieved: 'Grade B (All Subtests 380+)',
    review_text: 'The flexible morning batch allowed me to prepare alongside my hospital duties. The referral letter feedback was spot on for medical standards.',
    rating: 5,
    source: 'Justdial 5.0★',
    scorecard_image_url: '/images/eesa/oet-scorecard.jpg',
    is_verified: true,
    created_at: '2026-06-28'
  },
  {
    id: 'r3',
    student_name: 'Harpreet Singh',
    course_taken: 'PTE Academic',
    score_achieved: '82 Overall (Superior English)',
    review_text: 'The computer lab practice at the Dashrath Puri campus is top notch. The AI scoring tips for Repeat Sentences and Describe Image made all the difference.',
    rating: 5,
    source: 'Google Verified',
    scorecard_image_url: '/images/eesa/pte-scorecard.jpg',
    is_verified: true,
    created_at: '2026-07-02'
  },
  {
    id: 'r4',
    student_name: 'Pooja Verma',
    course_taken: 'Spoken English & Interview Prep',
    score_achieved: 'Selected at Deloitte as Senior Analyst',
    review_text: 'I used to freeze during group discussions. After joining EESA, the daily speaking drills and extempore sessions boosted my confidence immensely.',
    rating: 5,
    source: 'Alumni Placement',
    scorecard_image_url: '/images/eesa/eesa-award-cert.jpeg',
    is_verified: true,
    created_at: '2026-05-19'
  },
  {
    id: 'r5',
    student_name: 'Aman Deep',
    course_taken: 'IELTS General',
    score_achieved: 'CLB 9 (L: 8.0, R: 7.5, W: 7.0, S: 7.5)',
    review_text: 'Best institute in West Delhi near Dashrath Puri metro. Affordable fees and no fake promises. Got my desired score in first attempt.',
    rating: 5,
    source: 'Justdial 5.0★',
    scorecard_image_url: '/images/eesa/eesa-batch-1.jpeg',
    is_verified: true,
    created_at: '2026-04-10'
  }
];

export async function getCourses(): Promise<Course[]> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase
        .from('courses')
        .select('id, slug, title, category, short_description, full_description, target_audience, learning_outcomes, duration_weeks, batch_modes, monthly_fee_inr, package_fee_inr, features, is_featured')
        .order('is_featured', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as Course[];
      }
    }
  } catch (e) {
    console.warn('Using local fallback for courses');
  }
  return INITIAL_COURSES;
}

export async function getStudentReviews(): Promise<StudentReview[]> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase
        .from('student_reviews')
        .select('id, student_name, course_taken, score_achieved, review_text, rating, source, scorecard_image_url, is_verified, created_at')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as StudentReview[];
      }
    }
  } catch (e) {
    console.warn('Using local fallback for reviews');
  }
  return INITIAL_REVIEWS;
}

export async function submitLeadBooking(booking: LeadBooking & { utm_data?: any }): Promise<{ success: boolean; id?: string }> {
  const utm = getStoredUtmParams();
  const enhancedBooking = {
    ...booking,
    notes: booking.notes
      ? `${booking.notes}${utm.utm_source ? ` [UTM: ${utm.utm_source}/${utm.utm_campaign || 'direct'}]` : ''}`
      : utm.utm_source ? `[UTM: ${utm.utm_source}/${utm.utm_campaign || 'direct'}]` : undefined,
    utm_data: utm,
  };

  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('lead_bookings').insert([enhancedBooking]).select().single();
      if (!error && data) {
        return { success: true, id: data.id };
      }
    }
  } catch (e) {
    console.warn('Fallback local lead booking save:', e);
  }
  // Store in localStorage as backup
  const existing = JSON.parse(localStorage.getItem('eesa_leads') || '[]');
  const newLead = { ...enhancedBooking, id: 'lead_' + Date.now(), created_at: new Date().toISOString() };
  localStorage.setItem('eesa_leads', JSON.stringify([newLead, ...existing]));
  return { success: true, id: newLead.id };
}

export async function submitAssessment(assessment: AssessmentSubmission & { utm_data?: any }): Promise<{ success: boolean; id?: string }> {
  const utm = getStoredUtmParams();
  const enhancedAssessment = {
    ...assessment,
    utm_data: utm,
  };

  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      const { data, error } = await supabase.from('assessments').insert([enhancedAssessment]).select().single();
      if (!error && data) {
        return { success: true, id: data.id };
      }
    }
  } catch (e) {
    console.warn('Fallback local assessment save:', e);
  }
  const existing = JSON.parse(localStorage.getItem('eesa_assessments') || '[]');
  const newAssessment = { ...enhancedAssessment, id: 'assess_' + Date.now(), created_at: new Date().toISOString() };
  localStorage.setItem('eesa_assessments', JSON.stringify([newAssessment, ...existing]));
  return { success: true, id: newAssessment.id };
}

// Background email notification dispatcher when someone logs in or registers
export async function sendLoginNotificationEmail(email: string, fullName?: string, eventType: 'signup_welcome' | 'login_alert' = 'login_alert'): Promise<void> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL) {
      // Call Supabase Edge Function to dispatch email via Gmail/SMTP
      await supabase.functions.invoke('send-auth-email', {
        body: {
          email: email.trim(),
          fullName: fullName?.trim() || email.split('@')[0],
          type: eventType,
        },
      });
    }
  } catch (e) {
    console.log(`[Supabase Auth Mailer] Triggered ${eventType} for ${email}:`, e);
  }
}
