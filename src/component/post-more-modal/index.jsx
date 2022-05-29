import { deletePost } from 'features';
import { openModal, setPostFields } from 'features';
import { useDispatch } from 'react-redux';
import {useToast} from 'custom-hooks/useToast'

export const PostMoreModal = ({postData, optionHandler}) => {
  const dispatch = useDispatch();
  const {showToast} = useToast();

  const openEditModal = () => {
    dispatch(openModal('post-form'));
    dispatch(setPostFields(postData));
    optionHandler();
  }

  const deleteHandler = async () => {
    try{
    const response = await dispatch(deletePost(postData._id));
    if(response?.error)
      throw new Error('Error in deleting post');
    optionHandler();
    showToast('Post Deleted', 'success');
    }
    catch(err){
      console.log(err.message);
      showToast('Post Deletion Failed', 'error');
    }
  }

  return (
    <>
    <div className='flex flex-col absolute right-0 top-9 w-40 bg-base-purple shadow-md p-2'>
      <button className='flex items-center gap-2 py-2 px-3 hover:bg-white rounded-full' 
        onClick={openEditModal}>
        <i className="fa-solid fa-pen-to-square"></i>
        Edit
      </button>
      <button className='flex items-center gap-2 py-2 px-3 hover:bg-white rounded-full'
        onClick={deleteHandler}>
        <i className="fa-solid fa-trash"></i>
        Delete
      </button>
    </div>
    </>
  )
}