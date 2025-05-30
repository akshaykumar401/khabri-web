import React from 'react';
import { UsernameCard } from "../Components/Components.js";

const Followed = () => {
  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <h2 className="pl-8 text-2xl mt-2 mb-4 font-['Titillium+Web'] font-semibold">
          All Followed
        </h2>

        <UsernameCard username={"jon"} />
        <UsernameCard username={"aman"} />
      </div>
    </div>
  );
};

export default Followed;
