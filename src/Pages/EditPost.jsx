import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ERROR, SUCCESSFUL, TiptapEditor, stripHtml } from "../Components/Components.js";
import { useSelector, useDispatch } from 'react-redux';
import { editUserPost, viewPost } from '../Features/Post/post.slice.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { userPost, viewSinglePost } = useSelector((state) => state.post);

  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const post =
      userPost?.find((p) => p._id === postId) ||
      (viewSinglePost?._id === postId ? viewSinglePost : null);

    if (post) {
      setTitle(post.title || "");
      setDescription(post.description || "");
      const postImg = post.referanceImage || post.image || post.referenceImage || "";
      setOldImage(postImg);
      setImage(postImg);
    } else if (postId) {
      dispatch(viewPost(postId));
    }
  }, [userPost, viewSinglePost, postId, dispatch]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !stripHtml(description).trim()) {
      setIsErrorOpen(true);
      setErrorMessage("Please fill all required fields");
      return;
    }

    setLoading(true);
    const data = {
      id: postId,
      title: title.trim(),
      description: description,
      image: image instanceof File ? image : undefined,
    };

    dispatch(editUserPost(data)).then((action) => {
      setLoading(false);
      const isSuccess =
        action.type === 'editUserPost/fulfilled' ||
        (typeof action.payload === 'string' && /success/i.test(action.payload));

      if (isSuccess) {
        setIsSuccessOpen(true);
        setSuccessMessage(
          typeof action.payload === 'string' && action.payload.trim() && !/failed|error/i.test(action.payload)
            ? action.payload
            : "Post updated successfully!"
        );
        setTimeout(() => {
          navigate("/user");
        }, 1200);
      } else {
        setIsErrorOpen(true);
        setErrorMessage(action.payload || "Failed to update post");
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const displayImageSrc =
    image instanceof File || image instanceof Blob
      ? URL.createObjectURL(image)
      : oldImage || "";

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

      <div className="w-full rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm animate-slide-up">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold font-brand tracking-tight text-slate-900 dark:text-white">
            Edit Story
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update headline, featured media, or story details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Headline */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Headline / Title
              </label>
              <span className="text-[11px] text-slate-400">
                {100 - title.length} characters left
              </span>
            </div>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] transition-all"
              maxLength={100}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Media Image */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Featured Media
            </label>

            {displayImageSrc && (
              <div className="relative mb-3 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-72">
                <img src={displayImageSrc} alt="Post" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <label
                htmlFor="edit-post-image"
                className="inline-flex items-center gap-2 py-2 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faCamera} />
                <span>{displayImageSrc ? "Replace Image" : "Add Image"}</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="edit-post-image"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Description with Tiptap Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Story Body
              </label>
              <span className="text-[11px] text-slate-400">
                Rich formatting supported
              </span>
            </div>
            <TiptapEditor
              content={description}
              onChange={(html) => setDescription(html)}
              placeholder="Update story content, add rich styling, lists, or links..."
              minHeight="min-h-[220px]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-2.5 px-5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title.trim() || !stripHtml(description).trim()}
              className="py-2.5 px-6 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-[#2E5BFF]/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheck} className="text-xs" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
