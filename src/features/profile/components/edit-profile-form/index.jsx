import { authState, updateUser, closeEditProfileModal, setEditProfileData } from 'features';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useToast } from 'custom-hooks/useToast';

export const EditProfileForm = () => {
  const { user: {
    firstName,
    lastName,
    bio,
    link,
    country
  },
  token } = useSelector(authState);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const userProfileInititialValues = {
    firstName: firstName,
    lastName: lastName,
    bio: bio,
    link: link,
    country: country
  }
  const [profileData, setProfileData] = useState(userProfileInititialValues);

  const setProfileHandler = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  }

  const editFormHandler = async (e) => {
    e.preventDefault();
    try{
    const response = await dispatch(updateUser({token, profileData}));
    if(response?.error)
      throw new Error('Error in updating user profile');
    dispatch(setEditProfileData({}));
    dispatch(closeEditProfileModal());
    showToast('Profile updated successfully', 'success');
    }catch(error){
      console.log(error.message);
      showToast('Profile update failed', 'error');
    }
  }

  return (
    <div className="flex bg-base-purple p-4">
      <form className='w-full flex flex-col gap-4' onSubmit={editFormHandler}>
        <h3 className='text-center font-bold text-lg'>Edit Profile</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            tabIndex="1"
            value={profileData.firstName}
            onChange={setProfileHandler}
            className="auth-input"
            required
          />
           <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            tabIndex="2"
            value={profileData.lastName}
            onChange={setProfileHandler}
            className="auth-input"
            required
          />
           <textarea
            type="text"
            name="bio"
            placeholder="Bio"
            tabIndex="3"
            value={profileData.bio}
            onChange={setProfileHandler}
            className="auth-input resize-none overflow-y-auto"
          />
           <input
            type="text"
            name="link"
            placeholder="Website/Portfolio Link"
            tabIndex="4"
            value={profileData.link}
            onChange={setProfileHandler}
            className="auth-input"
          />
           <input
            type="text"
            name="country"
            placeholder="Country"
            tabIndex="5"
            value={profileData.country}
            onChange={setProfileHandler}
            className="auth-input"
          />
        </div>
        <button type='submit' className='btn-primary'>Edit Profile</button>
      </form>
    </div>
  )
}