import React from 'react';
import { INDIAN_STATES, OCCUPATIONS } from '../utils/constants.js';

export default function EligibilityScreener({ profile, setProfile, handleRunScreener, setPage, screenerLoading, t, langMode }) {
  return (
    <div className="max-w-2xl mx-auto bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-8 animate-fade-in no-print">
      <div className="space-y-2 border-b border-stone-800 pb-6 mb-6">
        <h2 className="text-3xl font-extrabold text-white font-display">{t[langMode].eligibilityTitle}</h2>
        <p className="text-sm text-stone-400">{t[langMode].eligibilityDesc}</p>
      </div>

      <form onSubmit={handleRunScreener} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].stateLabel}</label>
            <select
              value={profile.state}
              onChange={(e) => setProfile({...profile, state: e.target.value})}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-500"
            >
              {INDIAN_STATES.map((st, idx) => (
                <option key={idx} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].occLabel}</label>
            <div className="grid grid-cols-2 gap-2">
              {OCCUPATIONS.map((occ, idx) => (
                <label 
                  key={idx} 
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer ${
                    profile.occupation === occ 
                      ? 'bg-amber-600/10 border-amber-500 text-white' 
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-750'
                  }`}
                >
                  <input
                    type="radio"
                    name="occupation"
                    value={occ}
                    checked={profile.occupation === occ}
                    onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                    className="sr-only"
                  />
                  {occ}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].genderLabel}</label>
            <div className="flex gap-3">
              {['Male', 'Female'].map((gen, idx) => (
                <label 
                  key={idx} 
                  className={`flex-grow text-center py-2.5 rounded-lg border text-xs cursor-pointer ${
                    profile.gender === gen 
                      ? 'bg-amber-600/10 border-amber-500 text-white' 
                      : 'bg-stone-950 border-stone-800 text-stone-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gen}
                    checked={profile.gender === gen}
                    onChange={(e) => setProfile({...profile, gender: e.target.value})}
                    className="sr-only"
                  />
                  {gen === 'Male' ? 'Male / पुरुष' : 'Female / महिला'}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].maritalLabel}</label>
            <div className="flex gap-2">
              {['Single', 'Married', 'Widowed'].map((mar, idx) => (
                <label 
                  key={idx} 
                  className={`flex-grow text-center py-2.5 rounded-lg border text-xs cursor-pointer ${
                    profile.maritalStatus === mar 
                      ? 'bg-amber-600/10 border-amber-500 text-white' 
                      : 'bg-stone-950 border-stone-800 text-stone-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={mar}
                    checked={profile.maritalStatus === mar}
                    onChange={(e) => setProfile({...profile, maritalStatus: e.target.value})}
                    className="sr-only"
                  />
                  {mar}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex justify-between text-xs font-bold text-stone-300 uppercase tracking-wider">
              <span>{t[langMode].landLabel}</span>
              <span className="text-amber-500 font-mono text-sm">{profile.landAcres} Acres</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={profile.landAcres}
              onChange={(e) => setProfile({...profile, landAcres: Number(e.target.value)})}
              className="w-full h-1.5 bg-stone-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].incomeLabel}</label>
            <input
              type="number"
              value={profile.annualIncome}
              onChange={(e) => setProfile({...profile, annualIncome: Number(e.target.value)})}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="button"
            onClick={() => setPage('landing')}
            className="w-1/3 bg-stone-950 border border-stone-800 text-stone-400 hover:text-white py-3.5 rounded-xl font-bold text-sm transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={screenerLoading}
            className="w-2/3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg transition-all active:scale-[0.98]"
          >
            {screenerLoading ? 'Filtering...' : t[langMode].findSchemes}
          </button>
        </div>
      </form>
    </div>
  );
}
