import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPostModalOpen: false,
  postToEdit: {}
}

const postModalSlice = createSlice({
  name:'postModal',
  initialState,
  reducers:{
    openPostModal: (state) => {
      state.isPostModalOpen = true;
    },
    closePostModal: (state) => {
      state.isPostModalOpen = false;
      state.postToEdit={};
    },
    setEditPostData: (state, action) => {
      console.log(action.payload);
      state.postToEdit = action.payload;
    }
  }
});

export const postModalState = (state) => state.postModal;
export const { openPostModal, closePostModal, setEditPostData } = postModalSlice.actions;
export const postModalReducer = postModalSlice.reducer;