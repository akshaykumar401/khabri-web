import React, { useEffect, useId } from 'react';
import { useParams  } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Comments } from "../Components/Components.js";

const PostDisplay = () => {
  const { id } = useParams()
  const uniqueId = useId()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sendComment = () => {
    const commentInput = document.getElementById(uniqueId);
    const comment = commentInput.value;
    console.log(comment)
    commentInput.value = "";
  }

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


        <div className="mt-6 bg-slate-500 p-2 rounded-lg">
          <h2 className="text-lg font-semibold flex items-center gap-2 font-['Comic Relief']">
            comments
          </h2>
          {/* Send Comment */}
          <div className="flex items-center w-[95%] mx-auto mt-4">
            <input className="border-1 p-2 rounded-l-lg border-r-0 w-[90%] outline-none" placeholder="Write a comment..." id={uniqueId}/>
            <button className="bg-slate-600 p-2 w-[10%] hover:bg-slate-500 cursor-pointer duration-200 ease-in-out text-white border-1 border-l-0 rounded-r-lg" onClick={sendComment}>
              <FontAwesomeIcon icon={faPaperPlane} className="text-xl"/>
            </button>
          </div>

          <Comments username={"jon_doe"} comment={"Hii This is a comment"} />
          <Comments username={"Aman"} comment={"Hello My Name is Aman"} />
          <Comments username={"jon_doe"} comment={"Hello My Name is Jon"} />
          <Comments username={"aditya"} comment={"Hello My Name is Aditya"} />
        </div>
      </div>

    </div>
  );
};

export default PostDisplay;
