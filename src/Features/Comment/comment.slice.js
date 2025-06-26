import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  commentData: {},
  loading: false,
  error: null,
};

// Send Comment To Backend Methode...
export const sendCommentToBack = createAsyncThunk('sendCommentToBack', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/apii/api/v1/comments/sendComment`, data, {
      withCredentials: true,
    });
  
    if (response.status === 200) {
      return response.data;
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
})

// Comment Slice for Sending Comment...
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Send Comment Action...
      .addCase(sendCommentToBack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendCommentToBack.fulfilled, (state, action) => {
        state.loading = false;
        state.commentData = action.payload;
      })
      .addCase(sendCommentToBack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
  }
});

export default commentSlice.reducer;
