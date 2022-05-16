import { authReducer } from 'features';
import { postReducer, postModalReducer } from 'features';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer:{
    auth: authReducer,
    post: postReducer,
    postModal: postModalReducer
  }
}) 