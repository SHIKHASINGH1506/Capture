import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  getAllPostService, 
  addPostService, 
  editPostService, 
  deletePostService,
  likePostService, 
  dislikePostService,
  getAllBookmarksService, 
  addBookmarkService, 
  removeBookmarkService,
  getPostsByUsernameService,
  addCommentsToPostService
} from 'service';

const initialState = {
  posts: [],
  postLoading: false,
  postError: null,
  bookmarks: [],
  userPosts: []
}

export const addPost = createAsyncThunk(
  'post/addPost',
  async (postData, {rejectWithValue})  => {
    try{
      const {data} = await addPostService(postData);
      return data.posts;
    }catch(err){
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
)

export const editPost = createAsyncThunk(
  'post/editPost',
  async (postData, {rejectWithValue})  => {
    try{
      const {data} = await editPostService(postData?._id, postData);
      return data.posts;
    }catch(err){
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
)

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId, {rejectWithValue})  => {
    try{
      const {data} = await deletePostService(postId);
      return data.posts;
    }catch(err){
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
)

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (token='gdhs', {rejectWithValue}) => {
    try{
      const{data} = await getAllPostService();
      return data.posts;
    }catch(err){
      console.log(err.response.data);
      return rejectWithValue(err.message);
    }
  }
)

export const getPostByUsername = createAsyncThunk(
  'post/getPostByUserId',
  async ({token, username}, {rejectWithValue}) => {
    try{
      const {data} = await getPostsByUsernameService(token, username);
      return data.posts;
    }catch(error){
      return rejectWithValue(error.message);
    }
  }
)

export const likePost = createAsyncThunk(
  'post/likePost',
  async (postId, {rejectWithValue}) => {
    try{
      const{data} = await likePostService(postId);
      return data.posts;
    }catch(err){
      console.log(err.response.data);
      return rejectWithValue(err.message);
    }
  }
)

export const dislikePost = createAsyncThunk(
  'post/dislikePost',
  async (postId, {rejectWithValue}) => {
    try{
      const{data} = await dislikePostService(postId);
      return data.posts;
    }catch(err){
      console.log(err.response.data);
      return rejectWithValue(err.message);
    }
  }
)

export const bookmarkPost = createAsyncThunk(
  'post/bookmarkPost',
  async (postId, {rejectWithValue}) => {
    try{
      const{data} = await addBookmarkService(postId);
      return data.bookmarks;
    }catch(err){
      console.log(err.response.data);
      return rejectWithValue(err.message);
    }
  }
);
export const removePostFromBookmark = createAsyncThunk(
  'post/removePostFromBookmark',
  async (postId, {rejectWithValue}) => {
    try{
      const{data} = await removeBookmarkService(postId);
      return data.bookmarks;
    }catch(err){
      console.log(err.response.data);
      return rejectWithValue(err.message);
    }
  }
);
export const getAllBookmarkPosts = createAsyncThunk(
  'post/getAllBookmarkPosts',
  async (postId, {rejectWithValue}) => {
    try{
      const{data} = await getAllBookmarksService();
      return data.bookmarks;
    }catch(err){
      console.log(err.response.data);
      return rejectWithValue(err.message);
    }
  }
);

export const addCommentToPost = createAsyncThunk(
  'post/addComment',
  async ({token, postId, commentData}, {rejectWithValue}) => {
    try{
      const {data} = await addCommentsToPostService(token, postId, commentData);
      return data.posts;
    }catch(error){
      return rejectWithValue(error.message);
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
      state.postError = 'Error in get all posts';
    })
    builder.addCase(getPostByUsername.pending, (state) => {
      state.postLoading = true;
    })
    builder.addCase(getPostByUsername.fulfilled, (state, {payload}) => {
      state.postLoading = false;
      state.userPosts = payload;
    })
    builder.addCase(getPostByUsername.rejected, (state) => {
      state.postLoading = false;
      state.postError = 'Error in get user"s posts';
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
      state.postError = 'Error in editing post';
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
      state.postError = 'Error in deleting post';
    })
    builder.addCase(likePost.fulfilled, (state, {payload}) => {
      state.posts = payload;
    })
    builder.addCase(likePost.rejected, (state) => {
      state.postError = 'Error in liking post';
    })
    builder.addCase(dislikePost.fulfilled, (state, {payload}) => {
      state.posts = payload;
    })
    builder.addCase(dislikePost.rejected, (state) => {
      state.postError = 'Error in disliking post';
    })
    builder.addCase(bookmarkPost.pending, (state) => {
      state.postLoading = true;
    })
    builder.addCase(bookmarkPost.fulfilled, (state, {payload}) => {
      state.postLoading = false;
      state.bookmarks = payload;
    })
    builder.addCase(bookmarkPost.rejected, (state) => {
      state.postLoading = false;
      state.postError = 'Error in add post to bookmark';
    })
    builder.addCase(removePostFromBookmark.pending, (state) => {
      state.postLoading = true;
    })
    builder.addCase(removePostFromBookmark.fulfilled, (state, {payload}) => {
      state.postLoading = false;
      state.bookmarks = payload;
    })
    builder.addCase(removePostFromBookmark.rejected, (state) => {
      state.postLoading = false;
      state.postError = 'Error in remove post from bookmark';
    })
    builder.addCase(getAllBookmarkPosts.pending, (state) => {
      state.postLoading = true;
    })
    builder.addCase(getAllBookmarkPosts.fulfilled, (state, {payload}) => {
      state.postLoading = false;
      state.bookmarks = payload;
    })
    builder.addCase(getAllBookmarkPosts.rejected, (state) => {
      state.postLoading = false;
      state.postError = 'Error in get bookmark post';
    }),
    // builder.addCase(getPostComments.pending, (state) => {
    //   state.postLoading = true;
    // })
    // builder.addCase(getPostComments.fulfilled, (state, {payload}) => {
    //   state.postLoading = false;
    //   state.bookmarks = payload;
    // })
    // builder.addCase(getPostComments.rejected, (state) => {
    //   state.postLoading = false;
    //   state.postError = 'Error in get bookmark post';
    // }),
    builder.addCase(addCommentToPost.pending, (state) => {
      state.postLoading = true;
    })
    builder.addCase(addCommentToPost.fulfilled, (state, {payload}) => {
      state.postLoading = false;
      state.posts = payload;
    })
    builder.addCase(addCommentToPost.rejected, (state) => {
      state.postLoading = false;
      state.postError = 'Error in adding commentes to post';
    })
    
    
  }
})

export const getPostState = (state) => state.post; 
export const postReducer = postSlice.reducer;