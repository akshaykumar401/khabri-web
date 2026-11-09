import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from '../../Features/User/user.slice.js';
import { useDispatch } from 'react-redux';

const LogoutAccountAlert = ({ setIsShowLogoutAccountAlert, setIsLogout }) => {
  const dispatch = useDispatch();

  const cancelHandle = () => {
    setIsShowLogoutAccountAlert(false);
  };

  const logout = () => {
    setIsShowLogoutAccountAlert(false);

    dispatch(logoutUser()).then((action) => {
      if (action.type === 'logoutUser/fulfilled') {
        setIsLogout(true);
        setTimeout(() => {
          setIsLogout(false);
          window.location.reload();
        }, 1500);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-2xl shadow-slate-950/20 text-center animate-scale-in">
        <button
          onClick={cancelHandle}
          className="absolute top-4 right-4 w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>

        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#2E5BFF]/10 text-[#2E5BFF] dark:text-[#527dff] flex items-center justify-center mb-4">
          <FontAwesomeIcon icon={faRightFromBracket} className="text-xl" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Sign Out?
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Are you sure you want to sign out from your Khabri account?
        </p>

        <div className="flex items-center gap-3 mt-6">
          <button
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            onClick={cancelHandle}
          >
            Stay In
          </button>
          <button
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] text-white text-sm font-semibold shadow-lg shadow-[#2E5BFF]/25 transition-all active:scale-[0.98] cursor-pointer"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutAccountAlert;
