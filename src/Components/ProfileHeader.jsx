import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProfileHeader = ({ username, totalPost, totalFollower, totalFollowing, avator, isAdmin=false }) => {
  const [isFollowed, SetIsFollowed] = useState(false);
  const { userData, otherUser } = useSelector((state) => state.user);

  useEffect(() => {
    setTimeout(() => {
      userData?.following?.map((ids) => {
      if (ids === otherUser._id) {
        SetIsFollowed(true);
      }
    })
    }, 1000);
  }, [otherUser, userData])

  const handleFollow = () => {
    SetIsFollowed(!isFollowed);
  }

  return (
    <div className="w-[95%] bg-slate-400 flex  justify-between items-center text-black sm:px-10 py-2 mt-2 rounded-lg h-40 mx-auto">
      <div className="flex flex-col items-center sm:h-29 sm:w-32 w-28 h-28">
        <img src={avator !== "default.jpeg" ? avator: "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc"} alt="User Image" className="sm:h-24 sm:w-24 h-20 w-20 rounded-full" />
        <span className="text-2xl mt-0.5">{username}</span>
      </div>

      <div className="flex flex-row items-center gap-2 text-xl w-[50%] h-29 ">
        <ul className="flex flex-col gap-1 w-full text-[16px]">
          <li>
            <span className="font-semibold">Total Posts:</span> {totalPost}
          </li>
          <li>
            <span className="font-semibold">Total Followers:</span> {totalFollower}
          </li>
          <li>
            <span className="font-semibold">Total Following:</span> {totalFollowing}
          </li>
          { !isAdmin && <li>
            <button className={`${isFollowed ? "text-gray-300" : "text-white" } bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded-xl cursor-pointer duration-300 ease-in-out mt-1 `} onClick={handleFollow}>
              {isFollowed ? "Followed" : "Follow"}
            </button>
          </li>}
        </ul>
      </div>
    </div>
  );
};

export default ProfileHeader;
