import React from 'react';
import { Phone, Calendar, MessageSquare } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenDemoModal: (courseId?: string) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenDemoModal }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-3 py-2 shadow-lg">
      <div className="grid grid-cols-3 gap-2 items-center">
        
        {/* Direct Call Button */}
        <a
          href="tel:+919810126691"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200 hover:bg-slate-200 transition-colors"
        >
          <Phone className="w-4 h-4 text-slate-900 mb-0.5" />
          <span>Call Desk</span>
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href="https://wa.me/919810126691?text=Hi%20EESA%20Academy,%20I%20want%20to%20enquire%20about%20your%20courses."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs border border-emerald-500 transition-colors"
        >
          <MessageSquare className="w-4 h-4 fill-white mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Free Demo Registration */}
        <button
          onClick={() => onOpenDemoModal()}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-blue-600 text-white text-[11px] font-bold shadow-xs hover:bg-blue-700 transition-colors"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Free Demo</span>
        </button>

      </div>
    </div>
  );
};
