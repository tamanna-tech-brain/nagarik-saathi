import React from 'react';
import { MessageSquare, RefreshCw, AlertTriangle, Mic, Award, Check } from 'lucide-react';

export default function ChatScreen({
  setPage, sessionType, t, langMode, operatorStats, chatHistory, currentUser,
  chatLoading, chatEndRef, handleSendMessage, chatMessage, setChatMessage,
  startVoiceInput, isListening, chatSources, setSelectedScheme, formatDate, getDomain
}) {
  return (
    <div className="grid lg:grid-cols-12 gap-8 animate-fade-in relative no-print">
      
      {/* Left Column: Chat Container */}
      <div className="lg:col-span-8 flex flex-col h-[70vh] bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Chat Window Title Bar */}
        <div className="bg-stone-950 border-b border-stone-850 px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-white">
              {sessionType === 'operator' ? 'Operator Assist Chat / ऑपरेटर सहायता चैट' : 'Citizen Discovery Chat / नागरिक योजना खोज चैट'}
            </span>
          </div>
          <button
            onClick={() => setPage('session-toggle')}
            className="text-xs text-stone-400 hover:text-white border border-stone-800 bg-stone-900 px-3 py-1.5 rounded-lg transition-colors font-semibold"
          >
            &larr; Switch Mode / मोड बदलें
          </button>
        </div>
        
        {/* Operator Live Counter Header Strip */}
        {sessionType === 'operator' && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex items-center justify-between text-xs font-semibold text-amber-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span>{t[langMode].operatorHeader}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{t[langMode].citizensHelped}: <strong className="text-white text-sm">{operatorStats.citizensHelped}</strong></span>
              <span>{t[langMode].avgSpeed}: <strong className="text-white text-sm">{operatorStats.avgResponseTimeMs}s</strong></span>
            </div>
          </div>
        )}

        {/* Chat Messages Log */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-stone-500">
              <MessageSquare className="w-12 h-12 text-stone-700 animate-bounce" />
              <div>
                <p className="font-bold text-white text-lg">NagarikSaathi Chat / नागरिक साथी चैट</p>
                <p className="text-sm text-stone-400 mt-1 max-w-sm">
                  Enter details about the citizen's job, state, age, or income in Hindi or English.
                </p>
                {currentUser && (
                  <p className="text-xs text-amber-500 mt-3 font-mono">
                    Auto-loaded profile: Resides in {currentUser.profile?.state}, working as {currentUser.profile?.occupation}.
                  </p>
                )}
              </div>
            </div>
          ) : (
            chatHistory.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-amber-600 text-white rounded-br-none' 
                    : 'bg-stone-950 text-stone-200 border border-stone-800 rounded-bl-none'
                }`}>
                  <div className="text-[10px] font-bold opacity-60 mb-1 tracking-wider uppercase">
                    {msg.role === 'user' ? 'User' : 'NagarikSaathi Assistant'}
                  </div>
                  
                  <div className="text-sm leading-relaxed whitespace-pre-line prose prose-invert">
                    {msg.content}
                  </div>

                  {msg.role === 'assistant' && msg.confidence === 'low' && (
                    <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2 text-amber-500 text-xs">
                      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>We're not fully certain / हम पूरी तरह से आश्वस्त नहीं हैं:</strong> Please confirm eligibility at your local CSC office or call helpline 14545.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          {chatLoading && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="w-[75%] p-4 rounded-2xl bg-stone-950 border border-stone-800 rounded-bl-none space-y-3">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                  <span className="text-xs text-stone-400">Searching schemes...</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-stone-800 rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-stone-800 rounded-full w-5/6 animate-pulse"></div>
                  <div className="h-3 bg-stone-800 rounded-full w-2/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input form */}
        <form onSubmit={handleSendMessage} className="p-4 bg-stone-950 border-t border-stone-850 flex gap-3 items-center">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder={t[langMode].chatPlaceholder}
            className="flex-grow bg-stone-900 border border-stone-800 focus:border-amber-500 focus:outline-none rounded-xl px-4 py-3.5 text-sm text-white placeholder-stone-500 transition-colors"
          />

          {/* Native Voice Input Button */}
          <div className="relative group">
            <button 
              type="button"
              onClick={startVoiceInput}
              className={`p-3.5 rounded-xl border transition-all ${
                isListening 
                  ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse shadow-lg shadow-red-500/10' 
                  : 'bg-stone-900 border-stone-800 text-amber-500 hover:bg-stone-850 hover:text-amber-400'
              }`}
              title={langMode === 'hi' ? 'आवाज़ द्वारा खोजें' : 'Search by Voice'}
              aria-label={langMode === 'hi' ? 'आवाज़ द्वारा खोजें' : 'Search by Voice'}
            >
              <Mic className="w-5 h-5" />
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded bg-stone-950 border border-stone-800 text-[10px] text-stone-400 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
              {langMode === 'hi' ? 'बोलकर खोजें (नया)' : 'Voice Input (New)'}
            </span>
          </div>

          <button
            type="submit"
            disabled={!chatMessage.trim() || chatLoading}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl px-6 py-3.5 text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>

      {/* Right Column: Recommendations Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="p-6 bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white tracking-wide uppercase border-b border-stone-800 pb-3">
            <Award className="w-4 h-4 text-amber-500" />
            {t[langMode].matchedTitle}
          </div>
          
          {chatSources.length === 0 ? (
            <p className="text-xs text-stone-500 leading-relaxed py-4 text-center">
              {t[langMode].noMatches}
            </p>
          ) : (
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {chatSources.map((scheme, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setSelectedScheme(scheme);
                    setPage('detail');
                  }}
                  className="p-4 bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-xl cursor-pointer hover:bg-stone-850/50 transition-all space-y-2 group"
                >
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                    {langMode === 'hi' ? scheme.nameHindi : scheme.name}
                  </h4>
                  
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>{t[langMode].verifiedBadge}: {formatDate(scheme.lastVerified)} · {t[langMode].sourceLabel}: {getDomain(scheme.sourceUrl)}</span>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2">
                    {langMode === 'hi' ? scheme.descriptionHindi : scheme.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono pt-1">
                    <span>{scheme.ministry}</span>
                    <span className="text-amber-500 font-bold group-hover:underline">{t[langMode].viewGuide} &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
