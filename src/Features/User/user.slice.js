import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: {},
  otherUser: {},
  followedUser: [],
  loading: false,
  error: null,
};

// Login user action...
export const loginUser = createAsyncThunk('loginUser', async (userData, { rejectWithValue }) => {
  const response = await axios.post(`/api/api/v1/uses/login`, userData);
  if (response.status === 200) {
    localStorage.setItem("accessToken", response.data.data.accessToken);
    localStorage.setItem("refreshToken", response.data.data.refreshToken);
    return response.data.data.user;
  } else {
    return rejectWithValue(response.data);
  }
});

// Getting Other User Data...
export const getOtherUserData = createAsyncThunk('getOtherUserData', async (username, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };
  const response = await axios.get(`/api/api/v1/uses/otherUserProfile/${username}`, config);
  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
})

// Get Follow User Profile Methode...
export const getFollowUserProfile = createAsyncThunk('getFollowUserProfile', async ( _ , {rejectWithValue}) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  const respone = await axios.get(`/api/api/v1/uses/following`, config);
  if (respone.status === 200) {
    return respone.data.data;
  } else {
    return rejectWithValue(respone.data.message);
  }
})

// User Slice for managing user authentication state
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refereshToken: (state, action) => {
      state.userData = action.payload.user;
      
      if ( action.payload.refreshToken && action.payload.accessToken ) {
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("accessToken", action.payload.accessToken);
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
      // Handling Get Other User Profile...
      .addCase(getOtherUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOtherUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.otherUser = action.payload;
      })
      .addCase(getOtherUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      // Get All Followed User Profile Action...
      .addCase(getFollowUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.followedUser = action.payload;
      })
      .addCase(getFollowUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
  }
})

export const { refereshToken } = userSlice.actions;
export default userSlice.reducer;