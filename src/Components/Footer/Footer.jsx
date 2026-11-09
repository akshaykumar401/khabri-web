import React, { useState } from 'react';
import { Link } from "react-router-dom";
import brandLogo from "../../assets/brand-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faPaperPlane,
  faHeart,
  faCheck,
  faEnvelope,
  faNewspaper,
  faBolt,
  faMicrophone,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full mt-auto relative overflow-hidden bg-white dark:bg-[#0e1726] border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Brand Accent Top Line */}
      <div className="w-full h-1 bg-gradient-to-r from-[#1D3557] via-[#2E5BFF] via-[#F4A261] to-[#E76F51]" />

      {/* Main Footer Container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Feature Highlights Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-10 border-b border-slate-200/70 dark:border-slate-800/80">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="w-9 h-9 rounded-xl bg-[#2E5BFF]/10 text-[#2E5BFF] flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faMicrophone} className="text-sm" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Social Reach</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Broadcast your voice</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="w-9 h-9 rounded-xl bg-[#F4A261]/15 text-[#F4A261] flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faBolt} className="text-sm" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Live Updates</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Real-time breaking feed</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="w-9 h-9 rounded-xl bg-[#E76F51]/15 text-[#E76F51] flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faNewspaper} className="text-sm" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Tiptap Editor</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Rich media publishing</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="w-9 h-9 rounded-xl bg-[#1D3557]/20 text-[#1D3557] dark:text-[#527dff] flex items-center justify-center shrink-0">
              <FontAwesomeIcon icon={faShieldHalved} className="text-sm" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Community First</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Authentic discourse</p>
            </div>
          </div>
        </div>

        {/* 4 Columns Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-10">
          {/* Brand Info & Mission (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={brandLogo}
                alt="Khabri Brand Logo"
                className="w-10 h-10 rounded-xl object-contain bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-1 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold font-brand tracking-tight text-lg text-[#1D3557] dark:text-white">
                    KHABRI
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2E5BFF]/10 text-[#2E5BFF] dark:bg-[#2E5BFF]/20 dark:text-[#527dff]">
                    v1.1
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-[#2E5BFF] dark:text-[#527dff] tracking-wider uppercase">
                  Your News. Social Media.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              An open, citizen-driven media & news amplification platform built to empower independent voices, verify public reports, and encourage thoughtful community discussion.
            </p>

            {/* Creator Badge & Live Status */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-medium">All Systems Operational</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-[11px] text-slate-600 dark:text-slate-400">
                <span>By</span>
                <Link
                  to="https://www.linkedin.com/in/akshay-kumar-2512b529a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 dark:text-white hover:text-[#2E5BFF] dark:hover:text-[#527dff] transition-colors"
                >
                  Akshay Kumar
                </Link>
              </div>
            </div>
          </div>

          {/* Platform Navigation (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Platform
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:text-[#2E5BFF] dark:hover:text-[#527dff] transition-colors"
                >
                  Explore Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/followed"
                  onClick={scrollToTop}
                  className="hover:text-[#2E5BFF] dark:hover:text-[#527dff] transition-colors"
                >
                  Followed Creators
                </Link>
              </li>
              <li>
                <Link
                  to="/upload-post"
                  onClick={scrollToTop}
                  className="hover:text-[#2E5BFF] dark:hover:text-[#527dff] transition-colors"
                >
                  Publish a Story
                </Link>
              </li>
              <li>
                <Link
                  to="/user"
                  onClick={scrollToTop}
                  className="hover:text-[#2E5BFF] dark:hover:text-[#527dff] transition-colors"
                >
                  Your Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack & Architecture (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Technology
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#2E5BFF]" />
                <span>React 19 & Vite</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#F4A261]" />
                <span>Tailwind CSS v4</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#E76F51]" />
                <span>Tiptap Editor</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#1D3557]" />
                <span>Redux Toolkit</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                <span>REST Microservices</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Khabri Briefing
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Subscribe to receive weekly trending dispatches and major platform announcements.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-scale-in">
                <FontAwesomeIcon icon={faCheck} className="text-sm" />
                <span>Subscribed! Welcome to the briefing.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] active:scale-95 text-white text-xs font-semibold shadow-sm shadow-[#2E5BFF]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <FontAwesomeIcon icon={faPaperPlane} className="text-[10px]" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-slate-400">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Back to Top */}
        <div className="pt-6 mt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© 2026 Khabri. Crafted with</span>
            <FontAwesomeIcon icon={faHeart} className="text-[#E76F51] text-xs inline" />
            <span>by</span>
            <Link
              to="https://www.linkedin.com/in/akshay-kumar-2512b529a"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-800 dark:text-slate-200 hover:text-[#2E5BFF] dark:hover:text-[#527dff] transition-colors"
            >
              Akshay Kumar
            </Link>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex flex-wrap items-center gap-2">
            {/* GitHub */}
            <Link
              to="https://github.com/akshaykumar401"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#2E5BFF] dark:hover:text-[#527dff] hover:border-[#2E5BFF]/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
            >
              GitHub
            </Link>

            {/* LinkedIn */}
            <Link
              to="https://www.linkedin.com/in/akshay-kumar-2512b529a"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#2E5BFF] dark:hover:text-[#527dff] hover:border-[#2E5BFF]/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
            >
              LinkedIn
            </Link>

            {/* Instagram */}
            <Link
              to="https://www.instagram.com/_akshu_at__"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
            >
              Instagram
            </Link>

            {/* Snapchat */}
            <Link
              to="https://www.snapchat.com/@akshay263005"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-500 hover:border-amber-400/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
            >
              Snapchat
            </Link>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs cursor-pointer ml-1"
              title="Back to Top"
            >
              <FontAwesomeIcon icon={faArrowUp} className="text-[10px]" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
