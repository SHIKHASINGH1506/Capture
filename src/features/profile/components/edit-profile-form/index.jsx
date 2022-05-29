import { authState, updateUser } from 'features';
import { closeModal, setPostFields } from 'features';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useToast } from 'custom-hooks/useToast';

export const EditProfileForm = () => {
  const { user: {
    firstName,
    lastName,
    bio,
    link,
    country,
    profileImage
  },
    token } = useSelector(authState);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const userProfileInititialValues = {
    firstName: firstName,
    lastName: lastName,
    bio: bio,
    link: link,
    country: country,
    profileImage: profileImage
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
    try {
      const response = await dispatch(updateUser({ token, profileData }));
      if (response?.error)
        throw new Error('Error in updating user profile');
      dispatch(setPostFields({}));
      dispatch(closeModal());
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      console.log(error.message);
      showToast('Profile update failed', 'error');
    }
  }
  const uploadImageHandler = async (imageFile) => {
    const url =
      "https://api.cloudinary.com/v1_1/" +
      process.env.REACT_APP_CLOUD_NAME +
      "/image/upload";

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", process.env.REACT_APP_PRESET_NAME);

    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          profileImage: data.url,
        }));
      })
      .catch((error) => {
        console.log(error.message);
        showToast(
          "Failed to update image. Please try again later.",
          "error"
        )
      }
      );
  };

  return (
    <div className="flex bg-base-purple p-4">
      <form className='w-full flex flex-col gap-4' onSubmit={editFormHandler}>
        <div className='flex'>
          <h3 className='font-bold text-lg'>Edit Profile</h3>
          <div className='h-14 w-14 sm:w-20 sm:h-20 shrink-0 ml-auto relative'>
            <img className='h-14 w-14 object-cover rounded-full' src={profileData.profileImage} alt="" />
            <i className="absolute top-8 right-0 bg-white rounded-full p-1 flex items-center fa-solid fa-camera text-purple-700"></i>
            <input
              className="cursor-pointer absolute top-8 opacity-0 right-0 w-8"
              accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
              type="file"
              onChange={(e) => uploadImageHandler(e.target.files[0])}
            />
          </div>
        </div>

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
        <button type='submit' className='btn-primary'>Save Profile</button>
      </form>
    </div>
  )
}