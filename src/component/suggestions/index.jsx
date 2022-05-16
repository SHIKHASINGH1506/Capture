export const Suggestions = () => {
  return (
    <div className="flex flex-col gap-4 w-1/4 px-5 md:hidden">
      <div>
        <div className="search-wrapper flex items-center gap-3 py-2 px-4 bg-white rounded-3xl">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input className='bg-white w-full focus:outline-none' type="text" placeholder='Search' />
        </div>
      </div>
      <div className='bg-white px-4'>
        <div className="title">
          <p className='font-bold py-2.5'>Who to follow?</p>
        </div>
        <div className="suggestion-list">
          <div className='flex'>
            <div className="img">

            </div>
            <p>Shikha Kumari</p>
            <button className='ml-auto text-purple-900'>Follow +</button>
          </div>
        </div>
      </div>
    </div>
  )
}