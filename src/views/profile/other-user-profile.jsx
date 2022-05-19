import { useSelector, useDispatch } from "react-redux";
import { getPostState, userState, ProfileCard, PostCard, getPostByUsername, authState } from 'features';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const OtherUserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector(authState);
  const { allUsers } = useSelector(userState);
  const { posts, postLoading, userPosts } = useSelector(getPostState);

  const [foundUser, setFoundUser] = useState();

  useEffect(() => {
    setFoundUser(allUsers.find(user => user.username === userId));
  }, [userId, allUsers]);

  useEffect(() => {
    (async () => {
      try{
      const response = await dispatch(getPostByUsername({
        token: token, 
        username: foundUser?.username
      }));
      if(response?.error)
        throw new Error('Error in getting user post');
    }catch(erorr){
      console.log(error.message);
    }
    })();
  }, [foundUser, posts]);

  return foundUser?.username ?(
    <div className="flex flex-col gap-6 w-2/4 px-5 md:w-full items-start">
      <ProfileCard userData={foundUser}/>
      {postLoading
        ? <p>Loading</p>
        : userPosts?.length > 0
          ? userPosts.map(
            (post) => {
              return (
                <PostCard key={post._id} post={post} dialogOption={true} />
              )
            }
          )
          : <p>No posts</p>
      }
    </div>
  ): <></>
};