import { useSelector, useDispatch } from 'react-redux';
import { PostCard, getPostState, authState } from 'features/';

export const Explore = () => {
  const { posts } = useSelector(getPostState);
  const { user } = useSelector(authState);
  
  return (
    <div className="flex flex-col gap-6 w-2/4 lg:grow px-5 md:w-full items-start">
        {posts?.length > 0 && 
          posts.map(
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