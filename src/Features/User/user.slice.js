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
  try {
    const response = await axios.post(`/apii/api/v1/uses/login`, userData);
    
    if (response.status === 200) {
      return response.data.data.user;
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
});

// Getting Other User Data...
export const getOtherUserData = createAsyncThunk('getOtherUserData', async (username, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/apii/api/v1/uses/otherUserProfile/${username}`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data.data;
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
})

// Get Follow User Profile Methode...
export const getFollowUserProfile = createAsyncThunk('getFollowUserProfile', async (_, { rejectWithValue }) => {
  try {
    const respone = await axios.get(`/apii/api/v1/uses/following`, {
      withCredentials: true,
    });
    if (respone.status === 200) {
      return respone.data.data;
    } else {
      return rejectWithValue(respone.data.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
})

// Edit Profile Photo Methode...
export const editUserProfilePhoto = createAsyncThunk('editUserProfilePhoto', async (image, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/apii/api/v1/uses/updateAvator`, image, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data.data;
    } else {
      return rejectWithValue(response.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
})

// Edit Profile Detail Methode...
export const editUserProfileDetail = createAsyncThunk('editUserProfileDetail', async (data, { rejectWithValue }) => {
  try {
    const respone = await axios.patch(`/apii/api/v1/uses/updateProfile`, data, {
      withCredentials: true,
    });
  
    if (respone.status === 200) {
      return respone.data.data;
    } else {
      return rejectWithValue(respone.data.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
})

// Logout User Methode...
export const logoutUser = createAsyncThunk('logoutUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/apii/api/v1/uses/logout`, {
      withCredentials: true,
    });
  
    if (response.status === 200) {
      return response.data.data;
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
})

// SignUp User Methode...
export const signUpUser = createAsyncThunk('signUpUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/apii/api/v1/uses/sigin`, data);
  
    if (response.status === 200) {
      return response.data.data;
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
})

// Delete Account Methode...
export const deleteUserAccount = createAsyncThunk('deleteUserAccount', async (_, { rejectWithValue }) => {
  try {
    const respone = await axios.delete(`/apii/api/v1/uses/deleteProfile`, {
      withCredentials: true,
    });
  
    if (respone.status === 200) {
      return respone.data.data;
    } else {
      return rejectWithValue(respone.data.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
})

// Forget Password Methode...
export const changePassword = createAsyncThunk('changePassword', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/apii/api/v1/uses/forgotPassword`, data)
  
    if (response.status === 200) {
      return response.data.data;
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    console.error(`ERROR: ${error.response.statusText}`);
    return rejectWithValue(error.response.statusText);
  }
})

// User Slice for managing user authentication state
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Add a reducer to Add userData after auto Login...
    refreshUser: (state, action) => {
      state.userData = action.payload;
    }
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
        state.error = action.payload || "Failed Fetching Other User Data";
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
        state.error = action.payload || "Failed Getting Followed User Profile";
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
        state.error = action.payload || "Fail To Create User.";
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

export const { refreshUser } = userSlice.actions;
export default userSlice.reducer;