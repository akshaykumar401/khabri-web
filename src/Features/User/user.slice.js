import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: {},
  loading: false,
  error: null,
};

// Login user action
export const loginUser = createAsyncThunk('loginUser', async (userData, { rejectWithValue }) => {
  const response = await axios.post(`/api/api/v1/uses/login`, userData);
  if (response.status === 200) {
    localStorage.setItem("accessToken", response.data.data.accessToken);
    localStorage.setItem("refreshToken", response.data.data.refreshToken);
    return response.data.data.user;
  } else {
    return rejectWithValue(response.data);
  }
})

// User Slice for managing user authentication state
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refereshToken: (state, action) => {
      const { refreshToken } = action.payload || {};
      state.userData = action.payload;
      console.log("refreshToken:", refreshToken);

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
        // localStorage.setItem("accessToken", action.payload.accessToken);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling login user action...
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
  }
})

export const { refereshToken } = userSlice.actions;
export default userSlice.reducer;