import React, { useContext, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import GithubContext from "../../context/github/GithubContext";

function Nav() {
  const { githubUser } = useContext(GithubContext);
  const { Header } = Layout;
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Header>
      <div className="wrapper">
        <div className="logo">
          <Link to={"/main"}>
            <FaGithub className="githubIcon" />
            GitHub Finder
          </Link>
        </div>
        <div className="links">
          <Link to={"/main"}>Home</Link>
          <Link to={"/friends"}>Friends</Link>
          <Link to={"/repositories"}>Repositories</Link>
          <Link to={`/myprofile/${githubUser}`}>My Profile</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/"}>
            <button className="logout__btn" onClick={removeToken}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </Header>
  );
}

export default Nav;
