import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to main page</h1>
      <button className="logout__btn" onClick={removeToken}>
        Logout
      </button>
    </div>
  );
};

export default Main;
