import { createAsyncThunk, createSlice, ThunkAPI } from "@reduxjs/toolkit";
import { login, signup } from 'service';

const initialState = {
  token: localStorage.getItem('token') || null,
  isLoggedIn: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  authLoading: false,
  authError: null
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginCreds, {rejectWithValue}) => {
    try{
      const {data} = await login(loginCreds);
      localStorage.setItem('token', data.encodedToken);
      localStorage.setItem('user', JSON.stringify(data.foundUser));
      localStorage.setItem('isLoggedIn', true);
      return data;
    }catch(err){
      return rejectWithValue(err.message);
    }
  }
)
export const signupUser = createAsyncThunk(
  'signup/signupUser',
  async (signupCreds, {rejectWithValue}) => {
    try{
      const {data} = await signup(signupCreds);
      return data;
    }catch(err){
      return rejectWithValue(err.message);
    }
  }
)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
      state.authLoading = false;
      state.authError = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
        state.authLoading= true
    })
    builder.addCase(signupUser.fulfilled, (state, {payload}) => {
        state.authLoading=  false,
        state.token= payload.encodedToken,
        state.user= payload.user,
        state.isLoggedIn= true
    })
    builder.addCase(signupUser.rejected, (state) => {
        state.authLoading = false,
        state.authError = 'Error in signing up user'
    })
    builder.addCase(loginUser.pending, (state) => {
      state.authLoading= true
    })
    builder.addCase(loginUser.fulfilled, (state, {payload}) => {
      state.authLoading = false,
      state.token = payload.encodedToken,
      state.user = payload.foundUser,
      state.isLoggedIn = true,
      state.authError = null
    })
    builder.addCase(loginUser.rejected, (state) => {
        state.authLoading= false,
        state.authError= 'Login Failed'
    })
  }
});
export const authState = (state) => state.auth;
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
