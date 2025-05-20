import React from 'react';

const Comments = ({ username, comment }) => {
  return (
    <div className="w-[95%] h-16 mt-4 mx-auto px-2 bg-gray-300 rounded-lg text-black">
      <h2 className="text-gray-500 pl-2 pt-1">@{username}</h2>
      <p className="pl-5 mt1">{comment}</p>
    </div>
  );
};

export default Comments;