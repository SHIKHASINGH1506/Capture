import { useSelector } from "react-redux";
import { userState, authState } from 'features';
import { useNavigate } from "react-router-dom";

export const CommentList = ({ comment }) => {
  const navigate = useNavigate();
  const {
    username,
    text
  } = comment;
  const {user} = useSelector(authState);
  const { allUsers } = useSelector(userState);

  const commentAuthor = allUsers &&
    allUsers.find(user => user.username === username);
  return (
    <div className="flex gap-4 py-2">
      <div className='h-8 w-8 shrink-0'>
        <img className='h-8 w-8 object-cover rounded-full' src={user.username === username ? user.profileImage : commentAuthor.profileImage} alt="" />
      </div>
      <div>
        <p className='text-sm font-bold cursor-pointer'
          onClick={() => navigate(`/user-profile/${username}`)}><span>{commentAuthor?.firstName }</span> <span>{commentAuthor?.lastName}</span></p>
        <p className='text-sm text-gray-500'>{text}</p>
      </div>
    </div>
  )
}