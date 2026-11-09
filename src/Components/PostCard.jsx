import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../Features/User/user.slice.js';

const PostCard = ({ id }) => {
  const navigate = useNavigate();
  const [displayFollowButton, SetDisplayFollowButton] = useState(true);
  const [isFollowed, SetIsFollowed] = useState(false);
  const { allPost } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const singlePost = allPost?.find((post) => post._id === id);

  useEffect(() => {
    if (singlePost) {
      const followers = singlePost.user?.followers || [];
      if (userData?._id && followers.includes(userData._id)) {
        SetIsFollowed(true);
        SetDisplayFollowButton(false);
      }
      if (singlePost.user?._id && userData?._id && singlePost.user._id === userData._id) {
        SetDisplayFollowButton(false);
      }
    }
  }, [singlePost, userData]);

  if (!singlePost) {
    return null;
  }

  const HandlePostClick = () => {
    navigate(`/post-display/${id}`);
  };

  const HandleFollow = () => {
    const postUserId = singlePost.user?._id;
    if (!postUserId) return;
    if (!isFollowed) {
      dispatch(followUser(postUserId)).then(() => {
        SetIsFollowed(true);
      });
    } else {
      dispatch(unfollowUser(postUserId)).then(() => {
        SetIsFollowed(false);
      });
    }
  };

  const OpenProfile = () => {
    if (singlePost.user?.username) {
      navigate(`/profile/${singlePost.user.username}`);
    }
  };

  const avatarSrc =
    singlePost.user?.avator && singlePost.user.avator !== "default.jpeg"
      ? singlePost.user.avator
      : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";

  return (
    <div className="w-full bg-white text-black px-4 py-2 dark:text-white dark:bg-slate-950 rounded-lg h-98 mb-5 mt-2 cursor-pointer">
      <div className="w-[100%] py-4 h-10 mt-2 mx-auto rounded-lg bg-slate-600 justify-between flex px-4 items-center inset-shadow-sm inset-shadow-slate-800 text-white">
        <div className="flex gap-1.5 items-center justify-start w-[calc(100%-100px)]" onClick={OpenProfile}>
          <img src={avatarSrc} alt="user image" className="rounded-full w-7 h-7" />
          <span className="text-xl">{singlePost.user?.fullName || ""}</span>
        </div>

        <button className={`${ displayFollowButton ? "" : "hidden" } ${isFollowed ? "text-white" : "text-blue-600" } text-lg cursor-pointer  font-bold hover:scale-105 duration-300 ease-in-out font-['Titillium-Web'] w-24`} onClick={HandleFollow}>
          {isFollowed ? "Followed" : "Follow"}
        </button>
      </div>

      <div onClick={HandlePostClick}>
        <h2 className=" mt-2 font-['Titillium-Web'] w-full text-xl text-ellipsis line-clamp-2" >
          {singlePost.title || ""}
        </h2>

        {singlePost.referanceImage && (
          <img src={singlePost.referanceImage} alt={singlePost.title || "post image"} className='h-56 w-full mt-2 rounded-lg object-cover' />
        )}

        <p className="w-full mt-2 text-ellipsis line-clamp-2">
          {singlePost.description || ""}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
