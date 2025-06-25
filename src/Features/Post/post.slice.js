import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import secret from '../../Config/secret.js';

const initialState = {
  userPost: [],
  allPost: [],
  viewSinglePost: {},
  loading: false,
  error: null,
};

// Method for Fetching User Posts...
export const allUserPost = createAsyncThunk('allUserPost', async (_, { rejectWithValue }) => {

  const response = await axios.get(`/api/api/v1/posts/viewUserPost`, { withCredentials: true });

  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
})

// Methode For View Post...
export const viewPost = createAsyncThunk('viewPost', async (id, { rejectWithValue }) => {
  const response = await axios.get(`/api/api/v1/posts/viewPost/${id}`, {
    withCredentials: true,
  });
  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
});

// Like Post Methode...
export const likePost = createAsyncThunk('likePost', async (id, { rejectWithValue }) => {
  const response = await axios.patch(`/api/api/v1/posts/likePost/${id}`, {
    withCredentials: true,
  });
  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
})

// DisLike Post Methode...
export const dislikePost = createAsyncThunk('dislikePost', async (id, { rejectWithValue }) => {
  const response = await axios.patch(`/api/api/v1/posts/dislikePost/${id}`, {
    withCredentials: true,
  });
  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
});

// Delete Post Methode...
export const deleteYourPost = createAsyncThunk('deleteYourPost', async (id, { rejectWithValue }) => {
  const response = await axios.get(`/api/api/v1/posts/delete/${id}`, {
    withCredentials: true,
  });
  if (response.status === 200) {
    return id;
  } else {
    return rejectWithValue(response.data.message);
  }
});

// View All Post Methode...
export const viewAllPost = createAsyncThunk('viewAllPost', async (_, { rejectWithValue }) => {
  const response = await axios.get(`/api/api/v1/posts/viewAllpost`, {
    withCredentials: true,
  });
  if (response.status === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
});

// Create Post Methode...
export const createUserPost = createAsyncThunk('createUserPost', async (data, { rejectWithValue }) => {
  const response = await axios.post(`${secret.POST_BASE_URL}/createPost`, data, {
    withCredentials: true,
  });
  if (response.statusCode === 200) {
    return response.data.data;
  } else {
    return rejectWithValue(response.data.message);
  }
});

// Edid Post Methode...
export const editUserPost = createAsyncThunk('editUserPost', async (data, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('image', data.image);
  const response = await axios.patch(`${secret.POST_BASE_URL}/editPost/${data.id}`, formData, {
    withCredentials: true,
  });

  if (response.status === 200) {
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
        state.userPost = action.payload;
      })
      .addCase(allUserPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      // Handling View Post...
      .addCase(viewPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewPost.fulfilled, (state, action) => {
        state.loading = false;
        state.viewSinglePost = action.payload;
      })
      .addCase(viewPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      // Handling The Like Post...
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      // Handling The Dislike Post...
      .addCase(dislikePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dislikePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      // Handling The Delete Post...
      .addCase(deleteYourPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteYourPost.fulfilled, (state, action) => {
        state.loading = false;
        state.userPost = state.userPost.filter((post) => post._id !== action.payload);
      })
      .addCase(deleteYourPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
      // Handling The View All Post...
      .addCase(viewAllPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewAllPost.fulfilled, (state, action) => {
        state.loading = false;
        state.allPost = action.payload;
      })
      .addCase(viewAllPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling The Create Post...
      .addCase(createUserPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserPost.fulfilled, (state, action) => {
        state.loading = false;
        state.allPost.push(action.payload)
      })
      .addCase(createUserPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling The Edit Post...
      .addCase(editUserPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserPost.fulfilled, (state, action) => {
        state.loading = false;
        state.allPost = [state.userPost.filter((singlePost) => {
          return singlePost._id !== action.payload._id
        }), action.payload]
      })
      .addCase(editUserPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      })
  }
})

// export const {} = postSlice.actions;
export default postSlice.reducer;