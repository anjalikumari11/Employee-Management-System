import React, { useEffect, useState } from 'react'
import { approveOrReject, getEmployeeById, getLeaveRequestByStatus } from '../Service/EmployeeService';
import { toast } from 'react-toastify';

function LeaveManagement() {
    const [data, setData] = useState([]);
    const [departments, setDepartments] = useState({});
    const [category, setCategory] = useState("Pending");

    useEffect(() => {
        fetchAllRequestByStatus(category);
    }, [category]);

    const fetchAllRequestByStatus = async (status) => {
        try {
            const res = await getLeaveRequestByStatus(status);
            setData(res.data);

            // fetch department for each employee
            res.data.forEach(leavedata => {
                fetchDepartmentByEmpId(leavedata.employeeId);
            });
        } catch (e) {
            console.log(e.message);
        }
    };

    const fetchDepartmentByEmpId = async (id) => {
        try {
            const res = await getEmployeeById(id);
            setDepartments((prev) => ({ ...prev, [id]: res.data }));
        } catch (e) {
            console.log(e.message);
        }
    };

    const approveLeave = async (id, date, Status, name) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];

        const data = {
            empId: id,
            date: formattedDate,
            status: Status
        };

        try {
            await approveOrReject(data);
            toast.success(`Leave ${Status} for ${name}`);
            fetchAllRequestByStatus(category);
        } catch (e) {
            toast.error("Something went wrong");
            console.error("Error approving leave:", e.response?.data || e.message);
        }
    };

    return (
        <div className='container m-3'>
            <div className="row text-center">
                <div className="col-md-4 mb-3">
                    <div className="d-flex gap-2 align-items-center p-2 rounded-3 shadow-sm bg-warning">
                        <h3 className="fw-bold text-muted">{data.length}</h3>
                        <p className="text-muted m-0">Leave Request</p>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="d-flex gap-2 align-items-center p-2 rounded-3 shadow-sm bg-info" >
                        <h3 className="fw-bold text-muted">3</h3>
                        <p className="text-muted m-0">Leaves Taken</p>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="d-flex gap-2 align-items-center p-2 rounded-3 shadow-sm bg-success">
                        <h3 className="fw-bold text-muted">95%</h3>
                        <p className="text-muted m-0">Performance</p>
                    </div>
                </div>
            </div>

            <div style={{ width: "300px" }}>
                <label className='text-muted'>Select Category: </label>
                <select
                    className='form-control mb-2'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            <div className='mt-5'>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((leavedata) => {
                                const empInfo = departments[leavedata.employeeId];
                                return (
                                    <tr key={leavedata.id}>
                                        <td>
                                            <span>{empInfo?.name || "Loading..."}</span>
                                            <span className='text-danger ms-2'>({leavedata.employeeId})</span>
                                        </td>
                                        <td>{empInfo?.department || "Loading..."}</td>
                                        <td>{leavedata.message}</td>
                                        <td>{leavedata.date}</td>
                                        {leavedata.status == "Rejected" ?
                                            <td className='text-danger'>{leavedata.status}</td>
                                            :
                                            (leavedata.status == 'Pending'
                                                ?
                                                <td className='text-warning'>{leavedata.status}</td>
                                                :
                                                <td className='text-success'>{leavedata.status}</td>
                                            )
                                        }
                                        <td className='d-flex gap-3 '>
                                            <button
                                                className='badge bg-success border-0'
                                                onClick={() => approveLeave(leavedata.employeeId, leavedata.date, "Approved", empInfo?.name)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className='badge bg-danger border-0'
                                                onClick={() => approveLeave(leavedata.employeeId, leavedata.date, "Rejected", empInfo?.name)}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-muted">
                                    No leave requests yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LeaveManagement;
