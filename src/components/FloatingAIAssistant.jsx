import React from 'react';
import { Sparkles, Bot, MessageSquare } from 'lucide-react';

export default function FloatingAIAssistant({ onOpenAI }) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onOpenAI}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-slate-900 via-slate-950 to-teal-950 text-white font-bold text-xs shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-teal-500/50 hover:border-teal-400"
        title="Open SmartCare AI Chatbot"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 flex items-center justify-center shadow-md font-black">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-left pr-1">
          <span className="block text-[11px] font-extrabold text-white leading-tight">SmartCare AI</span>
          <span className="block text-[9px] text-teal-300 font-medium">Assistant & Triage</span>
        </div>
      </button>
    </div>
  );
}
