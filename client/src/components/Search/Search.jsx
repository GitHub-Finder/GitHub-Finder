import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import { GoSearch } from "react-icons/go";
import { MdClear } from "react-icons/md";
import { Radio } from "antd";

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
    loading,
  } = useContext(GithubContext);
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  console.log(loading);

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
    <div className="search_container">
      <div className="search">
        <input onChange={handleInput} value={input} onKeyDown={handleKeyDown} />
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
        <Radio.Group defaultValue={option} buttonStyle="solid">
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
      </div>
    </div>
  );
}

export default Search;
