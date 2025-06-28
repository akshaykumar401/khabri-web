import React, { useEffect, useState } from 'react';
import { CreatePost, PostCard } from "../Components/Components.js";
import { useSelector, useDispatch } from 'react-redux';
import { viewAllPost } from '../Features/Post/post.slice.js';

const Home = () => {
  const dispatch = useDispatch();
  const { allPost } = useSelector((state) => state.post);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (allPost) {
      setPosts(allPost);
    }
  }, [allPost]);

  useEffect(() => {
    dispatch(viewAllPost());
  }, []);

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <CreatePost />

        {/* Disppling All Posts */}
        {posts?.map((post) => {
          return <PostCard key={post._id} id={post._id} />
        })}

      </div>
    </div>
  );
};

export default Home;
