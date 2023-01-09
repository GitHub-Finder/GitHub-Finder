import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GithubContext from "../../context/github/GithubContext";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";

const Login = () => {
  const [hidden, setHidden] = useState(false);
  const [type, setType] = useState("password");
  const { setGitHubUser } = useContext(GithubContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        method: "POST",
        url: `http://localhost:5000/api/v1/auth/sign-in`,
        headers: {
          "Content-Type": "application/json",
        },

        data: JSON.stringify({ email, password }),
      };
      const { data } = await axios(confirmUser);
      localStorage.setItem("token", data.token);
      navigate("/main");
      setGitHubUser(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHidden = (e) => {
    e.preventDefault();
    setHidden(!hidden);
    if (hidden) {
      setType("password");
    } else {
      setType("text");
    }
  };
  return (
    <section className="login__container">
      <div className="login__form_container">
        <h1 className="login__title">Github Finder</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="inputField">
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              required
              className="login__input"
              onChange={handleEmail}
            />
          </div>
          <div className="inputField">
            <input
              type={type}
              placeholder="Enter password"
              name="password"
              required
              className="login__input"
              onChange={handlePassword}
            />

            <button onClick={handleHidden} id="hidePassword">
              {!hidden ? <BiHide /> : <BiShowAlt />}
            </button>
          </div>
          <button className="login__btn">Log In</button>
        </form>
        <Link to={"/signup"}>
          <button className="signup__btn">Sign Up</button>
        </Link>
      </div>
    </section>
  );
};

export default Login;
