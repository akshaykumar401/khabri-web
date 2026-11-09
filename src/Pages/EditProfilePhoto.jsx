import React, { useState, useId, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCamera, faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ERROR, SUCCESSFUL } from "../Components/Components.js";
import { useSelector, useDispatch } from 'react-redux';
import { editUserProfilePhoto } from '../Features/User/user.slice.js';
import { useNavigate } from 'react-router-dom';

const EditProfilePhoto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNewImage, setIsNewImage] = useState(null);
  const inputId = useId();

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [loading, setLoading] = useState(false);

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData?.avator || userData?.avatar) {
      setOldImage(userData.avator || userData.avatar);
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

  const handleProfileChange = () => {
    if (!isNewImage) {
      setIsErrorOpen(true);
      setErrorMessage("Please select a new profile image first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("avator", isNewImage);

    dispatch(editUserProfilePhoto(formData)).then((action) => {
      setLoading(false);
      if (action.type === 'editUserProfilePhoto/fulfilled') {
        setIsSuccessOpen(true);
        setSuccessMessage("Profile photo updated successfully!");
        setIsNewImage(null);
        setTimeout(() => {
          navigate("/user");
        }, 1200);
      } else {
        setIsErrorOpen(true);
        setErrorMessage(action.payload || "Failed to update profile photo");
      }
    });
  };

  const oldImageSrc =
    oldImage && oldImage !== "default.jpeg"
      ? oldImage
      : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";

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

      <div className="w-full max-w-xl mx-auto rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm text-center animate-slide-up">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold font-brand tracking-tight text-slate-900 dark:text-white">
            Change Profile Picture
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose a high quality image to represent yourself
          </p>
        </div>

        {/* Visual Comparison Area */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 my-6">
          <div>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-700 mx-auto shadow-md">
              <img src={oldImageSrc} alt="Current Avatar" className="w-full h-full object-cover" />
            </div>
            <span className="block text-[11px] font-semibold text-slate-400 mt-2">Current Photo</span>
          </div>

          <FontAwesomeIcon icon={faArrowRight} className="text-slate-300 dark:text-slate-600 text-lg" />

          <div>
            <label
              htmlFor={inputId}
              className="relative block w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-dashed border-[#2E5BFF]/50 hover:border-[#2E5BFF] mx-auto shadow-md cursor-pointer group bg-white dark:bg-slate-900"
            >
              {isNewImage ? (
                <img
                  src={URL.createObjectURL(isNewImage)}
                  alt="New Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#2E5BFF] dark:text-[#527dff] p-2">
                  <FontAwesomeIcon icon={faCamera} className="text-xl mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-semibold">Select Photo</span>
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              id={inputId}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setIsNewImage(file);
              }}
            />
            <span className="block text-[11px] font-semibold text-[#2E5BFF] dark:text-[#527dff] mt-2">
              {isNewImage ? "New Preview" : "Click to Browse"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="py-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleProfileChange}
            disabled={loading || !isNewImage}
            className="py-2.5 px-6 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-[#2E5BFF]/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FontAwesomeIcon icon={faCheck} className="text-xs" />
                <span>Save Photo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePhoto;
