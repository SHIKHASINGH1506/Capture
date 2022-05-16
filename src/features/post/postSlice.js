import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPostService, addPostService} from 'service';

const initialState = {
  posts: [],
  postLoading: false,
  postError: null,
}

export const addPost = createAsyncThunk(
  'post/addPost',
  async (postData, {RejectWithValue})  => {
    try{
      console.log(postData);
      const {data} = await addPostService(postData);
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
      console.log('here');
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
      console.log(payload);
      state.postLoading = false;
      state.posts = payload;
      console.log(state.posts);
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
  }
})

// export const { } = postSlice.actions;
export const getPostState = (state) => state.post; 
export const postReducer = postSlice.reducer;