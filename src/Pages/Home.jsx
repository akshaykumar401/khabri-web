import React from 'react';
import { CreatePost, PostCard } from "../Components/Components.js";

const Home = () => {
  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <CreatePost />

        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default Home;
