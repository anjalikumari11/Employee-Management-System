import React, { useEffect, useState } from 'react';
import {
  addProjectandAssign,
  deleteProject,
  EmpListByUserRole,
  getListOfProject
} from '../Service/EmployeeService';
import { toast } from 'react-toastify';

function ProjectManagement() {
  const [projectData, setProjectData] = useState([]);
  const [emp, setEmp] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [projectDes, setProjectDes] = useState("");
  const [projectEmployees, setProjectEmployees] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [updateBox, setUpdateBox] = useState(false);

  useEffect(() => {
    fetchProjectList();
    fetchEmpBYUserRole();
  }, []);

  const fetchProjectList = async () => {
    try {
      let res = await getListOfProject();
      setProjectData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchEmpBYUserRole = async () => {
    try {
      const res = await EmpListByUserRole("EMPLOYEE");
      setEmp(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const resetForm = () => {
    setProjectName("");
    setProjectStartDate("");
    setProjectEndDate("");
    setProjectDes("");
    setProjectEmployees([]);
    setSelectedProject(null);
    setUpdateBox(false);
  };

  const addProject = async (e) => {
    e.preventDefault();
    const data = {
      name: projectName,
      description: projectDes,
      startDate: projectStartDate,
      endDate: projectEndDate,
      status: "ACTIVE",
      userIds: projectEmployees
    };
    try {
      await addProjectandAssign(data);
      toast.success("Project added successfully");
      fetchProjectList();
      resetForm();
    } catch (e) {
      toast.error("Error adding project");
      console.log(e.message);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const data = {
      id: selectedProject.id,
      name: projectName,
      description: projectDes,
      startDate: projectStartDate,
      endDate: projectEndDate,
      status: selectedProject.status,
      userIds: projectEmployees
    };
    try {
      await addProjectandAssign(data); 
      toast.success("Project updated successfully");
      fetchProjectList();
      resetForm();
      toast.success("Project updated successfully")
    } catch (e) {
      toast.error("Error updating project");
      console.log(e.message);
    }
  };

  const handleDeleteProject = async (id) => {
    let ans = confirm("Are you sure want to delete this project?");
    if (ans) {
      await deleteProject(id);
      await fetchProjectList();
      toast.success("Project deleted successfully");
    }
  };

  return (
    <div className="container p-4">
      <h2>📝 List of Projects</h2>
      <button
        type="button"
        className="btn btn-primary mb-2 mt-2"
        data-bs-toggle="modal"
        data-bs-target="#projectModal"
        onClick={resetForm}
      >
        Add Project
      </button>

      <div className="table-responsive">
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
          {projectData.map((project, index) => (
            <tr key={project.id ?? index}>
              <td>{project.id}</td>
              <td></td>
              <td>{project.name}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              <td>
                {project.status === "COMPLETE" ? (
                  <span className="badge bg-success">{project.status}</span>
                ) : (
                  <span className="badge bg-primary">{project.status}</span>
                )}
              </td>
             
              <td className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-warning border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#projectModal"
                  onClick={() => {
                    setSelectedProject(project);
                    setProjectName(project.name);
                    setProjectStartDate(project.startDate);
                    setProjectEndDate(project.endDate);
                    setProjectDes(project.description);
                    setProjectEmployees(project.userIds || []);
                    setUpdateBox(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger border-0"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div
        className="modal fade"
        id="projectModal"
        tabIndex="-1"
        aria-labelledby="projectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={updateBox ? handleUpdateProject : addProject}>
              <div className="modal-header">
                <h5 className="modal-title text-secondary" id="projectModalLabel">
                  {updateBox ? "Update Project" : "Add New Project"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={resetForm}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label className="form-label">Name of Project</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="mb-2 d-flex gap-3">
                  <div>
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={projectStartDate}
                      onChange={(e) => setProjectStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={projectEndDate}
                      onChange={(e) => setProjectEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={projectDes}
                    onChange={(e) => setProjectDes(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Choose Employees</label>
                  <select
                    multiple
                    className="form-control"
                    value={projectEmployees}
                    onChange={(e) => {
                      const selected = Array.from(
                        e.target.selectedOptions,
                        (option) => Number(option.value)
                      );
                      setProjectEmployees(selected);
                    }}
                  >
                    {emp.map((employee) => (
                      <option key={employee.userId} value={employee.userId}>
                        {employee.userId} - {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={resetForm}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {updateBox ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectManagement;
