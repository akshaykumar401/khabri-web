import React, { useState, useEffect } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const titleLength = document.getElementById("titleLength");
    titleLength.innerText = `${100 - Number(title.length)}`;
  }, [title]);

  const HandleCreatePost = () => {
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const image = document.getElementById("image");

    if(title.value === "" && description.value === "") {
      alert("Please fill all the fields");
    } else {
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("description", description.value);
      formData.append("image", image.files[0]);

      console.log(title.value, description.value, image.files[0]);
      console.log(formData);
    }
  }

  return (
    <div className="w-full bg-white text-black px-4 py-2 dark:bg-slate-950 dark:text-white rounded-lg">
      <h2 className="text-lg font-semibold font-['Titillium-Web'] pl-6">
        Create Post
      </h2>
      <div>
        <input placeholder="Title" className="w-full px-4 py-2 mt-2 rounded-lg border-1 dark:border-white border-slate-800 outline-none" maxLength={100} value={title}   onChange={(e) => setTitle(e.target.value)} id="title" />
        <span className="absolute  top-[5.9em] text-sm text-gray-400" id="titleLength">100</span>
      </div>

      <textarea placeholder="post Description" className="w-full px-4 py-2 mt-2 rounded-lg border-1 dark:border-white border-slate-800 outline-none resize-none h-24" id="description"></textarea>
      <div className="flex items-center justify-between">
        <label htmlFor="image" className="border-1 border-slate-800 dark:border-white outline-none w-[60%] px-4 py-2 mt-2 rounded-lg cursor-pointer">Upload Image</label>
        <input type="file" typeof="image/*" placeholder="Upload Image" className="hidden" id="image"/>

        <button className="bg-blue-500 text-white py-2 h-10 px-4 w-[30%] rounded-lg cursor-pointer" onClick={HandleCreatePost}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
