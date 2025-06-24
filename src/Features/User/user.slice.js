import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import conf from '../../Config/config.js';

const initialState = {
  userData: {},
  otherUser: {},
  followedUser: [],
  loading: false,
  error: null,
};

// Login user action...
export const loginUser = createAsyncThunk('loginUser', async (userData, { rejectWithValue }) => {
  const response = await axios.post(`${conf.BASE_URL}/api/v1/uses/login`, userData);
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
  const response = await axios.get(`${conf.USER_BASE_URL}/otherUserProfile/${username}`, config);
  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
})

// Get Follow User Profile Methode...
export const getFollowUserProfile = createAsyncThunk('getFollowUserProfile', async (_, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  const respone = await axios.get(`${conf.USER_BASE_URL}/following`, config);
  if (respone.status === 200) {
    return respone.data.data;
  } else {
    return rejectWithValue(respone.data.message);
  }
})

// Edit Profile Photo Methode...
export const editUserProfilePhoto = createAsyncThunk('editUserProfilePhoto', async (image, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  const response = await axios.patch(`${conf.USER_BASE_URL}/updateAvator`, image, config);
  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
})

// Edit Profile Detail Methode...
export const editUserProfileDetail = createAsyncThunk('editUserProfileDetail', async (data, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  const respone = await axios.patch(`${conf.USER_BASE_URL}/updateProfile`, data, config);

  if (respone.status === 200) {
    return respone.data.data;
  } else {
    return rejectWithValue(respone.data.message);
  }
})

// Logout User Methode...
export const logoutUser = createAsyncThunk('logoutUser', async (_, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  const response = await axios.post(`${conf.USER_BASE_URL}/logout`, config);

  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
})

// SignUp User Methode...
export const signUpUser = createAsyncThunk('signUpUser', async (data, { rejectWithValue }) => {
  const response = await axios.post(`${conf.USER_BASE_URL}/sigin`, data);

  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
})

// Delete Account Methode...
export const deleteUserAccount = createAsyncThunk('deleteUserAccount', async (_, { rejectWithValue }) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  const respone = await axios.delete(`${conf.USER_BASE_URL}/deleteProfile`, config);

  if (respone.status === 200) {
    return respone.data.data;
  } else {
    return rejectWithValue(respone.data.message);
  }
})

// Forget Password Methode...
export const changePassword = createAsyncThunk('changePassword', async (data, { rejectWithValue }) => {
  const response = await axios.post(`${conf.USER_BASE_URL}/forgotPassword`, data)

  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
})

// User Slice for managing user authentication state
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refereshToken: (state, action) => {
      state.userData = action.payload.user;

      if (action.payload.refreshToken && action.payload.accessToken) {
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
      // Update User Profile Action...
      .addCase(editUserProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserProfilePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(editUserProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to UpDate Profile Photo.";
      })
      // Update User Profile Detail Action...
      .addCase(editUserProfileDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserProfileDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(editUserProfileDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to UpDate Profile Detail.";
      })
      // Logout User Action...
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fail To Logout User.";
      })
      // SignUp User Action...
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fail To Logout User.";
      })
      // Delete User Action...
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fail To Delete Account User.";
      })
      // Forget Password Action...
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fail To Change Password.";
      })
  }
})

export const { refereshToken } = userSlice.actions;
export default userSlice.reducer;