import axios from 'axios';

const getAllBookmarksService = async () => {
  const token = localStorage.getItem('token');
  return await axios.get('/api/users/bookmark/', {headers: {authorization: token}})
}

const addBookmarkService = async (postId) => {
  const token = localStorage.getItem('token');
  return await axios.post(`/api/users/bookmark/${postId}`, {}, {headers: {authorization: token}})
}

const removeBookmarkService = async (postId) => {
  const token = localStorage.getItem('token');
  return await axios.post(`/api/users/remove-bookmark/${postId}`, {}, {headers: {authorization: token}})
}

export {getAllBookmarksService, addBookmarkService, removeBookmarkService};