import axios from "axios";
const REST_API_URL = "http://localhost:8080/employees";
const LOGIN_API_URL = "http://localhost:8080/api/auth";
const ATTENDANCE_API_URL = "http://localhost:8080/api/attendance";

export const listEmployees = () => {
    return axios.get(REST_API_URL);
}

export const getEmployeeById = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
}

export const addEmployee = (data) =>{
    return axios.post(REST_API_URL,data);
}

export const updateEmployee = (id, data) =>{
    return axios.put(`${REST_API_URL}/${id}`,data);
}

export const deleteEmployee = (id)=>{
    return axios.delete(`${REST_API_URL}/${id}`);
}

// admin login

export const adminLogin = (data)=>{
    return axios.post(LOGIN_API_URL+"/"+"login",data);
}

// attendance api
export const getAttendance = ()=>{
    return axios.get(ATTENDANCE_API_URL);
}


export const markAttendance = (attendance) =>
  axios.post(ATTENDANCE_API_URL, attendance);

export const getAttendanceByDate = (date) => {
  return axios.get(`${ATTENDANCE_API_URL}/${date}`);
};