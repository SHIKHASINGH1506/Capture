import { useSelector, useDispatch } from "react-redux"
import { getPostState, authState, getAllBookmarkPosts,  } from 'features';
import { useEffect } from "react";
import { PostCard } from 'features/post/components';

export const Bookmark = () => {
  const dispatch = useDispatch();
  const {posts, bookmarks, postLoading} = useSelector(getPostState);
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
  return(
    <div className="flex flex-col gap-6 w-2/4 px-5 md:w-full items-start">
        {bookmarkPosts?.length > 0 && 
          bookmarkPosts.map(
            (post) => {return (
              post.username === user?.username
                ? <PostCard key={post._id} post={post} dialogOption={true}/>
                : <PostCard key={post._id} post={post} />
            )}
          )
        }
    </div>
  )
}