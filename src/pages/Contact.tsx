import React, { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, CheckCircle2, Navigation, Building2
} from 'lucide-react';
import { submitLeadBooking } from '../lib/supabase';
import { Course } from '../types/database';
import { Button as StatefulButton } from '@/components/ui/stateful-button';

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

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !phone) return;

    await submitLeadBooking({
      full_name: fullName,
      phone,
      email: email || `${phone}@eesa-contact.com`,
      preferred_course_id: selectedCourseId || null,
      booking_type: 'contact',
      preferred_mode: 'offline',
      preferred_time_slot: preferredSlot,
      notes,
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 py-8 sm:py-12">
      
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 text-center space-y-4">
        <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-blue-400" /> Dashrath Puri Metro Campus
        </span>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Contact Us & Campus Directions
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Walk in directly or book a prior appointment with Prashant Sir at our air-conditioned West Delhi campus.
        </p>
      </section>

      {/* LOCATION & CONTACT CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Registered Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Registered Office & Campus</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Expert Educational Services Academy Pvt Ltd</strong><br />
              RZ-A-1/14B, First Floor, Vijay Enclave, Opp. Shani Dev Mandir, Dabri-Palam Road, New Delhi - 110045.
            </p>
            <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-[11px] font-semibold text-emerald-800">
              🎯 Landmark: Right opposite Shani Dev Mandir, adjacent to Dashrath Puri Metro Station Gate No. 1.
            </div>
          </div>

          {/* Card 2: Phone & Email */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Direct Contact Helplines</h3>
            <div className="text-xs text-slate-700 space-y-1">
              <p>
                Mobile / WhatsApp:{' '}
                <a href="tel:+919810126691" className="font-bold text-blue-600 hover:underline">
                  +91 98101 26691
                </a>
              </p>
              <p>
                Landline Phone:{' '}
                <a href="tel:01144757111" className="font-semibold text-slate-900">
                  011 44757111
                </a>
              </p>
              <p className="pt-1">
                Official Email:{' '}
                <a href="mailto:info@expert-educational.com" className="text-blue-600 hover:underline">
                  info@expert-educational.com
                </a>
              </p>
              <p>
                Alternate Email:{' '}
                <a href="mailto:eesaacademy22@gmail.com" className="text-blue-600 hover:underline">
                  eesaacademy22@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Card 3: Operating Hours */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Campus Operating Hours</h3>
            <div className="text-xs text-slate-700 space-y-2">
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200">
                <span className="font-bold">Monday - Saturday:</span>
                <span className="text-emerald-700 font-extrabold">7:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200">
                <span className="font-bold">Sunday:</span>
                <span className="text-slate-500 font-semibold">Closed for Revision</span>
              </div>
              <p className="text-[11px] text-slate-500 italic">
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
          <div className="lg:col-span-7 bg-white p-4 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Interactive Location Map</h3>
                <p className="text-xs text-slate-500">Dashrath Puri Metro Station / Dabri-Palam Road, New Delhi</p>
              </div>
              <a
                href="https://maps.google.com/?q=Dashrath+Puri+Metro+Station+Gate+1+New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" /> Open Maps App
              </a>
            </div>

            <div className="w-full h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
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

            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-700 space-y-1 border border-slate-200">
              <span className="font-bold text-slate-900 block">🚇 Metro Access Route:</span>
              <p>Take Delhi Metro Magenta Line → Exit Gate No. 1 → Walk 50 meters straight towards Shani Dev Mandir → First Floor RZ-A-1/14B.</p>
            </div>
          </div>

          {/* Form (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1">
              Send Message / Book Campus Visit
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Schedule a 1-on-1 consultation or request information from Prashant Sir.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-lg">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Our admissions office has received your request and will call you on <strong>{phone}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Full Name <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Gurpreet Singh"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number (WhatsApp) <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98101 26691"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Course
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  >
                    <option value="">Select Target Course</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
                  >
                    <option value="Morning (7-10 AM)">Morning (7:00 - 10:00 AM)</option>
                    <option value="Midday (10 AM-1 PM)">Midday (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2-5 PM)">Afternoon (2:00 - 5:00 PM)</option>
                    <option value="Evening (5-8 PM)">Evening (5:00 - 8:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Questions / Message
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specific questions for Prashant Sir..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 resize-none text-slate-900"
                  />
                </div>

                <div className="pt-2 flex justify-center">
                  <StatefulButton onClick={handleSubmit} className="w-full py-3 text-sm font-bold bg-blue-600 hover:bg-blue-700">
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
