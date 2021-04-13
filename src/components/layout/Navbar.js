import React, { Component } from "react";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";
const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-secondary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </ul>
    </nav>
  );
};
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};
Navbar.propTypes = {
  title: Proptypes.string.isRequired,
  icon: Proptypes.string.isRequired,
};
export default Navbar;
