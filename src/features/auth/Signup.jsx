import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useToast} from 'custom-hooks/useToast';

const Signup = () => {
  const dispatch = useDispatch();
  const{authLoading} = useSelector(state=> state.auth);
  const {showToast} = useToast();
  const navigate = useNavigate();
  const initialSignupFields = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  }
  const [signupFields, setSignupFields] = useState(initialSignupFields);
  const [error, setError] = useState(null);

  const fieldChangeHandler = (e) => {
    const {name, value} = e.target;
    setSignupFields({
      ...signupFields,
      [name]: value
  });
}

const validatePasswordHandler = ({target:{name, value}}) =>{
  setSignupFields({
    ...signupFields,
    [name]: value
  });
  if(signupFields.password){
    if(signupFields.password !== value)
      setError('Password does not match');
    else{
      setError(null);
    }
  }
}
const signupFormHandler = async (e, signupFields) =>{
  e.preventDefault();
  try{
    const response = await dispatch(signupUser(signupFields));
    if(response?.error){
      if(response.payload.includes('422'))
        throw new Error('Username already exists');
    throw new Error('Signup failed');
    }
    setSignupFields(initialSignupFields);
    showToast('Signup Successful', 'success');
    navigate('/login');
  }catch(error){
    showToast('Signup Failed', 'error');
    console.log(error.message);
  }
}
  
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='px-4 py-5 flex justify-center items-center'>
        <form className='m-4 w-96 px-4'
          onSubmit={(e) => signupFormHandler(e, signupFields)}>
          <h3 className='text-center uppercase px-4 py-5 font-bold text-2xl'>Sign up</h3>
          <p className='text-center'>Enter email and password</p>
          <div className='mb-4'>
            <label className='block py-2 text-sm' htmlFor="fullName">Full Name</label>
            <input
              className='w-full form-input bodrer-input focus:border-purple-900'
              type="text"
              id="fullName"
              placeholder="john doe"
              name="fullName"
              value={signupFields.fullName}
              onChange={(e) => fieldChangeHandler(e)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block py-2 text-sm' htmlFor="userName">Email</label>
            <input
              className="w-full form-input bodrer-input focus:border-purple-900"
              type="text"
              id="userName"
              placeholder="johndoe@gmail.com"
              name="username"
              value={signupFields.username}
              onChange={(e) => fieldChangeHandler(e)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block py-2 text-sm' htmlFor="pwd">Password</label>
            <input
              className="w-full form-input bodrer-input focus:border-purple-900"
              type="password"
              id="pwd"
              name="password"
              value={signupFields.password}
              placeholder="Password"
              onChange={(e) => fieldChangeHandler(e)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block py-2 text-sm' htmlFor="confirm-pwd">Confirm Password</label>
            <input
              className="w-full form-input bodrer-input focus:border-purple-900"
              type="password"
              name="confirmPassword"
              value={signupFields.confirmPassword}
              id="confirm-pwd"
              placeholder="Confirm Password"
              onChange={(e) => validatePasswordHandler(e)}
              required
            />
          </div>
          {error!==null && <p className='text-red'>{error}</p>}
          <label className='block flex gap-2 items-center py-2 text-sm' htmlFor="pwd-store">
            <input type="checkbox" name="" id="pwd-store" />
            I accept all the terms and conditions
          </label>
          <button 
            className='w-full btn-primary mb-4'
            disabled={authLoading || error}>SIGN UP</button>
          <p className="sub-text text-center">Already have an account?
            <Link className="font-bold text-purple-900" to='/login'> Login </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export { Signup }