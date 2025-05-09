import react from 'react';
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../src/Components/Components.js";

function App() {
  return (
    <div className="h-screen w-full flex flex-wrap content-between dark:bg-slate-900 bg-slate-200 dark:text-white text-black">
      <div className="w-full h-auto block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
