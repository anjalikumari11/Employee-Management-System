import React, { useEffect, useState } from 'react'
import { getListOfEmpByProjectId, getListOfProject } from '../Service/EmployeeService';

function ProjectManagement() {
  const [projectData, setProjectData] = useState([]);
  const [employeeDetail,setEmployeeDetail] = useState([]);

  useEffect(() => {
    fetchProjectList();
  }, []);

  const fetchProjectList = async () => {
    try {
      let res = await getListOfProject();
      setProjectData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const fetchEmpDetail = async (id)=>{
    try{
      let res = await getListOfEmpByProjectId(id);
      setEmployeeDetail(res.data);
    }catch(e){
      console.log(e.message);
      
    }
  }


  return (
    <div className="container p-4">
      <h2>📝 List of Project</h2>
      <button className="btn btn-primary mb-2 mt-2">Add Project</button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Project</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((project) =>
           
             (
                <tr key={`${project.id}`}>
                  {/* <td>{emp.id}</td>
                  <td>{emp.name}</td> */}
                  <td></td>
                  <td></td>
                  <td>{project.name}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.status}</td>
                  <td className="d-flex gap-2">
                    <button className="badge bg-success border-0">Approved</button>
                    <button className="badge bg-warning border-0">Update</button>
                    <button className="badge bg-danger border-0">Delete</button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectManagement;
