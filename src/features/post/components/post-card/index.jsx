export const PostCard = ({post}) => {
    return (
      <div className='flex flex-col w-full bg-white'>
        <div className='flex p-5 gap-4'>
          <div className='h-12 w-12 shrink-0'>
            <img className='object-cover rounded-full' src='https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png' alt="" />
          </div>
          <div className='flex flex-col w-full gap-2.5 px-4'>
            <div className='flex'>
              <div>
                <span className='font-bold'>{post.fullname} </span>
                <span className='text-gray-400'>  @{post.username}</span>
              </div>
            </div>
            <div className='overflow-hidden'>
              {post.content}
            </div>
            <div className='flex justify-between'>
              <button className='hover:text-gray-500 transition-all p-2 mx-2'><i className="text-lg fa-solid fa-heart"></i></button>
              <button className='hover:text-gray-500 transition-all p-2 mx-2'><i className="text-lg fa-solid fa-bookmark"></i></button>
              <button className='hover:text-gray-500 transition-all p-2 mx-2'><i className="text-lg fa-solid fa-message"></i></button>
              <button className='hover:text-gray-500 transition-all p-2 mx-2'><i className="text-lg fa-solid fa-ellipsis-vertical"></i></button>
  
            </div>
          </div>
        </div>
      </div>
    )
  }