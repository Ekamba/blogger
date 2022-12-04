import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Navbar,
  Dashboard,
  Posts,
  PostCard,
  Footer,
  Register,
  Login,
  NotFound,
  ErrorBoundary,
} from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="app__container">
      <ErrorBoundary>
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
        <Footer />
        <ToastContainer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
