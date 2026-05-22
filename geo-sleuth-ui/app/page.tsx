'use client';
import { useState, useEffect, useCallback } from 'react';

type Clue = {
  id: number;
  region: string;
  country: string;
  clue: string;
  category: string;
  difficulty: string;
};

// Our decoy pool for generating multiple-choice wrong answers
const COUNTRY_POOL = [
  "Mexico", "Brazil", "Chile", "Argentina", "Colombia", "Peru",
  "Romania", "Kyrgyzstan", "Lithuania", "Ukraine", "Poland", "Hungary"
];

export default function Home() {
  const [clueData, setClueData] = useState<Clue | null>(null);
  const [loading, setLoading] = useState(true);
  
  // New Gamification State
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Helper to shuffle an array
  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const generateOptions = useCallback((correctCountry: string) => {
    // Filter out the correct answer from the pool, grab 3 random decoys
    const decoys = shuffleArray(COUNTRY_POOL.filter(c => c !== correctCountry)).slice(0, 3);
    // Combine with the correct answer and shuffle the final 4 options
    setOptions(shuffleArray([...decoys, correctCountry]));
  }, []);

  const fetchClue = useCallback(async () => {
    setLoading(true);
    setRevealed(false);
    setSelectedAnswer(null);
    try {
      const res = await fetch('http://localhost:3001/clues/random');
      const data = await res.json();
      setClueData(data);
      generateOptions(data.country);
    } catch (error) {
      console.error("Backend offline!", error);
    } finally {
      setLoading(false);
    }
  }, [generateOptions]);

  useEffect(() => {
    fetchClue();
  }, [fetchClue]);

  const handleGuess = (guess: string) => {
    if (revealed) return; // Prevent multiple clicks
    
    setSelectedAnswer(guess);
    setRevealed(true);
    
    if (guess === clueData?.country) {
      setScore(prev => prev + 1); // Bump score!
    } else {
      setScore(0); // Reset score on wrong answer (Brutal mode!)
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        
        {/* Header with Score */}
        <div className="bg-slate-950 p-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-wider text-emerald-400">GEO-SLEUTH</h1>
            {clueData && (
              <span className="text-xs uppercase tracking-widest text-slate-400 mt-1">
                Difficulty: {clueData.difficulty}
              </span>
            )}
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-600 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Streak</p>
            <p className="text-2xl font-bold text-white leading-none">{score}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          {loading || !clueData ? (
            <div className="animate-pulse text-center text-slate-500">Decrypting satellite feed...</div>
          ) : (
            <>
              <div className="text-sm text-emerald-500 mb-4 tracking-wide font-mono">
                CATEGORY: {clueData.category.toUpperCase()}
              </div>
              <p className="text-2xl leading-relaxed font-light mb-8">
                &quot;{clueData.clue}&quot;
              </p>
              
              {/* Multiple Choice Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.map((option) => {
                  // Determine button styles based on state
                  let btnStyle = "bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600";
                  
                  if (revealed) {
                    if (option === clueData.country) {
                      btnStyle = "bg-emerald-600/20 border-emerald-500 text-emerald-400"; // Always show correct answer
                    } else if (option === selectedAnswer) {
                      btnStyle = "bg-red-500/20 border-red-500 text-red-400"; // Highlight wrong guess
                    } else {
                      btnStyle = "bg-slate-800/50 border-slate-700 text-slate-500 opacity-50"; // Dim the rest
                    }
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleGuess(option)}
                      disabled={revealed}
                      className={`p-4 rounded-lg border-2 font-semibold text-lg transition-all duration-300 ${btnStyle} ${revealed ? 'cursor-default' : 'cursor-pointer hover:-translate-y-1'}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-700 flex">
          <button 
            onClick={fetchClue}
            disabled={loading || !revealed}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded transition-colors uppercase tracking-widest text-sm"
          >
            {revealed ? 'Next Location' : 'Select an answer above'}
          </button>
        </div>
      </div>
    </main>
  );
}