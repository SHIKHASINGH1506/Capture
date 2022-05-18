import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUserService, followUserService, unFollowUserService } from 'service';

const initialState = {
  userLoading: false,
  allUsers: [],
  userStatus: "",
  notFollowing: [],
};

export const getAllUser = createAsyncThunk(
  "post/getAllUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await getAllUserService();
      return data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

export const followUser = createAsyncThunk(
  "post/followUser",
  async ({ token, id }, thunkAPI) => {
    console.log('From follow user');
    try {
      const { data } = await followUserService(token, id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "post/unFollowUser",
  async ({ token, id }, thunkAPI) => {
    try {
      const { data } = await unFollowUserService(token, id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUser.pending, state => {
      state.userLoading = true
    }),
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.userLoading = false
      state.allUsers = action.payload;
    }),
    builder.addCase(getAllUser.rejected, (state) => {
      state.userLoading = false;
    })
    builder.addCase(followUser.pending, state => {
      state.userLoading = true
    }),
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.userLoading = false
      state.allUsers = [...state.allUsers].map((user) => {
        if (user.username === action.payload.followUser.username)
          return action.payload.followUser
        if (user.username === action.payload.user.username)
          return action.payload.user
        else
          return user;
      });
    }),
    builder.addCase(followUser.rejected, (state) => {
      state.userLoading = false;
    }),
    builder.addCase(unFollowUser.pending, state => {
      state.userLoading = true
    }),
    builder.addCase(unFollowUser.fulfilled, (state, action) => {
      state.userLoading = false
      state.allUsers = [...state.allUsers].map((user) => {
        if (user.username === action.payload.followUser.username)
          return action.payload.followUser
        if (user.username === action.payload.user.username)
          return action.payload.user
        else
          return user;
      });
    }),
    builder.addCase(unFollowUser.rejected, (state) => {
      state.userLoading = false;
    })
  }
});

export const userState = (state) => state.users;
export const userReducer = userSlice.reducer;