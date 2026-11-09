import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../Features/User/user.slice.js';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUserPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

const ProfileHeader = ({
  username,
  totalPost = 0,
  totalFollower = 0,
  totalFollowing = 0,
  avator,
  isAdmin = false,
}) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { userData, otherUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (otherUser?._id && userData?.following) {
      setIsFollowed(userData.following.includes(otherUser._id));
    }
  }, [otherUser, userData]);

  const handleFollow = () => {
    const otherUserId = otherUser?._id;
    if (!otherUserId) return;

    if (!isFollowed) {
      dispatch(followUser(otherUserId)).then(() => {
        setIsFollowed(true);
      });
    } else {
      dispatch(unfollowUser(otherUserId)).then(() => {
        setIsFollowed(false);
      });
    }
  };

  const avatarSrc =
    avator && avator !== "default.jpeg"
      ? avator
      : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";

  return (
    <div className="animate-slide-up w-full rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
      {/* Decorative Gradient Cover Banner */}
      <div className="h-28 sm:h-36 w-full bg-gradient-to-r from-[#1D3557] via-[#2E5BFF] to-[#F4A261] relative" />

      {/* Profile Details Container */}
      <div className="px-6 pb-6 pt-0 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
          {/* Avatar with thick ring */}
          <div className="relative inline-block">
            <img
              src={avatarSrc}
              alt={username || "User"}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white dark:border-[#111827] shadow-xl bg-white dark:bg-slate-800 hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <Link
                to="/edit-profile-detail"
                className="inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 active:scale-95 hover:scale-105 transition-all duration-200 shadow-sm"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                <span>Edit Profile</span>
              </Link>
            ) : (
              <button
                onClick={handleFollow}
                className={`inline-flex items-center gap-2 py-2 px-5 rounded-xl text-xs font-semibold active:scale-95 hover:scale-105 transition-all duration-200 shadow-sm cursor-pointer ${
                  isFollowed
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    : "bg-[#2E5BFF] hover:bg-[#1d45e0] text-white shadow-[#2E5BFF]/20"
                }`}
              >
                <FontAwesomeIcon icon={isFollowed ? faCheck : faUserPlus} />
                <span>{isFollowed ? "Following" : "Follow"}</span>
              </button>
            )}
          </div>
        </div>

        {/* User Handle & Name */}
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-brand">
            {username || "Khabri Member"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            @{username ? username.toLowerCase().replace(/\s+/g, '') : "user"}
          </p>
        </div>

        {/* Stat Badges */}
        <div className="flex items-center gap-6 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm">
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white text-base mr-1.5 font-brand">
              {totalPost}
            </span>
            <span className="text-slate-500 dark:text-slate-400">Stories</span>
          </div>

          <div>
            <span className="font-extrabold text-slate-900 dark:text-white text-base mr-1.5 font-brand">
              {totalFollower}
            </span>
            <span className="text-slate-500 dark:text-slate-400">Followers</span>
          </div>

          <div>
            <span className="font-extrabold text-slate-900 dark:text-white text-base mr-1.5 font-brand">
              {totalFollowing}
            </span>
            <span className="text-slate-500 dark:text-slate-400">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
