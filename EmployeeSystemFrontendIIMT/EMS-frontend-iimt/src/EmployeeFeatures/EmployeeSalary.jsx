import React, { useEffect, useState } from "react";
import { getSalaryByEmpId } from "../Service/EmployeeService";

function EmployeeSalary() {
  const [salaryData, setSalaryData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchSalary(user?.userId);
  }, [user?.userId]);

  const fetchSalary = async (id) => {
    try {
      let res = await getSalaryByEmpId(id);
      setSalaryData(res.data || []);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">💰 My Salary Details</h2>

      <div className="table-responsive card p-3 shadow-sm">
        {salaryData.length === 0 ? (
          <p className="text-muted">No salary records found.</p>
        ) : (
          salaryData.map((salary, index) => (
            <>
            <h5 className="mb-2 text-secondary">Month: {index+1} || Date: {salary.effectiveDate}</h5>
            <table key={index} className="table table-striped mb-4">
              <tbody>

                <tr>
                  <th>Basic Salary</th>
                  <td>₹{salary.basicSalary}</td>
                </tr>
                <tr>
                  <th>Allowances</th>
                  <td>₹{salary.allowances}</td>
                </tr>
                <tr>
                  <th>Bonus</th>
                  <td>₹{salary.bonus}</td>
                </tr>
                <tr>
                  <th>PF Deduction</th>
                  <td>- ₹{salary.pfDeduction}</td>
                </tr>
                <tr>
                  <th>Tax Deduction</th>
                  <td>- ₹{salary.taxDeduction}</td>
                </tr>
                <tr className="table-success">
                  <th>Net Salary</th>
                  <td>
                    ₹
                    {salary.basicSalary +
                      salary.allowances +
                      salary.bonus -
                      salary.pfDeduction -
                      salary.taxDeduction}
                  </td>
                </tr>
                <tr>
                  <th>Effective Date</th>
                  <td>{salary.effectiveDate}</td>
                </tr>
              </tbody>
            </table>
            </>
          ))
        )}
      </div>
    </div>
  );
}

export default EmployeeSalary;
