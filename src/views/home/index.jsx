
import { PostForm, getPostState } from 'features';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { authState } from 'features';
import { PostCard } from 'features/post/components';

const Home = () => {
  const { posts } = useSelector(getPostState);
  const { user } = useSelector(authState);
  const [userFeedPost, setUserFeedPost] = useState([]);
  
  useEffect(() => {
    if (posts) {
      setUserFeedPost(
        posts
          ?.filter(
            (post) =>
              post?.username === user?.username ||
              user?.following?.find((ele) => post?.username === ele?.username)
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
  }, [user, posts]);
  
  return (
      <div className="flex flex-col gap-6 w-2/4 lg:grow px-5 md:w-full items-start">
        <PostForm />
        {userFeedPost?.length > 0 && 
          userFeedPost.map(
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
export { Home }