import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Header,
  Footer,
  AuthenticateForm,
  Loading2,
} from "../src/Components/Components.js";
import axios from "axios";
import { refreshUser } from './Features/User/user.slice.js';
import { viewAllPost } from './Features/Post/post.slice.js';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Automatically scroll to top on any route transition
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Checking User is Logged In or Not
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/apii/api/v1/uses/generateReferanceToken`, {
          withCredentials: true,
        });

        setIsLoading(false);
        if (response.data.statusCode === 200) {
          setIsLoggedIn(false);
          dispatch(refreshUser(response.data.data.user));
          dispatch(viewAllPost());
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

    setIsLoading(true);
    fetchUserData();
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F8F9FA] dark:bg-[#111827] text-[#111827] dark:text-[#F8F9FA] transition-colors duration-200">
      {/* Login & Sign Up Modal */}
      {isLoggedIn && <AuthenticateForm setIsLoggedIn={setIsLoggedIn} />}
      {isLoading && <Loading2 />}

      {/* Main App Layout */}
      <div className={`flex-1 flex flex-col ${isLoggedIn ? "blur-sm pointer-events-none select-none" : ""}`}>
        <Header />

        {/* Content area offset for desktop sidebar */}
        <div className="md:pl-64 lg:pl-72 flex-1 flex flex-col">
          <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
