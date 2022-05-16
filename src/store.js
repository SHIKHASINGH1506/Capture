import { authReducer } from 'features';
import { postReducer } from 'features';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer:{
    auth: authReducer,
    post: postReducer
  }
}) 