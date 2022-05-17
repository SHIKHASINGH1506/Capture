import { useState } from "react"
import { PostMoreModal} from 'component';
import { authState, likePost, dislikePost } from 'features';
import { useDispatch, useSelector } from "react-redux";

export const PostCard = ({post, dialogOption}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const [postOptionModal, setPostOtionModal] = useState(false);

  const {
    fullname, 
    username, 
    content,
    likes:{likedBy, dislikedBy, likeCount},
  } = post;
  console.log(post);
  const optionHandler = () => {
    setPostOtionModal(prevState => !prevState);
  }

  const isPostLikedByUser = () => {
    return likedBy.find(currentUser => currentUser.username === user.username) ? true : false
  }

  const likeIcon = isPostLikedByUser() ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

  const likeHandler = async () => {
    try{
      const response = isPostLikedByUser()
        ? await dispatch(dislikePost(post._id))
        : await dispatch(likePost(post._id))
      if(response?.error){
        throw new Error(
          isPostLikedByUser()
            ? 'Error in dislike post'
            :  'Error in like post'
        )    
      }
      }catch(error){
        console.log(error.message);
      }
    }

    return (
      <>
      <div className='flex flex-col w-full bg-white'>
        <div className='flex p-5 gap-4'>
          <div className='h-12 w-12 shrink-0'>
            <img className='object-cover rounded-full' src='https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png' alt="" />
          </div>
          <div className='flex flex-col w-full gap-2.5 px-4'>
            <div className='flex'>
              <div>
                <span className='font-bold'>{fullname} </span>
                <span className='text-gray-400'>  @{username}</span>
              </div>
            </div>
            <div className='overflow-hidden'>
              {content}
            </div>
            <div className='flex justify-between relative'>
              <button className='flex items-center gap-2 hover:icon-hover p-2 mx-2'
                onClick={likeHandler}>
                <i className={`text-lg ${likeIcon}`}></i>
                {likeCount > 0 ? `${likeCount} Like` : ''}
              </button>
              <button className='hover:icon-hover p-2 mx-2'><i className="text-lg fa-regular fa-bookmark"></i></button>
              <button className='hover:icon-hover p-2 mx-2'><i className="text-lg fa-regular fa-comment"></i></button>
              {dialogOption && <button className='hover:icon-hover p-2 mx-2'
                onClick={optionHandler}><i className="text-lg fa-solid fa-ellipsis-vertical"></i>
              </button>}
              {postOptionModal && <PostMoreModal postData={post} optionHandler={optionHandler}/>}
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }