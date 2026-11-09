import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const DeletePostSuccessFullAlert = ({ setPostDeletedAlert }) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 shadow-xl shadow-emerald-500/10 text-slate-800 dark:text-slate-100">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center shrink-0">
          <FontAwesomeIcon icon={faCircleCheck} className="text-lg" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Post Deleted</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">The post has been permanently removed.</p>
        </div>
        <button
          onClick={() => setPostDeletedAlert(false)}
          className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default DeletePostSuccessFullAlert;
