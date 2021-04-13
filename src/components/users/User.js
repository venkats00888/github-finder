import React, { useContext, useEffect } from "react";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import { Link } from "react-router-dom";
import GithubContex from "../../context/github/githubContex";
const User = ({ match }) => {
  const githubContex = useContext(GithubContex);
  const { getUser, getUserRepos, user, loading } = githubContex;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    public_repos,
    html_url,
    hireable,
    name,
    company,
    avatar_url,
    bio,
    location,
    following,
    followers,
  } = user;

  return (
    <>
      <div>
        <Link to="/" className="btn btn-light">
          Back
        </Link>
        Hireable :{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              style={{ width: "150px", borderRadius: "50%" }}
              alt="img"
            />

            <h1>{name}</h1>
            <p>Location: {location}</p>
            <h4>{company}</h4>
          </div>
          <div>
            {bio && (
              <>
                <h3>Bio:</h3>
                <p>{bio}</p>{" "}
              </>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Github Profile
            </a>
          </div>
        </div>
      )}
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-dark">Public Repos: {public_repos}</div>
      </div>
      <Repos />
    </>
  );
};
export default User;
