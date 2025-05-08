import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full">
      {/* Nav Bar Code. */}
      <div className="bg-slate-300 text-black dark:bg-slate-950 dark:text-white w-full h-12 font-semibold text-3xl flex items-center justify-start pl-16 font-['Tagesschrift']">Home</div>

      {/* Side Bar Code */}
      <div className="bg-slate-300 text-black dark:bg-slate-950 dark:text-white w-98 h-screen text-lg flex justify-start pl-2 pt-8 border-slate-400 dark:border-slate-900 border-t-1">
        <ol className="pl-4 font-['Titillium Web']">
          <li className="text-blue-600 hover:text-blue-800">
            <Link to="/">Home</Link>
          </li>
          <hr className="w-56 mx-16 mt-3 border-slate-400 dark:border-slate-900 border-1" />
        </ol>
      </div>
    </div>
  );
};

export default Header;
