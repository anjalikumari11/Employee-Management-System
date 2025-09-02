import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";
import { getAllRequestById, getAttendaceById, getListOfProjectByEmployeeId } from "../Service/EmployeeService";

const EmployeeDashboard = () => {
  const [EmpProjectData, setEmpProjectData] = useState([]);
  const [empAttendance, setEmpAttendance] = useState([]);
  const [empLeave, setEmpLeave] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const totalProjects = EmpProjectData.length;
  const totalAttendance = empAttendance.length;
  const totalLeave = empLeave.length;

  useEffect(() => {
    if (user?.userId) {
      fetchProjectData(user.userId);
      fetchEmployeeLeaveById(user.userId);
      fetchAttendance(user.userId);
    }
  }, [user?.userId]);

  const fetchProjectData = async (id) => {
    try {
      let res = await getListOfProjectByEmployeeId(id);
      setEmpProjectData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchAttendance = (id) => {
    getAttendaceById(id).then((res) => setEmpAttendance(res.data));
  };

  const fetchEmployeeLeaveById = async (id) => {
    const res = await getAllRequestById(id);
    setEmpLeave(res.data);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <h2 className="fw-bold mb-4 text-center">{user.name} Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Projects</h6>
              <h3 className="fw-bold text-primary">{totalProjects}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Attendance</h6>
              <h3 className="fw-bold text-success">{totalAttendance}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Leave</h6>
              <h3 className="fw-bold text-info">{totalLeave}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Performance</h6>
              <h3 className="fw-bold text-success">
                {EmpProjectData.length > 0
                  ? Math.round(
                    EmpProjectData.reduce((acc, p) => acc + (p.progress || 0), 0) / EmpProjectData.length
                  ) + "%"
                  : "0%"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <h6>Employee Details</h6>
        <div className="table-responsive">
          <table className="table table-hover table-bordered m-2">
        <thead className="table-secondary">
          <tr>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.userId}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.department}</td>
            <td>{user.userRole}</td>
          </tr>
         
        </tbody>
      </table>
        </div>
      </div>

      
    </div>
  );
};

export default EmployeeDashboard;
