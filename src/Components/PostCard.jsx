import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../Features/User/user.slice.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faShareNodes, faCheck, faBookOpen, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getReadingTime, getPostExcerpt } from "../Utils/textUtils.js";

const PostCard = ({ id, post: postProp, author: authorProp, isFollowButton }) => {
  const navigate = useNavigate();
  const [displayFollowButton, setDisplayFollowButton] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [copied, setCopied] = useState(false);
  const { allPost } = useSelector((state) => state.post);
  const { userData, otherUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Prefer directly passed post if it's an object, fallback to Redux allPost
  const singlePost =
    postProp && typeof postProp === "object"
      ? postProp
      : allPost?.find((post) => post._id === (id || postProp));

  // Resolve author object
  const author =
    singlePost?.user && typeof singlePost.user === "object" && (singlePost.user.username || singlePost.user.fullName)
      ? singlePost.user
      : authorProp ||
        (otherUser && (otherUser._id === singlePost?.user || !singlePost?.user) ? otherUser : null) ||
        (userData && userData._id === singlePost?.user ? userData : null);

  useEffect(() => {
    if (singlePost) {
      const followers = author?.followers || singlePost.user?.followers || [];
      if (userData?._id && Array.isArray(followers) && followers.includes(userData._id)) {
        setIsFollowed(true);
      }
      const authorId = author?._id || singlePost.user?._id || (typeof singlePost.user === 'string' ? singlePost.user : null);
      if (authorId && userData?._id && authorId === userData._id) {
        setDisplayFollowButton(false);
      }
      if (isFollowButton) {
        setDisplayFollowButton(false);
      }
    }
  }, [singlePost, author, userData, isFollowButton]);

  if (!singlePost) {
    return null;
  }

  const postId = singlePost._id || singlePost.id || id;

  const handlePostClick = () => {
    navigate(`/post-display/${postId}`);
  };

  const handleFollow = (e) => {
    e.stopPropagation();
    const postUserId = author?._id || singlePost.user?._id || (typeof singlePost.user === 'string' ? singlePost.user : null);
    if (!postUserId) return;

    if (!isFollowed) {
      dispatch(followUser(postUserId)).then(() => {
        setIsFollowed(true);
      });
    } else {
      dispatch(unfollowUser(postUserId)).then(() => {
        setIsFollowed(false);
      });
    }
  };

  const openProfile = (e) => {
    e.stopPropagation();
    const authorUsername = author?.username || singlePost.user?.username;
    if (authorUsername) {
      navigate(`/profile/${authorUsername}`);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/post-display/${postId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const rawAvatar = author?.avator || author?.avatar || singlePost.user?.avator || singlePost.user?.avatar;
  const avatarSrc =
    rawAvatar && rawAvatar !== "default.jpeg" && typeof rawAvatar === 'string' && rawAvatar.trim() !== ""
      ? rawAvatar
      : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";

  const totalLikes = Array.isArray(singlePost.likes) ? singlePost.likes.length : (typeof singlePost.likes === 'number' ? singlePost.likes : 0);
  const totalComments = Array.isArray(singlePost.comments) ? singlePost.comments.length : (typeof singlePost.comments === 'number' ? singlePost.comments : 0);
  const isPostLikedByUser = Boolean(userData?._id && Array.isArray(singlePost.likes) && singlePost.likes.includes(userData._id));

  const postImage = singlePost.referanceImage || singlePost.image || singlePost.referenceImage;
  const hasPostImage = Boolean(postImage && postImage !== "default.jpeg" && typeof postImage === 'string' && postImage.trim() !== "");

  const authorName = author?.fullName || author?.username || singlePost.user?.fullName || singlePost.user?.username || "Unknown Author";
  const authorHandle = author?.username || singlePost.user?.username || "user";
  const cleanSnippet = getPostExcerpt(singlePost.description, 150);
  const readingTime = getReadingTime(singlePost.description);

  return (
    <article
      onClick={handlePostClick}
      className="animate-slide-up relative w-full rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-[#2E5BFF]/10 hover:border-[#2E5BFF]/40 dark:hover:border-[#2E5BFF]/40 hover:-translate-y-1 transition-all duration-300 mb-4 cursor-pointer group overflow-hidden"
    >
      {/* Top Gradient Accent on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2E5BFF] via-[#F4A261] to-[#E76F51] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Author & Story Meta Header */}
      <div className="flex items-center justify-between gap-3 mb-3.5">
        <div
          onClick={openProfile}
          className="flex items-center gap-3 min-w-0 hover:opacity-90 transition-opacity"
        >
          <img
            src={avatarSrc}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-[#2E5BFF]/40 shadow-sm shrink-0 transition-all"
          />
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#2E5BFF] dark:group-hover:text-[#527dff] transition-colors">
              {authorName}
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280] truncate">
              <span>@{authorHandle}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faBookOpen} className="text-[10px] text-[#F4A261]" />
                {readingTime}
              </span>
            </div>
          </div>
        </div>

        {displayFollowButton && (
          <button
            onClick={handleFollow}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold active:scale-95 transition-all duration-200 cursor-pointer ${
              isFollowed
                ? "bg-slate-100 dark:bg-slate-800 text-[#6B7280] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                : "bg-[#2E5BFF]/10 text-[#2E5BFF] dark:bg-[#2E5BFF]/20 dark:text-[#527dff] hover:bg-[#2E5BFF]/20"
            }`}
          >
            {isFollowed ? "Following" : "Follow"}
          </button>
        )}
      </div>

      {/* Post Headline */}
      <h2 className="text-lg sm:text-xl font-bold font-brand tracking-tight text-slate-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#2E5BFF] dark:group-hover:text-[#527dff] transition-colors">
        {singlePost.title}
      </h2>

      {/* Clean Story Excerpt (Placed right under headline for natural editorial flow) */}
      {cleanSnippet && (
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
          {cleanSnippet}
        </p>
      )}

      {/* Featured Media */}
      {hasPostImage && (
        <div className="relative mb-3.5 aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800/80">
          <img
            src={postImage}
            alt={singlePost.title || "Post media"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </div>
      )}

      {/* Engagement Actions & Read Link */}
      <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800/80 text-xs text-[#6B7280] dark:text-slate-400">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="flex items-center gap-1.5 group/btn">
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-sm transition-transform duration-200 group-hover/btn:scale-125 ${
                isPostLikedByUser ? "text-[#E76F51]" : "text-slate-400"
              }`}
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300">{totalLikes}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faComment} className="text-sm text-slate-400" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">{totalComments}</span>
          </div>

          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F4A261]/15 text-[#c26d2e] dark:text-[#F4A261] border border-[#F4A261]/30 text-[10px] font-semibold">
            Story
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E5BFF] dark:text-[#527dff] group-hover:text-[#1d45e0] transition-colors">
            <span>Read Story</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-200" />
          </span>

          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center active:scale-90 transition-all duration-150 cursor-pointer"
            title="Share post"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faShareNodes} className={copied ? "text-emerald-500 text-xs" : "text-xs"} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
