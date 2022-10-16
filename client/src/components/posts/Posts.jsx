import React from "react";
import "./posts.css";
import PostCard from "../postCard/PostCard";
import Spinner from "./../spinner/Spinner";
import { useSelector } from "react-redux";

const Posts = ({ setPostId }) => {
  const { posts, isLoading } = useSelector((state) => ({ ...state.posts }));

  return (
    <div className="posts__container grid__container">
      {isLoading ? (
        <div className="loader">
          <Spinner />
        </div>
      ) : posts.length === 0 ? (
        <div className="no__post__container">
          <p className="no__post__text">No post found!</p>
          <img
            src="/images/no_post.svg"
            alt="no post"
            className="no__post__image"
          />
        </div>
      ) : (
        posts &&
        posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} setPostId={setPostId} />
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
