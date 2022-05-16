import { openPostModal, setEditPostData } from 'features';
import { useDispatch } from 'react-redux';

export const PostMoreModal = ({postData, optionHandler}) => {
  const dispatch = useDispatch();

  const openEditModal = () => {
    dispatch(openPostModal(true));
    dispatch(setEditPostData(postData));
    optionHandler();
  }

  return (
    <>
    <div className='flex flex-col absolute right-0 top-9 w-40 bg-base-purple shadow-md p-2'>
      <button className='flex items-center gap-2 py-2 px-3 hover:bg-white rounded-full' 
        onClick={openEditModal}>
        <i className="fa-solid fa-pen-to-square"></i>
        Edit
      </button>
      <button className='flex items-center gap-2 py-2 px-3 hover:bg-white rounded-full'>
        <i className="fa-solid fa-trash"></i>
        Delete
      </button>
    </div>
    </>
  )
}