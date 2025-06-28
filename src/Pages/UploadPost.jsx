import React, { useState, useEffect } from 'react';
import { ERROR, SUCCESSFUL } from "../Components/Components.js";
import { useDispatch } from 'react-redux';
import { createUserPost } from '../Features/Post/post.slice.js';

const UploadPost = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
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
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const image = document.getElementById("imageInpute");

    if(title.value === "" || description.value === "") {
      setIsErrorOpen(true);
      setErrorMessage("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("image", image.files[0]);

    dispatch(createUserPost(formData)).then((action) => {
      if (action.type === "createUserPost/fulfilled") {
        setImage(null)
        title.value = "";
        description.value = "";
        setIsSuccessOpen(true);
        setSuccessMessage("Post Uploaded Successfully");
      }
    })

  }

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10 mb-4">
      {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen}/>}
      {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen}/>}
      <div className="w-xl h-auto dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg mb-2">
        <h2 className="w-full text-2xl pl-4 font-semibold font-['Comic Relief'] mb-8">UPLOAD POST</h2>
        {/* Image Upload */}
        <input type="file" className="hidden" id="imageInpute" onChange={(e) => setImage(e.target.files[0])} />
        <label htmlFor="imageInpute" className="cursor-pointer w-[30%] p-4 bg-blue-600 rounded-lg" >Uplaod Image</label>

        {/* Image Display */}
        {image && (
          <div className="w-[95%] h-auto flex justify-center items-center">
            <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="w-full h-full object-cover mt-6 rounded-lg" />
          </div>)
        }


        {/* Title Text Area */}
        <textarea className="w-full border-1 text-xl px-2 h-auto resize-none pt-2 mt-6 rounded-lg outline-none " maxLength="100" placeholder="Tille" id="title"></textarea>

        {/* Description Text Area */}
        <textarea className="w-full border-1 text-xl px-2 h-[60vh] resize-none pt-2 mt-2 rounded-lg outline-none " placeholder="Description" id="description"></textarea>

        <button className="w-[50%] bg-green-300 justify-center flex items-center mx-auto py-2 text-black text-xl mt-2 cursor-pointer hover:bg-green-400 rounded-lg" onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default UploadPost;
