
import { PostForm, getPostState } from 'features';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts, authState } from 'features';
import { PostCard } from 'features/post/components';

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(getPostState);
  const { user } = useSelector(authState);

  useEffect(() => {
    (async () => {
      try{
       const response = await dispatch(getAllPosts());
        if(response?.error)
          throw new Error('Error in loading posst');
      }
      catch(error){
        console.log(error.message);
      }
    }
    )();
  },
  []);
  
  return (
    <>
      <div className="flex flex-col gap-6 w-2/4 px-5 md:w-full items-start">
        <PostForm />
        {posts?.length > 0 && 
          posts.map(
            (post) => {return (
              post.username === user
                ? <PostCard key={post._id} post={post} dialogOption={true}/>
                : <PostCard key={post._id} post={post} />
            )}
            // <PostCard key={post._id} post={post}/>
          )
        }
      </div>
    </>
  )
}
export { Home }