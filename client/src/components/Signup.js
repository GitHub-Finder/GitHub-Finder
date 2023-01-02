import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        method: 'POST',
        url: `http://localhost:5000/api/v1/auth/sign-up`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ name, email, password }),
      };
      const { data } = await axios(newUser);
      navigate('/main');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="signup__container">
      <div className="signup__form_container">
        <h1 className="signup__title">Github Finder.</h1>
        <form className="signup__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            required
            className="signup__input"
            onChange={handleName}
          />
          <input
            type="text"
            placeholder="Enter email"
            name="email"
            required
            className="signup__input"
            onChange={handleEmail}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            required
            className="signup__input"
            onChange={handlePassword}
          />
          <div className="signup__btn_container">
            <button className="signup__btn">Sign Up</button>
            <Link to="/login">
              <button className="signup__btn">Log In</button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
