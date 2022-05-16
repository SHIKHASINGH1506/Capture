import { PostForm } from '../post-form';
import { useRef } from 'react';
import { useClickOutside } from 'custom-hooks/useClickOutside';

const PostModal = ({modalVisibilityHandler}) => {
  const myRef = useRef();

  useClickOutside(myRef, () => modalVisibilityHandler(false));
  return (
    <>
      <div className={`fixed top-0 left-0 flex justify-center items-center transition-opacity ease-in bg-transparent-black z-20 h-screen w-full`}>
        <div  ref={myRef} className={`z-30 w-96`}>
          <PostForm modalVisibilityHandler={modalVisibilityHandler}/>
        </div>
      </div>
    </>
  )
}

export { PostModal };