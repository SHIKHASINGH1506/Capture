import { Menubar, Suggestions } from 'component';

const Container = ({ children }) => {
  return (
    <div className='md:w-full md:m-auto md:mt-4 md:flex-col flex my-6 max-w-7xl w-full mr-auto ml-auto '>
      <Menubar />
        {children} 
      <Suggestions />
    </div>
  )
}

export {Container}