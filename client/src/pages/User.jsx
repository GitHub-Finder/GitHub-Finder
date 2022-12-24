import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";

function User() {
  const { user, searchUser, setFriend, friends } = useContext(GithubContext);
  const { login } = useParams();

  useEffect(() => {
    searchUser(login);
  }, [login]);

  return <>user</>;
}

export default User;
