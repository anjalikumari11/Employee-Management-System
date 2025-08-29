import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend,
  AreaChart, Area
} from "recharts";
import { FaUsers, FaTasks, FaCheckCircle, FaClock, FaBell } from "react-icons/fa";
import { getListOfProject, getListOfProjectByStatus, listEmployees } from "../Service/EmployeeService";

const MainDashboard = () => {
  const [listEmp, setListEmp] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [prjectByStatusList,setProjectByStatusList] = useState([]);
  useEffect(() => {
    fetchListOfEmp();
  }, [])

  const fetchListOfEmp = async () => {
    try {
      let res = await listEmployees();
      setListEmp(res.data);
    } catch (e) {
      console.log(e.message);

    }
  }
  useEffect(() => {
    fetchprojectList();
  }, []);

  const fetchprojectList = async () => {
    try {
      let res = await getListOfProject();
      setProjectList(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(()=>{
    fetchProjectByStatus();
  },[])

  const fetchProjectByStatus = async()=>{
    try{
      let res = await getListOfProjectByStatus("ACTIVE");
      setProjectByStatusList(res.data);
    }catch(e){
      console.log(e.message);
      
    }
  }

  const projectData = projectList.map(project => ({
    name: project.name,
    employees: project.userIds.length,
    progress: 50,
  }));

  const statusData = [
    { name: "Completed", value: 12 },
    { name: "Ongoing", value: 7 },
    { name: "Pending", value: 4 },
  ];

  const attendanceData = [
    { day: "Mon", attendance: 90 },
    { day: "Tue", attendance: 85 },
    { day: "Wed", attendance: 92 },
    { day: "Thu", attendance: 88 },
    { day: "Fri", attendance: 95 },
  ];

  const COLORS = ["#28a745", "#007bff", "#ffc107"];

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Welcome Back, Admin</h2>
          <p className="text-muted">Here’s an overview of employees and projects</p>
        </div>
        
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-white shadow border-0" style={{ background: "#007bff" }}>
            <div className="card-body text-center">
              <FaUsers size={28} className="mb-2" />
              <h6>Total Employees</h6>
              <h3 className="fw-bold">{listEmp.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white shadow border-0" style={{ background: "#28a745" }}>
            <div className="card-body text-center">
              <FaTasks size={28} className="mb-2" />
              <h6>Active Projects</h6>
              <h3 className="fw-bold">{projectList.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white shadow border-0" style={{ background: "#17a2b8" }}>
            <div className="card-body text-center">
              <FaCheckCircle size={28} className="mb-2" />
              <h6>Completed</h6>
              <h3 className="fw-bold">{prjectByStatusList.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white shadow border-0" style={{ background: "#ffc107" }}>
            <div className="card-body text-center">
              <FaClock size={28} className="mb-2" />
              <h6>Pending</h6>
              <h3 className="fw-bold">{projectList.length - prjectByStatusList.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-white fw-bold">Employees per Project</div>
            <div className="card-body" style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="employees" fill="#007bff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

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
                  <Line type="monotone" dataKey="progress" stroke="#28a745" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-white fw-bold">Employee Attendance Trend</div>
            <div className="card-body" style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="colorAttend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007bff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stroke="#007bff"
                    fillOpacity={1}
                    fill="url(#colorAttend)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

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

export default MainDashboard;
