import { useState } from "react"
import {PostMoreModal} from 'component';
import { postModalState} from 'features';

export const PostCard = ({post}) => {
  const [postOptionModal, setPostOtionModal] = useState(false);

  const {_id, title, fullname, username, content, author, createdAt, updatedAt, comments} = post;
  const optionHandler = () => {
    setPostOtionModal(prevState => !prevState);
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
              <button className='hover:icon-hover p-2 mx-2'><i className="text-lg fa-solid fa-heart"></i></button>
              <button className='hover:icon-hover p-2 mx-2'><i className="text-lg fa-solid fa-bookmark"></i></button>
              <button className='hover:icon-hover p-2 mx-2'><i className="text-lg fa-solid fa-message"></i></button>
              <button className='hover:icon-hover p-2 mx-2'
                onClick={optionHandler}><i className="text-lg fa-solid fa-ellipsis-vertical"></i>
              </button>
              {postOptionModal && <PostMoreModal postData={post} optionHandler={optionHandler}/>}
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }