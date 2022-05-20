import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authState, userState, getAllUser, followUnfollowUser } from 'features';

export const Suggestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector(authState);
  const { allUsers } = useSelector(userState);

  const [suggestions, setSuggestion] = useState([]);

  useEffect(() => {
    setSuggestion(allUsers
      .filter(u => u.username !== user.username)
      .filter(item => !user.following?.find(followingUser => followingUser._id === item._id))
    );
  },
    [user, allUsers]);

  const isFollowing = followUserId => user.followoing?.find(u => u._id === followUserId) ? true : false;

  const followUserHandler = async followUserId => {
    try {
      const response = await dispatch(followUnfollowUser({
        token: token,
        id: followUserId,
        dispatch: dispatch,
        isFollowing: false
      }))
      if (response?.error) {
        throw new Error('Error in following user');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-1/4 px-5 lg:hidden">
      <div>
        <div className="search-wrapper flex items-center gap-3 py-2 px-4 bg-white rounded-3xl">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input className='bg-white w-full focus:outline-none' type="text" placeholder='Search' />
        </div>
      </div>
      <div className='bg-white px-4'>
        <div className="title">
          <p className='font-bold py-2.5 text-lg'>You might like</p>
        </div>
        <div className="suggestion-list">

          {suggestions.map(({ firstName, lastName, username, _id, profileImage }) =>
            <div className='flex py-3 gap-3' key={_id}>
              <div className="img shrink-0 h-12 w-12">
                <img className='h-12 w-12 object-cover rounded-full' src={profileImage} alt="" />
              </div>
              <div className="flex justify-between grow items-start">
                <div className="cursor-pointer"
                  onClick={() => navigate(`/user-profile/${username}`)}>
                  <p>{`${firstName} ${lastName}`}</p>
                  <p className='text-gray-400 text-sm'>@{username}</p>
                </div>
                <button className='ml-auto btn-primary text-sm'
                  onClick={() => followUserHandler(_id)}>Follow</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}