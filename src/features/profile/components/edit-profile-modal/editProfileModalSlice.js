import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditProfileModalOpen: false,
  profileToEdit: {}
}

const editProfileModalSlice = createSlice({
  name: 'editProfileModal',
  initialState,
  reducers: {
    openEditProfileModal: (state) => {
      state.isEditProfileModalOpen = true;
    },
    closeEditProfileModal: (state) => {
      state.isEditProfileModalOpen = false;
      state.postToEdit = {};
    },
    setEditProfileData: (state, action) => {
      state.profileToEdit = action.payload;
    }
  }
});

export const editProfileModalState = (state) => state.editProfileModal;
export const { openEditProfileModal, closeEditProfileModal, setEditProfileData } = editProfileModalSlice.actions;
export const editProfileModalReducer = editProfileModalSlice.reducer;