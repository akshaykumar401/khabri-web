import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const DeletedSuccessfulAlert = ({ setIsDeleted }) => {
  const disappearAlert = () => {
    window.location.reload();
    setIsDeleted(false);
  }

  return (
    <div className="z-[9999] fixed top-2 left-[50%] translate-x-[-50%] bg-green-300 h-24 text-black  rounded-lg w-[300px] flex items-end justify-end">
      <div className="flex gap-1 w-[95%] h-full bg-slate-700 text-white  rounded-lg">
        <div className="w-[85%]">
          <h2 className="text-2xl font-semibold pl-4 pt-2">Success.</h2>
          <p className="pl-4 text-gray-400">Account deleted successfully.</p>
        </div>
        <button className="cursor-pointer rounded-full mt-2 ml-1 w-6 h-6 flex justify-center items-center text-white text-2xl hover:text-purple-500 duration-300 ease-in-out" onClick={disappearAlert}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
};

export default DeletedSuccessfulAlert;
