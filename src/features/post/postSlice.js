import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPostService, addPostService, editPostService, deletePostService} from 'service';

const initialState = {
  posts: [],
  postLoading: false,
  postError: null,
}

export const addPost = createAsyncThunk(
  'post/addPost',
  async (postData, {RejectWithValue})  => {
    try{
      const {data} = await addPostService(postData);
      return data.posts;
    }catch(err){
      console.log(err.message);
      return RejectWithValue(err.message);
    }
  }
)

export const editPost = createAsyncThunk(
  'post/editPost',
  async (postData, {RejectWithValue})  => {
    try{
      console.log(postData);
      const {data} = await editPostService(postData?._id, postData);
      return data.posts;
    }catch(err){
      console.log(err.message);
      return RejectWithValue(err.message);
    }
  }
)

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId, {RejectWithValue})  => {
    try{
      const {data} = await deletePostService(postId);
      return data.posts;
    }catch(err){
      console.log(err.message);
      return RejectWithValue(err.message);
    }
  }
)

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (token='gdhs', {RejectWithValue}) => {
    try{
      const{data} = await getAllPostService();
      return data.posts;
    }catch(err){
      console.log(err.response.data);
      return RejectWithValue(err.message);
    }
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.postLoading = true;
    })
    builder.addCase(getAllPosts.fulfilled, (state, {payload}) => {
      state.postLoading = false;
      state.posts = payload;
    })
    builder.addCase(getAllPosts.rejected, (state) => {
      state.postLoading = false;
      state.postError = 'Error in adding post';
    })
    builder.addCase(addPost.pending, (state) => {
      state.postLoading = true;
    })
    builder.addCase(addPost.fulfilled, (state, {payload}) => {
      state.postLoading = false;
      state.posts = payload;
    })
    builder.addCase(addPost.rejected, (state) => {
      state.postLoading = false;
      state.postError = 'Error in adding post';
    })
    builder.addCase(editPost.pending, (state) => {
      state.postLoading = true;
    })
    builder.addCase(editPost.fulfilled, (state, {payload}) => {
      state.postLoading = false;
      state.posts = payload;
    })
    builder.addCase(editPost.rejected, (state) => {
      state.postLoading = false;
      state.postError = 'Error in adding post';
    })
    builder.addCase(deletePost.pending, (state) => {
      state.postLoading = true;
    })
    builder.addCase(deletePost.fulfilled, (state, {payload}) => {
      state.postLoading = false;
      state.posts = payload;
    })
    builder.addCase(deletePost.rejected, (state) => {
      state.postLoading = false;
      state.postError = 'Error in adding post';
    })
    
  }
})

// export const { } = postSlice.actions;
export const getPostState = (state) => state.post; 
export const postReducer = postSlice.reducer;