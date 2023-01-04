import React, { useState, useContext } from "react";
import RepoSearch from "../components/repos/RepoSearch";
import UserSearch from "../components/users/UserSearch";
import GithubContext from "../context/github/GithubContext";
import Search from "../components/Search/Search";
import Nav from "../components/Layout/Nav";

function Home() {
  const { users, repos, option } = useContext(GithubContext);

  const checkOption = (option) => {
    switch (option) {
      case "Users": {
        return <UserSearch users={users} />;
      }
      case "Repositories": {
        return <RepoSearch repos={repos} />;
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="searchContainer">
        <div className="usersWrapper">
          <Search />
          <div className="users">{checkOption(option)}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
