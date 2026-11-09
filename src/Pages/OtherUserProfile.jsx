import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ProfileHeader, PostCard } from "../Components/Components.js";
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserData } from '../Features/User/user.slice.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faNewspaper } from "@fortawesome/free-solid-svg-icons";

const OtherUserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { otherUser, userData, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (otherUser) {
      setData(otherUser);
      setPosts(otherUser.post || otherUser.posts || []);
      setIsAdmin(Boolean(otherUser._id && userData?._id && otherUser._id === userData._id));
    }
  }, [otherUser, userData]);

  useEffect(() => {
    if (username) {
      setData(null);
      setPosts([]);
      dispatch(getOtherUserData(username));
    }
  }, [username, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full animate-fade-in">
      {/* Back button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </button>
      </div>

      {/* Profile Header Hero */}
      <ProfileHeader
        username={data?.fullName || data?.username || username}
        totalPost={
          Array.isArray(data?.post)
            ? data.post.length
            : Array.isArray(data?.posts)
            ? data.posts.length
            : 0
        }
        totalFollower={data?.followers ? data.followers.length : 0}
        totalFollowing={data?.following ? data.following.length : 0}
        avator={data?.avator || data?.avatar}
        isAdmin={isAdmin}
      />

      {/* User's Stories */}
      <div className="mt-6">
        <h2 className="text-lg font-bold font-brand text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span>Published Stories</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {posts.length}
          </span>
        </h2>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((singlePost, index) => (
              <PostCard
                id={singlePost?._id || singlePost?.id}
                key={singlePost?._id || singlePost?.id || index}
                post={singlePost}
                author={data || otherUser}
                isFollowButton={isAdmin}
                username={username}
              />
            ))}
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-3 border-[#2E5BFF]/30 border-t-[#2E5BFF] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Loading stories...</p>
          </div>
        ) : (
          <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-[#111827] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#2E5BFF]/10 text-[#2E5BFF] mx-auto flex items-center justify-center mb-3">
              <FontAwesomeIcon icon={faNewspaper} className="text-xl" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No stories published</h3>
            <p className="text-xs text-slate-400 mt-1">
              @{username} hasn't posted any updates yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherUserProfile;
