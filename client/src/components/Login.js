import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const confirmUser = {
        method: 'POST',
        url: `http://localhost:5000/api/v1/auth/sign-in`,
        headers: {
          'Content-Type': 'application/json',
        },

        data: JSON.stringify({ email, password }),
      };
      const { data } = await axios(confirmUser);

      console.log(data);
      localStorage.setItem('token', data.token);
      navigate('/main');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="login__container">
      <div className="login__form_container">
        <h1 className="login__title">Github Finder</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter email"
            name="email"
            required
            className="login__input"
            onChange={handleEmail}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            required
            className="login__input"
            onChange={handlePassword}
          />
          <button className="login__btn">Log In</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
