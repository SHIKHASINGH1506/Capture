import { Menubar, Suggestions } from 'component';

const Container = ({ children }) => {
  return (
    <div className='sm:w-full sm:m-auto sm:mt-4 flex my-6 sm:flex-col'>
      <Menubar />
        {children} 
      <Suggestions />
    </div>
  )
}

export {Container}