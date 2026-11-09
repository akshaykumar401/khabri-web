import React from 'react';
import { Link } from 'react-router-dom';

const Comments = ({ username, comment }) => {
  const initial = username ? username.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 mb-2.5 transition-colors">
      <Link
        to={username ? `/profile/${username}` : "#"}
        className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1D3557] to-[#2E5BFF] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm hover:opacity-90 transition-opacity"
      >
        {initial}
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Link
            to={username ? `/profile/${username}` : "#"}
            className="text-xs font-bold text-slate-900 dark:text-white truncate hover:text-[#2E5BFF] dark:hover:text-[#527dff] transition-colors"
          >
            @{username || "anonymous"}
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed break-words">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default Comments;
