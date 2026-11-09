import React, { useState, useEffect } from 'react';
import { ERROR, SUCCESSFUL } from "./Components.js";
import { useDispatch } from 'react-redux';
import { createUserPost } from '../Features/Post/post.slice.js';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLabelName, setImageLabelName] = useState("Upload Image");
  const [image, setImage] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

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

  const HandleCreatePost = () => {
    if (!title.trim() || !description.trim()) {
      setIsErrorOpen(true);
      setErrorMessage("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    dispatch(createUserPost(formData)).then((action) => {
      if (action.type === 'createUserPost/fulfilled') {
        setTitle("");
        setDescription("");
        setImage(null);
        setImageLabelName("Upload Image");
        setIsSuccessOpen(true);
        setSuccessMessage("Post Uploaded Successfully");
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageLabelName(file.name);
      setImage(file);
    }
  };

  return (
    <div className="w-full bg-white text-black px-4 py-2 dark:bg-slate-950 dark:text-white rounded-lg">
      {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen} />}
      {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen} />}
      <h2 className="text-lg font-semibold font-['Titillium-Web'] pl-6">
        Create Post
      </h2>
      <div className="relative">
        <input
          placeholder="Title"
          className="w-full px-4 py-2 mt-2 rounded-lg border-1 dark:border-white border-slate-800 outline-none"
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="absolute right-4 top-4 text-sm text-gray-400">
          {100 - title.length}
        </span>
      </div>

      <textarea
        placeholder="post Description"
        className="w-full px-4 py-2 mt-2 rounded-lg border-1 dark:border-white border-slate-800 outline-none resize-none h-24"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="flex items-center justify-between">
        <label htmlFor="image" className="border-1 border-slate-800 dark:border-white outline-none w-[60%] px-4 py-2 mt-2 rounded-lg cursor-pointer truncate block">
          {imageLabelName}
        </label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image"
          onChange={handleImageChange}
        />

        <button className="bg-blue-500 text-white py-2 h-10 px-4 w-[30%] rounded-lg cursor-pointer" onClick={HandleCreatePost}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
