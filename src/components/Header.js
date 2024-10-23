import React from "react";
import { Link } from "react-router-dom";

const Header = ({user, handleLogout }) => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TodoApp
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto  mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
