import nodatasvg from 'assets/no-data.svg';
import { useSelector, useDispatch } from "react-redux"
import { getPostState, authState, getAllBookmarkPosts, } from 'features';
import { useEffect } from "react";
import { PostCard } from 'features/post/components';
import { Loader } from 'component';

export const Bookmark = () => {
  const dispatch = useDispatch();
  const { posts, bookmarks, postLoading } = useSelector(getPostState);
  const { user } = useSelector(authState);

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(getAllBookmarkPosts());
        if (response?.error)
          throw new Error("Error in loading bookmark posts");
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [])

  const bookmarkPosts = posts.filter(post => bookmarks.includes(post._id));
  return (
    <div className="flex flex-col gap-6 w-2/4 lg:grow px-5 md:w-full items-start">
      {
        postLoading
          ? <Loader />
          : bookmarkPosts?.length > 0
            ? bookmarkPosts.map(
              (post) => {
                return (
                  post.username === user?.username
                    ? <PostCard key={post._id} post={post} dialogOption={true} />
                    : <PostCard key={post._id} post={post} />
                )
              }
            )
            : <div className='self-center'>
              <img src={nodatasvg} alt="Loader" className='h-96 w-96' />
            </div>
      }
    </div>
  )
}