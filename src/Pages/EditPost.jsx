import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ERROR, SUCCESSFUL } from "../Components/Components.js";
import { useSelector, useDispatch } from 'react-redux';
import { editUserPost } from '../Features/Post/post.slice.js';

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { userPost } = useSelector((state) => state.post);

  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const post = userPost?.find((p) => p._id === postId);
    if (post) {
      setTitle(post.title || "");
      setDescription(post.description || "");
      setOldImage(post.referanceImage || "");
      setImage(post.referanceImage || "");
    }
  }, [userPost, postId]);

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

    const data = {
      id: postId,
      title: title,
      description: description,
      image: image instanceof File ? image : undefined,
    };

    dispatch(editUserPost(data)).then((action) => {
      if (action.type === 'editUserPost/fulfilled') {
        setIsSuccessOpen(true);
        setSuccessMessage("Post Updated Successfully");
        setTimeout(() => {
          navigate("/user");
        }, 1000);
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
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="z-[9999]">
        {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen}/>}
        {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen}/>}
      </div>
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <h2 className="w-full text-2xl pl-4 mt-2 font-semibold font-['Comic Relief'] mb-8">
          EDIT POST
        </h2>
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageInpute"
          onChange={handleImageChange}
        />
        <label htmlFor="imageInpute" className="cursor-pointer w-[30%] p-4 mb-2 bg-blue-600 text-white rounded-lg inline-block text-center" >
          Change Image
        </label>

        {/* Image Display */}
        {displayImageSrc && (
          <div className="w-[95%] h-auto flex justify-center items-center">
            <img src={displayImageSrc} alt="Post" className="w-full h-68 object-cover mt-6 rounded-lg" />
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
          Update Post
        </button>
      </div>
    </div>
  );
};

export default EditPost;
