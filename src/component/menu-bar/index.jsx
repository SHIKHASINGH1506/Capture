import './menu-bar.css';
import logo from 'assets/logo2.png';
import { useDispatch } from 'react-redux';
import { logout } from 'features';
import { NavLink } from 'react-router-dom';

export const Menubar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  }
  return (
    <div className='menu px-5 mr-6 flex flex-col justify-between sm:fixed sm:bottom-0 sm:left-0 sm:w-full'>
      <div className='flex flex-col items-start sticky top-0'>
        <div>
          <div className="flex items-start cursor-pointer p-3 sm:hidden">
            <img className='h-10' src={logo} alt="" />
          </div>
        </div>
        <div className='menu-icons sm:flex sm:justify-around sm:w-full'>
          {/* this would be nav-link tag */}
          <div className="flex items-start cursor-pointer">
            <div className='flex items-center justify-center gap-3 p-3'>
              <div><i className="fa-solid fa-house-chimney text-xl text-gray-700"></i></div>
              <div className="sm:hidden text-gray-700 text-xl">Home</div>
            </div>
          </div>

          <div className="flex items-start cursor-pointer">
            <div className='flex items-center justify-center gap-3 p-3'>
              <div><i className="fa-solid fa-bell text-xl text-gray-700"></i></div>
              <div className="sm:hidden text-gray-700 text-xl">Notification</div>
            </div>
          </div>

          <div className="flex items-start cursor-pointer">
            <div className='flex items-center justify-center gap-3 p-3'>
              <div><i className="fa-solid fa-bookmark text-xl text-gray-700"></i></div>
              <div className="sm:hidden text-gray-700 text-xl">Bookmark</div>
            </div>
          </div>

          <div className="flex items-start cursor-pointer">
            <div className='flex items-center justify-center gap-3 p-3'>
              <div><i className="fa-solid fa-circle-user text-xl text-gray-700"></i></div>
              <div className="sm:hidden text-gray-700 text-xl">Profile</div>
            </div>
          </div>
          <div className="flex items-start cursor-pointer">
            <div className='flex items-center justify-center gap-3 p-3'>
              <div><i className="fa-solid fa-arrow-right-from-bracket text-xl text-gray-700"></i></div>
              <div className="sm:hidden text-gray-700 text-xl"
                onClick={logoutHandler}>Logout</div>
            </div>
          </div>
        </div>
        <div className="w-full sm:hidden">
          <button className='my-6 desktop-btn w-full py-2.5 rounded-full text-white bg-purple-900 hover:bg-purple-600'>Add Post</button>
        </div>
      </div>
    </div>
  )
}