import React, { useState, useEffect } from 'react';
import { ERROR, SUCCESSFUL } from "../Components/Components.js";
import { useDispatch } from 'react-redux';
import { createUserPost } from '../Features/Post/post.slice.js';

const UploadPost = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSubmit = () => {
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
        setImage(null);
        setTitle("");
        setDescription("");
        setIsSuccessOpen(true);
        setSuccessMessage("Post Uploaded Successfully");
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10 mb-4">
      {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen}/>}
      {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen}/>}
      <div className="w-xl h-auto dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg mb-2">
        <h2 className="w-full text-2xl pl-4 font-semibold font-['Comic Relief'] mb-8">UPLOAD POST</h2>
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageInpute"
          onChange={handleImageChange}
        />
        <label htmlFor="imageInpute" className="cursor-pointer w-[30%] p-4 bg-blue-600 text-white rounded-lg inline-block text-center" >
          {image ? "Change Image" : "Upload Image"}
        </label>

        {/* Image Display */}
        {image && (
          <div className="w-[95%] h-auto flex justify-center items-center">
            <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-64 object-cover mt-6 rounded-lg" />
          </div>
        )}

        {/* Title Text Area */}
        <textarea
          className="w-full border-1 text-xl px-2 h-auto resize-none pt-2 mt-6 rounded-lg outline-none"
          maxLength={100}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>

        {/* Description Text Area */}
        <textarea
          className="w-full border-1 text-xl px-2 h-[60vh] resize-none pt-2 mt-2 rounded-lg outline-none"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button className="w-[50%] bg-green-300 justify-center flex items-center mx-auto py-2 text-black text-xl mt-2 cursor-pointer hover:bg-green-400 rounded-lg" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default UploadPost;
