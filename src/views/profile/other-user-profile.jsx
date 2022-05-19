import { useSelector, useDispatch } from "react-redux";
import { getPostState, userState, ProfileCard, PostCard, getPostByUsername, authState } from 'features';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const OtherUserProfile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector(authState);
  const { allUsers } = useSelector(userState);
  const { posts, postLoading, userPosts } = useSelector(getPostState);

  const [foundUser, setFoundUser] = useState();

  useEffect(() => {
    setFoundUser(allUsers.find(user => user.username === userName));
  }, [userName, allUsers]);

  const usesposts = posts.filter(post => post.username === userName);

  return foundUser?.username ?(
    <div className="flex flex-col gap-6 w-2/4 px-5 md:w-full items-start">
      <ProfileCard userData={foundUser} userPosts={usesposts}/>
      {postLoading
        ? <p>Loading</p>
        : usesposts?.length > 0
          ? usesposts.map(
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