import react from 'react';
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../src/Components/Components.js";

function App() {
  return (
    <div className="min-h-screen flex flex-wrap content-between dark:bg-slate-900 bg-slate-200 dark:text-white text-black">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
