import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeDashboard = () => {
  
  const projectData = [
    { name: "Project A", employees: 8, progress: 60 },
    { name: "Project B", employees: 12, progress: 85 },
    { name: "Project C", employees: 5, progress: 40 },
    { name: "Project D", employees: 10, progress: 75 },
  ];

  const statusData = [
    { name: "Completed", value: 8 },
    { name: "Ongoing", value: 5 },
    { name: "Pending", value: 3 },
  ];

  const COLORS = ["#28a745", "#007bff", "#ffc107"];

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <h2 className="fw-bold mb-4 text-center">Employee Project Dashboard</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Employees</h6>
              <h3 className="fw-bold text-primary">35</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Active Projects</h6>
              <h3 className="fw-bold text-success">12</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Completed</h6>
              <h3 className="fw-bold text-info">8</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6 className="text-muted">Pending</h6>
              <h3 className="fw-bold text-warning">5</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row">
        {/* Bar Chart */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-white fw-bold">Employees per Project</div>
            <div className="card-body" style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="employees" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-white fw-bold">Project Progress</div>
            <div className="card-body" style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="progress" stroke="#28a745" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-white fw-bold">Project Status Distribution</div>
            <div className="card-body d-flex justify-content-center" style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
