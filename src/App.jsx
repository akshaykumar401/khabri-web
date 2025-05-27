import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Header, Footer, AuthenticateForm, Loading1, Loading2 } from "../src/Components/Components.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-screen w-full flex flex-wrap dark:text-white text-black">
      {/* Login & and Sign Up Forms */}
      {isLoggedIn && <AuthenticateForm />}
      {isLoading && <Loading2 />}
      <div className={`${isLoggedIn || isLoading ? "blur-sm -z-10" : ""} w-full h-auto block`}>
        {/* Contents */}
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
