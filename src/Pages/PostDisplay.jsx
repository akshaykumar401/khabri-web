import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Comments } from "../Components/Components.js";
import { useSelector, useDispatch } from "react-redux";
import { viewPost, dislikePost, likePost } from "../Features/Post/post.slice.js";
import { sendCommentToBack } from "../Features/Comment/comment.slice.js";

const PostDisplay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({});
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [commentText, setCommentText] = useState("");

  const { viewSinglePost } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (viewSinglePost && Object.keys(viewSinglePost).length > 0) {
      setPostData(viewSinglePost);
      setCommentsList(viewSinglePost.comments || []);
      const postLikes = viewSinglePost.likes || [];
      setLikes(postLikes.length);
      setIsLiked(Boolean(userData?._id && postLikes.includes(userData._id)));
    }
  }, [viewSinglePost, userData]);

  useEffect(() => {
    if (id) {
      dispatch(viewPost(id));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, dispatch]);

  const sendComment = () => {
    if (!commentText.trim() || !viewSinglePost?._id) {
      return;
    }

    const newComment = {
      postId: viewSinglePost._id,
      comment: commentText.trim(),
    };

    dispatch(sendCommentToBack(newComment)).then((action) => {
      if (action.type === "sendCommentToBack/fulfilled") {
        setCommentsList((prev) => [
          {
            _id: Date.now().toString(),
            userName: userData?.username || "you",
            comment: newComment.comment,
          },
          ...prev,
        ]);
        setCommentText("");
      }
    });
  };

  const increaseLikes = () => {
    if (!viewSinglePost?._id) return;

    if (!isLiked) {
      dispatch(likePost(viewSinglePost._id)).then((action) => {
        if (action.type === "likePost/fulfilled") {
          setLikes((prev) => prev + 1);
          setIsLiked(true);
        }
      });
    } else {
      dispatch(dislikePost(viewSinglePost._id)).then((action) => {
        if (action.type === "dislikePost/fulfilled") {
          setLikes((prev) => Math.max(0, prev - 1));
          setIsLiked(false);
        }
      });
    }
  };

  const avatarSrc =
    postData?.user?.avator && postData.user.avator !== "default.jpeg"
      ? postData.user.avator
      : "https://imgs.search.brave.com/mDztPWayQWWrIPAy2Hm_FNfDjDVgayj73RTnUIZ15L0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc";

  return (
    <div className="md:w-[calc(100%-310px)] h-auto bg-slate-300 flex md:ml-[305px] mt-14 drop-shadow-xl dark:bg-slate-900 justify-center z-10">
      <div className="w-xl dark:bg-slate-800 dark:text-white bg-gray-300 text-black px-4 py-2 rounded-lg">
        <div className="w-[95%] bg-slate-300 flex justify-between items-center text-black px-6 py-2 mt-2 rounded-lg h-12">
          <h4 className="text-lg font-semibold flex items-center gap-2 font-['Comic Relief']">
            <img
              src={avatarSrc}
              alt="user image"
              className="w-8 h-8 rounded-full"
            />
            {postData?.user?.username || ""}
          </h4>

          <button
            className={`${
              isLiked ? "bg-red-500" : "bg-slate-300"
            } w-9 h-9 rounded-full flex justify-center items-center cursor-pointer border-1 border-slate-400 duration-400 ease-in-out`}
            onClick={increaseLikes}
          >
            <FontAwesomeIcon icon={faHeart} className="text-xl text-white" />
            <span className="absolute text-lx font-semibold">{likes}</span>
          </button>
        </div>

        <h2 className="mt-4 font-['Comic Relief'] w-full text-xl">
          {postData?.title || ""}
        </h2>

        {postData?.referanceImage && postData.referanceImage !== "default.jpeg" && (
          <img
            src={postData.referanceImage}
            alt="reference"
            className="w-[95%] h-64 rounded-xl mt-4 object-cover"
          />
        )}

        <p className="mt-4 flex flex-wrap w-[95%]">
          {postData?.description || ""}
        </p>

        <div className="mt-6 bg-slate-500 p-2 rounded-lg">
          <h2 className="text-lg font-semibold flex items-center gap-2 font-['Comic Relief']">
            comments
          </h2>
          {/* Send Comment */}
          <div className="flex items-center w-[95%] mx-auto mt-4">
            <input
              className="border-1 p-2 rounded-l-lg border-r-0 w-[90%] outline-none text-black bg-white"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendComment();
                }
              }}
            />
            <button
              className="bg-slate-600 p-2 w-[10%] hover:bg-slate-500 cursor-pointer duration-200 ease-in-out text-white border-1 border-l-0 rounded-r-lg"
              onClick={sendComment}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
            </button>
          </div>

          <div>
            {commentsList?.map((comment, index) => (
              <Comments
                key={comment._id || index}
                username={comment?.userName}
                comment={comment?.comment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDisplay;
