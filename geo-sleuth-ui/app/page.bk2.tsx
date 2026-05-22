'use client';

import { useState, useEffect } from 'react';

type Clue = {
  id: number;
  region: string;
  country: string;
  clue: string;
  category: string;
  difficulty: string;
};

export default function Home() {
  const [clueData, setClueData] = useState<Clue | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  const requestRandomClue = async (): Promise<Clue> => {
    // Fetching directly from our NestJS microservice
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/clues/random`);
    return res.json();
  };

  const fetchClue = async () => {
    setLoading(true);
    setRevealed(false);
    try {
      const data = await requestRandomClue();
      setClueData(data);
    } catch (error) {
      console.error("Make sure your NestJS backend is running!", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a clue on initial load (setState only in async callbacks)
  useEffect(() => {
    let active = true;

    requestRandomClue()
      .then((data) => {
        if (active) setClueData(data);
      })
      .catch((error) => {
        console.error("Make sure your NestJS backend is running!", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold tracking-widest">GEO-SLEUTH</h1>
          {clueData && (
            <span className="text-sm font-semibold uppercase px-3 py-1 rounded bg-slate-800">
              {clueData.difficulty}
            </span>
          )}
        </header>

        {/* Content Body */}
        <section className="mb-8 min-h-[160px]">
          {loading || !clueData ? (
            <p className="text-slate-400 text-center">Decrypting satellite feed...</p>
          ) : (
            <>
              <p className="text-sm font-bold text-emerald-500 mb-4">
                CATEGORY: {clueData.category.toUpperCase()}
              </p>
              <blockquote className="text-lg mb-6">
                &quot;{clueData.clue}&quot;
              </blockquote>

              {/* The Big Reveal */}
              {revealed && (
                <div className="text-center p-4 bg-slate-800 rounded-lg">
                  <p className="text-xl font-bold">{clueData.region}</p>
                  <p className="text-lg text-slate-300">{clueData.country}</p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={() => setRevealed(true)}
            disabled={revealed || loading}
            className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded transition-colors"
          >
            Reveal Location
          </button>
          <button
            onClick={fetchClue}
            disabled={loading}
            className="flex-1 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded transition-colors"
          >
            Next Clue
          </button>
        </div>
      </div>
    </main>
  );
}
