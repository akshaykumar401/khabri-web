import React, {useState} from 'react';
import { Login, SignUp, ForgetPassword } from "../Components.js";

const AuthenticateForm = () => {
  const [activeState, setActiveState] = useState(0);

  const changeAuthState = () => {
    if (activeState === 0) {
      setActiveState(1);
    } else {
      setActiveState(0);
    }
  }

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[50%] mx-auto h-[65vh] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-slate-500 rounded-lg sm:overflow-hidden">
      <div className="w-full text-black text-2xl font-semibold font-['Comic+Relief'] flex justify-around h-[60px] border-0">
        <button className={`${activeState === 0 ? 'bg-white' : 'bg-slate-500 text-white'} cursor-pointer w-[50%] py-2 rounded-br-2xl duration-600 ease-in-out`} onClick={changeAuthState}>Login</button>
        <button className={`${activeState === 1 ? 'bg-white' : 'bg-slate-500 text-white'}  cursor-pointer w-[50%] py-2 rounded-bl-2xl duration-600 ease-in-out border-none`} onClick={changeAuthState}>Sign Up</button>
      </div>
      <div className="w-full h-[calc(100%-60px)] bg-white">
        {activeState === 0 && <Login setActiveState={setActiveState} />}
        {activeState === 1 && <SignUp />}
        {activeState === 2 && <ForgetPassword />}
      </div>
    </div>
  );
};

export default AuthenticateForm;