import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaTasks, FaUsers } from "react-icons/fa";
import { getListOfProjectByEmployeeId, updateProjectStatus } from "../Service/EmployeeService";
import { toast } from "react-toastify";

function EmployeeProject() {
  const [EmpProjectData, setEmpProjectData] = useState([]);
  const [status, setStatus] = useState("ACTIVE");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.userId) {
      fetchProjectData(user?.userId);
    }
  }, [user?.userId]);

  const fetchProjectData = async (id) => {
    try {
      let res = await getListOfProjectByEmployeeId(id);
      setEmpProjectData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleUpdateStatus = async (projectId, newStatus) => {
    try {
      const statusData = {
        empId: user.userId,
        projectId: projectId,
        status: newStatus
      };

      const res = await updateProjectStatus(statusData);
      toast.success(res.data);
      fetchProjectData(user.userId); 
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
      toast.error("Failed to update status");
    }
  };

  const total = EmpProjectData.length;
  const activeCount = EmpProjectData.filter((p) => p.status === "ACTIVE").length;
  const completedCount = EmpProjectData.filter((p) => p.status === "COMPLETE").length;
  const pendingCount = EmpProjectData.filter((p) => p.status === "PENDING").length;

  return (
    <div className="container m-3">
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-white shadow border-0" style={{ background: "#007bff" }}>
            <div className="card-body text-center">
              <FaUsers size={28} className="mb-2" />
              <h6>Total Projects</h6>
              <h3 className="fw-bold">{total}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white shadow border-0" style={{ background: "#28a745" }}>
            <div className="card-body text-center">
              <FaTasks size={28} className="mb-2" />
              <h6>Active Projects</h6>
              <h3 className="fw-bold">{activeCount}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white shadow border-0" style={{ background: "#17a2b8" }}>
            <div className="card-body text-center">
              <FaCheckCircle size={28} className="mb-2" />
              <h6>Completed</h6>
              <h3 className="fw-bold">{completedCount}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white shadow border-0" style={{ background: "#ffc107" }}>
            <div className="card-body text-center">
              <FaClock size={28} className="mb-2" />
              <h6>Pending</h6>
              <h3 className="fw-bold">{pendingCount}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3" style={{ height: "90vh" }}>
        <hr className="m-2" />
        <table className="table table-hover table-bordered m-2">
          <thead className="table-secondary">
            <tr>
              <th>Project name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {EmpProjectData.map((project) => (
              <tr key={project.projectId}>
                <td>{project.name}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  {project.status === "COMPLETE" ? (
                    <span className="badge bg-success border-0">{project.status}</span>
                  ) : project.status === "ACTIVE" ? (
                    <span className="badge bg-primary border-0">{project.status}</span>
                  ) : (
                    <span className="badge bg-warning border-0">{project.status}</span>
                  )}
                </td>
                <td>
                  {project.status === "COMPLETE" ? (
                    <button className="badge bg-success border-0">Updated</button>
                  ) : (
                    <button
                      type="button"
                      className="badge bg-warning border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setSelectedProjectId(project.id);
                        setStatus(project.status);
                      }}
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-secondary" id="exampleModalLabel">
                  Project ID: {selectedProjectId}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold text-secondary">Project Name:</label>
                  <input
                    type="text"
                    className="form-control text-secondary"
                    value={
                      EmpProjectData.find((p) => p.id === selectedProjectId)?.name || ""
                    }
                    readOnly
                  />
                </div>
                <div>
                  <label className="form-label fw-bold text-secondary">Select Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETE">Complete</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleUpdateStatus(selectedProjectId, status)}
                  data-bs-dismiss="modal"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProject;
