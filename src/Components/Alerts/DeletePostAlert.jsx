import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { deleteYourPost } from '../../Features/Post/post.slice.js';

const DeletePostAlert = ({ id, setIsAlertOpen, setPostDeletedAlert }) => {
  const dispatch = useDispatch();

  // Handle Cancel Button Event...
  const cancelHandle = () => {
    setIsAlertOpen(false);
  }

  // Handle Logout Button Event...
  const deletePost = () => {
    dispatch(deleteYourPost(id)).then((action) => {
      if(action.type === 'deleteYourPost/fulfilled') {
        setIsAlertOpen(false);
        setPostDeletedAlert(true);
        setTimeout( () => {
          setPostDeletedAlert(false);
        }, 3000);
      }
    })
  }

  return (
    <div className="w-[300px] h-[390px] p-4  z-[9999] bg-white rounded-md  left-[50%] translate-x-[-50%] absolute  ">
      <div className="mx-auto w-16 h-16 mt-4 bg-red-200 rounded-full flex justify-center items-center">
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-3xl text-red-500" />
      </div>
      <span className="text-lg mt-5 px-auto flex justify-center text-black ">Delete Post.</span>
      <p className="text-gray-500 mt-2">
        Are you sure you want to delete this post? Permanently delete this post and remove your data from our servers.
      </p>

      <div className="w-full flex flex-col gap-2 mt-4">
        <button className="bg-red-500 text-white py-2 rounded-lg cursor-pointer" onClick={deletePost}>
          Delete
        </button>

        <button className="bg-gray-500 text-white py-2 rounded-lg cursor-pointer" onClick={cancelHandle}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePostAlert;
