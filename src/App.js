import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Navbar, Container } from 'component';
import { authState, Login, Signup, getAllUser } from 'features';
import { Home, Bookmark, UserProfile } from 'views';
import { ProtectedRoute } from "routes/ProtectedRoute";
import { Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const { token } = useSelector(authState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await dispatch(getAllUser());
          if (response?.error)
            throw new Error('Error in fetching users');
        } catch (error) {
          console.log(error.message);
        }
      })()
    }
  },
  [token]);

  return (
    <div className='max-w-screen-xl m-auto'>
      <ToastContainer
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
              <Home />
            </Container>
          </ProtectedRoute>}>
        </Route>
        <Route path='/bookmark' element={
          <ProtectedRoute>
            <Container>
              <Bookmark />
            </Container>
          </ProtectedRoute>}>
        </Route>
        <Route path='/profile' element={
          <ProtectedRoute>
            <Container>
              <UserProfile />
            </Container>
          </ProtectedRoute>}>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
