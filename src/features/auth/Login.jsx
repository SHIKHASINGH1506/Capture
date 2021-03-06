import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "features";
import { useNavigate, Link } from "react-router-dom";
import {useToast} from 'custom-hooks/useToast';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {showToast} = useToast();
  const token = useSelector(state=> state.auth.token);
  const initialFormState={
    username: "",
    password:""}
  const [loginCreds, setLoginCreds] = useState(initialFormState);
  const testLoginCreds = {
    username: 'shikhasingh',
    password: 'shikhasingh123'
  };

  const setLoginFields = (e) => {
    const{name, value} = e.target;
    setLoginCreds({
      ...loginCreds,
      [name]:value
    })
  }

  const testLoginFormHandler = async (e) => {
    e.preventDefault();
    setLoginCreds(testLoginCreds);
    loginFormHandler(e, testLoginCreds);
  }

  const loginFormHandler = async (e, loginForm) => {
    e.preventDefault();
    try{
    const response = await dispatch(loginUser(loginForm));
    if(response?.error){
      if(response.payload.includes('404'))
        throw new Error('User not found!');
      throw new Error('Invalid credentials');
    }
    setLoginCreds(initialFormState);
    navigate("/"); 
    showToast('Login Successful', 'success');
    }catch(error){
      console.log(error.message);
      showToast(error.message, 'error');
    }
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='px-4 py-5 flex justify-center items-center'>
        <form className='m-4 w-96 px-4' 
        onSubmit={(e) => loginFormHandler(e, loginCreds)}>
          <h3 className='text-center uppercase px-4 py-5 font-bold text-2xl'>Log in</h3>
          <p className='text-center'>Enter email and password</p>
          <div className='mb-4'>
            <label className='block py-2 text-sm' htmlFor="userName">Email</label>
            <input
              className='auth-input'
              type="text"
              id="userName"
              placeholder="johndoe@gmail.com"
              name="username"
              value={loginCreds.username}
              onChange={(e) => setLoginFields(e)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block py-2 text-sm' htmlFor="pwd">Password</label>
            <input
              className="auth-input"
              type="password"
              id="pwd"
              placeholder="Password"
              name="password"
              value={loginCreds.password}
              onChange={(e) => setLoginFields(e)}
              required
            />
          </div>
          <div className='flex justify-between items-center mb-2'>
            <div>
              <label className="block flex items-center gap-2 py-2 text-sm" htmlFor="pwd-store">
                <input type="checkbox" name="" id="pwd-store" />
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm">Forgot Password?</a>
          </div>
          <button className='w-full btn-primary'>LOG IN</button>
          <button className='w-full text-purple-900 text-center uppercase my-4' 
            onClick={(e) => testLoginFormHandler(e)}>
            LOG IN WITH TEST CREDENTIALS</button>
          <p className="sub-text text-center">Don't have an account?
            <Link className="font-bold text-purple-900" to='/signup'> Signup </Link>
          </p>
        </form>
      </div>
    </div>
  )
}