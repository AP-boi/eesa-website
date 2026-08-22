import React from 'react';
import { CalendarClock, Sparkles } from 'lucide-react';

interface LastUpdatedBadgeProps {
  dateString?: string;
  version?: string;
  className?: string;
}

export const LastUpdatedBadge: React.FC<LastUpdatedBadgeProps> = ({
  dateString = 'August 2026',
  version = 'Curriculum v4.2',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs ${className}`}
      title={`Last verified and updated for academic session ${dateString}`}
    >
      <CalendarClock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
      <span>Updated: <strong className="font-bold text-slate-800 dark:text-slate-200">{dateString}</strong></span>
      <span className="text-slate-400 dark:text-slate-500">•</span>
      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{version}</span>
    </div>
  );
};
