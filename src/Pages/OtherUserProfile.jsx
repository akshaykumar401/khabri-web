import React, {useEffect} from 'react';
import { useParams  } from "react-router-dom"
import { ProfileHeader, PostCard } from "../Components/Components.js";

const OtherUserProfile = () => {
  const { username } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        {/* Profile Header Component */}
        <ProfileHeader username={ username } totalPost={84} totalFollower={"67K"} totalFollowing={"3K"}/>

        <div className="px-4 mx-auto mt-4 mb-4">
          <h2 className="pl-8 text-2xl mt-2 mb-4 font-['Bree+Serif'] font-style-normal font-semibold">
            All Posts
          </h2>

          <PostCard id={12} isFollowButton={false} username={username}/>
          <PostCard id={12} isFollowButton={false} username={username}/>
          <PostCard id={12} isFollowButton={false} username={username}/>
          <PostCard id={12} isFollowButton={false} username={username}/>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
