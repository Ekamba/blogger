import React, { useState, useEffect } from 'react';
import validate from '../authFormValidationRules';
import './login.css';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../../features/auth/authSlice';
import { AiOutlineLogin } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const { emailAddress, password } = formData;

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
    document.title = 'Login Page';
  }, []);

  const onChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formData));

    if (emailAddress === '' || password === '') {
      toast.error('All fields are required.');
    } else {
      const userData = {
        emailAddress,
        password,
      };

      dispatch(login(userData));
    }
  };

  return (
    <div className="login__container">
      <form onSubmit={onSubmit}>
        <h1>
          <AiOutlineLogin /> Log In
        </h1>
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
        <button className="button__container" type="submit">
          {isLoading ? (
            <div className="loading">
              <p>logging in ...</p>
            </div>
          ) : (
            <p>Log In</p>
          )}
        </button>
        <Link to="/register" className="register__link">
          Don't have an account? register here.
        </Link>
      </form>
    </div>
  );
};

export default Login;
