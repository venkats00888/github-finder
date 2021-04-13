import React, { useContext } from 'react'
import Repo from './Repo';
import GithubContext from '../../context/github/githubContex';
const Repos = () => {
    const githubContex = useContext(GithubContext);
    return githubContex.repos.map(repo => <Repo repo={repo} key={repo.id} />)
};

export default Repos;
