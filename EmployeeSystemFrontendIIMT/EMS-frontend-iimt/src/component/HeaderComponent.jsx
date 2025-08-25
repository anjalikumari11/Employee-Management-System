import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useUserStorage from "../Stores/UserStorage"; // if you store user
import { useNavigate } from "react-router-dom";

function HeaderComponent() {
  const { signOut } = useUserStorage();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    signOut();
    navigate("/adminLogin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3" >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-info" href="#">
          Employee<span className="text-light">MS</span>
        </a>
        <div className="d-flex align-items-center ms-auto">
          {user ? (
            <div className="d-flex align-items-center">
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
    </nav>
  );
}

export default HeaderComponent;
