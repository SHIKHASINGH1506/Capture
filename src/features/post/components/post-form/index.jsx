import logo from 'assets/logo2.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from 'features';
import { useToast} from 'custom-hooks/useToast';

const PostForm = ({modalVisibilityHandler}) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const initialPostFields = {
    content: '',
  }
  const [postData, setPostData] = useState(initialPostFields);
  const {content} = postData;

  const addPostHandler = async (e) => {
    e.preventDefault();
      try{
        const response = await dispatch(addPost(postData));
        if(response?.error)
          throw new Error('Error in adding post');
        showToast('Post added successfully', 'success');
        setPostData(initialPostFields);
        modalVisibilityHandler(false);
      }catch(err){
        showToast('Error in adding post', 'error');
        console.log(err.message);
      }
  }

  const setPostFieldHandler = (e) => {
    e.stopPropagation();
    const {name, value} = e.target;
    setPostData({
      ...postData,
      [name]: value
    })
  }
  let isPostContentNull = content.trim() === '';
  return (
    <div className='flex flex-col w-full bg-white'>
      <div className='flex p-5 gap-4'>
        <div className='w-12 h-12'>
          <img className='' src={logo} alt="" />
        </div>
        <form className='flex flex-col w-full gap-2.5' onSubmit={addPostHandler}>
          <textarea className='resize-none overflow-hidden h-16 md:h-16 px-4 py-2 focus:outline-none border-none' 
            name="content" 
            id="" 
            value={content}
            onChange={setPostFieldHandler}
            placeholder="What's happening with you ?" ></textarea>
          <div className='flex justify-between'>
            <div className="icons flex">
              <button className='p-2 mx-2'><i className="fa-solid fa-image"></i></button>
              <button className='p-2 mx-2'><i className="fa-solid fa-face-smile"></i></button>
            </div>
            <button 
              type='submit'
              className='disabled:btn-disabled btn-primary'
              disabled={isPostContentNull}
            >Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { PostForm };