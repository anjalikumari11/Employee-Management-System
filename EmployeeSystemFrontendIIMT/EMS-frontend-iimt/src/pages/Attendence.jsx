import React, { useState, useEffect } from "react";
import Dashboard from "../dashboard/Dashboard";
import { listEmployees, markAttendance, getAttendance } from "../Service/EmployeeService";
import { ToastContainer, toast } from "react-toastify";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [markedRecords, setMarkedRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    listEmployees()
      .then((res) => {
        setEmployees(res.data);
        setAttendanceData(
          res.data.map((emp) => ({
            employeeId: emp.id,
            present: true,
          }))
        );
      })
      .catch((err) => console.error("Error fetching employees:", err));

    loadMarkedAttendance(selectedDate);
  }, [selectedDate]);
  
  const loadMarkedAttendance = (date) => {
    getAttendance()
      .then((res) => {
        const marked = res.data
          .filter((rec) => rec.date === date)
          .map((rec) => rec.employee.id);
        setMarkedRecords(marked);
      })
      .catch((err) => console.error("Error fetching attendance:", err));
  };

  const handleStatusChange = (id, present) => {
    setAttendanceData((prev) =>
      prev.map((emp) =>
        emp.employeeId === id ? { ...emp, present } : emp
      )
    );
  };

  const markBulkAttendance = async () => {
    let successCount = 0;
    let failCount = 0;

    for (const record of attendanceData) {
      if (markedRecords.includes(record.employeeId)) continue;

      try {
        await markAttendance({
          employee: { id: record.employeeId },
          date: selectedDate,
          present: record.present,
        });
        successCount++;
      } catch (err) {
        failCount++;
        console.error("Error marking attendance:", err);
      }
    }

    if (successCount > 0) {
      toast.success(`✅ Attendance marked for ${successCount} employees`);
      loadMarkedAttendance(selectedDate); 
    }
    if (failCount > 0) toast.error(`❌ Failed for ${failCount} employees`);
  };

  return (
    <Dashboard>
      <div className="container p-4">
        <h2 className="mb-4 text-primary">➡️Mark Attendance</h2>
        <div className="mb-3">
          <label className="form-label fw-bold">Select Date:</label>
          <input
            type="date"
            className="form-control w-25"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const alreadyMarked = markedRecords.includes(emp.id);

              return (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>
                    {alreadyMarked ? (
                      <span className="badge bg-success">Already Marked</span>
                    ) : (
                      <select
                        className="form-select"
                        value={
                          attendanceData.find((a) => a.employeeId === emp.id)?.present
                            ? "true"
                            : "false"
                        }
                        onChange={(e) =>
                          handleStatusChange(emp.id, e.target.value === "true")
                        }
                      >
                        <option value="true">Present</option>
                        <option value="false">Absent</option>
                      </select>
                    )}
                  </td>
                  <td>
                    {alreadyMarked ? (
                      <button className="btn btn-secondary btn-sm" disabled>
                        ✅ Marked
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          markAttendance({
                            employee: { id: emp.id },
                            date: selectedDate,
                            present:
                              attendanceData.find((a) => a.employeeId === emp.id)
                                ?.present ?? true,
                          })
                            .then(() => {
                              toast.success(`✅ Attendance marked for ${emp.name}`);
                              setMarkedRecords((prev) => [...prev, emp.id]);
                            })
                            .catch(() => {
                              toast.error(`❌ Failed for ${emp.name}`);
                            })
                        }
                      >
                        Mark
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          className="btn btn-success mt-3"
          onClick={markBulkAttendance}
          disabled={employees.length === 0}
        >
          ✅ Submit Attendance for All
        </button>

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Dashboard>
  );
}

export default Attendance;
