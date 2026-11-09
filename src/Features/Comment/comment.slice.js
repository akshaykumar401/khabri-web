import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  commentData: {},
  loading: false,
  error: null,
};

const getErrorMessage = (error) => {
  return error.response?.data?.message || error.response?.statusText || error.message || "An unexpected error occurred";
};

// Send Comment To Backend Methode...
export const sendCommentToBack = createAsyncThunk('sendCommentToBack', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/apii/api/v1/comments/sendComment`, data, {
      withCredentials: true,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return rejectWithValue(response.data?.message || "Failed to send comment");
    }
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`ERROR: ${message}`);
    return rejectWithValue(message);
  }
});

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
        state.error = action.payload || "Failed to send comment";
      });
  }
});

export default commentSlice.reducer;
