import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GithubContext from "../../context/github/GithubContext";
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";

const Signup = () => {
  const [hidden, setHidden] = useState(true);
  const [type, setType] = useState("password");
  const { setGitHubUser } = useContext(GithubContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        method: "POST",
        url: `http://localhost:5000/api/v1/auth/sign-up`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ name, email, password }),
      };
      setGitHubUser(name);
      const { data } = await axios(newUser);
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/main");
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
    <section className="signup__container">
      <div className="signup__form_container">
        <h1 className="signup__title">Github Finder</h1>
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="inputField">
            <input
              type="text"
              placeholder="Enter GitHub Login"
              name="name"
              required
              className="signup__input"
              onChange={handleName}
            />
          </div>
          <div className="inputField">
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              required
              className="signup__input"
              onChange={handleEmail}
            />
          </div>
          <div className="inputField">
            <input
              type={type}
              placeholder="Enter password"
              name="password"
              required
              className="signup__input"
              onChange={handlePassword}
            />

            <button onClick={handleHidden} id="hidePassword">
              {hidden ? <BiHide /> : <BiShowAlt />}
            </button>
          </div>

          <div className="signup__btn_container">
            <button className="signup__btn">Sign Up</button>
            <Link to="/">
              <button className="signup__btn">Log In</button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
