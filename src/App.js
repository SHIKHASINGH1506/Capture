import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Navbar, Container } from 'component';
import { Login, Signup } from 'features';
import { Home } from 'views';
import { ProtectedRoute } from "routes/ProtectedRoute";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='max-w-screen-xl m-auto'>
      <ToastContainer
        style={{ top: "4.5rem", right: "0" }}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover

      />
      <Navbar />
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Container>
              <Home/>
            </Container>
          </ProtectedRoute>
        }></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
