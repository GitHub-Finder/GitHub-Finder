import React, { useState, useContext } from "react";
import Loading from "../Loading";
import GithubContext from "../../context/github/GithubContext";
import { Col, Row, Avatar, Select } from "antd";
import { AiFillStar } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";

const style = {
  background: "none",
  padding: "4px 0",
  border: "1px solid black",
  borderRadius: "10px",
  margin: "5px 0",
};

function RepoSearch({ repos }) {
  const [filter, setFilter] = useState({
    hasHomePage: false,
    searchBy: "Stars",
    direction: "Descending",
  });
  console.log(repos);
  const handleChange = (value) => {
    setFilter({ ...filter, searchBy: value });
  };
  const handleDirection = (value) => {
    setFilter({ ...filter, direction: value });
  };

  const handleCheck = (e) => {
    setFilter({ ...filter, hasHomePage: e.target.checked });
  };

  const sorting = (array) => {
    return array.sort((a, b) => {
      if (filter.searchBy === "Stars" && filter.direction === "Descending") {
        return b.stargazers_count - a.stargazers_count;
      } else if (
        filter.searchBy === "Stars" &&
        filter.direction === "Ascending"
      ) {
        return a.stargazers_count - b.stargazers_count;
      } else if (
        filter.searchBy === "Updated Date" &&
        filter.direction === "Descending"
      ) {
        return new Date(b.updated_at) - new Date(a.updated_at);
      } else if (
        filter.searchBy === "Updated Date" &&
        filter.direction === "Ascending"
      ) {
        return new Date(a.updated_at) - new Date(b.updated_at);
      }
    });
  };

  const filterSearch = (array) => {
    if (filter.hasHomePage) {
      const updatedArray = array.filter((repo) => repo.homepage);
      return sorting(updatedArray);
    } else {
      return sorting(array);
    }
  };

  const { loading } = useContext(GithubContext);
  return (
    <div>
      {repos.length > 0 && (
        <div className="repoFilter">
          <div className="checkBox">
            <label htmlFor="hasHomePage">Has Home Page</label>
            <input type="checkbox" onChange={handleCheck} />
          </div>
          <div className="dropdown">
            <div className="selectDropdown">
              <label htmlFor="select">Search by: </label>
              <Select
                name="select"
                defaultValue="Stars"
                style={{
                  width: 140,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "Updated Date",
                    label: "Updated Date",
                  },
                  {
                    value: "Stars",
                    label: "Stars",
                  },
                ]}
              />
            </div>
          </div>
          <div className="directionDropdown">
            <label htmlFor="select">Order:</label>
            <Select
              name="select"
              defaultValue="Descending"
              style={{
                width: 120,
              }}
              onChange={handleDirection}
              options={[
                {
                  value: "Ascending",
                  label: "Ascending",
                },
                {
                  value: "Descending",
                  label: "Descending",
                },
              ]}
            />
          </div>
        </div>
      )}
      <div className="repoList">
        {loading ? (
          <Loading />
        ) : (
          <Row gutter={16}>
            {filterSearch(repos)?.map((repo, idx) => (
              <Col span={12} className="gutter-row" key={idx}>
                <div style={style} className="repoWrapper">
                  <div className="avatarRepo">
                    <Avatar
                      size={54}
                      src={repo.owner.avatar_url}
                      className="avatar"
                    />
                    <p className="repoOwner">
                      <a target="_blank" href={repo.owner.html_url}>
                        {repo.owner.login}
                      </a>
                    </p>
                  </div>
                  <div className="subUserContainer">
                    <p className="repoName">
                      <span className="repoNameHighlight">{repo.name}</span>{" "}
                      <AiFillStar />
                      {repo.stargazers_count}
                    </p>
                    <p className="repoDescriptionParagraph">
                      <strong>Description:</strong> {repo.description}
                    </p>
                    {repo.homepage && (
                      <p className="repoDescription">
                        <strong>Home Page:</strong>{" "}
                        <a target="_blank" href={repo.homepage}>
                          {repo.homepage}
                        </a>
                      </p>
                    )}
                    {repo.language && (
                      <p className="repoDescription">
                        <strong>Language:</strong>{" "}
                        <span className="repoLanguage">{repo.language}</span>
                      </p>
                    )}
                    <p className="owner">
                      <strong>Type:</strong>{" "}
                      <span className={"ownerType-" + repo.owner.type}>
                        {repo.owner.type}
                      </span>
                    </p>
                  </div>
                  <div className="repoContent">
                    <div className="created_at">
                      {repo.updated_at.slice(0, 10)}
                    </div>
                    <div className="linkToRepo">
                      <a
                        className="linkToRepo"
                        target="_blank"
                        href={repo.html_url}
                      >
                        View Repo
                      </a>
                    </div>
                    {repo.open_issues && (
                      <div>
                        <div>
                          <strong>Issues:</strong> {repo.open_issues}
                        </div>
                        <div className="linkToIssues">
                          <a
                            className="linkToIssues"
                            target="_blank"
                            href={`https://github.com/repos/${repo.owner.login}/${repo.name}/issues`}
                          >
                            View Issues
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="addRepo">
                      <span className="addBtnSpan">
                        <button className="btnAddRepo">
                          <span className="addSpan">Add</span> <GrAddCircle />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default RepoSearch;
