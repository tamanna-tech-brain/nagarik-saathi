import React from 'react';
import { ShieldAlert, Check } from 'lucide-react';

export default function ResultsScreen({ screenerResults, screenerLoading, profile, setPage, setSelectedScheme, getMatchScore, formatDate, t, langMode }) {
  return (
    <div className="space-y-6 animate-fade-in no-print">
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div>
          <button 
            onClick={() => setPage('screener')} 
            className="text-xs text-amber-500 font-bold uppercase tracking-wider hover:underline flex items-center gap-1 mb-1"
          >
            &larr; Filter / फ़िल्टर बदलें
          </button>
          <h2 className="text-3xl font-extrabold text-white font-display">Eligible Schemes ({screenerResults.length})</h2>
        </div>
        <div className="text-xs text-stone-400 font-mono bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-800">
          {profile.state} · {profile.occupation} · Income: ≤₹{profile.annualIncome}
        </div>
      </div>

      {screenerLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-20 h-4 bg-stone-800 rounded-full animate-pulse"></div>
                <div className="space-y-2 flex flex-col items-end">
                  <div className="w-16 h-3 bg-stone-800 rounded-full animate-pulse"></div>
                  <div className="w-12 h-3 bg-stone-800 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-5 bg-stone-800 rounded-full w-full animate-pulse"></div>
                <div className="h-5 bg-stone-800 rounded-full w-2/3 animate-pulse"></div>
              </div>
              <div className="w-32 h-4 bg-stone-800 rounded-full animate-pulse mt-4"></div>
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-stone-800 rounded-full w-full animate-pulse"></div>
                <div className="h-3 bg-stone-800 rounded-full w-5/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : screenerResults.length === 0 ? (
        <div className="text-center py-16 bg-stone-900 border border-stone-800 rounded-2xl space-y-3">
          <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Schemes Matched</h3>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenerResults.map((scheme, idx) => (
            <div 
              key={idx}
              className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all flex flex-col hover:translate-y-[-2px] shadow-lg"
            >
              <div className="p-6 flex-grow space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-950 border border-stone-800 text-stone-400 text-[10px] font-mono">
                    {scheme.category[0]}
                  </span>
                  
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] font-bold font-mono border border-amber-500/10">
                      {scheme.eligibility.states.includes('All') ? 'Central' : `${scheme.eligibility.states[0]} State`}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-450 text-[9px] font-extrabold font-mono border border-orange-500/20">
                      {getMatchScore(scheme, profile)}% Match
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-extrabold text-white leading-snug line-clamp-2">
                  {langMode === 'hi' ? scheme.nameHindi : scheme.name}
                </h3>

                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-medium">
                  <Check className="w-3 h-3" />
                  <span>{t[langMode].verifiedBadge}: {formatDate(scheme.lastVerified)}</span>
                </div>

                <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                  {langMode === 'hi' ? scheme.descriptionHindi : scheme.description}
                </p>
              </div>

              <div className="bg-stone-950/80 px-6 py-4 border-t border-stone-850 flex items-center justify-between">
                <span className="text-[10px] text-stone-500 truncate max-w-[150px]">{scheme.ministry}</span>
                <button 
                  onClick={() => {
                    setSelectedScheme(scheme);
                    setPage('detail');
                  }}
                  className="text-xs text-amber-500 hover:text-amber-400 font-bold hover:underline"
                >
                  {t[langMode].viewGuide} &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
