import { Menubar, Suggestions } from 'component';

const Container = ({ children }) => {
  return (
    <div className='feed-wrapper flex mt-6 sm:flex-col'>
      <Menubar />
        {children} 
      <Suggestions />
    </div>
  )
}

export {Container}