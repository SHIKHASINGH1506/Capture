import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authState, userState, followUnfollowUser } from 'features';
import { useDebounce } from 'custom-hooks/useDebounce';
import { useClickOutside } from 'custom-hooks/useClickOutside';
import loader from "assets/loader.svg";

export const Suggestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const outsideRef = useRef()
  const { user, token } = useSelector(authState);
  const { allUsers } = useSelector(userState);
  const { searchKey, setSearchKey, searchResult, searchKeyChangeHandler, searchResultLoading } = useDebounce();
  const [searchResultContainerVisibility, setSearchResultContainerVisibility] = useState(false);

  const [suggestions, setSuggestion] = useState([]);

  useEffect(() => {
    setSuggestion(allUsers
      .filter(u => u.username !== user.username)
      .filter(item => !user.following?.find(followingUser => followingUser._id === item._id))
    );
  },
    [user, allUsers]);

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

  useEffect(() => {
    setSearchResultContainerVisibility(true);
    searchKey ? setSearchResultContainerVisibility(true) : setSearchResultContainerVisibility(false);
  },
    [searchKey]);

  const searchResultClickHandler = (username) => {
    setSearchResultContainerVisibility(false);
    navigate(`/user-profile/${username}`);
    setSearchKey('');
  }

  const outsideClickHandler = () => {
    setSearchResultContainerVisibility(false);
    setSearchKey('');
  }

  useClickOutside(outsideRef, outsideClickHandler);
  const setSearchTextHandler = e => {
    searchKeyChangeHandler(e);
  }
  return (
    <div className="flex flex-col gap-4 grow h-screen sticky top-3 w-1/4 px-5 lg:hidden">
      <div ref={outsideRef} className='relative'>
        <div className="search-wrapper flex items-center gap-3 py-2 px-4 bg-white rounded-3xl">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className='bg-white w-full focus:outline-none'
            type="text"
            placeholder='Search'
            name="searchText"
            value={searchKey}
            onChange={setSearchTextHandler} />
        </div>
        {searchResultContainerVisibility &&
          <ul className='absolute right-0 bg-white w-full top-11 shadow'>
            {searchResultLoading
              ? <div className='flex justify-center py-1.5'><img src={loader} alt="Loader" className='h-8 w-8' /></div>
              : searchResult?.length > 0
                  ? searchResult?.map(item => {
                    return (
                      <li
                        key={item._id}
                        className='flex gap-3 items-center p-1.5 cursor-pointer'
                        onClick={() => searchResultClickHandler(item.username)}>
                        <div className="img shrink-0 h-8 w-8">
                          <img className='h-8 w-8 object-cover rounded-full' src={item.profileImage} alt="" />
                        </div>
                        <p><span>{item.firstName}</span> <span>{item.lastName}</span></p>
                      </li>
                    )
                  })
                  : <div className='p-1.5'>No user found!</div>
              }
          </ul>}
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