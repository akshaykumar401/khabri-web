import React, { useState, useEffect } from 'react';
import { ERROR, SUCCESSFUL, TiptapEditor, stripHtml } from "../Components/Components.js";
import { useDispatch } from 'react-redux';
import { createUserPost } from '../Features/Post/post.slice.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudArrowUp, faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const UploadPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    const formData = new FormData();
    formData.append("title", title.trim());
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
        setImage(null);
        setImagePreview(null);
        setTitle("");
        setDescription("");
        setIsSuccessOpen(true);
        setSuccessMessage(
          typeof action.payload === 'string' && action.payload.trim() && !/failed|error/i.test(action.payload)
            ? action.payload
            : "Post published successfully!"
        );
        setTimeout(() => {
          navigate("/user");
        }, 1200);
      } else {
        setIsErrorOpen(true);
        setErrorMessage(action.payload || "Failed to publish story");
      }
    });
  };

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

  return (
    <div className="w-full animate-fade-in">
      {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen}/>}
      {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen}/>}

      {/* Breadcrumb back */}
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
            Publish New Story
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Write an article, breaking news bulletin, or community bulletin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Headline Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Headline / Title
              </label>
              <span className={`text-[11px] font-medium ${
                100 - title.length < 15 ? 'text-amber-500 font-bold' : 'text-slate-400'
              }`}>
                {100 - title.length} characters left
              </span>
            </div>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] transition-all"
              maxLength={100}
              placeholder="e.g. Major breakthroughs announced at global tech summit"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Media Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Featured Image (Optional)
            </label>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-72">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/70 text-white hover:bg-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="post-image-upload"
                className="flex flex-col items-center justify-center w-full h-36 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700/80 hover:border-[#2E5BFF] dark:hover:border-[#2E5BFF] bg-slate-50 dark:bg-slate-800/30 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2E5BFF]/10 text-[#2E5BFF] dark:text-[#527dff] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faCloudArrowUp} className="text-lg" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Click to upload featured image
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, WebP up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="post-image-upload"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Story Body with Tiptap Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Story Content
              </label>
              <span className="text-[11px] text-slate-400">
                Rich formatting supported
              </span>
            </div>
            <TiptapEditor
              content={description}
              onChange={(html) => setDescription(html)}
              placeholder="Write the full report, opinion piece, or news update here..."
              minHeight="min-h-[220px]"
            />
          </div>

          {/* Action buttons */}
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
                  <span>Publish Story</span>
                  <FontAwesomeIcon icon={faPaperPlane} className="text-[10px]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPost;
