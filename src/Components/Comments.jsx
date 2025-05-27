import React from 'react';

const Comments = ({ username, comment }) => {
  const color = ['text-red-500', 'text-green-500', 'text-blue-500', 'text-yellow-500', 'text-pink-500', 'text-orange-500', 'text-purple-500'];
  return (
    <div className="w-[95%] h-16 mt-4 mx-auto px-2 bg-gray-300 rounded-lg text-black">
      <h2 className={`${color[Math.floor(Math.random() * color.length)]} pl-2 pt-1`}>@{username}</h2>
      <p className="pl-5 mt1">{comment}</p>
    </div>
  );
};

export default Comments;