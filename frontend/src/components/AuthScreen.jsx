import React from 'react';
import { Sparkles } from 'lucide-react';
import { INDIAN_STATES, OCCUPATIONS } from '../utils/constants.js';

export default function AuthScreen({ 
  page, setPage, t, langMode, authForm, setAuthForm, authError, 
  handleLogin, handleRegister, handleGuestLogin 
}) {
  if (page === 'login') {
    return (
      <div className="max-w-md mx-auto my-12 bg-stone-900 border border-stone-800 p-8 rounded-2xl shadow-2xl space-y-6 animate-fade-in no-print">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display">{t[langMode].loginTitle}</h2>
          <p className="text-xs text-stone-400 leading-relaxed">{t[langMode].loginDesc}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-300 block">Username / उपयोगकर्ता नाम</label>
            <input
              type="text"
              required
              placeholder="Enter username"
              value={authForm.username}
              onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-300 block">Password / पासवर्ड</label>
            <input
              type="password"
              required
              placeholder="Enter password"
              value={authForm.password}
              onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all"
          >
            {t[langMode].loginBtn}
          </button>

          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-3 bg-stone-900 border border-stone-800 text-amber-500 hover:bg-stone-850 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Try Demo Mode (One-Click Guest) / अतिथि लॉगिन</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <span className="text-xs text-stone-400">{t[langMode].needAccount} </span>
          <button 
            onClick={() => setPage('register')}
            className="text-xs text-amber-500 hover:underline font-bold"
          >
            Register here / पंजीकरण करें
          </button>
        </div>
      </div>
    );
  }

  if (page === 'register') {
    return (
      <div className="max-w-lg mx-auto bg-stone-900 border border-stone-800 p-8 rounded-2xl shadow-2xl space-y-6 animate-fade-in no-print">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white font-display">{t[langMode].registerTitle}</h2>
          <p className="text-xs text-stone-400 leading-relaxed">{t[langMode].registerDesc}</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Credentials */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-stone-300 block">Username / उपयोगकर्ता नाम</label>
              <input
                type="text"
                required
                placeholder="Enter desired username"
                value={authForm.username}
                onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-stone-300 block">Password / पासवर्ड</label>
              <input
                type="password"
                required
                placeholder="Enter secure password"
                value={authForm.password}
                onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Profile parameter collection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 block">Age / आयु (वर्ष)</label>
              <input
                type="number"
                required
                value={authForm.age}
                onChange={(e) => setAuthForm({...authForm, age: e.target.value})}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 block">State / राज्य</label>
              <select
                value={authForm.state}
                onChange={(e) => setAuthForm({...authForm, state: e.target.value})}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {INDIAN_STATES.map((st, idx) => (
                  <option key={idx} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 block">Occupation / व्यवसाय</label>
              <select
                value={authForm.occupation}
                onChange={(e) => setAuthForm({...authForm, occupation: e.target.value})}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {OCCUPATIONS.map((occ, idx) => (
                  <option key={idx} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 block">Gender / लिंग</label>
              <select
                value={authForm.gender}
                onChange={(e) => setAuthForm({...authForm, gender: e.target.value})}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Male">Male / पुरुष</option>
                <option value="Female">Female / महिला</option>
              </select>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-stone-300 block">Marital Status / वैवाहिक स्थिति</label>
              <select
                value={authForm.maritalStatus}
                onChange={(e) => setAuthForm({...authForm, maritalStatus: e.target.value})}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Single">Single / एकल</option>
                <option value="Married">Married / विवाहित</option>
                <option value="Widowed">Widowed / विधवा</option>
              </select>
            </div>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all"
          >
            {t[langMode].registerBtn}
          </button>
        </form>

        <div className="text-center pt-2">
          <span className="text-xs text-stone-400">{t[langMode].haveAccount} </span>
          <button 
            onClick={() => setPage('login')}
            className="text-xs text-amber-500 hover:underline font-bold"
          >
            Sign In here / लॉगिन करें
          </button>
        </div>
      </div>
    );
  }

  return null;
}
