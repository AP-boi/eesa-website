-- EESA ACADEMY DATABASE MIGRATION SCRIPT
-- Target Engine: PostgreSQL / Supabase

-- Enums
CREATE TYPE course_category AS ENUM (
  'spoken_english',
  'international_test_prep',
  'academic_tutoring',
  'career_services'
);

CREATE TYPE delivery_mode AS ENUM ('offline', 'online_live', 'hybrid', 'one_on_one');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'demo_scheduled', 'enrolled', 'closed');

-- 1. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category course_category NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  learning_outcomes TEXT[] NOT NULL,
  duration_weeks INT NOT NULL,
  batch_modes delivery_mode[] NOT NULL,
  monthly_fee_inr NUMERIC(10,2),
  package_fee_inr NUMERIC(10,2),
  features TEXT[] NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Demo & Diagnostic Test Bookings Table
CREATE TABLE IF NOT EXISTS public.lead_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  booking_type TEXT NOT NULL, -- 'free_demo', 'diagnostic_test', 'profile_evaluation', 'mock_interview'
  preferred_mode delivery_mode DEFAULT 'offline',
  preferred_time_slot TEXT, -- e.g., 'Morning (7-10 AM)', 'Evening (5-8 PM)'
  notes TEXT,
  status lead_status DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Student Reviews & Scorecards
CREATE TABLE IF NOT EXISTS public.student_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  course_taken TEXT NOT NULL,
  score_achieved TEXT, -- e.g., 'IELTS 8.0', 'OET B Grade', 'Conversational Fluency'
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  video_url TEXT,
  scorecard_image_url TEXT,
  source TEXT DEFAULT 'Verified Student', -- 'Justdial', 'UrbanPro', 'Google', 'Direct'
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Interactive Fee Calculator / Assessment Submissions
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  grammar_score INT,
  target_country TEXT,
  target_exam TEXT,
  recommended_course_id UUID REFERENCES public.courses(id),
  estimated_fee NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Public RLS Policies
DROP POLICY IF EXISTS "Allow Public Read Courses" ON public.courses;
CREATE POLICY "Allow Public Read Courses" ON public.courses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow Public Read Student Reviews" ON public.student_reviews;
CREATE POLICY "Allow Public Read Student Reviews" ON public.student_reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow Public Insert Lead Bookings" ON public.lead_bookings;
CREATE POLICY "Allow Public Insert Lead Bookings" ON public.lead_bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow Public Insert Assessments" ON public.assessments;
CREATE POLICY "Allow Public Insert Assessments" ON public.assessments FOR INSERT WITH CHECK (true);

-- Seed Initial Courses
INSERT INTO public.courses (slug, title, category, short_description, full_description, target_audience, learning_outcomes, duration_weeks, batch_modes, monthly_fee_inr, package_fee_inr, features, is_featured)
VALUES
('spoken-english-mastery', 'Spoken English & Fluency Mastery', 'spoken_english', 'Master conversational fluency, grammar foundation, public speaking, and corporate confidence.', 'Designed for beginners to advanced speakers looking to neutralize accents, eliminate hesitation, and speak fluent English in corporate, social, and academic settings.', 'Students, working professionals, job seekers, and homemakers looking for confident communication.', ARRAY['Fluency & Hesitation Elimination', 'Public Speaking & Accent Neutralization', 'Professional Email & Vocabulary Building', 'STAR Method Interview Prep'], 8, ARRAY['offline'::delivery_mode, 'online_live'::delivery_mode, 'hybrid'::delivery_mode, 'one_on_one'::delivery_mode], 3500.00, 6500.00, ARRAY['Small Batch (Max 8 students)', 'Daily 1-on-1 Speaking Practice', 'Audio-Visual Accent Lab', 'Free Study Material & Certificate'], true),

('ielts-academic-general', 'IELTS Comprehensive Prep (Academic & General)', 'international_test_prep', 'Achieve Band 7.5+ with daily writing evaluation and 1-on-1 speaking practice with expert faculty.', 'Complete coverage of Reading, Writing, Listening, and Speaking modules with intensive mock test feedback and targeted strategy drills.', 'Aspiring international students, professionals seeking PR visas in UK, Canada, Australia, and New Zealand.', ARRAY['Band 7.5+ Writing Strategies', 'Live Speaking Mock Interviews', 'Time Management Techniques for Reading', 'Listening Speed Optimization'], 8, ARRAY['offline'::delivery_mode, 'online_live'::delivery_mode, 'one_on_one'::delivery_mode], 4500.00, 8500.00, ARRAY['Daily Essay & Letter Correction', '15 Full-length Computer Mocks', '1-on-1 Speaking Drills', 'Free Visa Profile Evaluation'], true),

('pte-academic-coaching', 'PTE Academic Masterclass', 'international_test_prep', 'Target 79+ score with AI-scoring feedback and dedicated computer lab practice sessions.', 'Tailored coaching for PTE Academic utilizing exact exam software patterns, template strategies, and speaking pronunciation tuning.', 'Students and immigration candidates requiring high PTE scores for Australian & Canadian visas.', ARRAY['Repeat Sentence & Describe Image Mastery', 'AI Scoring Optimization', 'Write From Dictation Shortcuts', 'Fluency & Pronunciation Calibration'], 6, ARRAY['offline'::delivery_mode, 'online_live'::delivery_mode], 4000.00, 7500.00, ARRAY['Dedicated PTE Computer Lab', 'AI Real-time Score Feedback', 'Template Vault for Essays', 'Unlimited Practice Software Access'], true),

