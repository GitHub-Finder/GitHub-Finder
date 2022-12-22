import React, { useState } from "react";

function Search() {
  const [option, setOption] = useState("Users");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const handleChange = (e) => {
    setOption(e.target.value);
    console.log(e.target.value);
  };

  const getData = async (option) => {
    switch (option) {
      case "Users": {
        setInput("");
        const response = await fetch(
          `https://api.github.com/search/users?q=${input}`
        );
        const data = await response.json();
        console.log(data);
        return setData(data.items);
      }
      case "Repositories": {
        setInput("");
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${input}`
        );
        const data = await response.json();
        console.log(data);
        return setData(data.items);
      }
      case "Issues": {
        setInput("");
        const response = await fetch(
          `https://api.github.com/search/issues?q=${input}`
        );
        const data = await response.json();
        console.log(data);
        return setData(data.items);
      }
    }
  };
  return (
    <div className="search_container">
      <div className="search">
        <input value={input} onChange={handleInput} />
        <button type="button" onClick={() => getData(option)}>
          Search
        </button>
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
        <input
          type="radio"
          value="Issues"
          name="gender"
          onChange={handleChange}
          checked={option === "Issues" ? "checked" : ""}
        />
        Issues
      </div>
      {/* <div>
        {data.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </div> */}
    </div>
  );
}

export default Search;
