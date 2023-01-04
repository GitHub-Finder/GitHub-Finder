import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Layout } from "antd";

function Nav() {
  const { Header } = Layout;
  const userName = "raykurbanov";

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
          <Link to={`/myprofile/${userName}`}>My Profile</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/"}>Logout</Link>
        </div>
      </div>
    </Header>
  );
}

export default Nav;
