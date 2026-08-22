import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowRight, Flame } from 'lucide-react';
import { Course } from '../../types/database';

interface FeeCalculatorProps {
  courses: Course[];
  onUnlockDiscount: (estimatedFee: number, courseId: string) => void;
}

export const FeeCalculator: React.FC<FeeCalculatorProps> = ({ courses, onUnlockDiscount }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('international_test_prep');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('c2');
  const [deliveryMode, setDeliveryMode] = useState<'offline' | 'online_live' | 'one_on_one'>('offline');
  const [batchFormat, setBatchFormat] = useState<'group' | 'personalized'>('group');
  const [durationWeeks, setDurationWeeks] = useState<number>(8);

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const basePackage = currentCourse?.package_fee_inr || 7500;

  let feeMultiplier = 1.0;
  if (deliveryMode === 'online_live') feeMultiplier = 0.9;
  if (deliveryMode === 'one_on_one') feeMultiplier = 1.4;
  if (batchFormat === 'personalized') feeMultiplier *= 1.25;

  const rawFee = Math.round((basePackage * (durationWeeks / 8)) * feeMultiplier);
  const earlyBirdDiscount = Math.round(rawFee * 0.15);
  const finalEstimatedFee = rawFee - earlyBirdDiscount;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
              Fee Estimator
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Calculate Tuition & 15% Early Bird Discount
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-3.5 py-1.5 rounded-lg shrink-0 text-xs">
            <Flame className="w-4 h-4 text-emerald-400" />
            <span>Save ₹{earlyBirdDiscount.toLocaleString('en-IN')} Today</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-5">
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                1. Select Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'spoken_english', label: 'Spoken English' },
                  { id: 'international_test_prep', label: 'Test Prep' },
                  { id: 'academic_tutoring', label: 'Tutoring' },
                  { id: 'career_services', label: 'Study Abroad' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      const matching = courses.find((c) => c.category === cat.id);
                      if (matching) setSelectedCourseId(matching.id);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 border-blue-500 text-white shadow-xs'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                2. Target Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {courses
                  .filter((c) => selectedCategory === 'all' || c.category === selectedCategory)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.duration_weeks} Weeks)
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                3. Delivery Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'offline', title: 'Offline AC Classroom' },
                  { id: 'online_live', title: 'Live Online' },
                  { id: 'one_on_one', title: '1-on-1 Personalized' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setDeliveryMode(mode.id as 'offline' | 'online_live' | 'one_on_one')}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all ${
                      deliveryMode === mode.id
                        ? 'bg-blue-900/80 border-blue-500 text-white shadow-xs'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {mode.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  4. Batch Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBatchFormat('group')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                      batchFormat === 'group'
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Small Group (Max 8)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBatchFormat('personalized')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                      batchFormat === 'personalized'
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    1-on-1 Coaching
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  5. Duration
                </label>
                <select
                  value={durationWeeks}
                  onChange={(e) => setDurationWeeks(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-white outline-none"
                >
                  <option value={4}>4 Weeks (Fast-Track)</option>
                  <option value={8}>8 Weeks (Standard)</option>
                  <option value={12}>12 Weeks (Mastery)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Fee Output Card */}
          <div className="lg:col-span-5 bg-slate-800/90 p-6 rounded-xl border border-slate-700 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs text-slate-400 border-b border-slate-700 pb-2 flex justify-between">
                <span>Course:</span>
                <strong className="text-white">{currentCourse?.title}</strong>
              </div>

              <div className="space-y-2 mt-4 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Standard Package Fee:</span>
                  <span className="line-through text-slate-400">₹{rawFee.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>15% Discount:</span>
                  <span>- ₹{earlyBirdDiscount.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Net Discounted Fee:</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-white">
                      ₹{finalEstimatedFee.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400">all-inclusive</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onUnlockDiscount(finalEstimatedFee, selectedCourseId)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4" />
              <span>Unlock Discount & Reserve Seat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
