import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, listEmployees } from '../Service/EmployeeService';
import Dashboard from '../dashboard/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faNoteSticky } from '@fortawesome/free-solid-svg-icons';

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
    const userRes = confirm("Are you sure want to delete");
    if (userRes) {
      deleteEmployee(id).then((res) => {
        getAllEmployees();
      })
    }
  }

  return (
    <Dashboard>
      <div className='container p-4 '>
        <h2>📝List of Employees</h2>
        <button className='btn btn-primary mb-2 mt-2' onClick={() => navigate("/addEmployee")}>Add Employee</button>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Employee Id</th>
              <th>Employee FirstName</th>
              <th>Employee Email-Id</th>
              <th>Phone No.</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>
                  {employee.name}
                </td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>

                <td className='d-flex gap-2'>
                  <button className='btn btn-primary' onClick={() => navigate(`/updateEmployee/${employee.id}`)}>Update</button>
                  <button className='btn btn-danger' onClick={() => handleDelete(employee.id)}>Delete</button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dashboard>
  )
}

export default EmployeeList
