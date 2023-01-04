import React, { useState, useContext } from "react";
import RepoSearch from "../components/repos/RepoSearch";
import UserSearch from "../components/users/UserSearch";
import GithubContext from "../context/github/GithubContext";

import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "antd";

function Home() {
  const { users, repos, option } = useContext(GithubContext);
  const userName = "raykurbanov";
  const { Header, Content } = Layout;
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Layout>
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
            <Link to={`/myprofile/${userName}`}>My Profile</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/"}>
              <button className="logout__btn" onClick={removeToken}>
                Logout
              </button>
            </Link>
          </div>
        </div>
      </Header>
      <Content>
        {/* <div className="searchContainer">
          <div className="usersWrapper">
            <Search />
            <div className="users">{checkOption(option)}</div>
          </div>
        </div> */}
      </Content>
    </Layout>
  );
}

export default Home;
