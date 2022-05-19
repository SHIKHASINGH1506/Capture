import axios from 'axios';

const getAllPostService = async () => {
  const token = localStorage.getItem('token');
  return await axios.get('/api/posts', {headers: {authorization: token}})
}

const getPostsByUsernameService = async (token, username) => {
  return await axios.get(`/api/posts/user/${username}`, {headers: {authorization: token}});
}

const addPostService =  async (postData) => {
  const token = localStorage.getItem('token');
  return await axios.post('/api/posts', {postData: postData}, {headers: {authorization: token}});
}

const editPostService = async (postId, postData) => {
  const token = localStorage.getItem('token');
  return await axios.post(`/api/posts/edit/${postId}`, {postData: postData}, {headers: {authorization: token}});
}

const deletePostService = async (postId) => {
  const token = localStorage.getItem('token');
  return await axios.delete(`/api/posts/${postId}`, {headers: {authorization: token}});
}

const likePostService = async (postId) => {
  const token = localStorage.getItem('token');
  return await axios.post(`/api/posts/like/${postId}`, {}, {headers: {authorization: token}});
}

const dislikePostService = async (postId) => {
  const token = localStorage.getItem('token');
  return await axios.post(`/api/posts/dislike/${postId}`, {}, {headers: {authorization: token}});
}

export {addPostService, getAllPostService, editPostService, deletePostService, likePostService, dislikePostService, getPostsByUsernameService};