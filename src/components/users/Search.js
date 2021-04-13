import React, { useContext, useState } from "react";
import GithubContext from "../../context/github/githubContex";
import AlertContext from "../../context/alert/alertContext";
const Search = () => {
  const githubContex = useContext(GithubContext);
  const [text, setText] = useState("");
  const alertContext = useContext(AlertContext);
  //const { setAlert } = alertContext;

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      alertContext.setAlert("Please enter something!", "info");
    } else {
      githubContex.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          value={text}
          onChange={onChange}
          placeholder="Search Users"
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContex.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContex.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
