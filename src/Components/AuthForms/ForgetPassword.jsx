import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faEnvelope, faEye, faEyeSlash, faLock} from "@fortawesome/free-solid-svg-icons";
import ForgetPass from "../../assets/ForgetPass.jpg";

const ForgetPassword = () => {
  const [passwordState, setPasswordState] = useState("password");
  const [conformPasswordState, setConformPasswordState] = useState("password");

  const handleForgetPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const conformPassword = e.target.conformPassword.value;
    const password = e.target.password.value;

    console.log(email, username, conformPassword, password);
  }

  // Display conform password Methode...
  const displayConformPassword = () => {
    if(conformPasswordState === "password") {
      setConformPasswordState("text");
    } else {
      setConformPasswordState("password");
    }
  }

  // Display password Methode...
  const displayPassword = () => {
    if(passwordState === "password") {
      setPasswordState("text");
    } else {
      setPasswordState("password");
    }
  }

  return (
    <div className="bg-white sm:pb-0 pb-5 rounded-lg text-black flex-col-reverse items-center sm:flex-row sm:items-start flex justify-around w-full sm:h-full">
      <div className="sm:w-[45%] w-[95%] py-4 pb-8 h-[90%] mt-2 sm:mt-4 p-2 border-1 rounded-lg">
        <form className="flex flex-col gap-2" onSubmit={handleForgetPassword}>
          <div className="border-1 p-2 rounded-lg mt-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl mr-2 font-light" />
            <input type="email" placeholder="Email" className="w-[80%] outline-none" required name="email"/>
          </div>
          <div className="border-1 p-2 rounded-lg mt-4">
            <FontAwesomeIcon icon={faAt} className="text-xl mr-2 font-light" />
            <input type="text" placeholder="Username" className="w-[80%] outline-none" required name="username"/>
          </div>
          <div className="border-1 p-2 rounded-lg mt-4 flex w-full">
            <FontAwesomeIcon icon={faLock} className="text-xl mr-2 font-light" />
            <input type={passwordState} placeholder="New Password" className="outline-none w-[80%]" required name="password"/>
            {passwordState === "password" ? <FontAwesomeIcon icon={faEye} className="text-xl mr-2 font-light cursor-pointer" onClick={displayPassword}/> : <FontAwesomeIcon icon={faEyeSlash} className="text-xl mr-2 font-light cursor-pointer" onClick={displayPassword}/>}
          </div>
          <div className="border-1 p-2 rounded-lg mt-4 flex w-full">
            <FontAwesomeIcon icon={faLock} className="text-xl mr-2 font-light" />
            <input type={conformPasswordState} placeholder="Conform Password" className="outline-none w-[80%]" required name="conformPassword"/>
            {conformPasswordState === "password" ? <FontAwesomeIcon icon={faEye} className="text-xl mr-2 font-light cursor-pointer" onClick={displayConformPassword}/> : <FontAwesomeIcon icon={faEyeSlash} className="text-xl mr-2 font-light cursor-pointer" onClick={displayConformPassword}/>}
          </div>
          <button type="submit" className="bg-slate-500 text-white py-2 rounded-lg cursor-pointer mt-3 active:scale-95 duration-200 ease-in-out hover:bg-slate-600">Reset</button>
        </form>
      </div>

      <div className="sm:w-[50%] w-full">
        <h2 className="pl-4 text-2xl sm:text-4xl font-semibold text-left font-['Tagesschrift'] mt-2">Khabri</h2>
        <img src={ForgetPass} alt="Forget Password" className="sm:w-[65%] w-[40%] mx-auto mt-4" />
        <h3 className="text-2xl font-semibold text-center font-['Titillium+Web']">Forget Password!</h3>
        <p className="text-lg sm:mt-0 text-gray-500 sm:w-full w-[80%] mx-auto text-center font-['Titillium+Web']">
          Fill out the form to reset your password.
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;