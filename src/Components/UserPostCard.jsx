import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPenToSquare, faTrashCan, faBookOpen, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DeletePostAlert, DeletePostSuccessFullAlert } from "./Components.js";
import { useSelector } from 'react-redux';
import { getReadingTime, getPostExcerpt } from '../Utils/textUtils.js';

const UserPostCard = ({ id, post: postProp }) => {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [postDeletedAlert, setPostDeletedAlert] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { userPost } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);
  const singlePost =
    postProp && typeof postProp === "object"
      ? postProp
      : userPost?.find((post) => post._id === (id || postProp));

  if (!singlePost) {
    return null;
  }

  const postId = singlePost._id || id;

  const handlePostClick = () => {
    navigate(`/post-display/${postId}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    navigate(`/edit-post/${postId}`);
  };

  const deletePostAlert = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsAlertOpen(true);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const authorUser = typeof singlePost.user === 'object' && singlePost.user ? singlePost.user : userData;
  const rawAvatar = authorUser?.avator || authorUser?.avatar;
  const avatarSrc =
    rawAvatar && rawAvatar !== "default.jpeg" && typeof rawAvatar === 'string' && rawAvatar.trim() !== ""
      ? rawAvatar
      : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";

  const authorName = authorUser?.fullName || authorUser?.username || "You";
  const authorHandle = authorUser?.username || "you";
  const postImage = singlePost.referanceImage || singlePost.image || singlePost.referenceImage;
  const hasPostImage = Boolean(postImage && postImage !== "default.jpeg" && typeof postImage === 'string' && postImage.trim() !== "");
  const cleanSnippet = getPostExcerpt(singlePost.description, 150);
  const readingTime = getReadingTime(singlePost.description);

  return (
    <article
      onClick={handlePostClick}
      className="animate-slide-up relative w-full rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-[#2E5BFF]/10 hover:border-[#2E5BFF]/40 dark:hover:border-[#2E5BFF]/40 hover:-translate-y-1 transition-all duration-300 mb-4 cursor-pointer group overflow-hidden"
    >
      {/* Top Gradient Accent on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2E5BFF] via-[#F4A261] to-[#E76F51] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {isAlertOpen && <DeletePostAlert id={postId} setIsAlertOpen={setIsAlertOpen} />}
      {postDeletedAlert && <DeletePostSuccessFullAlert setPostDeletedAlert={setPostDeletedAlert} />}

      {/* Header with 3-dot dropdown */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={avatarSrc}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-[#2E5BFF]/40 shadow-sm shrink-0 transition-all"
          />
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
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

        {/* Action Menu */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Post options"
          >
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-sm" />
          </button>

          {isMenuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-10 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-950/15 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
            >
              <button
                onClick={handleEdit}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="text-[#2E5BFF]" />
                <span>Edit Post</span>
              </button>
              <button
                onClick={deletePostAlert}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-[#E76F51] hover:bg-[#E76F51]/10 transition-colors text-left cursor-pointer"
              >
                <FontAwesomeIcon icon={faTrashCan} />
                <span>Delete Post</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Headline */}
      <h2 className="text-lg sm:text-xl font-bold font-brand tracking-tight text-slate-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#2E5BFF] dark:group-hover:text-[#527dff] transition-colors">
        {singlePost.title}
      </h2>

      {/* Clean Story Excerpt */}
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
            alt={singlePost.title || "Post"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </div>
      )}

      {/* Footer Meta & Read Link */}
      <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800/80 text-xs text-[#6B7280] dark:text-slate-400">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#F4A261]/15 text-[#c26d2e] dark:text-[#F4A261] border border-[#F4A261]/30 text-[10px] font-semibold">
          Your Story
        </span>

        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E5BFF] dark:text-[#527dff] group-hover:text-[#1d45e0] transition-colors">
          <span>Read Full Story</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-[10px] group-hover:translate-x-1.5 transition-transform duration-200" />
        </span>
      </div>
    </article>
  );
};

export default UserPostCard;
