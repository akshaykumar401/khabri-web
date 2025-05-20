import React, { useId, useState, useEffect } from 'react';
import { ERROR, SUCCESSFUL } from "../Components/Components.js";

const EditProfileDetail = () => {
  const uniqueId = useId();
  const uniqueId2 = useId();
  const [name, setName] = useState("Jon Doe");
  const [username, setUsername] = useState("jon_doe");
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

  const handleProfileChange = () => {
    if (!name || !username) {
      setErrorMessage("Please fill all the fields");
      setIsErrorOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);

    console.log(name, username);
    console.log(formData);
    setSuccessMessage("Profile Updated Successfully");
    setIsSuccessOpen(true);
  }

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      {isErrorOpen && <ERROR text={errorMessage} setIsErrorOpen={setIsErrorOpen}/>}
      {isSuccessOpen && <SUCCESSFUL text={successMessage} setIsSuccessOpen={setIsSuccessOpen}/>}
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <h2 className="pl-6 text-2xl mt-2 mb-4 font-['Titillium+Web'] font-semibold">Edit Profile Detail</h2>

        <div className="w-full flex flex-col pb-4 gap-2 justify-center items-center">
          <div className="flex px-4 gap-4 items-center justify-start bg-slate-200 dark:bg-gray-600 rounded-xl w-[95%] mx-auto sm:h-56 h-auto pb-8 flex-col">
            <div className="w-full flex flex-col sm:flex-row sm:justify-center sm:items-center gap-0.5 mt-4 sm:h-12">
              <label htmlFor={uniqueId} className="w-30 pt-3 font-semibold text-lg ">New Name: </label>
              <input placeholder="New Name" className="sm:w-[calc(100%-120px)] h-12 px-2 mt-4 rounded-lg bg-transparent outline-none border-1" id={uniqueId} value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="w-full flex flex-col sm:flex-row sm:justify-center sm:items-center gap-0.5 mt-4 sm:h-12">
              <label htmlFor={uniqueId2} className="sm:w-30 pt-3 font-semibold text-lg ">New username: </label>
              <input placeholder="New Name" className="sm:w-[calc(100%-120px)] h-12 px-2 mt-4 rounded-lg bg-transparent outline-none border-1" id={uniqueId2} value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
          </div>
          <button className="w-54 py-2 rounded-lg cursor-pointer hover:bg-blue-400  dark:hover:bg-blue-800 duration-200 ease-in-out bg-blue-600" onClick={handleProfileChange}>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileDetail;
