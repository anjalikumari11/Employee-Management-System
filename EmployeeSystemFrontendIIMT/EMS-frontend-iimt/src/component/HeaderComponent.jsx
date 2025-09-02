import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import useUserStorage from "../Stores/UserStorage";
import { useNavigate } from "react-router-dom";
import "./header.css"

function HeaderComponent() {
  const { signOut } = useUserStorage();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    signOut();
    navigate("/adminLogin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3 fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-info navbarName" href="#">
          Employee<span className="text-light">MS</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="ms-auto d-flex align-items-center mt-2 mt-lg-0">

            {user ? (
              <div className="d-flex align-items-center flex-wrap">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="lg"
                  className="text-light me-2"
                />
                <span className="text-light me-3">{user.name}</span>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="btn btn-info btn-sm"
                onClick={() => navigate("/adminLogin")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
