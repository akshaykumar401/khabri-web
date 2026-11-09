import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Switch = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('khabri-theme');
      if (stored) return stored === 'dark';
      return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('khabri-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('khabri-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="group flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 active:scale-98 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isDark ? 'bg-[#1D3557] text-[#527dff] group-hover:bg-[#1D3557]/80' : 'bg-[#F4A261]/20 text-[#F4A261] group-hover:bg-[#F4A261]/30'
        }`}>
          <FontAwesomeIcon icon={isDark ? faMoon : faSun} className="text-xs transition-transform duration-300 group-hover:rotate-45 group-hover:scale-115" />
        </div>
        <span className="text-sm">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      </div>

      <div className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
        isDark ? 'bg-[#2E5BFF]' : 'bg-slate-300'
      }`}>
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-300 ease-out ${
            isDark ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  );
};

export default Switch;
