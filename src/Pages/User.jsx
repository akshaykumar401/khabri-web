import React, { useEffect } from 'react';
import { ProfileHeader, UserPostCard } from "../Components/Components.js";
import { useSelector, useDispatch } from 'react-redux';
import { allUserPost } from '../Features/Post/post.slice.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const User = () => {
  const { userData } = useSelector((state) => state.user);
  const { userPost, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?._id) {
      dispatch(allUserPost(userData._id));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const posts = userPost || [];

  return (
    <div className="w-full animate-fade-in">
      {/* Profile Header Hero */}
      <ProfileHeader
        username={userData?.fullName || userData?.username}
        totalPost={posts.length}
        totalFollower={userData?.followers ? userData.followers.length : 0}
        totalFollowing={userData?.following ? userData.following.length : 0}
        avator={userData?.avator}
        isAdmin={true}
      />

      {/* User Stories Feed */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-brand text-slate-900 dark:text-white flex items-center gap-2">
            <span>My Stories</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {posts.length}
            </span>
          </h2>

          <Link
            to="/upload-post"
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#2E5BFF]/10 text-[#2E5BFF] dark:text-[#527dff] text-xs font-semibold hover:bg-[#2E5BFF]/20 active:scale-95 transition-all duration-150"
          >
            <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
            <span>New Post</span>
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((singlePost) => (
              <UserPostCard key={singlePost._id} id={singlePost._id} post={singlePost} />
            ))}
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-3 border-[#2E5BFF]/30 border-t-[#2E5BFF] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Loading your stories...</p>
          </div>
        ) : (
          <div className="text-center py-14 px-4 rounded-3xl bg-white dark:bg-[#111827] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#2E5BFF]/10 text-[#2E5BFF] mx-auto flex items-center justify-center mb-3">
              <FontAwesomeIcon icon={faPenNib} className="text-xl" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No stories published yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-4">
              Share your insights, opinions, or local news with the community.
            </p>
            <Link
              to="/upload-post"
              className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Create Your First Post</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
