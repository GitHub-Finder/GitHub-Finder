import React, { useState, useContext } from "react";
import IssueSearch from "../components/issues/IssueSearch";
import RepoSearch from "../components/repos/RepoSearch";
import UserSearch from "../components/users/UserSearch";
import GithubContext from "../context/github/GithubContext";
import Search from "../components/Layout/Search";

function Home() {
  const { users, repos, issues, option } = useContext(GithubContext);

  const checkOption = (option) => {
    switch (option) {
      case "Users": {
        return <UserSearch users={users} />;
      }
      case "Repositories": {
        return <RepoSearch repos={repos} />;
      }
      case "Issues": {
        return <IssueSearch issues={issues} />;
      }
    }
  };

  return (
    <div className="searchContainer">
      <div className="usersWrapper">
        <Search />
        <div className="users">{checkOption(option)}</div>
      </div>
    </div>
  );
}

export default Home;
