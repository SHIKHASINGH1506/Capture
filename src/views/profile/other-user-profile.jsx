import { useSelector, useDispatch } from "react-redux";
import { getPostState, userState, ProfileCard, PostCard, getPostByUsername, authState, hideLoader,  showLoader} from 'features';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from 'component'

export const OtherUserProfile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector(authState);
  const { allUsers, gloablLoader } = useSelector(userState);
  const { posts, postLoading, userPosts } = useSelector(getPostState);

  const [foundUser, setFoundUser] = useState();

  useEffect(() => {
    dispatch(showLoader());
    setTimeout(() => { dispatch(hideLoader()) }, 500)
  }, []);


  useEffect(() => {
    setFoundUser(allUsers.find(user => user.username === userName));
  }, [userName, allUsers]);

  const usesposts = posts.filter(post => post.username === userName);

  return foundUser?.username ?(
    <div className="flex flex-col gap-6 w-2/4 lg:grow px-5 md:w-full items-start">
      <ProfileCard userData={foundUser} userPosts={usesposts}/>
      {gloablLoader
        ? <Loader/>
        : usesposts?.length > 0
          ? usesposts.map(
            (post) => {
              return (
                <PostCard key={post._id} post={post} dialogOption={false} />
              )
            }
          )
          : <p>No posts</p>
      }
    </div>
  ): <></>
};