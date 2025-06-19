import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const PostCard = ({ id }) => {
  const navigate = useNavigate();
  const [displayFollowButton, SetDisplayFollowButton] = useState(true)
  const [isFollowed, SetIsFollowed] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  const { allPost } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);

  // SetDisplayFollowButton(isFollowButton);

  useEffect(() => {
    const post = allPost.filter((post) => post._id === id);
    setSinglePost(post);
    if (post.length > 0) {
      post[0]?.user?.followers?.map((ids) => {
        if (ids === userData._id) {
          SetIsFollowed(true);
          SetDisplayFollowButton(false);
        }
      })
      if (post[0]?.user?._id === userData?._id){
        SetDisplayFollowButton(false);
      }
    }
  }, [allPost]);
  
  const HandlePostClick = () => {
    navigate(`/post-display/${id}`);
  }

  const HandleFollow = () => {
    SetIsFollowed(!isFollowed);
  }

  const OpenProfile = () => {
    navigate(`/profile/${singlePost[0]?.user?.username}`);
  }

  return (
    <div className="w-full bg-white  text-black px-4 py-2 dark:text-white dark:bg-slate-950 rounded-lg h-98 mb-5 mt-2 cursor-pointer">
      <div className="w-[100%] py-4 h-10 mt-2 mx-auto rounded-lg bg-slate-600 justify-between flex px-4 items-center inset-shadow-sm inset-shadow-slate-800 text-white">
        <div className="flex gap-1.5 items-center justify-start w-[calc(100%-100px)]" onClick={OpenProfile}>
          <img src={singlePost[0]?.user.avator !== "default.jpeg" ? singlePost[0]?.user.avator : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc"} alt="user image" className="rounded-full w-7 h-7" />
          <span className="text-xl">{singlePost[0]?.user ? singlePost[0]?.user?.fullName : ""}</span>
        </div>

        <button className={`${ displayFollowButton ? "" : "hidden" } ${isFollowed ? "text-white" : "text-blue-600" } text-lg cursor-pointer  font-bold hover:scale-105 duration-300 ease-in-out font-['Titillium-Web'] w-24`} onClick={HandleFollow}>
          {isFollowed ? "Followed" : "Follow"}
        </button>
      </div>

      <div onClick={HandlePostClick}>
        <h2 className=" mt-2 font-['Titillium-Web'] w-full text-xl text-ellipsis line-clamp-2" >
          {singlePost[0]?.title ? singlePost[0]?.title : ""}
        </h2>

        <img src={singlePost[0]?.referanceImage && singlePost[0]?.referanceImage} className='h-56 w-full mt-2 rounded-lg' />

        <p className="w-full mt-2 text-ellipsis line-clamp-2">
          {singlePost[0]?.description ? singlePost[0]?.description : ""}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
