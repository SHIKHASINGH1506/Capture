import axios from 'axios';

const getAllPostService = async () => {
  const token = localStorage.getItem('token');
  console.log('from get all posts service');
  return await axios.get('/api/posts', {headers: {authorization: token}})
}

const addPostService =  async (postData) => {
  const token = localStorage.getItem('token');
  return await axios.post('/api/posts', {postData: postData}, {headers: {authorization: token}});
}

export {addPostService, getAllPostService}