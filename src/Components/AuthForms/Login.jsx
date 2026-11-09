import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Features/User/user.slice.js";
import { viewAllPost } from "../../Features/Post/post.slice.js";
import brandLogo from "../../assets/brand-logo.png";

const Login = ({ setActiveState, setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email && password) {
      setLoading(true);
      const userInfo = { email, password };
      dispatch(loginUser(userInfo)).then((action) => {
        setLoading(false);
        if (action.type === "loginUser/fulfilled") {
          setIsLoggedIn(false);
          dispatch(viewAllPost());
        } else {
          setIsLoggedIn(true);
        }
      });
    }
  };

  return (
    <div className="w-full animate-fade-in">
      {/* Mobile Branding Header */}
      <div className="md:hidden flex items-center gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <img
          src={brandLogo}
          alt="Khabri Logo"
          className="w-10 h-10 rounded-xl object-contain bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 shadow-sm"
        />
        <div>
          <h2 className="text-base font-extrabold font-brand tracking-tight text-[#1D3557] dark:text-white">
            KHABRI
          </h2>
          <p className="text-[10px] uppercase font-bold tracking-wider text-[#2E5BFF]">
            Your News. Amplified.
          </p>
        </div>
      </div>

      {/* Headline */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold font-brand tracking-tight text-slate-900 dark:text-white">
          Welcome back
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Sign in to amplify your perspective and join the discussion.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSignIn}>
        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2E5BFF] transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="you@domain.com"
              required
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] dark:focus:border-[#2E5BFF] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <button
              type="button"
              onClick={() => setActiveState(2)}
              className="text-xs font-semibold text-[#2E5BFF] dark:text-[#527dff] hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2E5BFF] transition-colors">
              <FontAwesomeIcon icon={faLock} className="text-xs" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
              className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] dark:focus:border-[#2E5BFF] transition-all shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              title={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-xs" />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#1D3557] to-[#2E5BFF] hover:from-[#162a45] hover:to-[#2248db] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-[#2E5BFF]/25 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In to Khabri</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </>
          )}
        </button>
      </form>

      {/* Switch Tab Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Don't have an account yet?{" "}
          <button
            type="button"
            onClick={() => setActiveState(1)}
            className="font-bold text-[#2E5BFF] dark:text-[#527dff] hover:underline cursor-pointer"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
