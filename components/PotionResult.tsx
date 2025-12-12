import React from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  description: string;
  onDismiss: () => void;
}

export const PotionResult: React.FC<Props> = ({ description, onDismiss }) => {
  return (
    <div className="max-w-md w-full bg-slate-950 border border-emerald-500/30 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(16,185,129,0.2)] relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-emerald-500/50 rounded-br-xl" />

      <div className="relative z-10">
        <div className="w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
          <Sparkles className="w-8 h-8 text-emerald-400" />
        </div>
        
        <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200 mb-4">
          Transmutation Complete
        </h3>
        
        <p className="text-slate-300 leading-relaxed font-light mb-8">
          {description}
        </p>

        <button
          onClick={onDismiss}
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-lg transition-colors text-sm uppercase tracking-wider font-semibold"
        >
          Mix Another
        </button>
      </div>
    </div>
  );
};