import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, listEmployees } from '../Service/EmployeeService';
import Dashboard from '../dashboard/Dashboard';

function EmployeeList() {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, [])

  const getAllEmployees = () => {
    listEmployees().then((response) => {
      setEmployeeData(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleDelete = (id) => {
    const userRes = window.confirm("Are you sure want to delete?");
    if (userRes) {
      deleteEmployee(id).then(() => {
        getAllEmployees();
      })
    }
  }

  return (
    <Dashboard>
      <div className="container p-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <h2 className="mb-3">📝 List of Employees</h2>
          <button 
            className="btn btn-primary mb-3" 
            onClick={() => navigate("/addEmployee")}
          >
            Add Employee
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Employee Id</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td className="d-flex flex-wrap gap-2 justify-content-center">
                    <button 
                      className="btn btn-sm btn-primary" 
                      onClick={() => navigate(`/updateEmployee/${employee.id}`)}
                    >
                      Update
                    </button>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  )
}

export default EmployeeList
