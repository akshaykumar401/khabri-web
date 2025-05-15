import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const UsernameCard = ({ username }) => {
  const navigate = useNavigate();
  const [isFollowed, SetIsFollowed] = useState(true);

  const openUserProfile = () => {
    navigate(`/profile/${username}`);
  }

  const handleFollowButton = () => {
    SetIsFollowed(!isFollowed);
  }

  return (
    <div className="w-[95%] bg-slate-500 mb-2 rounded-lg mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2 py-1 pl-5 cursor-pointer  w-[85%]" onClick={openUserProfile}>
        <img src="https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc" alt="User Image" className="h-9 w-9 rounded-full"/>
        <span className="text-xl text-black">
          { username }
        </span>
      </div>

      <button className={`${isFollowed ? "text-gray-300" : "text-white" } font-bold cursor-pointer px-4 py-2 z-50`} onClick={handleFollowButton}>
        {isFollowed ? "Followed" : "Follow"}
      </button>
    </div>
  );
};

export default UsernameCard;
