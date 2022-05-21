import loader from "assets/loader1.svg";

export const Loader = () => {
  return (
    <div className="flex justify-center items-start w-full h-calc( ('h-screen') - ('h-56'))">
      <img src={loader} alt="Loader" className='h-36 w-36' />
    </div>
  )
}