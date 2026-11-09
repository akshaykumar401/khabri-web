import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faKey,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ERROR, SUCCESSFUL } from '../Components.js';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../Features/User/user.slice.js';

const ForgetPassword = ({ setActiveState }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const formElement = e.target;

    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill all the fields");
      setIsErrorOpen(true);
      setTimeout(() => setIsErrorOpen(false), 3000);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsErrorOpen(true);
      setTimeout(() => setIsErrorOpen(false), 3000);
      return;
    }

    setLoading(true);
    const data = {
      email,
      username,
      newPassword: password,
    };

    dispatch(changePassword(data)).then((action) => {
      setLoading(false);
      const isSuccess =
        action.type === 'changePassword/fulfilled' ||
        (typeof action.payload === 'string' && /success/i.test(action.payload));

      if (isSuccess) {
        setSuccess("Password reset successfully! Redirecting to sign in...");
        setIsSuccessOpen(true);
        formElement.reset();
        setTimeout(() => {
          setIsSuccessOpen(false);
          if (setActiveState) setActiveState(0);
        }, 1500);
      } else {
        setError(action.payload || "Failed to reset password");
        setIsErrorOpen(true);
      }
    });
  };

  return (
    <div className="w-full animate-fade-in">
      {isErrorOpen && <ERROR text={error} setIsErrorOpen={setIsErrorOpen} />}
      {isSuccessOpen && <SUCCESSFUL text={success} setIsSuccessOpen={setIsSuccessOpen} />}

      {/* Header */}
      <div className="mb-5">
        <div className="w-10 h-10 rounded-2xl bg-[#2E5BFF]/10 text-[#2E5BFF] dark:text-[#527dff] flex items-center justify-center mb-3">
          <FontAwesomeIcon icon={faKey} className="text-base" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-brand tracking-tight text-slate-900 dark:text-white">
          Reset password
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Verify your account email and username to choose a new password.
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleForgetPassword}>
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Account Email
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2E5BFF] transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="you@domain.com"
              required
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] dark:focus:border-[#2E5BFF] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Username
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2E5BFF] transition-colors">
              <FontAwesomeIcon icon={faAt} className="text-xs" />
            </span>
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] dark:focus:border-[#2E5BFF] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* New Password & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              New Password
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2E5BFF] transition-colors">
                <FontAwesomeIcon icon={faLock} className="text-xs" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New password"
                required
                minLength={6}
                className="w-full pl-8 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] dark:focus:border-[#2E5BFF] transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-xs" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Confirm Password
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2E5BFF] transition-colors">
                <FontAwesomeIcon icon={faLock} className="text-xs" />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                required
                minLength={6}
                className="w-full pl-8 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] dark:focus:border-[#2E5BFF] transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="text-xs" />
              </button>
            </div>
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
              <span>Save New Password</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </>
          )}
        </button>
      </form>

      {/* Switch Tab Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
        <button
          type="button"
          onClick={() => setActiveState && setActiveState(0)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E5BFF] dark:text-[#527dff] hover:underline cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-[10px]" />
          <span>Back to Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
