import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  postToEdit: {},
  modalChildren: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalChildren = action.payload
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.postToEdit={};
    },
    setPostFields: (state, action) => {
      console.log(action.payload);
      state.postToEdit = action.payload;
    }
  }
});

export const {openModal, closeModal, setPostFields} = modalSlice.actions;
export const modalState = state => state.modal;
export const modalReducer = modalSlice.reducer;
