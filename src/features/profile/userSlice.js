import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUserService, followUserService, unFollowUserService } from 'service';
import { updateUser } from 'features';

const initialState = {
  userLoading: false,
  allUsers: [],
  userStatus: "",
  notFollowing: [],
  gloablLoader: false
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

export const followUnfollowUser = createAsyncThunk(
  "post/followUser",
  async ({ token, id, dispatch, isFollowing }, {rejectWithValue}) => {
    try {
      const {data} = isFollowing
       ? await unFollowUserService(token, id)
       : await followUserService(token, id);
      dispatch(updateUser({token: token, profileData: data.user}));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.gloablLoader = true;
    },
    hideLoader: (state) => {
      state.gloablLoader = false;
    }
  },
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
    builder.addCase(followUnfollowUser.pending, state => {
      state.userLoading = true
    }),
    builder.addCase(followUnfollowUser.fulfilled, (state, action) => {
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
    builder.addCase(followUnfollowUser.rejected, (state) => {
      state.userLoading = false;
    })
  }
});

export const userState = (state) => state.users;
export const userReducer = userSlice.reducer;
export const { showLoader, hideLoader } = userSlice.actions;