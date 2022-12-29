import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import { GoSearch } from "react-icons/go";
import { MdClear } from "react-icons/md";

function Search() {
  const [input, setInput] = useState("");
  const {
    searchUsers,
    loading,
    setLoading,
    option,
    setOption,
    clearUsers,
    clearRepos,
    clearIssues,
    searchIssues,
    searchRepos,
    users,
    repos,
    issues,
  } = useContext(GithubContext);
  const handleInput = (e) => {
    setInput(e.target.value);
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
  };

  const clearData = () => {
    clearUsers();
    clearIssues();
    clearRepos();
    setInput("");
  };

  return (
    <div className="search_container">
      <div className="search">
        <input onChange={handleInput} value={input} />
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
        <input
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
        Repositories
      </div>
    </div>
  );
}

export default Search;
