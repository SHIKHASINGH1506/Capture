import { PostForm, EditProfileForm } from 'features';
import { useRef } from 'react';
import { useClickOutside } from 'custom-hooks/useClickOutside';
import { closeModal, modalState, setPostFields } from 'features';
import { useDispatch, useSelector } from 'react-redux';

export const Modal = () => {
  const myRef = useRef();
  const dispatch = useDispatch();
  const { isModalOpen, postToEdit, modalChildren } = useSelector(modalState);

  const outsideClickHandler = () => {
    dispatch(closeModal(false));
    Object.keys(postToEdit).length && dispatch(setPostFields({}));
  }

  useClickOutside(myRef, outsideClickHandler);
  return (
    <>
      {isModalOpen &&
        <div className={`fixed top-0 left-0 flex justify-center items-center transition-opacity ease-in bg-transparent-black z-20 h-screen w-full`}>
          <div ref={myRef} className={`z-30 w-96`}>
            {
              modalChildren==='post-form'
                ? (<PostForm modal={true}/>)
                : modalChildren === 'profile-form'
                  ? <EditProfileForm />
                  : <></>
            }
          </div>
        </div>
      }
    </>
  )
}
