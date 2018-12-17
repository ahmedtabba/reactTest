import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Ticket
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <NavLink className="nav-item nav-link" to="/branches">
              Branches
            </NavLink>
          </li>

          {!user && (
            <React.Fragment>
              <li className="nav-item pull-right">
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item pull-right">
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item  pull-right mr-auto">
                <NavLink
                  className="nav-item nav-link pull-right "
                  to="/profile"
                >
                  {user.fullName}
                </NavLink>
              </li>
              <li className="nav-item pull-right">
                <NavLink
                  className="nav-item nav-link pull-right mr-auto"
                  to="/logout"
                >
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
