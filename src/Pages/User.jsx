import React, { useEffect } from 'react';
import { ProfileHeader, UserPostCard } from "../Components/Components.js";
import { useSelector, useDispatch } from 'react-redux';
import { allUserPost } from '../Features/Post/post.slice.js';

const User = () => {
  const { userData } = useSelector((state) => state.user);
  const { userPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();


  useEffect(() => {
    if (userData) {
      dispatch(allUserPost(userData._id));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        {/* Profile Header Component */}
        <ProfileHeader
          username={userData && userData.username}
          totalPost={userData && userData.post ? userData.post.length : 0}
          totalFollower={userData && userData.followers ? userData.followers.length : 0}
          totalFollowing={userData && userData.following ? userData.following.length : 0}
          avator={userData && userData.avator}
          isAdmin={true}
        />

        <div className="px-4 mx-auto mt-4 mb-4">
          <h2 className="pl-8 text-2xl mt-2 mb-4 font-['Bree+Serif'] font-style-normal font-semibold">
            All Posts
          </h2>

          {userPost && userPost.length > 0 ? (
            userPost.map((singlePost) => (
              <UserPostCard key={singlePost._id} id={singlePost._id} />
            ))
          ) : (
            <p className="pl-8">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
