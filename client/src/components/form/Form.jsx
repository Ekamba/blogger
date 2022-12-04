import React, { useState, useEffect } from "react";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../features/posts/postSlice";
import FileBase64 from "react-file-base64";
import { toast } from "react-toastify";

const Form = ({ postId, setPostId }) => {
  const [postData, setPostData] = useState({
    postCreator: "",
    title: "",
    body: "",
    imageFile: [],
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const clearInputField = () => {
    setPostData({
      postCreator: "",
      title: "",
      body: "",
      imageFile: [],
    });
  };
  const post = useSelector((state) =>
    postId ? state.posts.posts.find((p) => p._id === postId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.result) {
      toast.warning("make sure you are logged in.");
    } else if (postId) {
      dispatch(updatePost({ id: post._id, postData }));
      clearInputField();
    } else {
      dispatch(createPost(postData));
      clearInputField();
    }
    setPostId(null);
  };

  return (
    <div className="form__container">
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h6 className="form__title">
          {postId ? `Updating a post "${post.title}"` : "Create a post"}
        </h6>
        {user ? (
          <img
            src={user?.result?.avatar[0].base64}
            className="user__avatar"
            alt="profile"
          />
        ) : (
          <p className="user__avatar">{user?.result?.username.charAt(0)}</p>
        )}
        <input
          required
          className="form__input"
          type="text"
          name="postCreator"
          value={postData.postCreator}
          onChange={({ target }) =>
            setPostData({ ...postData, postCreator: target.value })
          }
          placeholder="Post creator"
        />
        <input
          required
          className="form__input"
          type="text"
          name="title"
          value={postData.title}
          onChange={({ target }) =>
            setPostData({ ...postData, title: target.value })
          }
          placeholder="title"
        />
        <textarea
          required
          type="text"
          name="body"
          value={postData.body}
          onChange={({ target }) =>
            setPostData({ ...postData, body: target.value })
          }
          placeholder="body"
        />
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, imageFile: base64 })
          }
          required
        />
        <button className="button__container" type="submit">
          {postId ? "update a Post" : "create a post"}
        </button>
      </form>
    </div>
  );
};

export default Form;
