import { useSelector, useDispatch } from 'react-redux';
import { PostCard, getPostState, authState, showLoader, hideLoader, userState } from 'features/';
import { useEffect } from 'react';
import { Loader } from 'component';
import { useInfiniteScroll } from 'custom-hooks/useInfiniteScroll';
import loader from 'assets/loader.svg';

export const Explore = () => {
  const { posts } = useSelector(getPostState);
  const { user } = useSelector(authState);
  const { gloablLoader } = useSelector(userState);
  const dispatch = useDispatch();
  const { pageNumber, loading, lastElementReference, hasMorePosts } =
    useInfiniteScroll(posts);

  useEffect(() => {
    dispatch(showLoader());
    setTimeout(() => { dispatch(hideLoader()) }, 500)
  }, []);

  const postsToDisplay = posts?.slice(0, pageNumber * 3);

  return (
    <div className="flex flex-col gap-6 w-2/4 lg:grow px-5 md:w-full items-start">
      {gloablLoader
        ? <Loader />
        : <div className='flex flex-col gap-6'>
          {postsToDisplay?.map(
            (post) => {
              return (
                post.username === user?.username
                  ? <PostCard key={post._id} post={post} dialogOption={true} />
                  : <PostCard key={post._id} post={post} />
              )
            }
          )}
          <div key="last-element" ref={lastElementReference}>
            {postsToDisplay?.length && hasMorePosts && loading && (
              <img
                src={loader}
                className="w-20 h-20"
                alt="Animated infinity loading svg"
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}