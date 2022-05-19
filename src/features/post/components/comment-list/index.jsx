import { useSelector } from "react-redux";
import { userState } from 'features';
import { useNavigate } from "react-router-dom";

export const CommentList = ({ comment }) => {
  const navigate = useNavigate();
  const {
    username,
    text
  } = comment;
  const { allUsers } = useSelector(userState);

  const commentAuthor = allUsers &&
    allUsers.find(user => user.username === username);
  return (
    <div className="flex gap-4 py-2">
      <div className='h-8 w-8 shrink-0'>
        <img className='object-cover rounded-full' src='https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png' alt="" />
      </div>
      <div>
        <p className='text-sm font-bold cursor-pointer'
          onClick={() => navigate(`/user-profile/${username}`)}><span>{commentAuthor?.firstName }</span> <span>{commentAuthor?.lastName}</span></p>
        <p className='text-sm text-gray-500'>{text}</p>
      </div>
    </div>
  )
}