import { ProfileCard, PostCard, getPostState, authState, userState, showLoader, hideLoader } from 'features';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from 'component';
import { useEffect } from 'react';

export const UserProfile = () => {
  const dispatch = useDispatch();
  const { posts, userPosts, postLoading } = useSelector(getPostState);
  const { user, token } = useSelector(authState);
  const { gloablLoader } = useSelector(userState);

  const authorPosts = posts.filter(post => post.username === user?.username);
  useEffect(() => {
    dispatch(showLoader());
    setTimeout(() => { dispatch(hideLoader()) }, 500)
  }, []);

  return (
    <div className="flex flex-col gap-6 w-2/4 lg:grow px-5 md:w-full items-start">
      <ProfileCard userData={user} userPosts={authorPosts}/>
      {gloablLoader
        ? <Loader />
        : authorPosts?.length > 0
          ? authorPosts.map(
            (post) => {
              return (
                <PostCard key={post._id} post={post} dialogOption={true} />
              )
            }
          )
          : <p>No posts</p>
      }
    </div>
  );
}