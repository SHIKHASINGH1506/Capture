import { Menubar, Suggestions } from 'component';

const Container = ({ children }) => {
  return (
    <div className='md:w-full md:m-auto md:mt-4 flex my-6 md:flex-col'>
      <Menubar />
        {children} 
      <Suggestions />
    </div>
  )
}

export {Container}