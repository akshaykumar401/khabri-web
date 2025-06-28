import React from 'react';
import ICON from "../../assets/ICON.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-6 py-4 md:w-[calc(100%-310px)] w-full sm:h-66 h-[24rem] bg-slate-300  md:ml-[305px] mt-1.5 z-10 drop-shadow-xl/25 dark:bg-slate-950 ">
      <div className="flex flex-col sm:flex-row w-full h-[80%] justify-center items-center sm:justify-between">
        <div className="sm:w-[25%] h-full flex gap-2 justify-center items-center">
          <img src={`${ICON}`} alt="ICON" className="h-10" />
          <h2 className="font-['Tagesschrift'] font-bold text-[30px]">Khabri</h2>
        </div>

        <div className="sm:w-[25%] h-full flex justify-start items-start gap-4 flex-col text-left">
          <h2 className="font-['Titillium-Web'] font-bold text-[20px]">Contect On:</h2>
          <ul className="flex flex-col gap-2 text-lg pl-5">
            <li className="hover:scale-110 duration-300 ease-in-out cursor-pointer font-['Titillium-Web'] hover:text-blue-500">
              <Link to="https://www.linkedin.com/in/akshay-kumar-2512b529a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                Linkedin
              </Link>
            </li>
            <li className="hover:scale-110 duration-300 ease-in-out cursor-pointer font-['Titillium-Web'] hover:text-blue-500">
              <Link to="https://github.com/akshaykumar401" target="_blank">
                Github
              </Link>
            </li>
            <li className="hover:scale-110 duration-300 ease-in-out cursor-pointer font-['Titillium-Web'] hover:text-blue-500">
              <Link to="https://discord.gg/uAwGSTCh" target="_blank">
                Discord
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="w-56 mx-auto border-1 border-gray-500" />

      <div className="w-full h-[20%] flex justify-center items-center">
        <span className="pt-2 text-center">copyright &copy; 2025 Khabri All Right Reserved</span>
      </div>
    </div>
  );
};

export default Footer;
