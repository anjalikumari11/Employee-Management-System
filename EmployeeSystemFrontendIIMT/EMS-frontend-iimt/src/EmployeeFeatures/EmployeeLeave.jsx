import React, { useEffect, useState } from 'react'
import { getAllRequest, sendRequest } from '../Service/EmployeeService';
import { toast } from 'react-toastify';

function EmployeeLeave() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [leaveData, setLeaveData] = useState([]);
    const [status, setStatus] = useState("Pending")
    const user = JSON.parse(localStorage.getItem("user"));
    const handleLeaveReq = async (e) => {
        e.preventDefault();
        try {
            let res = await sendRequest(
                { employeeName: user?.name, category, message, status }
            );
            toast.success("✅ Request Sent")
            fetchEmployeeLeave();
        }
        catch (e) {
            console.log(e.message);
        } finally {
            setCategory("");
            setMessage("");
        }
    }
    useEffect(() => {
        fetchEmployeeLeave();
    }, [])

    const fetchEmployeeLeave = async () => {
        const res = await getAllRequest();
        setLeaveData(res.data);

    }
    console.log(leaveData);


    return (
        <>
            <div className="d-flex justify-content-around gap-3 p-3 rounded shadow-sm"
                style={{ minHeight: "100vh" }}>
                <div className="mt-3 mx-4" style={{ width: "360px" }}>
                    <h3 className="">📝 Apply for Leave</h3>
                    <form
                        className="p-4 border rounded shadow-sm"
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
                                <option value="0">Sick Leave</option>
                                <option value="1">Casual Leave</option>
                                <option value="2">Earned Leave</option>
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
                    className="bg-dark p-3 rounded shadow-sm"
                    style={{ maxHeight: "85vh" }}
                >
                    <h5 className="text-light mb-3">📋 Leave Requests</h5>
                    <table className="table table-hover table-bordered table-dark">
                        <thead className="table-secondary text-dark">
                            <tr>
                                <th>Employee</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveData.length > 0 ?
                                (leaveData.map((data) => (
                                    <tr>
                                        <td className="text-center text-light">{data.employeeName}</td>
                                        <td className="text-center text-light">{data.category}</td>
                                        <td className="text-center text-light">{data.message}</td>
                                        <td className="text-center text-light">{data.status}</td>
                                    </tr>
                                )))
                                :
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">
                                        No leave requests yet
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default EmployeeLeave
