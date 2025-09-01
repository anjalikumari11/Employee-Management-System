import axios from "axios";
const REST_API_URL = "http://localhost:8080/employees";
const LOGIN_API_URL = "http://localhost:8080/api/auth";
const ATTENDANCE_API_URL = "http://localhost:8080/api/attendance";
const EMPLOYEE_LEAVE = "http://localhost:8080/leave";
const PROJECT_URL = "http://localhost:8080/Project";
const SALARY_API = "http://localhost:8080/salary";

export const listEmployees = () => {
    return axios.get(REST_API_URL);
}

export const EmpListByUserRole = (userRole) => {
    return axios.get(`http://localhost:8080/userRole/${userRole}`)
}

export const getEmployeeById = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
}

export const addEmployee = (data) => {
    return axios.post(REST_API_URL, data);
}

export const updateEmployee = (id, data) => {
    return axios.put(`${REST_API_URL}/${id}`, data);
}

export const deleteEmployee = (id) => {
    return axios.delete(`${REST_API_URL}/${id}`);
}

// admin login
export const adminLogin = (data) => {
    return axios.post(LOGIN_API_URL + "/" + "login", data);
}

// attendance api
export const getAttendance = () => {
    return axios.get(ATTENDANCE_API_URL);
}

export const markAttendance = (attendance) =>
    axios.post(ATTENDANCE_API_URL, attendance);

export const getAttendanceByDate = (date) => {
    return axios.get(`${ATTENDANCE_API_URL}/date/${date}`);
};

// get attendance by employee id
export const getAttendaceById = (id) => {
    return axios.get(`${ATTENDANCE_API_URL}/${id}`)
}

// employee leave
export const sendRequest = (data) => {
    return axios.post(`${EMPLOYEE_LEAVE}/sendRequest`, data);
}

// All request
export const getAllRequest = () => {
    return axios.get(EMPLOYEE_LEAVE);
}

// by status :- Pending/Approved/Rejected
export const getLeaveRequestByStatus = (status) => {
    return axios.get(`${EMPLOYEE_LEAVE}/status/${status}`)
}

// All request by Employee Id
export const getAllRequestById = (EmployeeId) => {
    return axios.get(`${EMPLOYEE_LEAVE}/employee/${EmployeeId}`);
}

// Leave Approved or Rejected by admin
export const approveOrReject = (data) => {
    return axios.put(`${EMPLOYEE_LEAVE}/approve`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

// project management
export const getListOfProject = () => {
    return axios.get(PROJECT_URL);
}

export const getListOfProjectByStatus = (status) => {
    return axios.get(`${PROJECT_URL}/status/${status}`);
}

export const getListOfProjectByEmployeeId = (id) => {
    return axios.get(`${PROJECT_URL}/employee/${id}`);
}

export const updateProjectStatus = (status) => {
    return axios.put(`${PROJECT_URL}/status`, status, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export const getListOfEmpByProjectId = (id) => {
    return axios.get(`${PROJECT_URL}/${id}/employees`);
}

export const addProjectandAssign = (data) => {
    return axios.post(PROJECT_URL, data);
}

export const deleteProject = (id) => {
    return axios.delete(`${PROJECT_URL}/delete/${id}`);
}

export const updateProject = (id, updatedProjec) => {
    return axios.put(`${PROJECT_URL}/${id}`, updatedProjec);
}

// Salary api

export const addSalary = (data) => {
    return axios.post(`${SALARY_API}/add`, data);
}

export const getSalaryList = () => {
    return axios.get(SALARY_API);
}

export const getSalaryByEmpId=(id)=>{
    return axios.get(`${SALARY_API}/${id}`);
}