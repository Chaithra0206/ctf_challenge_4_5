import React, { useState } from 'react';
import { IngredientShelf } from './components/IngredientShelf';
import { Cauldron } from './components/Cauldron';
import { PotionResult } from './components/PotionResult';
import { Ingredient } from './types';
import { generatePotionDescription } from './services/gemini';
import { FlaskConical, Sparkles, RefreshCcw } from 'lucide-react';

export default function App() {
  const [cauldron, setCauldron] = useState<Ingredient[]>([]);
  const [isBrewing, setIsBrewing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const addToCauldron = (ingredient: Ingredient) => {
    if (cauldron.length < 5 && !isBrewing) {
      setCauldron([...cauldron, ingredient]);
      setResult(null); // Reset previous result
    }
  };

  const clearCauldron = () => {
    setCauldron([]);
    setResult(null);
    setIsBrewing(false);
  };

  const brewPotion = async () => {
    if (cauldron.length === 0) return;
    
    setIsBrewing(true);
    try {
      const ingredientNames = cauldron.map(i => i.name);
      // Simulate brewing time for effect
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const description = await generatePotionDescription(ingredientNames);
      setResult(description);
    } catch (error) {
      console.error("Brewing failed:", error);
      setResult("The mixture turned into a thick, inert sludge. The spirits were silent.");
    } finally {
      setIsBrewing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 overflow-hidden relative selection:bg-purple-500 selection:text-white">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 h-screen flex flex-col">
        <header className="flex items-center justify-between mb-8 border-b border-slate-700/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <FlaskConical className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-emerald-200">
                Alchemist's Flask
              </h1>
              <p className="text-xs text-slate-500 tracking-widest uppercase">Experimental Laboratory</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-slate-300"
            title="Reset Laboratory"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-[calc(100vh-160px)]">
          {/* Left Panel: Ingredients */}
          <div className="lg:col-span-4 h-full overflow-y-auto pr-2 custom-scrollbar">
            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl h-full flex flex-col">
              <h2 className="text-xl font-display text-emerald-300 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Reagents
              </h2>
              <IngredientShelf onSelect={addToCauldron} />
              
              <div className="mt-auto pt-6 text-center">
                <p className="text-xs text-slate-600 font-mono italic">
                  "Only the right mixture will reveal the secret formula."
                </p>
              </div>
            </div>
          </div>

          {/* Center Panel: Cauldron */}
          <div className="lg:col-span-8 h-full flex flex-col">
            <div className="flex-1 relative bg-slate-800/20 backdrop-blur-sm rounded-3xl border border-slate-700/30 flex flex-col items-center justify-center p-8 shadow-2xl overflow-hidden">
              <Cauldron 
                ingredients={cauldron} 
                isBrewing={isBrewing} 
                onClear={clearCauldron}
                onBrew={brewPotion}
              />
              
              {result && !isBrewing && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-8 animate-fade-in">
                  <PotionResult description={result} onDismiss={() => setResult(null)} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}