import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";

const Error = ({ text, setIsErrorOpen }) => {
  const disappearAlert = () => {
    setIsErrorOpen(false);
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md animate-slide-down">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-[#E76F51]/30 shadow-xl shadow-[#E76F51]/10 text-slate-800 dark:text-slate-100">
        <div className="w-10 h-10 rounded-xl bg-[#E76F51]/10 dark:bg-[#E76F51]/20 text-[#E76F51] flex items-center justify-center shrink-0">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-lg" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-[#E76F51]">Error</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 truncate mt-0.5">{text}</p>
        </div>
        <button
          onClick={disappearAlert}
          className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Error;
