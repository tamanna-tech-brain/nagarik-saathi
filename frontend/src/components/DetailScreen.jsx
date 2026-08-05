import React from 'react';
import { ArrowLeft, Volume2, Printer, AlertTriangle, CreditCard, CheckSquare, Phone, ExternalLink } from 'lucide-react';

export default function DetailScreen({ 
  selectedScheme, chatSources, setPage, handleSpeechOutput, langMode, t, 
  citizenName, setCitizenName, isSchemeStale, formatDate, handleReportScheme 
}) {
  return (
    <div className="space-y-8 animate-fade-in relative">
      
      {/* Nav back row (Hidden in Print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
        <button 
          onClick={() => {
            if (chatSources.some(s => s.schemeId === selectedScheme.schemeId)) {
              setPage('chat');
            } else {
              setPage('results');
            }
          }}
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t[langMode].backToList}
        </button>

        <div className="flex gap-2">
          {/* Voice Readout Button */}
          <button
            onClick={() => handleSpeechOutput(langMode === 'hi' ? selectedScheme.descriptionHindi : selectedScheme.description)}
            className="bg-stone-900 border border-stone-800 hover:bg-stone-800 text-amber-500 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            aria-label={t[langMode].speakBtn}
          >
            <Volume2 className="w-4 h-4" />
            <span>{t[langMode].speakBtn}</span>
          </button>

          <button 
            onClick={() => window.print()}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
            aria-label={t[langMode].printBtn}
          >
            <Printer className="w-4 h-4" /> {t[langMode].printBtn}
          </button>
        </div>
      </div>

      {/* Print Customizer Card (Hidden in Print) */}
      <div className="no-print p-4 bg-stone-900 border border-stone-800 rounded-xl space-y-2">
        <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">{t[langMode].printNotice}</label>
        <input
          type="text"
          placeholder={t[langMode].printNamePlaceholder}
          value={citizenName}
          onChange={(e) => setCitizenName(e.target.value)}
          className="w-full md:w-1/2 bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Printable Container */}
      <div className="bg-stone-900 border border-stone-850 rounded-2xl p-8 space-y-6 print-container print-card text-stone-200">
        
        {isSchemeStale(selectedScheme) && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-amber-500 text-sm no-print animate-pulse">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="block text-amber-400 font-bold uppercase tracking-wider text-xs">⚠️ Data Staleness Warning / डेटा सत्यापन चेतावनी</strong>
              This scheme data has not been modified or verified for more than 90 days. Please cross-verify rules on the official VLE portal before confirming with the citizen.
            </div>
          </div>
        )}
        
        <div className="border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">NagarikSaathi Application Guide</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{langMode === 'hi' ? selectedScheme.nameHindi : selectedScheme.name}</h1>
            <p className="text-xs text-stone-400">{selectedScheme.ministry}</p>
          </div>
          <div className="text-right">
            <span className="print-badge inline-block px-3 py-1 text-xs rounded bg-stone-950 border border-stone-800 font-mono text-stone-400">
              Verified: {formatDate(selectedScheme.lastVerified)}
            </span>
            {citizenName && (
              <div className="mt-2 text-sm text-white font-medium">
                Citizen Handout for: <strong className="text-amber-500 underline">{citizenName}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Grid content */}
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            {/* Summary */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-1.5">Scheme Details / योजना विवरण</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                {langMode === 'hi' ? selectedScheme.descriptionHindi : selectedScheme.description}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-1.5 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-500" />
                Benefits Provided / योजना के लाभ
              </h3>
              <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl">
                <p className="text-sm text-white font-medium">
                  {langMode === 'hi' ? selectedScheme.benefitsHindi : selectedScheme.benefits}
                </p>
              </div>
            </div>

            {/* Eligibility parameters */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-1.5">Eligibility Rules / पात्रता शर्तें</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-850">
                  <span className="text-stone-500 block mb-1">Occupation</span>
                  <span className="text-white text-sm">{selectedScheme.eligibility.occupation.join(', ')}</span>
                </div>
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-850">
                  <span className="text-stone-500 block mb-1">States</span>
                  <span className="text-white text-sm">{selectedScheme.eligibility.states.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Column */}
          <div className="space-y-6">
            <div className="p-6 bg-stone-950 border border-stone-800 rounded-xl space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-2 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-green-500" />
                {t[langMode].documentsTitle}
              </h3>
              <p className="text-[10px] text-stone-500">{t[langMode].documentsDesc}</p>
              
              <ul className="space-y-3">
                {selectedScheme.documents.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs text-stone-300">
                    <div className="w-4.5 h-4.5 rounded border border-stone-700 bg-stone-900 flex items-center justify-center font-bold text-sm mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 text-xs">
              {/* Dynamic QR Code for Handouts */}
              <div className="p-4 bg-stone-950/60 border border-stone-800 rounded-xl flex flex-col items-center gap-2 text-center">
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest font-mono">Scan to Apply / स्कैन करें</span>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=95x95&data=${encodeURIComponent(selectedScheme.applicationUrl || 'https://www.india.gov.in')}&color=f59e0b&bgcolor=1c1917`}
                  alt="Scheme QR Link"
                  className="w-24 h-24 rounded border border-amber-500/20 shadow-md p-1 bg-stone-900"
                />
                <span className="text-[9px] text-stone-400 font-mono">Scan code to open portal</span>
              </div>

              <div className="p-4 bg-stone-950/40 border border-stone-850 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-stone-300 font-semibold">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>Helpline: {selectedScheme.helplineNumber || '14545'}</span>
                </div>
              </div>

              <a 
                href={selectedScheme.applicationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="no-print w-full py-3 rounded-xl bg-stone-950 hover:bg-stone-850 border border-stone-800 text-stone-300 hover:text-white transition-colors flex items-center justify-center gap-2 font-bold"
              >
                <ExternalLink className="w-4 h-4" />
                Official Portal Link &rarr;
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-stone-800 pt-6 text-center text-[10px] text-stone-500 leading-relaxed font-mono">
          Printed via NagarikSaathi Assistant. Verified: {formatDate(selectedScheme.lastVerified)} from {selectedScheme.sourceUrl}.
        </div>

      </div>

      {/* Report Incorrect Info Button (Hidden in Print) */}
      <div className="no-print pt-4 flex justify-end">
        <button 
          onClick={() => handleReportScheme(selectedScheme.schemeId)}
          className="text-xs text-stone-500 hover:text-red-400 font-medium hover:underline flex items-center gap-1.5 transition-colors"
          title="Flag outdated or incorrect information"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Information outdated? Flag for database update / जानकारी पुरानी है? रिपोर्ट करें</span>
        </button>
      </div>

    </div>
  );
}
