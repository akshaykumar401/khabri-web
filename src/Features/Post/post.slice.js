import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userPost: [],
  allPost: [],
  loading: false,
  error: null,
};

// Method for Fetching User Posts...
export const allUserPost = createAsyncThunk('allUserPost', async (_, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };
  const response = await axios.get(`/api/api/v1/posts/viewUserPost`, config);
  if(response.status === 200){
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
})

// Post Slice for User Post and all Post Display...
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling UserPost....
      .addCase(allUserPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allUserPost.fulfilled, (state, action) => {
        state.loading = false;
        state.userPost= action.payload;
      })
      .addCase(allUserPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
  }
})

// export const {} = postSlice.actions;
export default postSlice.reducer;