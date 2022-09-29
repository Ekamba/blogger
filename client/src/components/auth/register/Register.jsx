import React, { useState, useEffect } from 'react';
import './register.css';
import { useSelector, useDispatch } from 'react-redux';
import validate from '../authFormValidationRules';
import { register, reset } from '../../../features/auth/authSlice';
import { RiUserAddLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileBase64 from 'react-file-base64';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    avatar: '',
  });
  const [errors, setErrors] = useState({});

  const { username, emailAddress, password, confirmPassword, avatar } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    document.title = 'Register Page';
  }, []);

  const onChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formData));

    if (
      username === '' ||
      emailAddress === '' ||
      password === '' ||
      confirmPassword === '' ||
      avatar === ''
    ) {
      toast.error('All fields are required.');
    } else {
      const userData = {
        username,
        emailAddress,
        password,
        avatar,
      };

      dispatch(register(userData));
    }
  };

  return (
    <div className="register__container">
      <form className="register__form" onSubmit={onSubmit}>
        <h1>
          <RiUserAddLine /> Sign Up
        </h1>
        <p className="validate__errors">{errors.username}</p>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="username"
        />
        <p className="validate__errors">{errors.emailAddress}</p>
        <input
          type="email"
          name="emailAddress"
          value={emailAddress}
          onChange={onChange}
          placeholder="email address"
        />
        <p className="validate__errors">{errors.password}</p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="password"
        />
        <p className="validate__errors">{errors.confirmPassword}</p>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          placeholder="confirm your password"
        />
        <FileBase64
          multiple={false}
          onDone={(base64) => setFormData({ ...formData, avatar: base64 })}
        />
        <button className="button__container" type="submit">
          {isLoading ? (
            <div className="loading">
              <p>registering ...</p>
            </div>
          ) : (
            <p>Register</p>
          )}
        </button>
        <Link to="/login" className="login__link">
          Already have an account? Log in here.
        </Link>
      </form>
    </div>
  );
};

export default Register;
