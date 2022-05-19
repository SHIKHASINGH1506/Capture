import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Navbar, Container } from 'component';
import { authState, Login, Signup, getAllUser, getAllPosts, getPostByUsername } from 'features';
import { Home, Bookmark, UserProfile, OtherUserProfile, Explore } from 'views';
import { ProtectedRoute } from "routes/ProtectedRoute";
import { Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const { token, username } = useSelector(authState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getAllUser());
      dispatch(getAllPosts());
      dispatch(getPostByUsername({
        token: token,
        username: username
      }))
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
          </ProtectedRoute>}
        />
        <Route path='/explore' element={
          <ProtectedRoute>
            <Container>
              <Explore />
            </Container>
          </ProtectedRoute>}
        />
        <Route path='/bookmark' element={
          <ProtectedRoute>
            <Container>
              <Bookmark />
            </Container>
          </ProtectedRoute>}
        />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Container>
              <UserProfile />
            </Container>
          </ProtectedRoute>}>
        </Route>
        <Route path='/user-profile/:userName' element={
          <ProtectedRoute>
            <Container>
              <OtherUserProfile />
            </Container>
          </ProtectedRoute>}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
