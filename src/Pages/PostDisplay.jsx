import React, { useEffect } from 'react';
import { useParams  } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faHeart } from "@fortawesome/free-solid-svg-icons";

const PostDisplay = () => {
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <div className="w-[95%] bg-slate-300 flex  justify-between items-center text-black px-6 py-2 mt-2 rounded-lg h-12">
          <h4 className="text-lg font-semibold flex items-center gap-2 font-['Comic Relief']">
            <img src="https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc" alt="user image" className="w-8 h-8 rounded-full" />
            Username
          </h4>

          <button className="w-9 h-9 rounded-full bg-red-500 flex justify-center items-center cursor-pointer">
            <FontAwesomeIcon icon={faHeart} className="text-xl text-white" />
            <span className="absolute text-lx font-semibold">0</span>
          </button>
        </div>

        <h2 className="mt-4 font-['Comic Relief'] w-full text-xl">
          Post Title. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in urna eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in, cursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.
        </h2>

        <img src="https://imgs.search.brave.com/FYmsuChFcB46GmHEP9uO7qHz1b2vSK1YhJWr8s8m7sM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzE4LzA0LzYz/LzM2MF9GXzcxODA0/NjM2NF9rWGtTWGJG/dVZHeHNBNXVxZFlj/S0Q5SllIMlVrTjVi/Ui5qcGc" alt="Post Reference Image" className="w-[95%] h-64 rounded-xl mt-4" />

        <p className="mt-4 flex flex-wrap w-[95%]">
          eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus
          magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non
          mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in,
          ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque
          eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.
          <br />
          <br />
          eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus
          magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non
          mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in,
          ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque
          eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.
          <br />
          <br />
          eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus
          magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non
          mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in,
          ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque
          eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.
          <br />
          <br />
          eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus
          magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non
          mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in,
          ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque
          eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.
          <br />
          <br />
          eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus
          magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non
          mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in,
          ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque
          eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.
          <br />
          <br />
          eget velit pharetra iaculis. Integer rhoncus lobortis vulputate. Fusce ac dapibus
          magna. Cras finibus orci sit amet euismod hendrerit. Duis dolor mauris, maximus non
          mauris quis, finibus imperdiet ipsum. Nullam neque nunc, posuere rutrum arcu in,
          ursus ullamcorper dui. Nullam ut venenatis neque, sit amet accumsan lectus. Quisque
          eget tortor non justo semper egestas. Duis pellentesque orci eu nunc.
        </p>
      </div>
    </div>
  );
};

export default PostDisplay;
