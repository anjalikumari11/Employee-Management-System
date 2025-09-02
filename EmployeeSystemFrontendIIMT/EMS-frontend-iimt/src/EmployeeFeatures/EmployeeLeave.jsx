import React, { useEffect, useState } from 'react'
import { getAllRequest, getAllRequestById, sendRequest } from '../Service/EmployeeService';
import { toast } from 'react-toastify';
import "./EmployeeFeature.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

function EmployeeLeave() {
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [leaveData, setLeaveData] = useState([]);
    const [status, setStatus] = useState("Pending");

    const user = JSON.parse(localStorage.getItem("user"));
    const handleLeaveReq = async (e) => {
        e.preventDefault();
        const today = new Date();
        const localDate = today.toLocaleDateString("en-CA");
        try {
            let res = await sendRequest(
                { employeeId: user?.userId, date: localDate, category, message, status }
            );
            toast.success("✅ Request Sent")
            fetchEmployeeLeaveById(user?.userId);
        }
        catch (e) {
            console.log(e.message);
        } finally {
            setCategory("");
            setMessage("");
        }
    }

    useEffect(() => {
        fetchEmployeeLeaveById(user?.userId);
    }, [user?.userId])

    const fetchEmployeeLeaveById = async (id) => {
        const res = await getAllRequestById(id);
        setLeaveData(res.data);
    }
    console.log(leaveData);


    return (
        <>
            <div className="leaveManagement d-flex justify-content-around gap-3 rounded shadow-sm"
                style={{ minHeight: "100vh" }}>
                <div className="mt-2" style={{ width: "360px" }}>
                    <h3 className=""> <FontAwesomeIcon icon={faLeaf} color='orange' /> Apply for Leave</h3>
                    <form
                        className="p-4 border rounded shadow-sm "
                        style={{ backgroundColor: "#454849", color: "white" }}
                        onSubmit={handleLeaveReq}
                    >
                        <div className="mb-3">
                            <label className="form-label fw-bold text-light">Name:</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter your name"
                                value={user?.name}
                                readOnly
                                disabled
                            />
                        </div>


                        <div className="mb-3">
                            <label className="form-label fw-bold text-light">
                                Select Leave Category:
                            </label>
                            <select
                                name="category"
                                className="form-select"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="">-- Select --</option>
                                <option value="Sick leave">Sick Leave</option>
                                <option value="Casual leave">Casual Leave</option>
                                <option value="Earned leave">Earned Leave</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold text-light">Message:</label>
                            <textarea
                                name="message"
                                rows="3"
                                className="form-control"
                                placeholder="Enter your message"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}

                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Submit Leave Request
                        </button>
                    </form>
                </div>


                <div
                    className="bg-dark p-3 rounded shadow-sm mt-3"
                    style={{ maxHeight: "85vh" }}
                >
                    <div className='d-flex justify-content-between'>
                        <h5 className="text-light mb-3">📋 Leave Requests</h5>
                        <h5 className='text-info mb-3'>Department: {user?.department}</h5>
                    </div>
                    <div className='table-responsive'>
                        <table className="table table-hover table-bordered table-dark">
                            <thead className="table-secondary text-dark">
                                <tr>
                                    <th>Message</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveData.length > 0 ?
                                    (leaveData.map((data) => (
                                        <tr>
                                            <td className="text-center text-light">{data.message}</td>
                                            <td className="text-center text-light">{data.category}</td>
                                            <td className="text-center text-light">{data.date}</td>
                                            {
                                                data.status == "Pending"
                                                    ?
                                                    <td className="text-center text-light"><button className='badge bg-warning border-0'>{data.status}</button></td>
                                                    :
                                                    (data.status == "Approved"
                                                        ?
                                                        <td className="text-center text-light"><button className='badge bg-success border-0'>{data.status}</button></td>
                                                        :
                                                        <td className="text-center text-light "><button className='badge bg-danger border-0'>{data.status}</button></td>
                                                    )
                                            }
                                        </tr>
                                    )))
                                    :
                                    <tr>
                                        <td colSpan="4" className="text-center text-light">
                                            No leave requests yet
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeLeave
