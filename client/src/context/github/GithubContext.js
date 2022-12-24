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
  };

  // Using Reducer
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();
    const res = await fetch(`https://api.github.com/search/users?q=${text}`, {
      headers: {
        Authorization: `token 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`,
      },
    });
    const { items } = await res.json();
    console.log(items);
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const searchRepos = async (text) => {
    setLoading();
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${text}`,
      {
        headers: {
          Authorization: `token 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`,
        },
      }
    );
    const { items } = await res.json();
    console.log(items);
    dispatch({
      type: "GET_REPOSITORIES",
      payload: items,
    });
  };

  const searchIssues = async (text) => {
    setLoading();
    const res = await fetch(`https://api.github.com/search/issues?q=${text}`, {
      headers: {
        Authorization: `token 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`,
      },
    });
    const { items } = await res.json();
    console.log(items);
    dispatch({
      type: "GET_ISSUES",
      payload: items,
    });
  };

  const searchUser = async (userName) => {
    setLoading();

    const res = await fetch(`https://api.github.com/users/${userName}`, {
      headers: {
        Authorization: `token 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`,
      },
    });
    if (Response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await res.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
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

  const clearIssues = () => {
    dispatch({
      type: "CLEAR_ISSUES",
      payload: [],
    });
  };

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
        clearIssues,
        setOption,
        searchIssues,
        searchRepos,
        friends: state.friends,
        setFriend,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
