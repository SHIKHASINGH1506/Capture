import './menu-bar.css';
import logo from 'assets/logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'features';
import { NavLink } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { postModalState, openPostModal } from 'features';
import { useState } from 'react';

export const Menubar = () => {
  const dispatch = useDispatch();
  const {isPostModalOpen} = useSelector(postModalState);
  const [newPostModal, setNewPostModal] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
  }
  const menuItems = [
    {
      id: uuid(),
      name: 'Home',
      to: '/',
      icon: <i className="fa-solid fa-house-chimney text-xl text-gray-700"></i>
    },
    {
      id: uuid(),
      name: 'Explore',
      to: '/explore',
      icon: <i className="fa-solid fa-hashtag text-xl text-gray-700"></i>
    },
    {
      id: uuid(),
      name: 'Bookmark',
      to: '/bookmark',
      icon: <i className="fa-solid fa-bookmark text-xl text-gray-700"></i>
    },
    {
      id: uuid(),
      name: 'Profile',
      to: '/profile',
      icon: <i className="fa-solid fa-circle-user text-xl text-gray-700"></i>
    }
  ];

  const mapMenuItems = (linkFor = 'footer') => 
    menuItems.map( ({id, name, to, icon }) => {
      return (
        <li className="flex mb-3 items-start cursor-pointer" key={id}>
          <NavLink 
            className={ ({isActive}) => isActive ? 'flex items-center justify-center gap-4  gap-3 py-2 px-4 rounded-full bg-white' : 'flex items-center justify-center gap-4 py-2 px-4 rounded-full hover:bg-white'}
            to={to}>
              <div>{icon}</div>
              {linkFor === 'sidebar' ? <div className='text-gray-700 text-xl'>{name}</div> : null}
          </NavLink>
        </li>
      )
    })

  const modalVisibilityHandler = (modalState) => {
    setNewPostModal(modalState);
  }

  return (
    <>
    <aside className='menu px-5 flex flex-col justify-between'>
      <div className='flex flex-col items-start sticky top-0'>
        <div>
          <div className="flex items-start cursor-pointer p-3 md:hidden">
            <img className='h-10' src={logo} alt="" />
          </div>
        </div>
        <ul className='menu-icons md:hidden'>
          {mapMenuItems('sidebar')}
          <div className="flex items-start cursor-pointer">
            <div className='flex items-center justify-center gap-4 py-2 px-4 rounded-full hover:bg-white'>
              <div><i className="fa-solid fa-arrow-right-from-bracket text-xl text-gray-700"></i></div>
              <div className="sm:hidden text-gray-700 text-xl"
                onClick={logoutHandler}>Logout</div>
            </div>
          </div>
        </ul>
        <div className="w-full md:hidden">
          <button className='my-6 w-full py-2.5 rounded-full text-white bg-purple-700 hover:bg-purple-600'
          onClick={() => dispatch(openPostModal(true))}>Add Post</button>
        </div>
      </div>
    </aside>
    <footer className='hidden bg-white px-5 mr-6 flex flex-col justify-between md:block md:fixed md:bottom-0 md:left-0 md:w-full'>
      <ul className='menu-icons md:flex md:justify-around md:w-full'>
      {mapMenuItems()}
      </ul>
    </footer>
    </>  
  )
}