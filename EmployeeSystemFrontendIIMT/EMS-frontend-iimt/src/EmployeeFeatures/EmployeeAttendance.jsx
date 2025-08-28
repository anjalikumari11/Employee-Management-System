import { useEffect, useState } from "react";
import { getAttendaceById, markAttendance } from "../Service/EmployeeService";

function EmployeeAttendance() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [employeAttendance, setEmployeeAttendance] = useState([]);
  const [isalreadymark, setIsalreadymark] = useState(false);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const today = new Date();
    const localDate = today.toLocaleDateString("en-CA");
    setDate(localDate);
  }, []);
  console.log(date);


  const handleAttendance = async (e) => {
    e.preventDefault();
    const attendanceData = {
      date: date,
      present: status === "true",
      employee: {
        id: user.userId,
      },
    };

    try {
      const res = await markAttendance(attendanceData);
      alert("✅ Attendance Marked Successfully!");
      setIsalreadymark(true);
      setDate(new Date().toISOString().split("T")[0]);
      setStatus("");
    } catch (err) {
      console.error("Attendance Error:", err);
      alert("❌ Failed to mark attendance!");
    }

    fetchAttendance(user.userId);
  };
  useEffect(() => {
    fetchAttendance(user.userId)
  }, [user.userId])

  const fetchAttendance = (id) => {
    getAttendaceById(id).then((res) => {
      setEmployeeAttendance(res.data);
    })
  }

  return (
    <div
      className="p-3"
      style={{ height: "90vh" }}
    >
      <h3>✅ Mark your Attendance for today</h3>

      <form className="my-4 p-2" onSubmit={handleAttendance}>
        <label className="form-label fw-bold">Select Date:</label>
        <div className="d-flex gap-4 flex-wrap">
          <input
            type="date"
            className="form-control w-25"
            value={date}
            readOnly

          />

          <input
            type="text"
            className="form-control w-25"
            value={user?.name || ""}
            readOnly
          />

          <select
            className="form-control w-25"
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
      <hr className="m-2" />
      <table className="table table-hover table-bordered m-2">
        <thead className="table-secondary">
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employeAttendance.map((att) => (
            <tr key={att.id}>
              <td>{att.employee.name}</td>
              <td>{att.employee.department}</td>
              <td>{att.date}</td>
              <td>
                {att.present ? (
                  <span className="badge bg-success">Present</span>
                ) : (
                  <span className="badge bg-danger">Absent</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeAttendance;