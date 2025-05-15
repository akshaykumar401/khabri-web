import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

const LogoutAccountAlert = ({ setIsShowLogoutAccountAlert, setIsLogout }) => {
  // Handle Cancel Button Event...
  const cancelHandle = () => {
    setIsShowLogoutAccountAlert(false);
  }

  // Handle Logout Button Event...
  const logout = () => {
    setIsShowLogoutAccountAlert(false);
    setIsLogout(true);
    setTimeout( () => {
      setIsLogout(false);
    }, 3000);
  }

  return (
    <div className="w-[300px] h-[350px] p-4  z-[999] bg-white rounded-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] fixed  ">
      <div className="mx-auto w-16 h-16 mt-4 bg-red-200 rounded-full flex justify-center items-center">
        <FontAwesomeIcon icon={faTriangleExclamation} className="text-3xl text-red-500" />
      </div>
      <span className="text-lg mt-5 px-auto flex justify-center text-black ">Logout.</span>
      <p className="text-gray-500 mt-2">
        Are you sure you want to Logout?
      </p>

      <div className="w-full flex flex-col gap-2 mt-4">
        <button className="bg-red-500 text-white py-2 rounded-lg cursor-pointer" onClick={logout}>
          Logout
        </button>

        <button className="bg-gray-500 text-white py-2 rounded-lg cursor-pointer" onClick={cancelHandle}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutAccountAlert;
