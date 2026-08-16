export type CourseCategory = 'spoken_english' | 'international_test_prep' | 'academic_tutoring' | 'career_services';
export type DeliveryMode = 'offline' | 'online_live' | 'hybrid' | 'one_on_one';
export type LeadStatus = 'new' | 'contacted' | 'demo_scheduled' | 'enrolled' | 'closed';

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  short_description: string;
  full_description: string;
  target_audience: string;
  learning_outcomes: string[];
  duration_weeks: number;
  batch_modes: DeliveryMode[];
  monthly_fee_inr: number | null;
  package_fee_inr: number | null;
  features: string[];
  is_featured: boolean;
  created_at?: string;
}

export interface LeadBooking {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_course_id?: string | null;
  booking_type: 'free_demo' | 'diagnostic_test' | 'profile_evaluation' | 'mock_interview' | 'prospectus_download' | 'contact';
  preferred_mode: DeliveryMode;
  preferred_time_slot?: string;
  notes?: string;
  status?: LeadStatus;
  created_at?: string;
}

export interface StudentReview {
  id: string;
  student_name: string;
  course_taken: string;
  score_achieved: string;
  rating: number;
  review_text: string;
  video_url?: string;
  scorecard_image_url?: string;
  source: string;
  is_verified: boolean;
  created_at?: string;
}

export interface AssessmentSubmission {
  id?: string;
  full_name: string;
  phone: string;
  grammar_score: number;
  target_country?: string;
  target_exam?: string;
  recommended_course_id?: string;
  estimated_fee?: number;
  created_at?: string;
}
