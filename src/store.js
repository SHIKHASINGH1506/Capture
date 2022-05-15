import { authReducer } from 'features';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer:{
    auth: authReducer
  }
}) 