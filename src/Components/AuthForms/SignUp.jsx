import React, { useState, useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faAt,
  faUser,
  faCamera,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { signUpUser, loginUser } from "../../Features/User/user.slice.js";
import { viewAllPost } from "../../Features/Post/post.slice.js";
import { ERROR } from "../Components.js";
import brandLogo from "../../assets/brand-logo.png";

const SignUp = ({ setActiveState, setIsLoggedIn }) => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const imageId = useId();

  const handleSignUp = (e) => {
    e.preventDefault();
    const formElement = e.target;
    const emailVal = formElement.email.value;
    const passwordVal = formElement.password.value;
    const fullName = formElement.name.value;
    const username = formElement.username.value;

    if (!emailVal || !passwordVal || !fullName || !username) {
      setError("Please fill all required fields");
      setIsErrorOpen(true);
      setTimeout(() => setIsErrorOpen(false), 3000);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("email", emailVal);
    formData.append("password", passwordVal);
    formData.append("fullName", fullName);
    formData.append("username", username);
    if (profileImage) {
      formData.append("avator", profileImage);
    }

    dispatch(signUpUser(formData)).then((action) => {
      const isSuccess =
        action.type === "signUpUser/fulfilled" ||
        (typeof action.payload === 'string' && /success/i.test(action.payload));

      if (isSuccess) {
        const userInfo = {
          email: emailVal,
          password: passwordVal,
        };
        formElement.reset();
        dispatch(loginUser(userInfo)).then((loginAction) => {
          setLoading(false);
          if (loginAction.type === 'loginUser/fulfilled') {
            setIsLoggedIn(false);
            dispatch(viewAllPost());
          } else {
            setIsLoggedIn(true);
          }
        });
      } else {
        setLoading(false);
        setError(action.payload || "Registration failed");
        setIsErrorOpen(true);
      }
    });
  };

  return (
    <div className="w-full animate-fade-in">
      {isErrorOpen && <ERROR text={error} setIsErrorOpen={setIsErrorOpen} />}

      {/* Mobile Branding Header */}
      <div className="md:hidden flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
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
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold font-brand tracking-tight text-slate-900 dark:text-white">
          Create an account
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Join Khabri to broadcast reports and follow newsrooms.
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSignUp}>
        {/* Profile Avatar Upload Pill */}
        <div className="flex items-center gap-3.5 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700/80">
          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0 border-2 border-white dark:border-slate-800 shadow-xs">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <FontAwesomeIcon icon={faUser} className="text-sm" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <label
              htmlFor={imageId}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#2E5BFF]/10 text-[#2E5BFF] dark:text-[#527dff] text-xs font-semibold hover:bg-[#2E5BFF]/20 transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faCamera} className="text-[10px]" />
              <span>{profileImage ? "Change Photo" : "Add Avatar"}</span>
            </label>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">Optional · JPG or PNG up to 5MB</p>
          </div>
          <input
            type="file"
            accept="image/*"
            id={imageId}
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) setProfileImage(e.target.files[0]);
            }}
          />
        </div>

        {/* Name & Username Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2E5BFF] transition-colors">
                <FontAwesomeIcon icon={faUser} className="text-xs" />
              </span>
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                required
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] dark:focus:border-[#2E5BFF] transition-all shadow-xs"
              />
            </div>
          </div>

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
                placeholder="janedoe"
                required
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] dark:focus:border-[#2E5BFF] transition-all shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2E5BFF] transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="jane@domain.com"
              required
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] dark:focus:border-[#2E5BFF] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Password
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2E5BFF] transition-colors">
              <FontAwesomeIcon icon={faLock} className="text-xs" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Minimum 6 characters"
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
              <span>Get Started</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </>
          )}
        </button>
      </form>

      {/* Switch Tab Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setActiveState && setActiveState(0)}
            className="font-bold text-[#2E5BFF] dark:text-[#527dff] hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
