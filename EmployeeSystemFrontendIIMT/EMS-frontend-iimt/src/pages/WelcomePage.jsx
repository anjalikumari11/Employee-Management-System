import React from "react";
import useUserStorage from "../Stores/UserStorage";

function WelcomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#0d0d0d", height:"90vh", width:"100%" }}
    >
      <div className="p-5 rounded-4 shadow-lg text-light" style={{
        maxWidth: "700px", width: "100%", background: "linear-gradient(145deg, #111, #1a1a1a)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        <h2 className="fw-bold mb-3 text-info text-center">
          😊 Welcome, {user?.name.toUpperCase()}
        </h2>
        <p className="text-light text-center mb-5">
          We're glad to have you back! Here's a quick overview of your starts.
        </p>

        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div
              className="p-4 rounded-3 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #1a1a1a, #222)",
                border: "1px solid rgba(0, 123, 255, 0.3)",
              }}
            >
              <h3 className="fw-bold text-primary">12</h3>
              <p className="text-light m-0">Attendance Days</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="p-4 rounded-3 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #1a1a1a, #222)",
                border: "1px solid rgba(40, 167, 69, 0.3)",
              }}
            >
              <h3 className="fw-bold text-success">3</h3>
              <p className="text-light m-0">Leaves Taken</p>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="p-4 rounded-3 shadow-sm"
              style={{
                background: "linear-gradient(135deg, #1a1a1a, #222)",
                border: "1px solid rgba(255, 193, 7, 0.3)",
              }}
            >
              <h3 className="fw-bold text-warning">95%</h3>
              <p className="text-light m-0">Performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
