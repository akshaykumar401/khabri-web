import React from 'react';
import { useNavigate } from "react-router-dom";

const PostCard = ({ id }) => {
  const navigate = useNavigate();
  const HandlePostClick = () => {
    navigate(`/post-display/${id}`);
  }

  return (
    <div className="w-full bg-white  text-black px-4 py-2 dark:text-white dark:bg-slate-950 rounded-lg h-98 mb-5 mt-2 cursor-pointer" onClick={HandlePostClick}>
      <div className="w-[100%] py-4 h-10 mt-2 mx-auto rounded-lg bg-slate-600 justify-between flex px-4 items-center inset-shadow-sm inset-shadow-slate-800 text-white">
        <div className="flex gap-1.5 items-center justify-center">
          <img src="https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc" alt="user image" className="rounded-full w-7 h-7" />
          <span className="text-xl">Username</span>
        </div>

        <button className="text-lg cursor-pointer text-blue-600 font-bold hover:scale-110 duration-300 ease-in-out font-['Titillium-Web']">
          Follow
        </button>
      </div>

      <h2 className=" mt-2 font-['Titillium-Web'] w-full text-xl text-ellipsis line-clamp-2" >
        Post Title. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in urna eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in, cursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.
      </h2>

      <img src="https://imgs.search.brave.com/EH7EMedOpk39h_gW5vtD098G2nY5QaV15U7kn-nqJRo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyNS8w/My8wOS8xMC8xNi9z/dW5yaXNlLTk0NTY4/NzFfNjQwLmpwZw" alt="reference image" className="w-full h-48 mt-2" />

      <p className="w-full mt-2 text-ellipsis line-clamp-2">
        eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus
        magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non
        mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in,
        ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque
        eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.
      </p>
    </div>
  );
};

export default PostCard;
