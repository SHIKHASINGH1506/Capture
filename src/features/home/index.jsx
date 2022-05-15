import logo from 'assets/logo2.png';

const Home = () => {
  return (  
    <div className="flex w-2/4 md:w-full items-start">
      <div className='flex flex-col w-full bg-white rounded-2xl'>
        <div className='flex p-5 gap-4'>
          <div className='w-12 h-12'>
            <img className=''src={logo} alt="" />
          </div>
          <form className='flex flex-col w-full gap-2.5'>
            <textarea name="" id="" placeholder="What's happening with you ?" className='resize-none overflow-hidden h-36 md:h-20 px-4 py-2 focus:outline-none border-none bg-off-purple-gray'></textarea>
            <div className='flex justify-between'>
              <div className="icons flex">
                <button className='p-2 mx-2'><i className="fa-solid fa-image"></i></button>
                <button className='p-2 mx-2'><i className="fa-solid fa-face-smile"></i></button>
              </div>
              <button className='bg-purple-900 text-white px-5 py-1.5 rounded-full'>Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export {Home}