('oet-healthcare-specialization', 'OET Healthcare Specialization (Nurses & Doctors)', 'international_test_prep', 'Specialized Occupational English Test preparation for UK NHS, Ireland, and Australia registration.', 'Niche training for medical professionals focusing on clinical roleplays, referral letter writing, and medical vocabulary for Grade B / Band 350+ success.', 'Registered Nurses (RN), General Practitioners, Dentists, and Allied Healthcare Professionals.', ARRAY['Grade B Referral Letter Writing', 'Clinical Patient Roleplays', 'Medical Sub-test Vocabulary', 'Shift-Friendly Timings (7 AM - 8 PM)'], 6, ARRAY['offline'::delivery_mode, 'online_live'::delivery_mode, 'one_on_one'::delivery_mode], 5000.00, 9500.00, ARRAY['Medical Writing Correction', 'Flexible Shift Schedules', 'Clinical Roleplay Recordings', 'UK NHS Placement Guidance'], true),

('celpip-selt-ukvi', 'CELPIP & SELT / UKVI Exam Preparation', 'international_test_prep', 'Focused preparation for Canadian PR (CELPIP) and UK Spouse / Skilled Worker Visas (SELT/UKVI).', 'Intensive short-duration training modules custom-tailored to official exam patterns and scoring criteria.', 'Immigration applicants for Canada Express Entry and UK visas.', ARRAY['CELPIP Listening & Speaking Tasks', 'UKVI B1/B2 Speaking Tests', 'Canadian Accent Adaptation', 'Quick Exam Result Strategies'], 4, ARRAY['offline'::delivery_mode, 'online_live'::delivery_mode], 3800.00, 7000.00, ARRAY['Official Sample Papers', '1-on-1 Mock Panels', 'High-Scoring Template Bank', 'Fast-Track 2-Week Batches'], false),

('duolingo-english-test', 'Duolingo English Test (DET) Speed Course', 'international_test_prep', 'Score 125+ in 3 weeks with computer-adaptive test strategies and rapid response practice.', 'Designed for students seeking quick university admissions in USA and Europe with affordable test preparation.', 'Higher secondary students applying to US & European universities.', ARRAY['Adaptive Difficulty Calibration', 'Production & Literacy Score Boosting', 'Picture Description Techniques', 'Subscore Target Strategies'], 3, ARRAY['offline'::delivery_mode, 'online_live'::delivery_mode], 3000.00, 5500.00, ARRAY['Computer Practice Portal', 'Micro-batch Guidance', 'Instant Feedback Drills', 'University Selection Support'], false),

('academic-tutoring-iii-viii', 'Classes III-VIII Academic Tutoring (Maths & Science)', 'academic_tutoring', 'Building strong foundational conceptual clarity, analytical skills, and academic excellence.', 'Comprehensive school curriculum coaching in Mathematics, Science, and English with regular unit testing and homework support.', 'School students in West Delhi seeking top academic marks and strong fundamental skills.', ARRAY['Strong Maths & Science Foundations', 'Interactive Concept Visualizations', 'Weekly Unit Tests & Report Cards', 'Homework & Exam Revision Support'], 12, ARRAY['offline'::delivery_mode, 'hybrid'::delivery_mode], 2500.00, 4800.00, ARRAY['Max 10 Students per Class', 'Parent-Teacher Updates', 'Doubt Clearing Hours', 'Air-Conditioned Study Room'], false),

('study-abroad-placement', 'Study Abroad & Overseas University Placement', 'career_services', 'Complete profile evaluation, SOP writing, university application, and visa assistance.', 'End-to-end overseas education consultancy mapping student aspirations to top universities in UK, USA, Australia, Canada, and Europe.', 'Students planning higher studies abroad for UG/PG degrees.', ARRAY['Target University Selection', 'Statement of Purpose (SOP) Polish', 'Visa File Preparation', 'Education Loan & Scholarship Aid'], 8, ARRAY['one_on_one'::delivery_mode, 'offline'::delivery_mode], 0.00, 12000.00, ARRAY['Free Initial Profile Audit', '100% University Admission Rate', 'Visa Interview Preparation', 'Pre-Departure Briefings'], true)
ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Reviews
INSERT INTO public.student_reviews (student_name, course_taken, score_achieved, rating, review_text, scorecard_image_url, source, is_verified)
VALUES
('Priya Sharma', 'IELTS Preparation', 'IELTS 8.0 Overall', 5, 'The patient guidance from EESA faculty helped me overcome my speaking hesitation completely! The 1-on-1 mock interviews gave me immense confidence. I got Band 8.0 in my very first attempt and secured admission in the UK!', '/images/eesa/ielts-scorecard.jpg', 'Justdial', true),
('Gurpreet Singh', 'PTE Academic', 'PTE 79+ Overall', 5, 'The PTE computer practice lab at EESA Academy is top-notch. The real exam interface practice and template strategies helped me score 84 in Speaking and 81 in Writing. Highly recommended for West Delhi students!', '/images/eesa/pte-scorecard.jpg', 'Google', true),
('Sister Anjali Thomas', 'OET Healthcare', 'OET Grade B (Nurses)', 5, 'As a working nurse with night shifts, the flexible 7:00 AM batch at Dashrath Puri was a blessing! The daily medical writing feedback helped me pass OET for UK NHS registration smoothly.', '/images/eesa/oet-scorecard.jpg', 'UrbanPro', true),
('Rahul Verma', 'Spoken English & Public Speaking', 'Conversational Fluency', 5, 'I was extremely hesitant during job interviews. The interactive group roleplays and accent neutralization modules at EESA transformed my personality. I cracked my corporate interview in Gurugram!', '/images/eesa/eesa-award-cert.jpeg', 'Verified Student', true);
