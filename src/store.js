import { authReducer } from 'features';
import { postReducer, userReducer, modalReducer } from 'features';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer:{
    auth: authReducer,
    post: postReducer,
    users: userReducer,
    modal: modalReducer
  }
}) 