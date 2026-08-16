import React from 'react';
import { X, Play, CheckCircle } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  videoTitle: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoTitle, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="font-bold text-sm tracking-tight">{videoTitle}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/40 animate-pulse">
            <Play className="w-10 h-10 fill-blue-400 ml-1" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">Speech Transformation Showcase</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Interactive recording clip demonstrating before-and-after accent neutralization and fluency improvement under Prashant Sir's 1-on-1 mentorship.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl text-left max-w-md mx-auto border border-slate-700 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle className="w-4 h-4" /> <span>Before: Hesitant speech with vocal pauses</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle className="w-4 h-4" /> <span>After 4 Weeks: Fluent corporate delivery & Band 8.0 rhythm</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-md"
          >
            Close Clip Player
          </button>
        </div>
      </div>
    </div>
  );
};
