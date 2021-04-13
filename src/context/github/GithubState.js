import react, { useReducer } from "react";
import axios from "axios";
import GithubContex from "./githubContex";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types.js";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search users
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${githubClientId}&client_secret=${githubClientSecret}`);
    dispatch({ type: SEARCH_USERS, payLoad: res.data.items });
  };

  //get user
  const getUser = async (uname) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${uname}?client_id=
      ${githubClientId}&client_secret=${githubClientSecret}`);
    dispatch({ type: GET_USER, payLoad: res.data });
  };
  //get repos
  const getUserRepos = async (uname) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${uname}/repos?per_page=5&sort=created:asc&client_id=
   ${githubClientId}&client_secret=${githubClientSecret}`);
    dispatch({ type: GET_REPOS, payLoad: res.data });
  };
  //clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContex.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContex.Provider>
  );
};

export default GithubState;
