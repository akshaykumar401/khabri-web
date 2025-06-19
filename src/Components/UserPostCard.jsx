import React, { useId, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faBars } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import { DeletePostAlert, DeletePostSuccessFullAlert } from "../Components/Components.js";
import { useSelector } from 'react-redux';

const UserPostCard = ({ id }) => {
  const navigate = useNavigate();
  const uniqueId = useId();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [postDeletedAlert, setPostDeletedAlert] = useState(false);

  // Filtering Post as The post id is Match...
  const { userPost } = useSelector((state) => state.post);
  const singlePost = userPost.filter((post) => post._id === id);

  const HandlePostClick = () => {
    navigate(`/post-display/${id}`);
  }

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  }

  const displayMenu = () => {
    const list = document.getElementById(uniqueId);

    if (list.style.display === "flex") {
      list.style.display = "none";
    } else {
      list.style.display = "flex";
    }
  }

  const deletePostAlert = () => {
    document.getElementById(uniqueId).style.display = "none";
    setIsAlertOpen(true);
  }

  return (
    <div className="w-full bg-white  text-black px-4 py-2 dark:text-white dark:bg-slate-950 rounded-lg h-98 mb-5 mt-2 cursor-pointer">
      {isAlertOpen && <DeletePostAlert id={id} setIsAlertOpen={setIsAlertOpen} setPostDeletedAlert={setPostDeletedAlert} />}
      {postDeletedAlert && <DeletePostSuccessFullAlert setPostDeletedAlert={setPostDeletedAlert} />}

      <div className="w-[100%] py-4 h-10 mt-2 mx-auto rounded-lg bg-slate-600 justify-between flex px-4 items-center inset-shadow-sm inset-shadow-slate-800 text-white">
        <div className="flex gap-1.5 items-center justify-start w-[calc(100%-100px)]">
          <img src={singlePost[0].user.avator !== "default.jpeg" ? singlePost[0].user.avator : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc"} alt="user image" className="rounded-full w-7 h-7" />
          <span className="text-xl">{singlePost[0].user.avator ? singlePost[0].user.fullName : ""}</span>
        </div>

        <button className={`text-white text-lg cursor-pointer  font-bold hover:scale-105 duration-300 ease-in-out font-['Titillium-Web'] w-8`} onClick={displayMenu}>
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>

      </div>
      {/* Nested List For Admin Menu */}
      <ul className=" bg-white w-50 flex-col gap-2 justify-center items-center absolute left-[60%] translate-x-[-25%] hidden text-black p-2 rounded-md shadow-md" id={uniqueId}>
        <li>
          <button className="hover:text-blue-600 duration-150 ease-in-out cursor-pointer" onClick={handleEdit}>
            Edit Post
          </button>
        </li>
        <li className="border-t border-gray-300 pt-2">
          <button className="hover:text-red-600 duration-150 ease-in-out cursor-pointer" onClick={deletePostAlert}>
            Delete Post
          </button>
        </li>
      </ul>

      <div onClick={HandlePostClick}>
        <h2 className=" mt-2 font-['Titillium-Web'] w-full text-xl text-ellipsis line-clamp-2" >
          {singlePost[0].title ? singlePost[0].title : ""}
        </h2>

        <img src={singlePost[0].referanceImage ? singlePost[0].referanceImage : ""} alt="reference image" className="w-full h-48 mt-2 rounded-lg" />

        <p className="w-full mt-2 text-ellipsis line-clamp-2">
          {singlePost[0].description ? singlePost[0].description : ""}
        </p>
      </div>
    </div>
  );
};

export default UserPostCard;
