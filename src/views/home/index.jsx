import nodatasvg from 'assets/no-data.svg';
import { PostForm, getPostState } from 'features';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { authState } from 'features';
import { Loader } from 'component';
import { PostCard } from 'features/post/components';
import { useInfiniteScroll } from 'custom-hooks/useInfiniteScroll';
import loader from 'assets/loader.svg';

const Home = () => {
  const { posts, postLoading } = useSelector(getPostState);
  const { user } = useSelector(authState);
  const [userFeedPost, setUserFeedPost] = useState([]);
  const [isTrending, setIsTrending] = useState(false);

  const getFilteredPosts = () => {
    if (isTrending)
      return [...posts]
        ?.sort((postA, postB) => postB.likes.likeCount - postA.likes.likeCount)
        .filter(post => post.likes.likeCount > 0)
    else {
      return posts
        ?.filter(
          (post) =>
            post?.username === user?.username ||
            user?.following?.find((ele) => post?.username === ele?.username)
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
  }
  const filteredPosts = getFilteredPosts();
  const { pageNumber, loading, lastElementReference, hasMorePosts } =
    useInfiniteScroll(filteredPosts);

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

  const postsToDisplay = filteredPosts?.slice(0, pageNumber * 3);
  console.log(postsToDisplay);
  return (
    <div className="flex flex-col gap-6 w-2/4 lg:grow px-5 sm:px-0 md:w-full items-start">
      <PostForm />
      <div className='w-full p-2 flex gap-4 bg-white justify-around'>
        <button className='w-1/2 border-r-2 border-purple-700 mr-2 hover:icon-hover' onClick={() => setIsTrending(true)}><i className="fa-solid fa-fire"></i> Trending Posts</button>
        <button className='w-1/2 hover:icon-hover' onClick={() => setIsTrending(false)}>
          <i class="fa-solid fa-sort mr-2"></i>Latest Posts</button>
      </div>
      {postLoading
        ? <Loader />
        : filteredPosts?.length > 0
          ? <div className='flex flex-col gap-6'>{postsToDisplay.map(
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
          : <div className='self-center'>
            <img src={nodatasvg} alt="Loader" className='h-96 w-96' />
          </div>
      }

    </div>
  )
}
export { Home }