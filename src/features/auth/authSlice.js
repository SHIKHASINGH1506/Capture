import { createAsyncThunk, createSlice, ThunkAPI } from "@reduxjs/toolkit";
import { login, signup } from 'service';

const initialState = {
  token: localStorage.getItem('token') || null,
  isLoggedIn: false,
  user: null,
  authLoading: false,
  authError: null
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginCreds, {rejectWithValue}) => {
    try{
      const {data} = await login(loginCreds);
      localStorage.setItem('token', data.encodedToken);
      localStorage.setItem('user', JSON.stringify(data.user));
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      return{
        ...state,
        authLoading: true
      }
    })
    builder.addCase(signupUser.fulfilled, (state, {payload}) => {
      return{
        ...state,
        authLoading: false,
        token: payload.encodedToken,
        user: payload.user,
        isLoggedIn: true
      }
    })
    builder.addCase(signupUser.rejected, (state) => {
      return{
        ...state,
        authLoading: false,
        authError: 'Error in signing up user'
      }
    })
    builder.addCase(loginUser.pending, (state) => {
    return{ 
      ...state,
      authLoading: true,
    }
    })
    builder.addCase(loginUser.fulfilled, (state, {payload}) => {
    return {
      ...state,
      authLoading: false,
      token: payload.encodedToken,
      user: payload.user,
      isLoggedIn: true
    };
    })
    builder.addCase(loginUser.rejected, (state) => {
      return{
        ...state,
        authLoading: false,
        authError: 'Login Failed'
      }
    })
  }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
