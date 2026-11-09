import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPaperPlane,
  faArrowLeft,
  faShareNodes,
  faCheck,
  faComments,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Comments } from "../Components/Components.js";
import { useSelector, useDispatch } from "react-redux";
import { viewPost, dislikePost, likePost } from "../Features/Post/post.slice.js";
import { sendCommentToBack } from "../Features/Comment/comment.slice.js";
import { getReadingTime } from "../Utils/textUtils.js";

const PostDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({});
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  const { viewSinglePost } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (viewSinglePost && Object.keys(viewSinglePost).length > 0) {
      setPostData(viewSinglePost);
      setCommentsList(viewSinglePost.comments || []);
      const postLikes = viewSinglePost.likes || [];
      setLikes(postLikes.length);
      setIsLiked(Boolean(userData?._id && postLikes.includes(userData._id)));
    }
  }, [viewSinglePost, userData]);

  useEffect(() => {
    if (id) {
      dispatch(viewPost(id));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, dispatch]);

  const sendComment = () => {
    if (!commentText.trim() || !viewSinglePost?._id || submittingComment) {
      return;
    }

    setSubmittingComment(true);
    const newComment = {
      postId: viewSinglePost._id,
      comment: commentText.trim(),
    };

    dispatch(sendCommentToBack(newComment)).then((action) => {
      setSubmittingComment(false);
      if (action.type === "sendCommentToBack/fulfilled") {
        setCommentsList((prev) => [
          {
            _id: Date.now().toString(),
            userName: userData?.username || "you",
            comment: newComment.comment,
          },
          ...prev,
        ]);
        setCommentText("");
      }
    });
  };

  const increaseLikes = () => {
    if (!viewSinglePost?._id) return;

    if (!isLiked) {
      dispatch(likePost(viewSinglePost._id)).then((action) => {
        if (action.type === "likePost/fulfilled") {
          setLikes((prev) => prev + 1);
          setIsLiked(true);
        }
      });
    } else {
      dispatch(dislikePost(viewSinglePost._id)).then((action) => {
        if (action.type === "dislikePost/fulfilled") {
          setLikes((prev) => Math.max(0, prev - 1));
          setIsLiked(false);
        }
      });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const rawAvatar = postData?.user?.avator || postData?.user?.avatar;
  const avatarSrc =
    rawAvatar && rawAvatar !== "default.jpeg" && typeof rawAvatar === "string" && rawAvatar.trim() !== ""
      ? rawAvatar
      : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";

  const postImage = postData?.referanceImage || postData?.image || postData?.referenceImage;
  const hasPostImage = Boolean(postImage && postImage !== "default.jpeg" && typeof postImage === "string" && postImage.trim() !== "");

  return (
    <div className="w-full animate-fade-in">
      {/* Top Navigation */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Feed</span>
        </button>
      </div>

      {/* Main Post Card */}
      <article className="w-full rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm mb-6 animate-slide-up">
        {/* Author Header */}
        <div className="flex items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800/80">
          <div
            onClick={() => {
              if (postData?.user?.username) {
                navigate(`/profile/${postData.user.username}`);
              }
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={avatarSrc}
              alt={postData?.user?.fullName || "Author"}
              className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#2E5BFF] dark:group-hover:text-[#527dff] transition-colors">
                {postData?.user?.fullName || postData?.user?.username || "Author"}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>@{postData?.user?.username || "user"}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faBookOpen} className="text-[10px] text-[#F4A261]" />
                  {getReadingTime(postData?.description || "")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Share story"
            >
              <FontAwesomeIcon icon={copied ? faCheck : faShareNodes} className={copied ? "text-emerald-500 text-xs" : "text-xs"} />
            </button>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-5 mb-4 leading-tight font-brand">
          {postData?.title}
        </h1>

        {/* Media Image */}
        {hasPostImage && (
          <div className="my-5 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
            <img
              src={postImage}
              alt={postData.title || "Post"}
              className="w-full max-h-[460px] object-cover"
            />
          </div>
        )}

        {/* Description Body with Rich HTML or Plaintext Fallback */}
        <div
          className="tiptap-content text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed my-6"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              /<[a-z][\s\S]*>/i.test(postData?.description || "")
                ? postData.description
                : (postData?.description || "")
                    .split("\n")
                    .map((p) => `<p>${p || "&nbsp;"}</p>`)
                    .join("")
            ),
          }}
        />

        {/* Post Actions Bar */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={increaseLikes}
            className={`group flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold hover:scale-105 active:scale-90 transition-all duration-200 cursor-pointer ${
              isLiked
                ? "bg-[#E76F51]/10 text-[#E76F51] border border-[#E76F51]/30 shadow-sm shadow-[#E76F51]/10"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} className={`transition-transform duration-200 group-hover:scale-125 ${isLiked ? "text-[#E76F51] animate-heart" : "text-slate-400"}`} />
            <span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
          </button>

          <div className="flex items-center gap-2 py-2 px-3 text-xs text-slate-500 dark:text-slate-400">
            <FontAwesomeIcon icon={faComments} />
            <span>{commentsList.length} Comments</span>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="w-full rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm animate-fade-in">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span>Discussion</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {commentsList.length}
          </span>
        </h2>

        {/* Comment Composer */}
        <div className="flex items-center gap-2.5 mb-6">
          <input
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] transition-all"
            placeholder="Join the discussion..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendComment();
              }
            }}
          />
          <button
            onClick={sendComment}
            disabled={submittingComment || !commentText.trim()}
            className="py-2.5 px-5 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] disabled:opacity-40 text-white font-semibold text-xs shadow-md shadow-[#2E5BFF]/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            {submittingComment ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Reply</span>
                <FontAwesomeIcon icon={faPaperPlane} className="text-[10px]" />
              </>
            )}
          </button>
        </div>

        {/* Comment List */}
        <div className="space-y-2">
          {commentsList.length > 0 ? (
            commentsList.map((comment, index) => (
              <Comments
                key={comment._id || index}
                username={comment?.userName}
                comment={comment?.comment}
              />
            ))
          ) : (
            <p className="text-center py-6 text-xs text-slate-400">
              No comments yet. Start the conversation!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PostDisplay;
