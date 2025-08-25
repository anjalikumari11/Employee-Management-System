import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTachometerAlt,faUser,faChevronRight,faBox,faClipboardUser,faMessage,faBell,} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useUserStorage from "../Stores/UserStorage";

function Sidebar() {
  const navigate = useNavigate();
  const {signOut } = useUserStorage();
  const [userRoleFromDB, setUserRoleFromDB] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if(user?.userRole == "ADMIN"){
      setUserRoleFromDB("ADMIN");
    }
    else if(user?.userRole == "MANAGER"){
      setUserRoleFromDB("MANAGER");
    }
    else{
      setUserRoleFromDB("EMPLOYEE");

    }
    
  }, [user]);
  console.log(user);
  

  const handleLogout = () => {
    signOut();
    navigate('/adminLogin')
  }

  return (
    <div
      className="d-flex flex-column shadow"
      style={{height: "90vh",width: "240px",background: "#1e1e2f",color: "#f5f5f5",}}
    >
      <div
        className="d-flex justify-content-center align-items-center py-4"
        style={{ borderBottom: "1px solid #333" }}
      >
        <span
          className="fw-bold px-3 py-2 text-center"
          style={{borderRadius: "10px",width: "85%",background: "#007bff",cursor: "pointer",}}
        >
          <div style={{ fontSize: "12px", marginTop: "4px" }}>
            {user?.userRole}
          </div>
          <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
          Dashboard
        </span>
      </div>

      <ul className="list-unstyled flex-grow-1 p-3">
        <li className="mb-3">
          {user? (
            <>
              <button
                className="btn w-100 d-flex justify-content-between align-items-center text-start text-light px-3 py-2"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  fontSize: "15px",
                }}
                data-bs-toggle="collapse"
                data-bs-target="#userMenu"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faUser} className="me-2 text-info" />
                  <span style={{ fontWeight: "500" }}>{user?.name}</span>
                </span>
                <FontAwesomeIcon icon={faChevronRight} className="small" />
              </button>

              <div className="collapse mt-2" id="userMenu">
                <ul className="list-unstyled ps-3 mb-0">
                  <li
                    className="py-2 sidebar-item d-flex align-items-center"
                    style={{ cursor: "pointer", transition: "0.2s" }}
                    onClick={() => navigate("/settings")}
                  >
                    <span className="me-2">⚙️</span> Settings
                  </li>
                  <li
                    className="py-2 sidebar-item d-flex align-items-center text-danger"
                    style={{ cursor: "pointer", transition: "0.2s" }}
                    onClick={handleLogout}
                  >
                    <span className="me-2">🚪</span> Logout
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div>
              <button
                className="btn btn-primary w-100 fw-semibold rounded-3"
                onClick={() => navigate("/adminLogin")}
              >
                Login
              </button>
            </div>
          )}
        </li>


        {/* Admin / Manager Menus */}
        {(userRoleFromDB === "ADMIN" || userRoleFromDB === "MANAGER") && (
          <>
            <li
              className="py-2 sidebar-item"
              onClick={() => navigate("/EmployeeList")}
            >
              <FontAwesomeIcon icon={faBox} className="me-2 text-warning" />
              Employees
            </li>
            <li
              className="py-2 sidebar-item"
              onClick={() => navigate("/attendance")}
            >
              <FontAwesomeIcon
                icon={faClipboardUser}
                className="me-2 text-success"
              />
              Attendance
            </li>
            <li
              className="py-2 sidebar-item"
              onClick={() => navigate("/attendanceReport")}
            >
              <FontAwesomeIcon
                icon={faClipboardUser}
                className="me-2 text-danger"
              />
              Attendance Report
            </li>
          </>
        )}

        {/* Employee Menus */}
        {userRoleFromDB === "EMPLOYEE" && (
          <>
            <li
              className="py-2 sidebar-item"
              onClick={() => navigate("/EmployeeAttendance")}
            >
              <FontAwesomeIcon
                icon={faClipboardUser}
                className="me-2 text-success"
              />
              My Attendance
            </li>
            <li
              className="py-2 sidebar-item"
              onClick={() => navigate("/leave")}
            >
              <FontAwesomeIcon icon={faMessage} className="me-2 text-primary" />
              Leaves
            </li>
            <li
              className="py-2 sidebar-item"
              onClick={() => navigate("/projects")}
            >
              <FontAwesomeIcon icon={faBox} className="me-2 text-info" />
              Projects / Tasks
            </li>
            <li
              className="py-2 sidebar-item"
              onClick={() => navigate("/salary")}
            >
              <FontAwesomeIcon
                icon={faClipboardUser}
                className="me-2 text-warning"
              />
              Payroll / Salary
            </li>
            <li
              className="py-2 sidebar-item"
              onClick={() => navigate("/help")}
            >
              <FontAwesomeIcon icon={faBell} className="me-2 text-danger" />
              HelpDesk
            </li>
          </>
        )}
      </ul>

      {/* Footer */}
      <div
        className="text-center py-2"
        style={{ borderTop: "1px solid #333", fontSize: "12px" }}
      >
        © EMS 2025
      </div>
    </div>
  );
}

export default Sidebar;
