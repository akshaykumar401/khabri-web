import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faPlus,
  faUser,
  faGear,
  faRightFromBracket,
  faTrashCan,
  faUserPen,
  faCamera,
  faBarsStaggered,
  faXmark,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import brandLogo from "../../assets/brand-logo.png";
import {
  Switch,
  DeleteAccountAlert,
  LogoutAccountAlert,
  DeletedSuccessfulAlert,
  LogoutSuccessfulAlert,
} from "../Components.js";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShowDeleteAccountAlert, setIsShowDeleteAccountAlert] = useState(false);
  const [isShowLogoutAccountAlert, setIsShowLogoutAccountAlert] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const settingsRef = useRef(null);
  const { userData } = useSelector((state) => state.user);

  // Close desktop settings menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const avatarSrc =
    userData?.avator && userData.avator !== "default.jpeg"
      ? userData.avator
      : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home Feed", icon: faHouse },
    { to: "/upload-post", label: "Create Post", icon: faPlus },
    { to: "/followed", label: "Followed", icon: faUsers },
    { to: "/user", label: "My Profile", icon: faUser },
  ];

  return (
    <>
      {/* Alert Modals */}
      {isShowDeleteAccountAlert && (
        <DeleteAccountAlert
          setIsShowDeleteAccountAlert={setIsShowDeleteAccountAlert}
          setIsDeleted={setIsDeleted}
        />
      )}
      {isShowLogoutAccountAlert && (
        <LogoutAccountAlert
          setIsShowLogoutAccountAlert={setIsShowLogoutAccountAlert}
          setIsLogout={setIsLogout}
        />
      )}
      {isDeleted && <DeletedSuccessfulAlert setIsDeleted={setIsDeleted} />}
      {isLogout && <LogoutSuccessfulAlert setIsLogout={setIsLogout} />}

      {/* Mobile Top Navbar */}
      <header className="md:hidden sticky top-0 z-40 w-full h-16 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={brandLogo}
            alt="Khabri Logo"
            className="w-10 h-10 rounded-xl object-contain shadow-sm border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5"
          />
          <span className="text-xl font-bold font-brand tracking-tight text-[#1D3557] dark:text-white">
            Khabri
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {userData && (
            <Link to="/user" className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-transform duration-150">
              <img src={avatarSrc} alt={userData.username} className="w-full h-full object-cover" />
            </Link>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90 transition-all duration-200"
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faXmark : faBarsStaggered}
              className={`text-lg transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-90 scale-110 text-[#2E5BFF] dark:text-[#527dff]" : "rotate-0 scale-100"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 h-screen fixed left-0 top-0 border-r border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl p-5 z-40 justify-between overflow-y-auto">
        <div>
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 px-2 py-3 mb-6 group">
            <img
              src={brandLogo}
              alt="Khabri Logo"
              className="w-12 h-12 rounded-2xl object-contain shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-200 border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5"
            />
            <div>
              <span className="text-2xl font-extrabold font-brand tracking-tight text-[#1D3557] dark:text-white">
                Khabri
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#2E5BFF] dark:text-[#527dff]">
                Your News. Amplified.
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-3.5 px-3.5 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 hover:translate-x-1.5 ${
                    isActive
                      ? "bg-[#2E5BFF]/10 text-[#2E5BFF] dark:bg-[#2E5BFF]/20 dark:text-[#527dff] shadow-sm font-bold scale-[1.01]"
                      : "text-[#6B7280] dark:text-slate-400 hover:text-[#1D3557] dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                  }`
                }
              >
                <div className="w-5 flex items-center justify-center transition-transform duration-200 group-hover:scale-125 group-hover:text-[#2E5BFF] dark:group-hover:text-[#527dff]">
                  <FontAwesomeIcon icon={item.icon} className="text-base" />
                </div>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Quick Create Post Action */}
          <div className="mt-6 px-1">
            <button
              onClick={() => navigate("/upload-post")}
              className="group w-full py-3 px-4 rounded-2xl bg-[#2E5BFF] hover:bg-[#1d45e0] text-white font-semibold text-sm shadow-lg shadow-[#2E5BFF]/25 hover:shadow-[#2E5BFF]/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faPlus} className="text-xs transition-transform duration-300 group-hover:rotate-90" />
              <span>Create Post</span>
            </button>
          </div>
        </div>

        {/* User Card & Settings Section */}
        <div className="relative border-t border-slate-200/80 dark:border-slate-800/80 pt-4" ref={settingsRef}>
          {/* Floating Settings Popover - floats above the card without displacing it */}
          {isSettingsOpen && (
            <div className="absolute bottom-full mb-2 left-0 right-0 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-950/25 z-50 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <NavLink
                to="/edit-profile-photo"
                onClick={() => setIsSettingsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <FontAwesomeIcon icon={faCamera} className="w-4 text-slate-400" />
                <span>Change Photo</span>
              </NavLink>
              <NavLink
                to="/edit-profile-detail"
                onClick={() => setIsSettingsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <FontAwesomeIcon icon={faUserPen} className="w-4 text-slate-400" />
                <span>Edit Profile</span>
              </NavLink>
              <div className="py-1">
                <Switch />
              </div>
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  setIsShowLogoutAccountAlert(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer text-left"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
                <span>Sign Out</span>
              </button>
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  setIsShowDeleteAccountAlert(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer text-left"
              >
                <FontAwesomeIcon icon={faTrashCan} className="w-4" />
                <span>Delete Account</span>
              </button>
            </div>
          )}

          {/* User Profile Pill button - ALWAYS VISIBLE */}
          <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
            <Link to="/user" className="flex items-center gap-3 min-w-0">
              <img
                src={avatarSrc}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {userData?.fullName || userData?.username || "Guest"}
                </h4>
                <p className="text-xs text-slate-400 truncate">
                  @{userData?.username || "login"}
                </p>
              </div>
            </Link>

            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isSettingsOpen
                  ? "bg-[#2E5BFF]/10 text-[#2E5BFF] dark:bg-[#2E5BFF]/20 dark:text-[#527dff]"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              aria-label="Settings and options"
            >
              <FontAwesomeIcon icon={isSettingsOpen ? faChevronDown : faGear} className="text-sm" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Slide-Over Drawer with smooth open & close animations */}
      <div
        className={`md:hidden fixed inset-0 z-50 flex transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop: Fades In on open, Fades Out on close */}
        <div
          className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Drawer content: Smoothly slides in from left on open, slides back to left on close */}
        <div
          className={`relative w-4/5 max-w-xs bg-white dark:bg-[#0b0f17] h-full shadow-2xl p-6 flex flex-col justify-between z-10 border-r border-slate-200/80 dark:border-slate-800/80 overflow-y-auto transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <img
                  src={brandLogo}
                  alt="Khabri Logo"
                  className="w-9 h-9 rounded-xl object-contain shadow-sm border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5"
                />
                <span className="text-xl font-bold font-brand text-slate-900 dark:text-white">
                  Khabri
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all duration-200 hover:rotate-90 active:scale-90"
              >
                <FontAwesomeIcon icon={faXmark} className="text-base" />
              </button>
            </div>

            {/* User overview */}
            {userData && (
              <div className="flex items-center gap-3 py-4 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={avatarSrc}
                  alt={userData.username}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {userData.fullName || userData.username}
                  </h4>
                  <p className="text-xs text-slate-400">@{userData.username}</p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="space-y-1 pt-4">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 hover:translate-x-1.5 active:scale-95 ${
                      isActive
                        ? "bg-[#2E5BFF]/10 text-[#2E5BFF] dark:bg-[#2E5BFF]/20 dark:text-[#527dff] font-bold"
                        : "text-[#6B7280] dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 transition-transform duration-200 group-hover:scale-115" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Settings options */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <NavLink
                to="/edit-profile-photo"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FontAwesomeIcon icon={faCamera} className="w-5 text-slate-400" />
                <span>Change Profile Photo</span>
              </NavLink>
              <NavLink
                to="/edit-profile-detail"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <FontAwesomeIcon icon={faUserPen} className="w-5 text-slate-400" />
                <span>Edit Profile Details</span>
              </NavLink>
              <div className="py-2">
                <Switch />
              </div>
            </div>
          </div>

          {/* Logout / Delete */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                closeMobileMenu();
                setIsShowLogoutAccountAlert(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Sign Out</span>
            </button>
            <button
              onClick={() => {
                closeMobileMenu();
                setIsShowDeleteAccountAlert(true);
              }}
              className="w-full text-center text-[11px] text-slate-400 hover:text-[#E76F51] transition-colors py-1 cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
