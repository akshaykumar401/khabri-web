import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUsers, faUpload, faUser, faGear, faCaretDown, faRightFromBracket, faTrashCan, faUserPen, faPenToSquare, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { Switch, DeleteAccountAlert, LogoutAccountAlert, DeletedSuccessfulAlert, LogoutSuccessfulAlert } from "../Components.js";

const Header = () => {
  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isShowDeleteAccountAlert, setIsShowDeleteAccountAlert] = useState(false);
  const [isShowLogoutAccountAlert, setIsShowLogoutAccountAlert] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  // Hendling Display Setting Menu Cilck...
  const diplayAllSettingMenu = () => {
    const settingArrow = document.getElementById("settingArrow");
    const allSettingMenu = document.getElementById("allSettingMenu");

    if(isSettingMenuOpen) {
      settingArrow.style.transform = "rotate(0deg)";
      allSettingMenu.style.height = "0px";
      setIsSettingMenuOpen(!isSettingMenuOpen);
    } else {
      settingArrow.style.transform = "rotate(180deg)";
      allSettingMenu.style.height = "150px";
      setIsSettingMenuOpen(!isSettingMenuOpen);
    }
  }

  // Display List Method....
  const displayList = () => {
    const list = document.getElementById("fullList");

    if (isListOpen) {
      list.style.height = "0px";
      setIsListOpen(!isListOpen);
    } else {
      list.style.height = "520px";
      setIsListOpen(!isListOpen);
    }
  }

  // Delete Account Alert Button Event Handler...
  const deleteAccountAlert = () => {
    setIsShowLogoutAccountAlert(false);
    setIsShowDeleteAccountAlert(true);
  }

  // Logout Alert Button Event Handler...
  const logoutAlert = () => {
    setIsShowDeleteAccountAlert(false);
    setIsShowLogoutAccountAlert(true);
  }

  return (
    <div className="w-full">
      {isShowDeleteAccountAlert && <DeleteAccountAlert setIsShowDeleteAccountAlert={setIsShowDeleteAccountAlert} setIsDeleted={setIsDeleted} />}
      {isShowLogoutAccountAlert && <LogoutAccountAlert setIsShowLogoutAccountAlert={setIsShowLogoutAccountAlert} setIsLogout={setIsLogout} />}
      {isDeleted  && <DeletedSuccessfulAlert setIsDeleted={setIsDeleted} /> }
      {isLogout  && <LogoutSuccessfulAlert setIsLogout={setIsLogout} /> }

      {/* Nav Bar Code. */}
      <div className="bg-slate-300 fixed z-10 text-black dark:bg-slate-950 dark:text-white w-full h-12 font-semibold text-3xl flex items-center md:justify-center justify-between gap-4 px-16 font-['Tagesschrift'] drop-shadow-xl">
        <span className=" drop-shadow-xl/50">Khabri</span>

        <button className="md:hidden block cursor-pointer" onClick={displayList}>
          <FontAwesomeIcon icon={faBarsStaggered}/>
        </button>
      </div>

      <div className="md:h-full h-0 md:p-3 space-y-2 md:w-[300px] w-full z-50 flex flex-col justify-start items-center bg-slate-300 dark:bg-slate-950 dark:text-white text-black border-t border-t-gray-50 dark:border-t-white fixed top-12 left-0 drop-shadow-xl/50  md:block overflow-hidden duration-300 ease-in-out" id="fullList">
        <div className="flex items-center p-2 space-x-4">
          <img
            src="https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc"
            alt="User Image"
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <div>
            <h2 className="text-lg font-semibold">Jon Doe</h2>
            <span className="flex items-center space-x-1">
              <Link to="/user" className="text-xs hover:underline text-blue-600">
                <span>View profile</span>
              </Link>
            </span>
          </div>
        </div>

        <div className="divide-y dark:divide-gray-300">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="dark:text-white">
              <NavLink to='/' className={({ isActive }) => `${isActive ? "bg-blue-300 dark:bg-blue-950 text-white font-bold w-[288px] md:rounded-r-none" : "text-black dark:text-white" } flex items-center p-2 space-x-3 rounded-md duration-300 ease-in-out justify-start`}>
                <FontAwesomeIcon icon={faHouse} className="text-xl" />
                <span>Home</span>
              </NavLink>
            </li>
            <li className=" dark:text-white">
              <NavLink to='/upload-post'  className={({ isActive }) => `${isActive ? "bg-blue-300 dark:bg-blue-950 text-white font-bold w-[288px] md:rounded-r-none" : "text-black dark:text-white" } flex items-center p-2 space-x-3 rounded-md duration-300 ease-in-out`}>
                <FontAwesomeIcon icon={faUpload} className="text-xl" />
                <span>Upload Post</span>
              </NavLink>
            </li>
            <li className=" dark:text-white">
              <NavLink to='/followed'  className={({ isActive }) => `${isActive ? "bg-blue-300 dark:bg-blue-950 text-white font-bold w-[288px] md:rounded-r-none" : "text-black dark:text-white" } flex items-center p-2 space-x-3 rounded-md duration-300 ease-in-out`}>
                <FontAwesomeIcon icon={faUsers} className="text-xl" />
                <span>Followed</span>
              </NavLink>
            </li>
            <li className="dark:text-white">
              <NavLink to='/user'  className={({ isActive }) => `${isActive ? "bg-blue-300 dark:bg-blue-950 text-white font-bold w-[288px] md:rounded-r-none" : "text-black dark:text-white" } flex items-center p-2 space-x-3 rounded-md duration-300 ease-in-out`}>
                <FontAwesomeIcon icon={faUser} className="text-xl" />
                <span>User</span>
              </NavLink>
            </li>
          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li>
              <button className="flex items-center w-[288px] p-2 space-x-3 rounded-md cursor-pointer" onClick={diplayAllSettingMenu}>
                <FontAwesomeIcon icon={faGear} className="text-xl" />
                <span className="flex justify-between w-full items-center">
                  <span>Setting</span>
                  <FontAwesomeIcon icon={faCaretDown} className="text-2xl" id="settingArrow"/>
                </span>
              </button>
            </li>

            {/* More Setting List */}
            <ul className="pt-0 overflow-hidden duration-200 ease-in-out h-0 pl-16 pb-2 space-y-1 text-[16px]" id="allSettingMenu">
              <li className="pt-1 w-[224px]">
                <NavLink to="/edit-profile-photo" className={({ isActive }) => `${isActive ? "bg-blue-300 dark:bg-blue-950 text-white font-bold w-full py-2 pl-4 md:rounded-r-none" : "text-black dark:text-white" } text-black dark:text-white flex gap-2 items-center duration-200 ease-in-out rounded-xl`}>
                  <FontAwesomeIcon icon={faPenToSquare} className="text-[16px]" />
                  <span>
                    Edit Profile Photo
                  </span>
                </NavLink>
              </li>
              <li className="pt-1">
                <NavLink to="/edit-profile-detail" className={({ isActive }) => `${isActive ? "bg-blue-300 dark:bg-blue-950 text-white font-bold w-full py-2 pl-4 md:rounded-r-none " : "text-black dark:text-white" } text-black dark:text-white flex gap-2 items-center duration-200 ease-in-out rounded-xl`}>
                  <FontAwesomeIcon icon={faUserPen} className="font-[16px]" />
                  <span>
                    Edit Your Detail
                  </span>
                </NavLink>
              </li>
              <li className="pt-1">
                <button className="hover:text-red-600 duration-150 ease-in-out flex gap-2 items-center cursor-pointer" onClick={deleteAccountAlert}>
                  <FontAwesomeIcon icon={faTrashCan} className="text-[16px]" />
                  <span>
                    Delete Account
                  </span>
                </button>
              </li>
              <li className="pt-1">
                <Switch />
              </li>
            </ul>

            <li>
              <button className="hover:text-red-600 duration-150 ease-in-out flex items-center w-[288px] p-2 space-x-3 rounded-md cursor-pointer" onClick={logoutAlert}>
                <FontAwesomeIcon icon={faRightFromBracket} className="text-xl" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
