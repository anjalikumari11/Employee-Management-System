import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaClock, FaTasks, FaUsers } from 'react-icons/fa'
import { getListOfProjectByEmployeeId, updateProjectStatus } from '../Service/EmployeeService';

function EmployeeProject() {
    const [EmpProjectData, setEmpProjectData] = useState([]);
    const [status, setStatus] = useState("ACTIVE");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchProjectData(user?.userId);
    })
    const fetchProjectData = async (id) => {
        try {
            let res = await getListOfProjectByEmployeeId(id);
            setEmpProjectData(res.data);
        } catch (e) {
            console.log(e.message);

        }
    }
    const changeCurrStatus = async (productId, status) => {
        try {
            const res = await updateProjectStatus({ empId: user?.userId, projectId: productId, status: status });
            toast.success("✅ Status changed");
            fetchProjectData(user?.userId);
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <div className='container m-3'>
            <div className="row mb-4">
                <div className="col-md-3 mb-3">
                    <div className="card text-white shadow border-0" style={{ background: "#007bff" }}>
                        <div className="card-body text-center">
                            <FaUsers size={28} className="mb-2" />
                            <h6>Total Project</h6>
                            <h3 className="fw-bold">{EmpProjectData.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-white shadow border-0" style={{ background: "#28a745" }}>
                        <div className="card-body text-center">
                            <FaTasks size={28} className="mb-2" />
                            <h6>Active Projects</h6>
                            <h3 className="fw-bold">3</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-white shadow border-0" style={{ background: "#17a2b8" }}>
                        <div className="card-body text-center">
                            <FaCheckCircle size={28} className="mb-2" />
                            <h6>Completed</h6>
                            <h3 className="fw-bold">1</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-white shadow border-0" style={{ background: "#ffc107" }}>
                        <div className="card-body text-center">
                            <FaClock size={28} className="mb-2" />
                            <h6>Pending</h6>
                            <h3 className="fw-bold">2</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="px-3"
                style={{ height: "90vh" }}
            >
                <hr className="m-2" />
                <table className="table table-hover table-bordered m-2">
                    <thead className="table-secondary">
                        <tr>
                            <th>Project name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EmpProjectData.map((project) => (
                            <tr>
                                <td>{project.name}</td>
                                <td>{project.startDate}</td>
                                <td>{project.endDate}</td>
                                <td>
                                    {project.status == "COMPLETE" ?
                                        <td className='badge bg-success border-0'>{project.status}</td>
                                        :
                                        <td className='badge bg-danger border-0'>{project.status}</td>
                                    }
                                </td>
                                <td>
                                    {project.status == "COMPLETE" ?
                                        <button className='badge bg-success border-0'>Updated</button>
                                        :
                                        <button type="button" className='badge bg-warning border-0' data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
                                    }
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-secondary" id="exampleModalLabel">Project ID: </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3 modal-body">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-secondary">Project Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter your project name"
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label fw-bold text-secondary" onChange={(e)=>setStatus(e.target.value)}>
                                            Select Status
                                        </label>
                                        <select
                                            name="category"
                                            className="form-select"
                                        >
                                            <option value="ACTIVE">Active</option>
                                            <option value="PENDING">Pending</option>
                                            <option value="COMPLETE">Complete</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" >Update Status</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeProject
