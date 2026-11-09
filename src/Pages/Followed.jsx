import React, { useEffect } from 'react';
import { UsernameCard } from "../Components/Components.js";
import { useSelector, useDispatch } from 'react-redux';
import { getFollowUserProfile } from '../Features/User/user.slice.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Followed = () => {
  const dispatch = useDispatch();
  const { followedUser, userData, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFollowUserProfile());
  }, [dispatch, userData?._id]);

  const allProfile = followedUser || [];

  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-brand tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Followed Publishers</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {allProfile.length}
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Channels and authors you're currently following
          </p>
        </div>
      </div>

      {allProfile.length > 0 ? (
        <div className="space-y-3">
          {allProfile.map((profile) => (
            <UsernameCard
              key={profile._id}
              id={profile._id}
              username={profile.username}
              fullName={profile.fullName}
              avator={profile.avator || profile.avatar}
            />
          ))}
        </div>
      ) : loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-3 border-[#2E5BFF]/30 border-t-[#2E5BFF] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400">Loading followed users...</p>
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-[#111827] border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-[#2E5BFF]/10 text-[#2E5BFF] mx-auto flex items-center justify-center mb-3">
            <FontAwesomeIcon icon={faUsers} className="text-xl" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No publishers followed yet</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-4">
            Discover interesting creators and journalists from the explore feed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Discover Publishers</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Followed;
