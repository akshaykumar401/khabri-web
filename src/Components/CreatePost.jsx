import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ERROR, SUCCESSFUL } from "./Components.js";
import { useDispatch, useSelector } from 'react-redux';
import { createUserPost } from '../Features/Post/post.slice.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faXmark, faPaperPlane, faPenNib } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const avatarSrc =
    userData?.avator && userData.avator !== "default.jpeg"
      ? userData.avator
      : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";

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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleCreatePost = () => {
    if (!title.trim() || !description.trim()) {
      setIsErrorOpen(true);
      setErrorMessage("Please provide both a headline and description");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    dispatch(createUserPost(formData)).then((action) => {
      setLoading(false);
      const isSuccess =
        action.type === 'createUserPost/fulfilled' ||
        (typeof action.payload === 'string' && /success/i.test(action.payload));

      if (isSuccess) {
        setTitle("");
        setDescription("");
        removeImage();
        setIsSuccessOpen(true);
        setSuccessMessage(
          typeof action.payload === 'string' && action.payload.trim() && !/failed|error/i.test(action.payload)
            ? action.payload
            : "Post published successfully!"
        );
      } else {
        setIsErrorOpen(true);
        setErrorMessage(action.payload || "Failed to publish post");
      }
    });
  };

  return (
    <div className="animate-fade-in w-full rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all duration-300 mb-6">
      {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen} />}
      {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen} />}

      <div className="flex gap-3.5">
        <img
          src={avatarSrc}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
        />

        <div className="flex-1 min-w-0">
          {/* Post Headline / Title */}
          <div className="relative mb-2">
            <input
              placeholder="Headline / Story title..."
              className="w-full font-bold text-base bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none pr-12"
              maxLength={100}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className={`absolute right-0 top-0 text-[11px] font-medium ${
              100 - title.length < 15 ? 'text-amber-500 font-bold' : 'text-slate-400'
            }`}>
              {100 - title.length}
            </span>
          </div>

          {/* Description Textarea */}
          <textarea
            placeholder="What's happening? Share the details..."
            rows={3}
            className="w-full text-sm bg-transparent text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Attached Image Preview */}
          {imagePreview && (
            <div className="relative mt-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-56">
              <img src={imagePreview} alt="Upload Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-950/70 text-white hover:bg-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} className="text-xs" />
              </button>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <label
                htmlFor="feed-image-input"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#2E5BFF] dark:text-[#527dff] hover:bg-[#2E5BFF]/10 transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faImage} />
                <span>{image ? "Change Media" : "Add Image"}</span>
              </label>
              <input
                type="file"
                accept="image/*"
                id="feed-image-input"
                className="hidden"
                onChange={handleImageChange}
              />

              <Link
                to="/upload-post"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#6B7280] hover:text-[#2E5BFF] dark:hover:text-[#527dff] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Open full Tiptap rich text editor"
              >
                <FontAwesomeIcon icon={faPenNib} className="text-xs" />
                <span>Rich Editor</span>
              </Link>
            </div>

            <button
              onClick={handleCreatePost}
              disabled={loading || !title.trim()}
              className="py-2 px-5 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-[#2E5BFF]/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Publish</span>
                  <FontAwesomeIcon icon={faPaperPlane} className="text-[10px]" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
