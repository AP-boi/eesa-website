import React, { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, CheckCircle2, Navigation, Building2, MessageSquare, AlertCircle
} from 'lucide-react';
import { submitLeadBooking } from '../lib/supabase';
import { Course } from '../types/database';
import { Button as StatefulButton } from '@/components/ui/stateful-button';
import { CopyButton } from '@/components/ui/CopyButton';
import { FormSuccessState } from '@/components/ui/FormSuccessState';
import { SEO } from '@/components/common/SEO';

interface ContactProps {
  courses: Course[];
}

export const Contact: React.FC<ContactProps> = ({ courses }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (7-10 AM)');
  const [notes, setNotes] = useState('');

  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setNameError(null);
    setPhoneError(null);

    if (!fullName.trim()) {
      setNameError('Your full name is required.');
      isValid = false;
    }

    const cleanPhone = phone.replace(/[\s-+()]/g, '');
    if (!cleanPhone) {
      setPhoneError('Mobile number is required.');
      isValid = false;
    } else if (cleanPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      isValid = false;
    }

    if (!isValid) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    await submitLeadBooking({
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || `${phone.trim()}@eesa-contact.com`,
      preferred_course_id: selectedCourseId || null,
      booking_type: 'contact',
      preferred_mode: 'offline',
      preferred_time_slot: preferredSlot,
      notes: notes.trim(),
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO
        title="Contact Us & Campus Directions | Dashrath Puri Metro Gate 1, West Delhi"
        description="Visit EESA Academy in Vijay Enclave near Dashrath Puri Metro Gate 1. Call +91 98101 26691 or chat on WhatsApp for course batches, fees & demo classes."
        canonicalUrl="/contact"
      />
      
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-center space-y-4">
        <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-blue-400" /> Dashrath Puri Metro Campus
        </span>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Contact Us & Campus Directions
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Walk in directly or book a prior appointment with our academic counselors at our air-conditioned West Delhi campus.
        </p>
      </section>

      {/* LOCATION & CONTACT CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Registered Address */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                <Building2 className="w-5 h-5" />
              </div>
              <CopyButton textToCopy="RZ-A-1/14B, First Floor, Vijay Enclave, Opp. Shani Dev Mandir, Dabri-Palam Road, New Delhi - 110045" iconOnly />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Registered Office & Campus</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Expert Educational Services Academy Pvt Ltd</strong><br />
              RZ-A-1/14B, First Floor, Vijay Enclave, Opp. Shani Dev Mandir, Dabri-Palam Road, New Delhi - 110045.
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <span>🎯 Landmark: Opp. Shani Dev Mandir, Gate 1 Metro.</span>
            </div>
          </div>

          {/* Card 2: Phone & Email */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                <Phone className="w-5 h-5" />
              </div>
              <CopyButton textToCopy="+919810126691" label="Copy Phone" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Direct Contact Helplines</h3>
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span>Mobile / WhatsApp:</span>
                <a href="tel:+919810126691" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  +91 98101 26691
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Landline Phone:</span>
                <a href="tel:01144757111" className="font-semibold text-slate-900 dark:text-white">
                  011 44757111
                </a>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>Official Email:</span>
                <a href="mailto:info@expert-educational.com" className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[140px]">
                  info@expert-educational.com
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Operating Hours */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Campus Operating Hours</h3>
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold">Monday - Saturday:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">7:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-bold">Sunday:</span>
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Closed for Revision</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                *Flexible shift batches available for working healthcare professionals.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* EMBEDDED MAP & CAMPUS VISIT FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Embed (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-lg">Interactive Location Map</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Dashrath Puri Metro Station / Dabri-Palam Road, New Delhi</p>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton textToCopy="Dashrath Puri Metro Station Gate No. 1, Opp. Shani Dev Mandir, New Delhi - 110045" iconOnly />
                <a
                  href="https://maps.google.com/?q=Dashrath+Puri+Metro+Station+Gate+1+New+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" /> Maps
                </a>
              </div>
            </div>

            <div className="w-full h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              <iframe
                title="EESA Academy Campus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.2673898083864!2d77.0784115!3d28.5917415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b3294333333%3A0x123456789abcdef!2sDashrath%20Puri%20Metro%20Station!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-1 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">🚇 Metro Access Route:</span>
              <p>Take Delhi Metro Magenta Line → Exit Gate No. 1 → Walk 50 meters straight towards Shani Dev Mandir → First Floor RZ-A-1/14B.</p>
            </div>
          </div>

          {/* Form (5 Cols) */}
          <div className={`lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl ${isShaking ? 'animate-shake' : ''}`}>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
              Send Message / Book Campus Visit
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Schedule a 1-on-1 consultation or request course information from our team.
            </p>

            {submitted ? (
              <FormSuccessState
                applicantName={fullName}
                title="Message Sent Successfully!"
                subtitle={`Thank you. Our admissions office has received your message and will call on ${phone}.`}
                onClose={() => setSubmitted(false)}
              />
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Your Full Name <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (nameError) setNameError(null);
                    }}
                    placeholder="e.g. Gurpreet Singh"
                    className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                      nameError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                    } rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all`}
                  />
                  {nameError && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium pt-1 animate-fadeIn">
                      {nameError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Mobile Number (WhatsApp) <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError(null);
                    }}
                    placeholder="+91 98101 26691"
                    className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border ${
                      phoneError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                    } rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all`}
                  />
                  {phoneError && (
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium pt-1 animate-fadeIn">
                      {phoneError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Target Course
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="">Select Target Course</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="Morning (7-10 AM)">Morning (7:00 - 10:00 AM)</option>
                    <option value="Midday (10 AM-1 PM)">Midday (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2-5 PM)">Afternoon (2:00 - 5:00 PM)</option>
                    <option value="Evening (5-8 PM)">Evening (5:00 - 8:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Questions / Message
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specific questions about courses, timings or fees..."
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 resize-none text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 flex justify-center">
                  <StatefulButton onClick={handleSubmit} className="w-full py-3 text-sm font-bold bg-blue-600 hover:bg-blue-700 cursor-pointer">
                    Send Message
                  </StatefulButton>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
