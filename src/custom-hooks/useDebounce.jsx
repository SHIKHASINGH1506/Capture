import { searchUsers } from 'utils/searchUsers';
import { useState, useCallback } from 'react';
import { userState } from 'features';
import { useSelector } from 'react-redux';

export const useDebounce = () => {
  const { allUsers } = useSelector(userState);
  const [searchResultLoading, setSearchResultLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState();

  const searchKeyChangeHandler = (e) => {
    const userSearchInput = e.target.value;
    setSearchKey(userSearchInput);
    updateDebounceSearchResult(userSearchInput);
  }

  const debounce = (cb, delay=1000) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      setSearchResultLoading(true);
      timeoutId = setTimeout(() => {
        cb(...args);
        setSearchResultLoading(false);
      }, delay);
    } 
  }

  const updateDebounceSearchResult = useCallback(debounce((userSearchInput) => {
    setSearchResult(searchUsers(allUsers, userSearchInput));
  }, 1000),
  [allUsers]
  );

  
  return{
    searchResultLoading,
    searchKey,
    setSearchKey,
    searchResult,
    searchKeyChangeHandler
  }
} 