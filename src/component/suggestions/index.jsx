import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authState, userState, getAllUser, followUser, unFollowUser } from 'features';

export const Suggestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector(authState);
  const { allUsers } = useSelector(userState);

  const [suggestions, setSuggestion] = useState([]);

  useEffect(() => {
    setSuggestion(
      allUsers.filter(u => u.username !== user.username)
    );
  },
    [user, allUsers]);

  console.log(allUsers);

  const isFollowing = followUserId => user.followoing?.find(u => u._id === followUserId) ? true : false;

  const followUnfollowUser = async followUserId => {
    try {
      const response = isFollowing(followUserId)
        ? await dispatch(unFollowUser({ token: token, id: followUserId, dispatch: dispatch }))
        : await dispatch(followUser({ token: token, id: followUserId,  dispatch: dispatch }))
      if (response?.error) {
        throw new Error(
          isFollowing(followUserId)
            ? 'Error in unfollowing the user'
            : 'Error in following user'
        );
      }
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-1/4 px-5 md:hidden">
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

          {suggestions.map(({ firstName, lastName, username, _id }) =>
            <div className='flex py-3' key={_id}>
              <div className="img shrink-0">
              </div>
              <div className="flex justify-between grow items-start">
                <div className="cursor-pointer">
                  <p>{`${firstName} ${lastName}`}</p>
                  <p className='text-gray-400 text-sm'>@{username}</p>
                </div>
                <button className='ml-auto btn-primary text-sm'
                  onClick={() => followUnfollowUser(_id)}>Follow</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}