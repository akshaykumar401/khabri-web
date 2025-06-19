import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/User/user.slice.js";
import postReducer from "../Features/Post/post.slice.js";
import commentReducer from "../Features/Comment/comment.slice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
  }
})