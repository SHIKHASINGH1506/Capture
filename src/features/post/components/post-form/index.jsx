import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authState, addPost, editPost } from 'features';
import { closeModal, setPostFields, modalState } from 'features';
import { useToast } from 'custom-hooks/useToast';

const PostForm = ({ modal }) => {
  const dispatch = useDispatch();
  const { postToEdit } = useSelector(modalState);
  const { showToast } = useToast();
  const {user:{profileImage}} = useSelector(authState);

  const initialPostFields = {
    content: '',
  }
  const isEditPost = !modal
    ? false
    : Object.keys(postToEdit).length > 0
      ? true
      : false

  const [postData, setPostData] = useState(isEditPost ? postToEdit : initialPostFields);
  const { content } = postData;

  const addPostHandler = async (e) => {
    e.preventDefault();
    if(!isEditPost){
      try {
        const response = await dispatch(addPost(postData));
        if (response?.error)
          throw new Error('Error in adding post');
        showToast('Post added successfully', 'success');
        setPostData(initialPostFields);
        dispatch(closeModal(false));
      } catch (err) {
        showToast('Error in adding post', 'error');
        console.log(err.message);
      }
    }else{
      try{
        const response = await dispatch(editPost(postData));
        if (response?.error)
          throw new Error('Error in updating post'); 
        showToast('Post edited successfully', 'success');
        setPostData(initialPostFields);
        dispatch(closeModal(false));
        dispatch(setPostFields({}));
      }catch(err){
        showToast('Error in editing post', 'error');
        console.log(err.message);
      }
  }
}

  const setPostFieldHandler = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    })
  }
  let isPostContentNull = content.trim() === '';
  return (
    <div className='flex flex-col w-full bg-white'>
      <div className='flex p-5 gap-4'>
        <div className='w-14 h-14 shrink-0'>
          <img className='w-14 h-14 object-cover rounded-full' src={profileImage} alt="" />
        </div>
        <form className='flex flex-col w-full gap-2.5' onSubmit={addPostHandler}>
          <textarea className='resize-none overflow-y-auto px-4 py-2 focus:outline-none border-none'
            name="content"
            id=""
            value={content}
            onChange={setPostFieldHandler}
            placeholder="What's happening with you ?" ></textarea>
          <div className='flex justify-between'>
            <button
              type='submit'
              className='disabled:btn-disabled btn-primary ml-auto'
              disabled={isPostContentNull}
            >Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { PostForm }