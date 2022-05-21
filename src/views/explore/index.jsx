import { useSelector, useDispatch } from 'react-redux';
import { PostCard, getPostState, authState, showLoader, hideLoader, userState } from 'features/';
import { useEffect } from 'react';
import { Loader } from 'component';

export const Explore = () => {
  const { posts } = useSelector(getPostState);
  const { user } = useSelector(authState);
  const { gloablLoader } = useSelector(userState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoader());
    setTimeout(() => { dispatch(hideLoader()) }, 500)
  }, []);

  return (
    <div className="flex flex-col gap-6 w-2/4 lg:grow px-5 md:w-full items-start">
      {gloablLoader
        ? <Loader />
        : posts?.length > 0 &&
        posts.map(
          (post) => {
            return (
              post.username === user?.username
                ? <PostCard key={post._id} post={post} dialogOption={true} />
                : <PostCard key={post._id} post={post} />
            )
          }
        )
      }
    </div>
  )
}