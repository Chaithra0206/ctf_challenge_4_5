import React from 'react';
import { INGREDIENTS } from '../data/ingredients';
import { Ingredient } from '../types';
import { Plus } from 'lucide-react';

interface Props {
  onSelect: (ingredient: Ingredient) => void;
}

export const IngredientShelf: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="space-y-3">
      {INGREDIENTS.map((ing) => (
        <button
          key={ing.id}
          onClick={() => onSelect(ing)}
          className="w-full group relative flex items-center gap-4 p-3 rounded-xl bg-slate-900/40 hover:bg-slate-700/40 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 text-left overflow-hidden"
        >
         
          <div 
            className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 shadow-inner flex items-center justify-center relative overflow-hidden shrink-0"
          >
            <div 
              className="absolute inset-0 opacity-80"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 20%),
                             conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`,
                filter: `hue-rotate(${ing.hue}deg) blur(4px)`,
              }}
               data-spectral-frequency={ing.hue}
            />
            <div className="absolute inset-0 bg-black/10 rounded-full" />
          </div>

          <div className="flex-1 z-10">
            <h3 className="font-display font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
              {ing.name}
            </h3>
            <p className="text-xs text-slate-500 truncate group-hover:text-slate-400">
              {ing.description}
            </p>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Plus className="w-5 h-5 text-emerald-400" />
          </div>
        </button>
      ))}
    </div>
  );
};