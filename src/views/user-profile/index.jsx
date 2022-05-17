import { ProfileCard, PostCard, getPostState, authState, getAllPosts } from 'features';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const UserProfile = () => {
  const dispatch = useDispatch();
  const { posts, postLoading } = useSelector(getPostState);
  const { user } = useSelector(authState);

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(getAllPosts());
        if (response?.error)
          throw new Error('Error in loading posst');
      }
      catch (error) {
        console.log(error.message);
      }
    }
    )();
  },
    []);

  const authorPosts = posts.filter(post => post.username === user?.username);

  return (
    <div className="flex flex-col gap-6 w-2/4 px-5 md:w-full items-start">
      <ProfileCard />
      {postLoading
        ? <p>Loading</p>
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