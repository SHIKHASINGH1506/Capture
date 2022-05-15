import logo from 'assets/logo2.png';
export const Navbar = () => {
  return (
    <div className="sm:block hidden sticky top-0 z-10 py-2 bg-white rounded-b-xl">
      <div className='flex justify-center items-center px-4'>
        <div>
          <img className='h-10'src={logo} alt="" />
        </div>
        <p className='logo-text text-purple-900 mx-5 text-3xl'>capture </p>
      </div>
    </div>
  )
}