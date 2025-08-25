import { useState } from "react";
import { markAttendance } from "../Service/EmployeeService";

function EmployeeAttendance() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const handleAttendance = async (e) => {
    e.preventDefault();

    const attendanceData = {
      date: date,
      present: status === "true", // string → boolean
      employee: {
        id: user.id,
      },
    };

    try {
      const res = await markAttendance(attendanceData);
      alert("✅ Attendance Marked Successfully!");
      console.log("Saved Attendance:", res.data);
      
      setDate("");
      setStatus("");

    } catch (err) {
      console.error("Attendance Error:", err);
      alert("❌ Failed to mark attendance!");
    }
  };

  return (
    <div
      className="text-light p-3"
      style={{ backgroundColor: "black", height: "90vh" }}
    >
      <h3 className="text-light">✅ Mark your Attendance for today</h3>

      <form className="my-4" onSubmit={handleAttendance}>
        <label className="form-label text-light fw-bold">Select Date:</label>
        <div className="d-flex gap-4 flex-wrap">
          <input
            type="date"
            className="form-control w-25"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          
          <input
            type="text"
            className="form-control w-25"
            value={user?.name || ""}
            readOnly
          />

          <select
            className="form-control w-25"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="true">Present</option>
            <option value="false">Absent</option>
          </select>

          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </div>
      </form>
      <hr />

      <table className="table table-hover table-bordered">
            <thead className="table-secondary">
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>
    </div>
  );
}

export default EmployeeAttendance;
