import React, { useState, useId } from "react";
import Signup from "../../assets/SignUp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faAt,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { signUpUser, loginUser } from "../../Features/User/user.slice.js";
import { ERROR } from "../Components.js";

const SignUp = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();

  const [passwordState, setPasswordState] = useState("password");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const ImageId = useId();

  // Display password Methode...
  const displayPassword = () => {
    if (passwordState === "password") {
      setPasswordState("text");
    } else {
      setPasswordState("password");
    }
  };

  // Handling Submit
  const handleSignUp = (e) => {
    e.preventDefault();

    if (
      !e.target.email.value ||
      !e.target.password.value ||
      !e.target.name.value ||
      !e.target.username.value
    ) {
      setError("Please fill all the fields");
      setIsErrorOpen(true);
      setTimeout(() => {
        setIsErrorOpen(false);
      }, 3000);
      return;
    }

    const formData = new FormData();
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    formData.append("fullName", e.target.name.value);
    formData.append("username", e.target.username.value);
    formData.append("avator", profileImage);

    dispatch(signUpUser(formData)).then((action) => {
      if (action.type === "signUpUser/fulfilled") {
        const userInfo = {
          email: e.target.email.value,
          password: e.target.password.value
        };
        console.log(userInfo);
        e.target.reset();
        dispatch(loginUser(userInfo)).then((action) => {
          if (action.type === 'loginUser/fulfilled') {
            setIsLoggedIn(false);
          } else {
            setIsLoggedIn(true);
          }
        })
      }
    });
  };

  return (
    <div className="bg-white sm:pb-0 pb-5 rounded-lg text-black flex-col-reverse items-center sm:flex-row sm:items-start flex justify-around w-full sm:h-full">
      {isErrorOpen && <ERROR text={error} setIsErrorOpen={setIsErrorOpen} />}
      <div className="sm:w-[45%] w-[95%] py-4 pb-8 h-[90%] mt-2 sm:mt-4 p-2 border-1 rounded-lg">
        <form className="flex flex-col gap-2" onSubmit={handleSignUp}>
          <div className="flex items-center justify-between">
            <label
              className="text-xl bg-green-400 hover:bg-green-500 cursor-pointer duration-400 active:scale-95 ease-in-out font-['Titillium+Web'] border-1 p-2 rounded-lg mt-4"
              htmlFor={ImageId}
            >
              Profile Picture
            </label>
            <input
              type="file"
              className="hidden"
              name="avator"
              id={ImageId}
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            {profileImage && (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="profile"
                className="h-16 w-16 rounded-full"
              />
            )}
          </div>
          <div className="border-1 p-2 rounded-lg mt-4">
            <FontAwesomeIcon
              icon={faSignature}
              className="text-xl mr-2 font-light"
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-[80%] outline-none"
              name="name"
            />
          </div>
          <div className="border-1 p-2 rounded-lg mt-4">
            <FontAwesomeIcon icon={faAt} className="text-xl mr-2 font-light" />
            <input
              type="text"
              placeholder="Username"
              className="w-[80%] outline-none"
              name="username"
            />
          </div>
          <div className="border-1 p-2 rounded-lg mt-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-xl mr-2 font-light"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-[80%] outline-none"
              name="email"
            />
          </div>
          <div className="border-1 p-2 rounded-lg mt-4 flex w-full">
            <FontAwesomeIcon
              icon={faLock}
              className="text-xl mr-2 font-light"
            />
            <input
              type={passwordState}
              placeholder="Password"
              className="outline-none w-[80%]"
              name="password"
            />
            {passwordState === "password" ? (
              <FontAwesomeIcon
                icon={faEye}
                className="text-xl mr-2 font-light cursor-pointer"
                onClick={displayPassword}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="text-xl mr-2 font-light cursor-pointer"
                onClick={displayPassword}
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-slate-500 text-white py-2 rounded-lg cursor-pointer mt-3 active:scale-95 duration-200 ease-in-out hover:bg-slate-600"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="sm:w-[50%] w-full">
        <h2 className="pl-4 text-2xl sm:text-4xl font-semibold text-left font-['Tagesschrift'] mt-2">
          Khabri
        </h2>
        <img
          src={Signup}
          alt="Welcome"
          className="sm:w-[65%] w-[40%] mx-auto"
        />
        <h3 className="text-2xl font-semibold text-center font-['Titillium+Web']">
          SignUp Here!
        </h3>
        <p className="text-lg sm:mt-0 text-gray-500 sm:w-full w-[80%] mx-auto text-center font-['Titillium+Web']">
          To get started with Khabri, Please Sign Up to your Account by Filling
          out the form.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
