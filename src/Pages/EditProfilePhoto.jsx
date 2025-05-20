import React, { useState, useId, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {ERROR, SUCCESSFUL} from "../Components/Components.js";

const EditProfilePhoto = () => {
  const [isNewImage, setIsNewImage] = useState(null);
  const uniqueId = useId();
  const uniqueId2 = useId();

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Removing Error Alert in 3 Seconds
  useEffect(() => {
    if (isErrorOpen) {
      const timer = setTimeout(() => {
        setIsErrorOpen(false);
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isErrorOpen]);

  // Removing Success Alert in 3 Seconds
  useEffect(() => {
    if (isSuccessOpen) {
      const timer = setTimeout(() => {
        setIsSuccessOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccessOpen]);

  // Button Event Handler For Profile Change
  const handleProfileChange = () => {
    if (isNewImage) {
      setIsSuccessOpen(true);
      setSuccessMessage("Profile Photo Changed Successfully");
    } else {
      setIsErrorOpen(true);
      setErrorMessage("Pick an image");
    }
  }

  const UploadNewProfile = () => {
    const imageInput = document.getElementById(uniqueId2);
    imageInput.click();
  }

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen}/>}
      {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen}/>}
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <h2 className="text-2xl mt-2 mb-4 font-['Titillium+Web'] font-semibold pl-6">
          Edit Profile Photo
        </h2>

        <div className="w-full flex flex-col gap-2 justify-center items-center">
          <div className="flex px-4 gap-4 items-center justify-around  bg-slate-200 dark:bg-gray-600 rounded-xl w-[95%] mx-auto h-56">
            <img src="https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc" alt="Old Image" className="h-23 w-23 sm:w-40 sm:h-40 rounded-full border-1" />
            <FontAwesomeIcon icon={faArrowRight} className="text-4xl" />
            <input type="file" className="hidden" id={uniqueId2} onChange={(e) => setIsNewImage(e.target.files[0])}/>
            <img src={isNewImage ? URL.createObjectURL(isNewImage) : "null"} alt="New Image" className="h-23 cursor-pointer w-23 sm:w-40 sm:h-40 rounded-full border-1" id={uniqueId} onClick={UploadNewProfile} />
          </div>
          <button className="w-54 py-2 rounded-lg cursor-pointer hover:bg-blue-400  dark:hover:bg-blue-800 duration-200 ease-in-out bg-blue-600" onClick={handleProfileChange}>Change Profile</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePhoto;
