import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../Features/User/user.slice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const UsernameCard = ({ username, id, avator, avatar, fullName }) => {
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(true);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  const openUserProfile = () => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  const handleFollowButton = (e) => {
    e.stopPropagation();
    if (!id) return;
    if (!isFollowed) {
      dispatch(followUser(id)).then(() => setIsFollowed(true));
    } else {
      dispatch(unfollowUser(id)).then(() => setIsFollowed(false));
    }
  };

  const rawImage = avator || avatar;
  const hasImage = Boolean(
    rawImage &&
    rawImage !== "default.jpeg" &&
    typeof rawImage === 'string' &&
    rawImage.trim() !== "" &&
    !imageError
  );

  const initial = username
    ? username.charAt(0).toUpperCase()
    : fullName
    ? fullName.charAt(0).toUpperCase()
    : "U";

  return (
    <div
      onClick={openUserProfile}
      className="animate-slide-up w-full flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#2E5BFF]/30 dark:hover:border-[#2E5BFF]/30 transition-all duration-200 cursor-pointer mb-3"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {hasImage ? (
          <img
            src={rawImage}
            alt={fullName || username || "Publisher"}
            className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1D3557] to-[#2E5BFF] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
            {initial}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {fullName || username}
          </h3>
          <p className="text-xs text-slate-400 truncate">@{username?.toLowerCase()}</p>
        </div>
      </div>

      <button
        onClick={handleFollowButton}
        className={`inline-flex items-center gap-1.5 py-1.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
          isFollowed
            ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            : "bg-[#2E5BFF] hover:bg-[#1d45e0] text-white shadow-sm shadow-[#2E5BFF]/20"
        }`}
      >
        <FontAwesomeIcon icon={isFollowed ? faCheck : faUserPlus} className="text-[10px]" />
        <span>{isFollowed ? "Following" : "Follow"}</span>
      </button>
    </div>
  );
};

export default UsernameCard;
