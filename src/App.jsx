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
import { refreshUser } from './Features/User/user.slice.js';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/api/v1/uses/generateReferanceToken`, {
        withCredentials: true,
      });

      setIsLoading(false);
      if (response.data.statusCode === 200) {
        setIsLoggedIn(false);
        dispatch(refreshUser(response.data.data.user))
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
    fetchUserData();
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
