import axios from 'axios';

const login = async (loginCreds) => {
  const loginUrl = '/api/auth/login';
  return await axios.post(loginUrl, loginCreds);
}

const signup = async (signupCreds) => {
  const signupUrl = '/api/auth/signup';
  return await axios.post(signupUrl, signupCreds);
}

export { login, signup };