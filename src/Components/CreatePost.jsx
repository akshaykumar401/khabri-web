import React, { useState, useEffect } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const titleLength = document.getElementById("titleLength");
    titleLength.innerText = `${100 - Number(title.length)}`;
  }, [title]);

  return (
    <div className="w-full bg-white text-black px-4 py-2 dark:bg-slate-950 dark:text-white rounded-lg">
      <h2 className="text-lg font-semibold font-['Titillium-Web'] pl-6">
        Create Post
      </h2>
      <div>
        <input placeholder="Title" className="w-full px-4 py-2 mt-2 rounded-lg border-1 dark:border-white border-slate-800 outline-none" maxLength={100} value={title}   onChange={(e) => setTitle(e.target.value)}/>
        <span className="absolute  top-[5.9em] text-sm text-gray-400" id="titleLength">100</span>
      </div>

      <textarea placeholder="post Description" className="w-full px-4 py-2 mt-2 rounded-lg border-1 dark:border-white border-slate-800 outline-none resize-none h-24"></textarea>
      <div className="flex items-center justify-between">
        <input type="file" typeof="image/*" placeholder="Upload Image" className="border-1 border-slate-800 dark:border-white outline-none w-[60%] px-4 py-2 mt-2 rounded-lg"/>

        <button className="bg-blue-500 text-white py-2 h-10 px-4 w-[30%] rounded-lg cursor-pointer">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
