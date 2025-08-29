import React from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeList from './component/EmployeeList'
import AddEmployee from './component/AddEmployee'
import Dashboard from './dashboard/Dashboard'
import WelcomePage from './pages/WelcomePage';
import Attendence from './pages/Attendence';
import Login from './Login/Login';
import { ToastContainer } from 'react-toastify';
import AttendanceReport from './pages/AttendanceReport';
import EmployeeAttendance from './EmployeeFeatures/EmployeeAttendance';
import EmployeeLeave from './EmployeeFeatures/EmployeeLeave';
import LeaveManagement from './pages/LeaveManagement';
import ProjectManagement from './pages/ProjectManagement';
import EmployeeProject from './EmployeeFeatures/EmployeeProject';
import MainDashboard from './pages/MainDashboard';
import EmployeeDashboard from './EmployeeFeatures/EmployeeDashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/employee' element={<Dashboard />} />
          <Route path='/adminLogin' element={<Login />} />
          <Route path='/EmployeeList' element={<EmployeeList />} />
          <Route path='/attendanceReport' element={<AttendanceReport />} />
          <Route path='/welcome' element={<WelcomePage />} />
          <Route path='/attendance' element={<Attendence />} />
          <Route path='/addEmployee' element={<AddEmployee />} />
          <Route path='/updateEmployee/:id' element={<AddEmployee />} />
          <Route path='/EmployeeAttendance' element={<Dashboard><EmployeeAttendance /></Dashboard>} />
          <Route path='/leave' element={<Dashboard><EmployeeLeave /></Dashboard>} />
          <Route path='/manageLeave' element={<Dashboard><LeaveManagement/></Dashboard>} />
          <Route path='/manageProject' element={<Dashboard><ProjectManagement/></Dashboard>} />
          <Route path='/projects' element={<Dashboard><EmployeeProject/></Dashboard>} />
          <Route path='/mainDashboard' element={<Dashboard><MainDashboard/></Dashboard>} />
          <Route path='/employeeDashboard' element={<Dashboard><EmployeeDashboard/></Dashboard>} />


        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
