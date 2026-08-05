import React from 'react';
import { Users, MessageSquare, FileCheck, Layers, UserCheck, Printer, Award, User, ArrowLeft } from 'lucide-react';

export default function LandingScreen({ page, setPage, t, langMode, initChatSession, handleSendMessage }) {
  if (page === 'landing') {
    return (
      <div className="space-y-12 animate-fade-in no-print">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold tracking-wide uppercase">
            <Users className="w-3.5 h-3.5" /> For CSC/VLE Operators & Rural Communities
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
            {t[langMode].heroTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 font-display">
              {t[langMode].heroSubTitle}
            </span>
          </h1>
          <p className="text-lg text-stone-400 font-medium leading-relaxed">
            {t[langMode].heroDesc}
          </p>

          {/* Two CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={() => setPage('session-toggle')}
              className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group text-base"
            >
              <MessageSquare className="w-5 h-5 group-hover:rotate-6 transition-transform" />
              {t[langMode].startChat}
            </button>
            
            <button 
              onClick={() => setPage('screener')}
              className="px-8 py-4 rounded-xl font-bold bg-stone-900 border border-stone-800 text-stone-200 hover:bg-stone-800 hover:text-white transition-all flex items-center justify-center gap-2 text-base"
            >
              <FileCheck className="w-5 h-5" />
              {t[langMode].checkEligibility}
            </button>
          </div>
        </div>

        {/* Quick-start Pills */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-center text-sm font-semibold tracking-wider text-stone-400 uppercase">
            Quick Category Search / त्वरित श्रेणियां
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { en: "Agriculture", hi: "कृषि", query: "Show me farming schemes like PM Kisan" },
              { en: "Women Welfare", hi: "महिला कल्याण", query: "Schemes for girls and women livelihood" },
              { en: "Pension & Security", hi: "पेंशन और सुरक्षा", query: "Old age pension and life insurance" },
              { en: "Health", hi: "स्वास्थ्य", query: "Free treatment and hospital coverage" },
              { en: "Education & Skills", hi: "शिक्षा और कौशल", query: "Scholarships for students" }
            ].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  initChatSession('self');
                  setTimeout(() => {
                    handleSendMessage(null, cat.query);
                  }, 100);
                }}
                className="px-5 py-2.5 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-800 text-stone-300 hover:text-white transition-all text-sm flex items-center gap-2"
              >
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                <span>{langMode === 'hi' ? cat.hi : cat.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
          {[
            {
              icon: <UserCheck className="w-6 h-6 text-amber-500" />,
              title: "Operator-First Workflow",
              desc: "Optimized interface for CSC operators to handle high citizen traffic, tracking match speeds and counts."
            },
            {
              icon: <Printer className="w-6 h-6 text-orange-500" />,
              title: "Printable Scheme Sheets",
              desc: "Generate clean physical handouts with clear document checklists for Meena Devi to take home."
            },
            {
              icon: <Award className="w-6 h-6 text-amber-600" />,
              title: "Verified Metadata",
              desc: "Every recommendation shows an official verification date badge linked directly to official portals."
            }
          ].map((card, idx) => (
            <div key={idx} className="p-6 bg-stone-900/60 border border-stone-950 hover:border-stone-800/80 rounded-2xl space-y-3 transition-all hover:translate-y-[-2px]">
              <div className="w-12 h-12 rounded-xl bg-stone-950 flex items-center justify-center border border-stone-800">
                {card.icon}
              </div>
              <h4 className="text-lg font-bold text-white">{card.title}</h4>
              <p className="text-sm text-stone-400 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (page === 'session-toggle') {
    return (
      <div className="max-w-3xl mx-auto space-y-8 py-12 animate-fade-in no-print">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white font-display">Choose Session Mode / सत्र मोड चुनें</h2>
          <p className="text-stone-400">Select who is operating NagarikSaathi to customize the dashboard view.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-4">
          {/* Option A: Operator Mode */}
          <div 
            onClick={() => initChatSession('operator')}
            className="p-8 bg-stone-900 border-2 border-stone-850 hover:border-amber-500/50 rounded-2xl cursor-pointer hover:bg-stone-850/80 transition-all flex flex-col items-center text-center space-y-4 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 group-hover:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center transition-colors">
              <Users className="w-8 h-8 text-amber-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">CSC / VLE Operator Mode</h3>
              <p className="text-xs text-amber-500 font-mono tracking-widest uppercase">RECOMMENDED FOR DEMO</p>
              <p className="text-sm text-stone-400 leading-relaxed">
                I am helping a citizen (e.g., Meena Devi) find schemes. Shows operator live stats strip, quick printable summary outputs, and session metrics.
              </p>
            </div>
          </div>

          {/* Option B: Self-service Mode */}
          <div 
            onClick={() => initChatSession('self')}
            className="p-8 bg-stone-900 border-2 border-stone-850 hover:border-stone-700 rounded-2xl cursor-pointer hover:bg-stone-850/80 transition-all flex flex-col items-center text-center space-y-4 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center">
              <User className="w-8 h-8 text-stone-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Citizen Mode (Self)</h3>
              <p className="text-xs text-stone-500 font-mono tracking-widest uppercase">INDIVIDUAL SEARCH</p>
              <p className="text-sm text-stone-400 leading-relaxed">
                I am asking for myself. A clean, minimal search view for standard citizens to look up criteria directly.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => setPage('landing')}
            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home / पीछे जाएं
          </button>
        </div>
      </div>
    );
  }

  return null;
}
