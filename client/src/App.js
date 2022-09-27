import './App.css';
import { Route, Routes } from 'react-router-dom';
import {
  Navbar,
  Dashboard,
  Posts,
  PostCard,
  Footer,
  Register,
  Login,
} from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/404/NotFound';

const App = () => {
  return (
    <div className="app__container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts/search" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
