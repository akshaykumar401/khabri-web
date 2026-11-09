import React, { useState, useEffect } from 'react';
import { ERROR, SUCCESSFUL } from "../Components/Components.js";
import { editUserProfileDetail } from '../Features/User/user.slice.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser, faAt, faCheck } from "@fortawesome/free-solid-svg-icons";

const EditProfileDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      setName(userData.fullName || "");
      setUsername(userData.username || "");
    }
  }, [userData]);

  // Removing Error Alert in 3 Seconds
  useEffect(() => {
    if (isErrorOpen) {
      const timer = setTimeout(() => {
        setIsErrorOpen(false);
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isErrorOpen]);

  // Removing Success Alert in 3 Seconds
  useEffect(() => {
    if (isSuccessOpen) {
      const timer = setTimeout(() => {
        setIsSuccessOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccessOpen]);

  const handleProfileChange = (e) => {
    e.preventDefault();
    if (!name.trim() || !username.trim()) {
      setErrorMessage("Please fill all fields");
      setIsErrorOpen(true);
      return;
    }

    setLoading(true);
    const formData = {
      fullName: name.trim(),
      username: username.trim(),
    };

    dispatch(editUserProfileDetail(formData)).then((action) => {
      setLoading(false);
      if (action.type === 'editUserProfileDetail/fulfilled') {
        setSuccessMessage("Profile updated successfully!");
        setIsSuccessOpen(true);
        setTimeout(() => {
          navigate("/user");
        }, 1200);
      } else {
        setErrorMessage(action.payload || "Failed to update profile");
        setIsErrorOpen(true);
      }
    });
  };

  return (
    <div className="w-full animate-fade-in">
      {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen}/>}
      {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen}/>}

      {/* Breadcrumb */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </button>
      </div>

      <div className="w-full max-w-xl mx-auto rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm animate-slide-up">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold font-brand tracking-tight text-slate-900 dark:text-white">
            Edit Profile Details
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Change your display name and public username handle
          </p>
        </div>

        <form onSubmit={handleProfileChange} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FontAwesomeIcon icon={faUser} className="text-xs" />
              </span>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] transition-all"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Username Handle
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <FontAwesomeIcon icon={faAt} className="text-xs" />
              </span>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] transition-all"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Your profile URL will be {window.location.origin}/profile/{username || 'you'}</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 px-6 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-[#2E5BFF]/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheck} className="text-xs" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileDetail;
