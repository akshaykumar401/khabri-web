import React from 'react';
import brandLogo from '../../assets/brand-logo.png';

const Loading2 = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-[#0b0f17]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-[#2E5BFF]/10">
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-2 shadow-xl shadow-[#2E5BFF]/20 animate-pulse">
            <img src={brandLogo} alt="Khabri Logo" className="w-full h-full object-contain" />
          </div>
          <div className="absolute -inset-2 rounded-3xl border-2 border-[#2E5BFF]/30 border-t-[#2E5BFF] animate-spin" />
        </div>
        <div className="text-center">
          <h3 className="text-sm font-bold font-brand tracking-tight text-slate-900 dark:text-white">
            Khabri
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Your News. Social Media.</p>
        </div>
      </div>
    </div>
  );
};

export default Loading2;
