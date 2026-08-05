import React from 'react';
import { Printer, Users, Check, RefreshCw, Award } from 'lucide-react';

export default function DashboardScreen({ setPage, operatorStats }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in no-print">
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white font-display">VLE Impact Dashboard / प्रदर्शन डैशबोर्ड</h2>
          <p className="text-sm text-stone-400">Track your performance and print official reports for district coordination.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Print Impact Report
        </button>
      </div>

      {/* Operator Stat Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Citizens Helped", value: operatorStats.citizensHelped || 14, icon: <Users className="text-amber-500 w-5 h-5" /> },
          { label: "Match Success Rate", value: "96.4%", icon: <Check className="text-green-500 w-5 h-5" /> },
          { label: "Avg. Resolution Time", value: `${operatorStats.avgResponseTimeMs || 4.2}s`, icon: <RefreshCw className="text-blue-500 w-5 h-5" /> },
          { label: "District Rank", value: "#12", icon: <Award className="text-orange-500 w-5 h-5" /> }
        ].map((stat, idx) => (
          <div key={idx} className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-stone-500 font-semibold uppercase">{stat.label}</span>
              {stat.icon}
            </div>
            <p className="text-2xl font-extrabold text-white font-mono">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Detailed Analytics Rows */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white">Recent Activity Log / हालिया गतिविधि</h3>
          <div className="space-y-3">
            {operatorStats.recentActivity && operatorStats.recentActivity.map((act, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-stone-950 rounded-xl border border-stone-900 text-xs">
                <div>
                  <p className="font-bold text-white">{act.citizen} ({act.state})</p>
                  <p className="text-stone-500 mt-0.5">{act.scheme}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/10 block mb-1">{act.status}</span>
                  <span className="text-stone-650 font-mono text-[10px] block">{act.time}</span>
                </div>
              </div>
            ))}
            {(!operatorStats.recentActivity || operatorStats.recentActivity.length === 0) && (
              <div className="text-stone-500 text-sm py-4">No recent activity found.</div>
            )}
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white">Categories Matched</h3>
          <div className="space-y-3 text-xs">
            {operatorStats.categoriesMatched && operatorStats.categoriesMatched.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-stone-300 font-semibold">
                  <span>{item.cat}</span>
                  <span className="font-mono text-amber-500">{item.percent}</span>
                </div>
                <div className="w-full h-1.5 bg-stone-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: item.percent }} />
                </div>
              </div>
            ))}
            {(!operatorStats.categoriesMatched || operatorStats.categoriesMatched.length === 0) && (
              <div className="text-stone-500 text-sm py-4">Not enough data.</div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => setPage('landing')}
          className="bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-400 hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
        >
          &larr; Back to Portal Home / वापस जाएं
        </button>
      </div>
    </div>
  );
}
