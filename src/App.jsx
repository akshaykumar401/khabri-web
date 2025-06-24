import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Header,
  Footer,
  AuthenticateForm,
  Loading1,
  Loading2,
} from "../src/Components/Components.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { refereshToken } from "./Features/User/user.slice.js";
import conf from './Config/config.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchUserData = async (REF) => {
    try {
      const config = {
        headers: {
          Authorization: `${REF}`,
        },
      };
      const response = await axios.get(`${conf.USER_BASE_URL}/generateReferanceToken`, config);

      setIsLoading(false);
      if (response.data.statusCode === 200) {
        setIsLoggedIn(false);
        dispatch(refereshToken(response.data.data));
      } else {
        setIsLoading(false);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsLoggedIn(true);
      console.error("ERROR: ", error.response?.data?.message || error.message);
    }
  };

  // Checking User is Logged In or Not
  useEffect(() => {
    setIsLoading(true);

    // Check if refresh token exists in localStorage
    const REF = localStorage.getItem("refreshToken");
    if (!REF) {
      setIsLoggedIn(true);
      setIsLoading(false);
      return;
    }
    fetchUserData(REF);
  }, []);

  return (
    <div className="h-screen w-full flex flex-wrap dark:text-white text-black">
      {/* Login & and Sign Up Forms */}
      {isLoggedIn && <AuthenticateForm setIsLoggedIn={setIsLoggedIn} />}
      {isLoading && <Loading2 />}
      <div
        className={`${
          isLoggedIn || isLoading ? "blur-sm -z-10" : ""
        } w-full h-auto block`}
      >
        {/* Contents */}
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default App;
