import React, { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { searchPost } from "../../features/posts/postSlice";
import { FaSmileBeam } from "react-icons/fa";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchPost(searchTerm));
      navigate(`/posts/search?searchQuery=${searchTerm}`);
      setSearchTerm("");
    } else if (searchTerm === "") {
      return "no post found";
    } else {
      navigate("/");
    }
  };

  return (
    <div className="nav__container">
      <div className="navbar">
        <Link to="/" className="navbar__logo">
          Blog<span>ger</span>
        </Link>
        <form onSubmit={handleSearch}>
          <div className="search__box">
            <input
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={({ target }) => setSearchTerm(target.value)}
              placeholder="Search posts"
            />
            <AiOutlineSearch className="search__box__icon" />
          </div>
        </form>
        <div className="user__info">
          {user && (
            <>
              <img
                src={user?.result?.avatar[0].base64}
                className="user__avatar"
                alt="profile"
              />
              <span>{user?.result.username}</span>
            </>
          )}
        </div>
        <div className="buttons">
          {!user ? (
            <Link to="/login" className="button__container">
              Log In
            </Link>
          ) : (
            <button className="logout__btn" onClick={handleLogout}>
              Log Out
            </button>
          )}
        </div>
      </div>
      <div className="why__smile">
        <p>A smile is easy, quick, and pleasant to show emotions...</p>
        <FaSmileBeam />
      </div>
    </div>
  );
};

export default Navbar;
