import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authState, addPost, editPost } from 'features';
import { closeModal, setPostFields, modalState } from 'features';
import { useToast } from 'custom-hooks/useToast';
import loader from 'assets/loader.svg';

const PostForm = ({ modal }) => {
  const dispatch = useDispatch();
  const { postToEdit } = useSelector(modalState);
  const { showToast } = useToast();
  const { user: { profileImage } } = useSelector(authState);

  const initialPostFields = {
    content: '',
  }
  const isEditPost = !modal
    ? false
    : Object.keys(postToEdit).length > 0
      ? true
      : false

  const [postData, setPostData] = useState(isEditPost ? postToEdit : initialPostFields);
  const [postImage, setPostImage] = useState(postToEdit.postImage ?? null);
  const [isImageFileUploading, setImageFileUploading] = useState(false);
  const { content } = postData;

  const addPostHandler = async (e) => {
    e.preventDefault();
    if (!isEditPost) {
      try {
        const response = await dispatch(addPost({ postData: { ...postData, postImage: postImage } }))
        if (response?.error)
          throw new Error('Error in adding post');
        showToast('Post added successfully', 'success');
        setPostData(initialPostFields);
        setPostImage("");
        dispatch(closeModal(false));
      } catch (err) {
        showToast('Error in adding post', 'error');
        console.log(err.message);
      }
    } else {
      try {
        const response = await dispatch(editPost({ id: postData._id, postData: { postData: { ...postData, postImage: postImage } } }))
        if (response?.error)
          throw new Error('Error in updating post');
        showToast('Post edited successfully', 'success');
        setPostData(initialPostFields);
        dispatch(closeModal(false));
        dispatch(setPostFields({}));
      } catch (err) {
        showToast('Error in editing post', 'error');
        console.log(err.message);
      }
    }
  }

  const setPostFieldHandler = (e) => {
    e.stopPropagation();
    if (e.target.name === 'content') {
      const { name, value } = e.target;
      setPostData({
        ...postData,
        [name]: value
      })
    }
  }
  let postContent = content.trim() !== '' || postImage;

  const uploadImageHandler = async e => {
    setImageFileUploading(true);
    const imageFile = e.target.files[0];
    if (Math.floor(imageFile.size / 1000000) > 3) {
      showToast('File size can"t be more than 3mb', 'error');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
      const imageUploadUrl =
        "https://api.cloudinary.com/v1_1/" +
        process.env.REACT_APP_CLOUD_NAME +
        "/image/upload";
      const response = await fetch(imageUploadUrl, {
        method: "POST",
        body: formData,
      })

      const { url } = await response.json();
      setPostImage(url);
    }
    // .then((response) => {
    //   return response.json();
    // })
    // .then((data) => {
    //   setPostImage(data.url);
    //   //setTimeout(() => setImageFileUploading(false), 1500);
    //    //setImageFileUploading(false);
    // })
    // .catch((error) => {
    //   showToast(
    //     "Failed to update image. Please try again later.",
    //     "error"
    //   );
    // })
    catch (error) {
      showToast(
        "Failed to update image. Please try again later.",
        "error"
      );
    }
    finally {
      setImageFileUploading(false);
    }
  }

  const removeImageHandler = () => {
    setPostImage('');
  }

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
          {isImageFileUploading
            ? <div className='flex justify-center py-1.5'><img src={loader} alt="Loader" className='h-8 w-8' /></div>
            : postImage
              ? <div className='relative flex items-center max-w-full mx-auto'>
                <img src={postImage} alt="image" className='relative max-w-[300px] max-h-[300px] w-full' />
                <button className='absolute top-2 right-2 text-xl'
                  onClick={removeImageHandler}><i className="fa-solid fa-xmark"></i></button>
              </div>
              : null

          }
          <div className='flex'>
            {!modal && <label htmlFor="imageInput" className={`btn-icon self-start cursor-pointer ${postImage ? 'btn-disabled' : 'btn-icon-primary'}`}>
              <i class="fa-solid fa-image"></i>
              <input
                type="file"
                id='imageInput'
                className='hidden disabled:btn-disabled'
                disabled={postImage}
                onChange={uploadImageHandler} />
            </label>}
            <button
              type='submit'
              className='disabled:btn-disabled btn-primary ml-auto'
              disabled={!postContent}
            >Post</button>
          </div>
        </form>
      </div>
    </div >
  )
}

export { PostForm }