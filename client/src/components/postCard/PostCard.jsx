import React from "react";
import "./postCard.css";
import { FaSmileBeam, FaRegSmile } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../features/posts/postSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Post = ({ post, setPostId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.result?._id;

  const { title, createdAt, body, imageFile, postCreator, author, likes } =
    post;

  const Smile = () => {
    if (likes.length > 0) {
      return post.likes.find((like) => like === userId) ? (
        <div className="icon__box">
          <FaSmileBeam
            style={{ color: "hsl(84, 35%, 39%)" }}
            className="smile__icon"
          />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} smile${likes.length > 1 ? "s" : ""}`}
        </div>
      ) : (
        <div className="icon__box">
          <FaRegSmile className="smile__icon" />
          &nbsp;{likes.length} {likes.length === 1 ? "smile" : "smiles"}
        </div>
      );
    }
    return (
      <div className="icon__box">
        <FaRegSmile className="smile__icon" />
        &nbsp;
      </div>
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (!user?.result) {
      navigate("/login");
      toast.warning(
        "make sure you are logged in or registered before deleting a post"
      );
    } else if (user?.result._id !== author.toString()) {
      toast.warning("You can only delete your own post");
    } else {
      dispatch(deletePost(post._id));
      toast.success("Post deleted successfully");
    }
  };

  const handleSmile = (e) => {
    e.preventDefault();
    if (!user?.result) {
      navigate("/login");
      toast.warning("You need to log in or register to smile on a post");
    } else {
      dispatch(likePost(post._id));
    }
  };

  return (
    <div className="post__container card">
      <div className="post__card">
        <div className="post__image">
          <img src={imageFile} alt="post" />
        </div>
        <div className="post__content">
          <div className="post__header__title">
            <h3>{title}</h3>
          </div>
          <div className="post__message">
            <p>{body}</p>
          </div>
          <div className="post__header">
            <div className="post__header__date">
              {user?.result?._id === author ? (
                <>
                  <img
                    src={user?.result?.avatar[0].base64}
                    className="user__avatar"
                    alt="profile"
                  />
                </>
              ) : (
                ""
              )}
              <span className="post__header__date__text">
                <p className="postCreator">{postCreator}</p>
                <p className="moments">{moment(createdAt).fromNow()}</p>
              </span>
            </div>
          </div>
          <div className="post__actions">
            <button className="smileBtn" onClick={handleSmile}>
              <Smile />
            </button>
            <div className="icon__box">
              {!user?.result ? (
                <RiEdit2Fill
                  className="edit__icon"
                  fontSize="small"
                  onClick={() => {
                    navigate("/login");
                  }}
                />
              ) : user?.result?._id !== author ? (
                <RiEdit2Fill
                  className="edit__icon"
                  fontSize="small"
                  onClick={() => {
                    toast.warning("You can only update your own post.");
                  }}
                />
              ) : (
                <RiEdit2Fill
                  className="edit__icon"
                  fontSize="small"
                  onClick={() => {
                    setPostId(post._id);
                  }}
                />
              )}
            </div>
            <div className="icon__box">
              <MdDeleteOutline
                className="delete__icon"
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
