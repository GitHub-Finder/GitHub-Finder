import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import { GoSearch } from "react-icons/go";
import { MdClear } from "react-icons/md";
import { Radio } from "antd";
import RepoSearch from "../repos/RepoSearch";
import UserSearch from "../users/UserSearch";
function Search() {
  const [input, setInput] = useState("");
  const {
    searchUsers,
    option,
    setOption,
    clearUsers,
    clearRepos,
    searchRepos,
    users,
    repos,
  } = useContext(GithubContext);
  const handleInput = (e) => {
    setInput(e.target.value);
  };

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

  const handleSubmit = () => {
    if (!input) {
      alert("Please enter something", "error");
    } else if (option === "Users") {
      searchUsers(input);
      setInput("");
    } else if (option === "Repositories") {
      searchRepos(input);
      setInput("");
    }
  };

  const handleChange = (e) => {
    setOption(e.target.value);
    clearData();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      return handleSubmit();
    }
  };

  const clearData = () => {
    clearUsers();
    clearRepos();
    setInput("");
  };

  return (
    <div>
      <div className="searchContainer">
        <div className="usersWrapper">
          <Search />
          <div className="users">{checkOption(option)}</div>
        </div>
      </div>
      <div className="search_container">
        <div className="search">
          <input
            onChange={handleInput}
            value={input}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={handleSubmit} className="searchBtn">
            <GoSearch />
          </button>
          {(users.length > 0 || repos.length > 0) && (
            <button type="button" onClick={clearData} className="clear">
              <MdClear />
            </button>
          )}
        </div>
        <div className="radioButtons">
          <Radio.Group defaultValue="Users" buttonStyle="solid">
            <Radio.Button
              value="Users"
              checked={option === "Users" ? "checked" : ""}
              onChange={handleChange}
            >
              Users
            </Radio.Button>
            <Radio.Button
              value="Repositories"
              onChange={handleChange}
              checked={option === "Repositories" ? "checked" : ""}
            >
              Repositories
            </Radio.Button>
          </Radio.Group>
          {/* <input
            type="radio"
            value="Users"
            name="gender"
            checked={option === "Users" ? "checked" : ""}
            onChange={handleChange}
          />
          Users
          <input
            type="radio"
            value="Repositories"
            name="gender"
            onChange={handleChange}
            checked={option === "Repositories" ? "checked" : ""}
          />
          Repositories */}
        </div>
      </div>
    </div>
  );
}

export default Search;
