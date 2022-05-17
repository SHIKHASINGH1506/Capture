import { authState, openEditProfileModal, setEditProfileData } from 'features';
import { getPostState } from 'features/post/postSlice';
import { useDispatch, useSelector } from "react-redux";

export const ProfileCard = () => {
  const { user:
    {
      firstName,
      lastName,
      username,
      followers,
      following,
      bio,
      link,
      country
    }
  } = useSelector(authState);
  const dispatch = useDispatch();
  const { posts } = useSelector(getPostState);
  const { user } = useSelector(authState);

  const editModalHandler = () => {
    dispatch(openEditProfileModal());
    dispatch(setEditProfileData(user));
  }

  return (
    <div className='flex w-full bg-white'>
      <div className='flex flex-col w-full gap-2 p-5'>
        <div className='flex items-start'>
          <div className='h-24 w-24 sm:w-20 sm:h-20 shrink-0'>
            <img className='object-cover rounded-full' src='https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png' alt="" />
          </div>
          <button className='btn-outline-primary ml-auto'
            onClick={editModalHandler}>Edit Profile</button>
        </div>
        <div>
          <p className='text-xl font-black'>{`${firstName} ${lastName}`}</p>
          <p className='text-gray-400'>{`@${username}`}</p>
        </div>
        <p className='text-gray-500'>{bio}</p>
        <div className="flex gap-3">
          <p>
            <i className="fa-solid fa-link mr-2" ></i>
            <a className='text-purple-700 hover:underline decoration-1 break-all'
              href={link}
              target='_blank'>{link}
            </a>
          </p>
          <p>
            <i class="fa-solid fa-location-dot mr-2"></i>
            {country}
          </p>
        </div>
        <div className='flex gap-3'>
          <p className='text-gray-500'><span className='font-bold text-dark-slate-gray'>{posts?.length}</span> Posts</p>
          <p className='text-gray-500'><span className='font-bold text-dark-slate-gray'>{followers?.length}</span> Followers</p>
          <p className='text-gray-500'><span className='font-bold text-dark-slate-gray'>{following?.length}</span> Followings</p>
        </div>
      </div>
    </div>
  )
}