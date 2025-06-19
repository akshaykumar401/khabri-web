import React, {useEffect, useState} from 'react';
import { useParams  } from "react-router-dom"
import { ProfileHeader, PostCard } from "../Components/Components.js";
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserData } from '../Features/User/user.slice.js';

const OtherUserProfile = () => {
  const { username } = useParams()
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { otherUser, userData } = useSelector((state) => state.user);

  useEffect(() => {
    setData(otherUser);
    setIsAdmin(userData?._id === data?._id ? true : false)
  }, [otherUser]);

  useEffect(() => {
    dispatch(getOtherUserData(username));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        {/* Profile Header Component */}
        <ProfileHeader
          username={ data ? data?.fullName : "" }
          totalPost={data && data?.post ? data?.post.length : 0}
          totalFollower={data && data?.followers ? data?.followers.length : 0}
          totalFollowing={data && data?.following ? data?.following.length : 0}
          avator={data && data?.avator}
          isAdmin={isAdmin}
        />

        <div className="px-4 mx-auto mt-4 mb-4">
          <h2 className="pl-8 text-2xl mt-2 mb-4 font-['Bree+Serif'] font-style-normal font-semibold">
            All Posts
          </h2>

          {data && data?.post?.length > 0 ? (
            data?.post?.map((singlePost) => (
              // <PostCard key={singlePost._id} id={singlePost._id} />
              <PostCard id={singlePost._id} key={singlePost._id} isFollowButton={isAdmin} username={username}/>
            ))
          ) : (
            <p className="pl-8">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
