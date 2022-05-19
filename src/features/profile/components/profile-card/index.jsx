import { authState, openEditProfileModal, setEditProfileData, followUnfollowUser } from 'features';
import { getPostState } from 'features/post/postSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

export const ProfileCard = ({ userData }) => {
  console.log(userData);
  const {
    _id,
    firstName,
    lastName,
    username,
    followers,
    following,
    bio,
    link,
    country
  } = userData;

  const location = useLocation();
  const dispatch = useDispatch();
  const { posts } = useSelector(getPostState);
  const { user, token } = useSelector(authState);

  useEffect(() => {
    isFollowing();
  },
  [followers]
  )

  const editModalHandler = () => {
    dispatch(openEditProfileModal());
    dispatch(setEditProfileData(user));
  }
  const userPostCount = posts.filter(post => post.username === user.username).length;
  const pathDetail = location.pathname;

  const isFollowing = () => followers?.find(u => u.username === user.username);

  const followUnfollowBtn = isFollowing() ? 'Unfollow' : 'Follow';
  console.log(followUnfollowBtn);

  const followUnfollowUserHandler = async () => {
    try {
      const response = isFollowing()
        ? await dispatch(followUnfollowUser({
          token: token,
          id: _id,
          dispatch: dispatch,
          isFollowing: true
        }))
        :
        await dispatch(followUnfollowUser({
          token: token,
          id: _id,
          dispatch: dispatch,
          isFollowing: false
        }))
      if (response?.error) {
        throw new Error(
          isFollowing()
            ? 'Error in unfollowing user'
            : 'Error in following user'
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }



  return (
    <div className='flex w-full bg-white'>
      <div className='flex flex-col w-full gap-2 p-5'>
        <div className='flex items-start'>
          <div className='h-24 w-24 sm:w-20 sm:h-20 shrink-0'>
            <img className='object-cover rounded-full' src='https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png' alt="" />
          </div>
          {pathDetail === '/profile'
            ? <button className='btn-outline-primary ml-auto'
              onClick={editModalHandler}>Edit Profile
            </button>
            : <button className='btn-outline-primary ml-auto'
              onClick={followUnfollowUserHandler}>{followUnfollowBtn}
            </button>
          }
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
            <i className="fa-solid fa-location-dot mr-2"></i>
            {country}
          </p>
        </div>
        <div className='flex gap-3'>
          <p className='text-gray-500'><span className='font-bold text-dark-slate-gray'>{userPostCount}</span> Posts</p>
          <p className='text-gray-500'><span className='font-bold text-dark-slate-gray'>{followers?.length}</span> Followers</p>
          <p className='text-gray-500'><span className='font-bold text-dark-slate-gray'>{following?.length}</span> Followings</p>
        </div>
      </div>
    </div>
  )
}