import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { BsArrowRightShort } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiStarsStack } from "react-icons/gi";
import { GrBlog } from "react-icons/gr";
import Nav from "../components/Layout/Nav";
import Login from "../components/Auth/Login";
import Loading from "../components/Utilities/Loading";
import Piechart from "../components/Charts/Piechart";
import GithubContext from "../context/github/GithubContext";
import { Card, Collapse } from "antd";
const { Meta } = Card;
const { Panel } = Collapse;

function User() {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [input, setInput] = useState("");
  const [check, setCheck] = useState(false);
  const { user, searchUser, setFriend, friends, githubUser } =
    useContext(GithubContext);
  const { login } = useParams();

  const handleCheck = (e) => {
    setCheck(e.target.checked);
  };

  const filterIssues = (array) => {
    if (check) {
      return array.filter((el) => el.open_issues_count > 0);
    } else {
      return array;
    }
  };

  const filterSearch = (arr) => {
    if (!input) {
      return filterIssues(arr);
    }
    return filterIssues(arr).filter((el) => {
      if (el.name !== 0) {
        return (
          (el.language !== null && el.language.toLowerCase().includes(input)) ||
          el.name.toLowerCase().includes(input)
        );
      }
    });
  };

  const getUserRepos = async (login) => {
    // setLoading();
    try {
      const response = await fetch(
        `https://api.github.com/users/${login}/repos?per_page=100&sort=created&order=desc`
      );
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    searchUser(login);
    getUserRepos(login);
  }, [login]);
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const filterLanguage = (array) => {
    const languages = {};
    const arrayOfLanguages = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].language) {
        if (languages[array[i].language] === undefined) {
          languages[array[i].language] = 1;
        } else {
          languages[array[i].language]++;
        }
      }
    }

    Object.keys(languages).forEach((key) => {
      const language = new Object();
      language["item"] = key;
      language["count"] = languages[key];
      arrayOfLanguages.push(language);
    });
    return arrayOfLanguages;
  };

  return !githubUser ? (
    <Login />
  ) : (
    <div>
      <Nav />
      <div className="userMainWrapper">
        <div className="wrapper-top">
          <div className="profile-pic">
            <Card
              hoverable
              style={{
                width: 240,
                height: 360,
                borderRadius: "10px",
              }}
              cover={<img alt="profile image" src={user.avatar_url} />}
            >
              <Meta
                title={
                  user.created_at &&
                  "GitHub User since " + user.created_at.slice(0, 4)
                }
                description={
                  <a target="_blank" rel="noreferrer" href={user.html_url}>
                    {<BsArrowRightShort />} Github Profile
                  </a>
                }
              />
              <p className="addUser">
                Add Friend
                <button className="btnAdd" onClick={() => {}}>
                  <AiOutlineUsergroupAdd />
                </button>
              </p>
            </Card>
          </div>
          <div className="profile-data">
            <h3>
              Profile Information <br></br>
              {user.bio && <span className="bio">{user.bio}</span>}
            </h3>
            {user.hireable && (
              <p>
                <span className="hireable">Hireable</span>{" "}
                <span className="type">{user.type}</span>
              </p>
            )}
            <p>
              <span className="title">Name:</span> {user.name}
            </p>
            <p>
              <span className="title">Location:</span> {<ImLocation />}
              {user.location}
            </p>
            {user.blog && (
              <p>
                <span className="title">Blog</span> {<GrBlog />}:
                <a href={user.blog} rel="noreferrer" target="_blank">
                  {" " + user.blog}
                </a>
              </p>
            )}
            {user.twitter_username && (
              <p>
                <span className="title">Twitter Username:</span>{" "}
                {user.twitter_username}
              </p>
            )}
            <p>
              <span className="title">Followers</span>:
              <span>{" " + user.followers}</span>
            </p>
            <p>
              <span className="title">Following:</span> {" " + user.following}
            </p>
            {user.company && (
              <p>
                <span className="title">Company:</span> {" " + user.company}
              </p>
            )}
          </div>
          <div className="chart">
            <h2>Languages</h2>
            <Piechart languages={filterLanguage(repos)} />
          </div>
        </div>
        <div className="wrapper-bottom">
          <div className="reposSearch">
            <div className="searchInfo">
              <h2>Total Public Repositories: {" " + user.public_repos}</h2>
              <p>Found: {filterSearch(repos).length}</p>
            </div>
            <div className="inputSeach">
              <div>
                <label htmlFor="searchInput">Search by Language: </label>
                <input
                  name="searchInput"
                  value={input}
                  onChange={handleChange}
                />
              </div>
              <div className="checkBox">
                <label htmlFor="hasHomePage">Include Issues</label>
                <input type="checkbox" onChange={handleCheck} />
              </div>
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : filterSearch(repos).length !== 0 ? (
            filterSearch(repos)?.map((repo, index) => (
              <div className="userRepoContainer" key={index}>
                <div className="userPanel">
                  <Collapse defaultActiveKey={[{ index }]} className="collapse">
                    <Panel
                      header={
                        <div className="repoHeader">
                          <div className="container-1">
                            {repo.name +
                              (repo.language ? " / " + repo.language : "")}
                          </div>
                          <div className="container-2">
                            {"Created: " + repo.created_at.slice(0, 10)}
                          </div>
                        </div>
                      }
                      key={index}
                    >
                      <div className="userReposWrapper">
                        <div className="userReposContainer-left">
                          <p>
                            {repo.description && (
                              <p>
                                <strong>Description:</strong> {repo.description}
                              </p>
                            )}
                            <strong>Stars</strong> <GiStarsStack />:
                            {repo.stargazers_count}
                            <br />
                            <strong>Visit Repo: </strong>
                            <a target="_blank" href={repo.html_url}>
                              <BsArrowRightShort /> {repo.html_url}
                            </a>
                          </p>
                          {repo.homepage && (
                            <p>
                              <strong>Home Page: </strong>
                              <a target="_blank" href={repo.homepage}>
                                {repo.homepage}
                              </a>
                            </p>
                          )}
                        </div>
                        <div className="userReposContainer-right">
                          <p>
                            <strong>Public Issues:</strong>{" "}
                            {repo.open_issues_count}
                          </p>
                          <p>
                            <a
                              target="_blank"
                              href={`https://github.com/${login}/${repo.name}/issues`}
                            >
                              View Issues
                            </a>
                          </p>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                <button className="userRepoAddBtn">Add</button>
              </div>
            ))
          ) : (
            <p>No Repositories Found ...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
