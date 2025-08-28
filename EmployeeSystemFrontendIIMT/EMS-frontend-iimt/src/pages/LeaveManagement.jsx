import React, { useEffect, useState } from 'react'
import { approveOrReject, getEmployeeById, getLeaveRequestByStatus, listEmployees } from '../Service/EmployeeService';
import { toast } from 'react-toastify';

function LeaveManagement() {
    const [data, setData] = useState([]);
    const [depart, setDepart] = useState([]);
    useEffect(() => {
        fetchAllPendingRequest();
    }, [])

    const fetchAllPendingRequest = async () => {
        try {
            const res = await getLeaveRequestByStatus("Pending");
            setData(res.data);
        } catch (e) {
            console.log(e.message);
        }
    }

    const fetchDepartmentByEmpId = async (id) => {
        try {
            const res = await getEmployeeById(id);
            setDepart(res.data);
        } catch (e) {
            console.log(e.message);

        }
    }

    useEffect(() => {
        data.forEach(leavedata => {
            fetchDepartmentByEmpId(leavedata.employeeId);
        });
    }, [data]);

    const approveLeave = async (id, date, Status, name) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];

        const data = {
            empId: id,
            date: formattedDate,
            status: Status
        };

        try {
            let res = await approveOrReject(data);
            toast.success(`Leave ${Status} for ${name}`);
            fetchAllPendingRequest();
        } catch (e) {
            toast.error("Something went wrong");
            console.error("Error approving leave:", e.response?.data || e.message);
        }
    };

    return (
        <div className='container m-3'>
            <div className="row text-center">
                <div className="col-md-4 mb-3">
                    <div
                        className="p-4 rounded-3 shadow-sm bg-warning"
                       
                    >
                        <h3 className="fw-bold text-primary">3</h3>
                        <p className="text-light m-0">Leave Request</p>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div
                        className="p-4 rounded-3 shadow-sm bg-info"
                        
                    >
                        <h3 className="fw-bold text-success">3</h3>
                        <p className="text-light m-0">Leaves Taken</p>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div
                        className="p-4 rounded-3 shadow-sm bg-success"
                    >
                        <h3 className="fw-bold text-warning">95%</h3>
                        <p className="text-light m-0">Performance</p>
                    </div>
                </div>
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
                        {data.length > 0
                            ?
                            (data.map((leavedata) => (
                                <tr key={leavedata.id}>
                                    <td className='d-flex justify-content-between'>
                                        <span>{depart.name}</span>
                                        <span className='text-danger'>{leavedata.employeeId}</span>
                                    </td>
                                    <td >{depart.department}</td>
                                    <td>{leavedata.message}</td>
                                    <td>{leavedata.date}</td>
                                    <td className='text-danger'>{leavedata.status}</td>
                                    <td className='d-flex gap-3 '>
                                        <button className='badge bg-success border-0' onClick={() => approveLeave(leavedata.employeeId, leavedata.date, "Approved", depart.name)}>Approved</button>
                                        <button className='badge bg-danger border-0'>Reject</button>
                                    </td>

                                </tr>
                            )))
                            :
                            <tr>
                                <td colSpan="6" className="text-center text-mute">
                                    No leave requests yet
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeaveManagement
