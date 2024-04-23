import React from "react";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { useUserContext } from "../context/UserContext";

const NavBar = ({ onReportsLinkClick }) => {
  const { setUser } = useUserContext();

  /*********************************Function*********************************/
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear the user data from UserContext after successful sign-out
      setUser(null);

      // Clear user data from local storage after successful sign-out
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  /*********************************Function*********************************/

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            src="/logos/logo-nav.png"
            style={{
              height: "40px",
            }}
            alt="Login"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/budget">
              Budget
            </NavLink>
            <NavLink className="nav-link" to="/income">
              Income
            </NavLink>
            <NavLink className="nav-link" to="/expenses">
              Expenses
            </NavLink>
            <NavLink
              className="nav-link"
              to="/reports"
              onClick={onReportsLinkClick}
            >
              Reports
            </NavLink>
          </div>
        </div>
        <div className="d-flex">
          <button
            className="btn btn-outline-danger mx-2"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>Signout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
