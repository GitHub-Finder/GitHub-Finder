import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
    repositories: [],
    repository: {},
    issues: [],
    issue: {},
    option: "Users",
    friends: [],
    githubUser: null,
  };

  // Using Reducer
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();
    const res = await fetch(
      `https://api.github.com/search/users?q=${text}&per_page=100`
    );
    const { items } = await res.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const searchRepos = async (text) => {
    setLoading();
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${text}&per_page=100`
    );
    const { items } = await res.json();
    console.log(items);
    dispatch({
      type: "GET_REPOSITORIES",
      payload: items,
    });
  };

  // const searchIssues = async (text) => {
  //   const res = await fetch(
  //     `https://api.github.com/search/issues?q=${text}&per_page=100`
  //   );
  //   const { items } = await res.json();
  //   dispatch({
  //     type: "GET_ISSUES",
  //     payload: items,
  //   });
  // };

  const searchUser = async (userName) => {
    try {
      setLoading(false);
      if (Response.status === 404) {
        window.location = "/notfound";
      } else {
        const res = await fetch(`https://api.github.com/users/${userName}`);
        const data = await res.json();
        dispatch({
          type: "GET_USER",
          payload: data,
        });
      }
    } catch (err) {
      dispatch({
        type: "GET_USER",
        payload: [],
      });
      console.log(err.message);
    }
  };

  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  const setOption = (option) => {
    dispatch({
      type: "SET_OPTION",
      payload: option,
    });
  };

  const setGitHubUser = (username) => {
    dispatch({
      type: "SET_GITHUBUSER",
      payload: username,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
      payload: [],
    });
  };

  const clearRepos = () => {
    dispatch({
      type: "CLEAR_REPOSITORIES",
      payload: [],
    });
  };

  // const clearIssues = () => {
  //   dispatch({
  //     type: "CLEAR_ISSUES",
  //     payload: [],
  //   });
  // };

  const setFriend = (login) => {
    dispatch({
      type: "SET_FRIEND",
      payload: login,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repositories,
        issues: state.issues,
        option: state.option,
        searchUsers,
        searchUser,
        clearUsers,
        clearRepos,
        setOption,
        searchRepos,
        friends: state.friends,
        setFriend,
        setGitHubUser,
        githubUser: state.githubUser,
        setLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
