import React, { useContext } from "react";
import Login from "../components/Auth/Login";
import GithubContext from "../context/github/GithubContext";

function Repos() {
  const { githubUser } = useContext(GithubContext);
  return !githubUser ? <Login /> : <div>Saved Repos</div>;
}

export default Repos;
