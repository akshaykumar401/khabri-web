import React, { useState, useEffect } from 'react';
import { UsernameCard } from "../Components/Components.js";
import { useSelector, useDispatch } from 'react-redux';
import { getFollowUserProfile } from '../Features/User/user.slice.js';

const Followed = () => {
  const dispatch = useDispatch();
  const { followedUser } = useSelector((state) => state.user);
  const [allProfile, setAllProfile] = useState([]);

  useEffect(() => {
    dispatch(getFollowUserProfile())
  }, [])

  useEffect(() => {
    if(followedUser.length > 0) {
      setAllProfile(followedUser);
    }
  }, [followedUser])

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <h2 className="pl-8 text-2xl mt-2 mb-4 font-['Titillium+Web'] font-semibold">
          All Followed
        </h2>

        {allProfile?.map((profile) => {
          return (
            <UsernameCard key={profile._id} username={profile.username} />
          )
        })}
      </div>
    </div>
  );
};

export default Followed;
