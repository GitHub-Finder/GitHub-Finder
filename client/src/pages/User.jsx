import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { BsArrowRightShort } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiStarsStack } from "react-icons/gi";
import { GrBlog } from "react-icons/gr";
import Loading from "../components/Loading";
import GithubContext from "../context/github/GithubContext";
import { Card, Collapse } from "antd";
const { Meta } = Card;
const { Panel } = Collapse;

function User() {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [input, setInput] = useState("");
  const { user, searchUser, setFriend, friends } = useContext(GithubContext);
  const { login } = useParams();

  const filterSearch = (arr) => {
    if (!input) {
      return arr;
    }
    return arr.filter((el) => {
      if (el.name !== 0) {
        return (
          (el.language !== null && el.language.toLowerCase().includes(input)) ||
          el.name.toLowerCase().includes(input)
        );
      }
    });
  };

  const getUserRepos = async (login) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${login}/repos?per_page=100&sort=created&order=desc`
      );
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    searchUser(login);
    getUserRepos(login);
  }, [login]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
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
            {/* backend to add user */}
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
      </div>
      <div className="wrapper-bottom">
        <div className="reposSearch">
          <div className="searchInfo">
            <h2>Total Public Repositories: {" " + user.public_repos}</h2>
            <p>Found: {filterSearch(repos).length}</p>
          </div>
          <div className="inputSeach">
            <label htmlFor="searchInput">Search by Language: </label>
            <input name="searchInput" value={input} onChange={handleChange} />
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : filterSearch(repos).length !== 0 ? (
          filterSearch(repos)?.map((repo, index) => (
            <Collapse defaultActiveKey={[{ index }]} className="collapse">
              <Panel
                header={
                  <div className="repoHeader">
                    <div className="container-1">
                      {repo.name + (repo.language ? " / " + repo.language : "")}
                    </div>
                    <div className="container-2">
                      {"Created: " + repo.created_at.slice(0, 10)}
                    </div>
                  </div>
                }
                key={index}
              >
                {repo.description ? (
                  <p key={index}>
                    Description: {repo.description} <br />
                    Stars <GiStarsStack />: {repo.stargazers_count}
                    <br />
                    Visit Repo: <BsArrowRightShort /> {repo.html_url}
                  </p>
                ) : (
                  <p key={index}>
                    Name: {repo.name} <br />
                    Stars <GiStarsStack />: {repo.stargazers_count}
                  </p>
                )}
              </Panel>
            </Collapse>
          ))
        ) : (
          <p>No Repositories Found ...</p>
        )}
      </div>
    </div>
  );
}

export default User;
