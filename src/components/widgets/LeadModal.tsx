import React, { useState, useEffect } from 'react';
import { X, Sparkles, Phone, Mail, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { Course, DeliveryMode, LeadBooking } from '../../types/database';
import { submitLeadBooking } from '../../lib/supabase';
import { FormSuccessState } from '../ui/FormSuccessState';

import { sanitizeText, StudentLeadSchema, checkSubmissionRateLimit } from '../../lib/security';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  initialCourseId?: string;
  defaultBookingType?: 'free_demo' | 'diagnostic_test' | 'profile_evaluation' | 'mock_interview' | 'prospectus_download' | 'contact';
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  courses,
  initialCourseId,
  defaultBookingType = 'free_demo'
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId || '');
  const [bookingType, setBookingType] = useState(defaultBookingType);
  const [preferredMode, setPreferredMode] = useState<DeliveryMode>('offline');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning (7-10 AM)');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
    }
  }, [initialCourseId]);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setNameError(null);
      setPhoneError(null);
      setGeneralError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError(null);
    setPhoneError(null);
    setGeneralError(null);

    // Bot detection check
    if (honeypot) {
      console.warn('[Security] Bot honeypot triggered on LeadModal');
      setIsSubmitted(true);
      return;
    }

    // Rate limiting
    const rateCheck = checkSubmissionRateLimit('lead_modal', 3, 60000);
    if (!rateCheck.allowed) {
      setGeneralError(`Too many requests. Please wait ${rateCheck.retryAfterSec} seconds before retrying.`);
      return;
    }

    // Sanitize inputs
    const cleanName = sanitizeText(fullName);
    const cleanPhone = phone.replace(/[\s-+()]/g, '');
    const cleanEmail = sanitizeText(email);
    const cleanNotes = sanitizeText(notes);

    // Zod Schema Validation
    const validation = StudentLeadSchema.safeParse({
      fullName: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      courseId: selectedCourseId || 'spoken-english-fluency',
      notes: cleanNotes,
      honeypot,
    });

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      if (fieldErrors.fullName) setNameError(fieldErrors.fullName[0]);
      if (fieldErrors.phone) setPhoneError(fieldErrors.phone[0]);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setIsSubmitting(true);
    const booking: LeadBooking = {
      full_name: cleanName,
      phone: cleanPhone,
      email: cleanEmail || `${cleanPhone}@eesa-applicant.com`,
      preferred_course_id: selectedCourseId || null,
      booking_type: bookingType,
      preferred_mode: preferredMode,
      preferred_time_slot: preferredTimeSlot,
      notes: cleanNotes,
    };

    const res = await submitLeadBooking(booking);
    setIsSubmitting(false);
    if (res.success) {
      setIsSubmitted(true);
    } else {
      setGeneralError('Unable to reserve seat. Please contact our admissions desk directly.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 ${isShaking ? 'animate-shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> EESA Academy Registration
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white">
            {bookingType === 'free_demo' && 'Book Free Demo Class'}
            {bookingType === 'diagnostic_test' && 'Book Level Diagnostic Test'}
            {bookingType === 'profile_evaluation' && 'Book Overseas Profile Audit'}
            {bookingType === 'prospectus_download' && 'Download Complete Prospectus'}
            {bookingType === 'contact' && 'Request Callback from Faculty'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            📍 Campus adjacent to Dashrath Puri Metro Station (Gate 1), West Delhi
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <FormSuccessState
              applicantName={fullName}
              title="Demo Seat Reserved Successfully!"
              subtitle={`EESA Admissions & Academic Counseling Desk will call on ${phone} to confirm your session schedule.`}
              onClose={onClose}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Security Honeypot (Invisible to users, traps automated bots) */}
              <input
                type="text"
                name="website_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {generalError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
                  <span>{generalError}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name <span className="text-blue-600 dark:text-blue-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (nameError) setNameError(null);
                    }}
                    placeholder="e.g. Anjali Sharma"
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                      nameError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700'
                    } rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white outline-none transition-all`}
                  />
                </div>
                {nameError && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium pt-1 animate-fadeIn">
                    {nameError}
                  </p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Mobile Number (WhatsApp) <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (phoneError) setPhoneError(null);
                      }}
                      placeholder="+91 98101 26691"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                        phoneError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700'
                      } rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 outline-none font-semibold text-slate-900 dark:text-white transition-all`}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium pt-1 animate-fadeIn">
                      {phoneError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Target Course Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Target Program / Course
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 outline-none font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value="">Select Course (Or talk to Counselor)</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Mode & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Learning Mode
                  </label>
                  <select
                    value={preferredMode}
                    onChange={(e) => setPreferredMode(e.target.value as DeliveryMode)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
                  >
                    <option value="offline">Offline AC Classroom (Dashrath Puri)</option>
                    <option value="online_live">Live Interactive Online</option>
                    <option value="hybrid">Hybrid (Offline + Live)</option>
                    <option value="one_on_one">1-on-1 Personalized Coaching</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Preferred Batch Time
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
                  >
                    <option value="Morning (7-10 AM)">Early Morning (7:00 - 10:00 AM)</option>
                    <option value="Midday (10 AM-1 PM)">Midday Batch (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2-5 PM)">Afternoon Batch (2:00 - 5:00 PM)</option>
                    <option value="Evening (5-8 PM)">Evening Batch (5:00 - 8:00 PM)</option>
                    <option value="Weekend Special">Weekend Special (Sat & Sun)</option>
                  </select>
                </div>
              </div>

              {/* Notes / Special Request */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Target Exam / Target Score / Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Aiming for IELTS 7.5 for Canada PR or OET Grade B Nurse shift timing..."
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white outline-none resize-none"
                />
              </div>

              {/* Trust Callout */}
              <div className="bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-900 dark:text-blue-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>
                  <strong>Zero Obligation:</strong> Free demo class includes a full 45-minute interactive diagnostic assessment with certified EESA mentors.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing Registration...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Confirm Free Demo Class Registration</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
