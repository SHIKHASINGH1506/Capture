import { authReducer } from 'features';
import { postReducer, postModalReducer, userReducer, editProfileModalReducer } from 'features';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer:{
    auth: authReducer,
    post: postReducer,
    postModal: postModalReducer,
    editProfileModal: editProfileModalReducer,
    users: userReducer
  }
}) 