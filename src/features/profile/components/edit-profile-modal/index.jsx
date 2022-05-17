import { EditProfileForm } from '../edit-profile-form';
import { useRef } from 'react';
import { useClickOutside } from 'custom-hooks/useClickOutside';
import { editProfileModalState, closeEditProfileModal, setEditProfileData } from 'features';
import { useDispatch, useSelector } from 'react-redux';

const EditProfileModal = () => {
  const myRef = useRef();
  const dispatch = useDispatch();
  const { isEditProfileModalOpen, profileToEdit } = useSelector(editProfileModalState);

  const outsideClickHandler = () => {
    dispatch(closeEditProfileModal(false));
    Object.keys(profileToEdit).length && dispatch(setEditProfileData({}));
  }

  useClickOutside(myRef, outsideClickHandler);
  return (
    <>
      {isEditProfileModalOpen &&
        <div className={`fixed top-0 left-0 flex justify-center items-center transition-opacity ease-in bg-transparent-black z-20 h-screen w-full`}>
          <div ref={myRef} className={`z-30 w-96`}>
            <EditProfileForm modal={true} />
          </div>
        </div>
      }
    </>
  )
}

export { EditProfileModal };