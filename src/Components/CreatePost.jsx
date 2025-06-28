import React, { useState, useEffect } from 'react';
import {ERROR, SUCCESSFUL} from "./Components.js";
import { useDispatch } from 'react-redux';
import { createUserPost } from '../Features/Post/post.slice.js';

const CreatePost = () => {
  const [title, setTitle] = useState("");
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

  useEffect(() => {
    const titleLength = document.getElementById("titleLength");
    titleLength.innerText = `${100 - Number(title.length)}`;
  }, [title]);

  const HandleCreatePost = () => {
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    // const image = document.getElementById("image");

    if(title.value === "" && description.value === "") {
      setIsErrorOpen(true);
      setErrorMessage("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("image", image);
    dispatch(createUserPost(formData)).then((action) => {
      if (action.type === "createUserPost/fulfilled") {
        setIsSuccessOpen(true);
        setSuccessMessage("Post Uploaded Successfully");
      }
    })
  }

  return (
    <div className="w-full bg-white text-black px-4 py-2 dark:bg-slate-950 dark:text-white rounded-lg">
      {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen}/>}
      {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen}/>}
      <h2 className="text-lg font-semibold font-['Titillium-Web'] pl-6">
        Create Post
      </h2>
      <div>
        <input placeholder="Title" className="w-full px-4 py-2 mt-2 rounded-lg border-1 dark:border-white border-slate-800 outline-none" maxLength={100} value={title}   onChange={(e) => setTitle(e.target.value)} id="title" />
        <span className="absolute  top-[5.9em] text-sm text-gray-400" id="titleLength">100</span>
      </div>

      <textarea placeholder="post Description" className="w-full px-4 py-2 mt-2 rounded-lg border-1 dark:border-white border-slate-800 outline-none resize-none h-24" id="description"></textarea>
      <div className="flex items-center justify-between">
        <label htmlFor="image" className="border-1 border-slate-800 dark:border-white outline-none w-[60%] px-4 py-2 mt-2 rounded-lg cursor-pointer">{imageLabelName}</label>
        <input type="file" typeof="image/*" placeholder={imageLabelName} className="hidden" id="image" onChange={(e) => [setImageLabelName(e.target.files[0].name), setImage(e.target.files[0]) ]}/>

        <button className="bg-blue-500 text-white py-2 h-10 px-4 w-[30%] rounded-lg cursor-pointer" onClick={HandleCreatePost}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
