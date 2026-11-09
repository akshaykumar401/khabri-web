import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { deleteUserAccount } from '../../Features/User/user.slice.js';

const DeleteAccountAlert = ({ setIsShowDeleteAccountAlert, setIsDeleted }) => {
  const dispatch = useDispatch();

  const cancelHandle = () => {
    setIsShowDeleteAccountAlert(false);
  };

  const deleteUser = () => {
    setIsShowDeleteAccountAlert(false);

    dispatch(deleteUserAccount()).then((action) => {
      if (action.type === 'deleteUserAccount/fulfilled') {
        setIsDeleted(true);
        setTimeout(() => {
          setIsDeleted(false);
          window.location.reload();
        }, 2000);
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

        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#E76F51]/10 dark:bg-[#E76F51]/20 text-[#E76F51] flex items-center justify-center mb-4">
          <FontAwesomeIcon icon={faTriangleExclamation} className="text-xl" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Delete Your Account?
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Permanently delete your profile, posts, and followers. This action cannot be reversed.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <button
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            onClick={cancelHandle}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#E76F51] hover:bg-[#d65a3c] text-white text-sm font-semibold shadow-lg shadow-[#E76F51]/25 transition-all active:scale-[0.98] cursor-pointer"
            onClick={deleteUser}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountAlert;
