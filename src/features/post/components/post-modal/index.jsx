import { PostForm } from '../post-form';
import { useRef } from 'react';
import { useClickOutside } from 'custom-hooks/useClickOutside';
import { closePostModal, postModalState, setEditPostData } from 'features';
import { useDispatch, useSelector } from 'react-redux';

const PostModal = () => {
  const myRef = useRef();
  const dispatch = useDispatch();
  const {isPostModalOpen, postToEdit} = useSelector(postModalState);

  const outsideClickHandler = () => {
    dispatch(closePostModal(false));
    Object.keys(postToEdit).length && dispatch(setEditPostData({}));
  }

  useClickOutside(myRef, outsideClickHandler);
  return (
    <>
    {isPostModalOpen && 
      <div className={`fixed top-0 left-0 flex justify-center items-center transition-opacity ease-in bg-transparent-black z-20 h-screen w-full`}>
      <div  ref={myRef} className={`z-30 w-96`}>
        <PostForm modal={true}/>
      </div>
    </div>
    }
    </>
  )
}

export { PostModal };