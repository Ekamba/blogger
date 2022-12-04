import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Posts from "../posts/Posts";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../features/posts/postSlice";

const Dashboard = () => {
  const [postId, setPostId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [postId, dispatch]);

  useEffect(() => {
    document.title = "Dashboard Page";
  }, [dispatch]);

  return (
    <div className="dashboard__container">
      <div className="dashboard__container__posts">
        <Form postId={postId} setPostId={setPostId} />
        <Posts setPostId={setPostId} />
      </div>
    </div>
  );
};

export default Dashboard;
