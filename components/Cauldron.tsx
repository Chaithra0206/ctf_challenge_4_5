import React, { useMemo } from 'react';
import { Ingredient } from '../types';
import { Flame, X, Beaker } from 'lucide-react';

interface Props {
  ingredients: Ingredient[];
  isBrewing: boolean;
  onClear: () => void;
  onBrew: () => void;
}

export const Cauldron: React.FC<Props> = ({ ingredients, isBrewing, onClear, onBrew }) => {
  
  const mixStyle = useMemo(() => {
    if (ingredients.length === 0) return { filter: 'grayscale(100%) opacity(0.2)' };
    
  
    const totalHue = ingredients.reduce((acc, curr) => acc + curr.hue, 0);
    const avgHue = totalHue / ingredients.length;
    
    return {
      filter: `hue-rotate(${avgHue}deg) saturate(1.5) brightness(1.2)`,
      opacity: 0.9,
      transition: 'filter 1.5s ease-in-out'
    };
  }, [ingredients]);

  const fillPercentage = Math.min(ingredients.length * 20, 95); 
  const liquidY = 290 - (fillPercentage * 2); 

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      
      <div className="absolute top-0 left-0 w-full flex flex-wrap gap-2 justify-center pointer-events-none z-30 min-h-[40px]">
        {ingredients.map((ing, idx) => (
          <div 
            key={`${ing.id}-${idx}`}
            className="animate-pop-in bg-slate-900/80 backdrop-blur text-xs px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.2)] flex items-center gap-2 pointer-events-auto"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{ing.name}</span>
          </div>
        ))}
      </div>

      <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] mt-4 mb-8 flex items-center justify-center">
        
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-emerald-500/10 blur-[80px] transition-all duration-1000 
          ${isBrewing ? 'scale-125 opacity-100 animate-pulse' : 'scale-75 opacity-30'}`} 
        />

        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
       
             <path id="flaskShape" d="M 125 40 L 125 90 C 125 140 50 140 50 210 C 50 260 90 290 150 290 C 210 290 250 260 250 210 C 250 140 175 140 175 90 L 175 40 Z" />
             
             <mask id="flaskMask">
                <use href="#flaskShape" fill="white" />
             </mask>
             <mask id="liquidMask">
                <rect x="0" y="0" width="300" height="300" fill="black" />
               
                <path 
                  d={`M 0 ${300} L 0 ${liquidY} Q 75 ${liquidY - 10} 150 ${liquidY} Q 225 ${liquidY + 10} 300 ${liquidY} L 300 300 Z`} 
                  fill="white"
                  className="transition-all duration-700 ease-out"
                >
                   
                   {ingredients.length > 0 && (
                     <animate 
                        attributeName="d" 
                        values={`
                          M 0 300 L 0 ${liquidY} Q 75 ${liquidY - 5} 150 ${liquidY} Q 225 ${liquidY + 5} 300 ${liquidY} L 300 300 Z;
                          M 0 300 L 0 ${liquidY} Q 75 ${liquidY + 5} 150 ${liquidY} Q 225 ${liquidY - 5} 300 ${liquidY} L 300 300 Z;
                          M 0 300 L 0 ${liquidY} Q 75 ${liquidY - 5} 150 ${liquidY} Q 225 ${liquidY + 5} 300 ${liquidY} L 300 300 Z
                        `} 
                        dur="3s" 
                        repeatCount="indefinite" 
                     />
                   )}
                </path>
             </mask>
             
         
             <pattern id="bubbles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="90" r="2" fill="rgba(255,255,255,0.3)">
                   <animate attributeName="cy" from="100" to="0" dur="4s" repeatCount="indefinite" />
                   <animate attributeName="opacity" values="0;0.5;0" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="90" r="3" fill="rgba(255,255,255,0.2)">
                   <animate attributeName="cy" from="110" to="-10" dur="3s" begin="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="90" r="1.5" fill="rgba(255,255,255,0.4)">
                   <animate attributeName="cy" from="120" to="-20" dur="5s" begin="0.5s" repeatCount="indefinite" />
                </circle>
             </pattern>
          </defs>

          <use href="#flaskShape" fill="rgba(15, 23, 42, 0.4)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          
          <g mask="url(#flaskMask)">
             <g mask="url(#liquidMask)">
               
                <rect x="0" y="0" width="300" height="300" fill="#1e293b" />
                
                
                <foreignObject x="0" y="0" width="300" height="300">
                  <div 
                    className="w-full h-full"
                    style={{
                      background: 'conic-gradient(from 180deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                      ...mixStyle
                    }}
                  />
                </foreignObject>

                
                <rect x="0" y="0" width="300" height="300" fill="url(#innerShadow)" style={{ mixBlendMode: 'multiply' }} />
                <linearGradient id="innerShadow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
                  <stop offset="20%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="80%" stopColor="rgba(0,0,0,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
                </linearGradient>

                
                {(isBrewing || ingredients.length > 0) && (
                   <rect x="0" y="0" width="300" height="300" fill="url(#bubbles)" className={isBrewing ? "animate-pulse" : ""} />
                )}
             </g>
          </g>

          
          <use href="#flaskShape" fill="url(#glassSheen)" style={{ mixBlendMode: 'overlay' }} pointerEvents="none" />
          
          <linearGradient id="glassSheen" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
             <stop offset="40%" stopColor="rgba(255,255,255,0.0)" />
             <stop offset="60%" stopColor="rgba(255,255,255,0.0)" />
             <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>

          <path d="M 130 50 L 130 90" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <path d="M 65 210 Q 65 250 100 270" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 235 210 Q 235 170 200 150" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" strokeLinecap="round" />

          <rect x="120" y="35" width="60" height="8" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" />

        </svg>
      </div>

    
      <div className="flex gap-4 z-20">
        <button
          onClick={onClear}
          disabled={isBrewing || ingredients.length === 0}
          className="group px-6 py-3 rounded-xl bg-slate-800/80 backdrop-blur border border-slate-600 hover:border-red-400 hover:text-red-400 text-slate-400 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span>Clear</span>
        </button>
        
        <button
          onClick={onBrew}
          disabled={isBrewing || ingredients.length === 0}
          className={`px-8 py-3 rounded-xl font-display font-bold text-lg flex items-center gap-2 transition-all shadow-xl border
            ${isBrewing 
              ? 'bg-emerald-900/50 border-emerald-800 cursor-wait text-emerald-200/50' 
              : ingredients.length > 0 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400/50 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/50 hover:shadow-emerald-500/30 hover:-translate-y-1' 
                : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
        >
          {isBrewing ? (
            <>
              <Flame className="w-5 h-5 animate-bounce" />
              <span>Transmuting...</span>
            </>
          ) : (
            <>
              <Beaker className="w-5 h-5" />
              <span>Transmute</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};