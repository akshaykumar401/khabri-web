import React, { useState } from 'react';
import { Login, SignUp, ForgetPassword } from "../Components.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBolt,
  faMicrophone,
  faShieldHalved,
  faArrowLeft,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import brandLogo from "../../assets/brand-logo.png";

const AuthenticateForm = ({ setIsLoggedIn }) => {
  const [activeState, setActiveState] = useState(0); // 0: Login, 1: SignUp, 2: ForgetPassword

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-950/50 overflow-hidden my-auto grid grid-cols-1 md:grid-cols-12 animate-scale-in">
        
        {/* Left Side: Brand Experience & Atmosphere (Desktop Only) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-[#1D3557] via-[#132238] to-[#111827] text-white p-8 flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#2E5BFF]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#F4A261]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <img
                  src={brandLogo}
                  alt="Khabri Logo"
                  className="w-12 h-12 rounded-2xl object-contain bg-white dark:bg-slate-900 border border-white/20 p-1 shadow-lg shadow-black/20"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#132238]" />
              </div>
              <div>
                <span className="text-xl font-extrabold font-brand tracking-tight text-white block">
                  KHABRI
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4A261]">
                  Your News. Amplified.
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-bold font-brand tracking-tight leading-snug text-white/95 mt-4">
              Where independent stories find their voice.
            </h3>
            <p className="text-xs text-slate-300/80 leading-relaxed mt-2">
              Join thousands of citizen journalists, reporters, and readers amplifying verified public updates.
            </p>
          </div>

          {/* Platform Feature Highlights */}
          <div className="relative z-10 space-y-3.5 my-8">
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-[#2E5BFF]/25 text-[#527dff] flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faBolt} className="text-xs" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Live News Velocity</h4>
                <p className="text-[11px] text-slate-300/70">Real-time alerts & instant feed</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-[#F4A261]/25 text-[#F4A261] flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faMicrophone} className="text-xs" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Amplified Media</h4>
                <p className="text-[11px] text-slate-300/70">Tiptap rich stories & podcasts</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-[#E76F51]/25 text-[#E76F51] flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faShieldHalved} className="text-xs" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Authentic Discourse</h4>
                <p className="text-[11px] text-slate-300/70">Community first moderation</p>
              </div>
            </div>
          </div>

          {/* Community Pill Footer */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300/70">
            <div className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faUsers} className="text-xs text-[#F4A261]" />
              <span>Public Community Edition</span>
            </div>
            <span className="font-semibold text-white/90">v1.1</span>
          </div>
        </div>

        {/* Right Side: Interactive Authentication Form Panel */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between relative bg-white dark:bg-[#111827]">
          {/* Top Switcher & Dismiss Bar */}
          <div className="flex items-center justify-between gap-3 mb-6">
            {activeState === 2 ? (
              <button
                onClick={() => setActiveState(0)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#2E5BFF] dark:text-[#527dff] hover:underline cursor-pointer active:scale-95 transition-all"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Back to Sign In</span>
              </button>
            ) : (
              <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl w-full max-w-xs border border-slate-200/50 dark:border-slate-700/50">
                <button
                  type="button"
                  className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                    activeState === 0
                      ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm scale-[1.01]'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  onClick={() => setActiveState(0)}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                    activeState === 1
                      ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm scale-[1.01]'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  onClick={() => setActiveState(1)}
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Optional Dismiss button if browsing */}
            {setIsLoggedIn && (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center hover:rotate-90 active:scale-90 transition-all duration-200 cursor-pointer shrink-0 ml-auto"
                aria-label="Dismiss auth dialog"
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </button>
            )}
          </div>

          {/* Dynamic Form Content */}
          <div className="flex-1 flex flex-col justify-center">
            {activeState === 0 && (
              <Login setActiveState={setActiveState} setIsLoggedIn={setIsLoggedIn} />
            )}
            {activeState === 1 && (
              <SignUp setActiveState={setActiveState} setIsLoggedIn={setIsLoggedIn} />
            )}
            {activeState === 2 && (
              <ForgetPassword setActiveState={setActiveState} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticateForm;
