import React, { useState, useEffect } from "react";
import Dashboard from "../dashboard/Dashboard";
import { getAttendance, getAttendanceByDate } from "../Service/EmployeeService";

function AttendanceReport() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0]; // default today
  });

  useEffect(() => {
    fetchRecords();
  }, [selectedDate]);

  const fetchRecords = () => {
    setLoading(true);
    setError(null);

    getAttendanceByDate(selectedDate)   // backend se date ke according fetch
      .then((res) => {
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching attendance records:", err);
        setError("Failed to load attendance records");
        setLoading(false);
      });
  };

  return (
    <Dashboard>
      <div className="container p-4" >
        <h2 className="mb-4 text-info">📊 Attendance Report</h2>

        <div className="mb-3">
          <label className="form-label fw-bold">Select Date:</label>
          <input
            type="date"
            className="form-control w-25"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {loading && <p>Loading attendance records...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
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
              {records.length > 0 ? (
                records.map((rec, index) => (
                  <tr key={index}>
                    <td>{rec.employee?.name || "N/A"}</td>
                    <td>{rec.employee?.department || "N/A"}</td>
                    <td>{new Date(rec.date).toLocaleDateString()}</td>
                    <td>
                      {rec.present ? (
                        <span className="badge bg-success">Present</span>
                      ) : (
                        <span className="badge bg-danger">Absent</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No attendance records found for {selectedDate}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Dashboard>
  );
}

export default AttendanceReport;
