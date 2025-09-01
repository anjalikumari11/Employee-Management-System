import React, { useEffect, useState } from "react";
import { addSalary, getSalaryList } from "../Service/EmployeeService";
import { toast } from "react-toastify";

function SalaryManagement() {
    const [empId, setEmpId] = useState("");
    const [baseSalary, setBaseSalary] = useState("");
    const [allowance, setAllowance] = useState("");
    const [bonus, setBonus] = useState("");
    const [pf] = useState(1500);
    const [tax, setTax] = useState("");
    const [date, setDate] = useState("");
    const [salaryDetail, setSalaryDetail] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            user: empId,
            basicSalary: Number(baseSalary),
            allowances: Number(allowance),
            bonus: Number(bonus),
            effectiveDate: date,
            pfDeduction: pf,
            taxDeduction: Number(tax)
        };

        try {
            let res = await addSalary(data);
            toast.success("Salary added successfully!");
            console.log("Response:", res);
            clearData();
            fetchSalaryList();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add salary");
        }
    };

    const clearData = () => {
        setAllowance("");
        setBaseSalary("");
        setBonus("");
        setDate("");
        setEmpId("");
        setTax("");

    }

    useEffect(() => {
        fetchSalaryList();
    }, [])
    // console.log(salaryDetail);


    const fetchSalaryList = async () => {
        try {
            let res = await getSalaryList();
            setSalaryDetail(res.data);
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className="container my-3">
            <h2 className="mb-3">🪙 Employee Salary</h2>

            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="p-3 rounded shadow-sm bg-white">
                        <div className="fw-semibold small text-muted">Employees</div>
                        <div className="h4 m-0">24</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 rounded shadow-sm bg-white">
                        <div className="fw-semibold small text-muted">Total Payout</div>
                        <div className="h4 m-0">₹ 3,40,000</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 rounded shadow-sm bg-white">
                        <div className="fw-semibold small text-muted">This Month</div>
                        <div className="h4 m-0">September</div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="p-3 rounded shadow-sm bg-white">
                        <div className="fw-semibold small text-muted">Pending</div>
                        <div className="h4 m-0">₹ 25,000</div>
                    </div>
                </div>
            </div>

            <div className="p-4 shadow rounded bg-light">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label">Employee Id</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Employee ID"
                                onChange={(e) => setEmpId(e.target.value)}
                                value={empId}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Base Salary</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Basic Salary"
                                onChange={(e) => setBaseSalary(e.target.value)}
                                value={baseSalary}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Allowances</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Allowances"
                                onChange={(e) => setAllowance(e.target.value)}
                                value={allowance}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Bonus</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Bonus"
                                onChange={(e) => setBonus(e.target.value)}
                                value={bonus}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">PF Deduction</label>
                            <input type="text" className="form-control" value={pf} readOnly />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Tax Deduction</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Tax"
                                onChange={(e) => setTax(e.target.value)}
                                value={tax}
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-3 d-flex align-items-end">
                            <button type="submit" className="btn btn-success w-100">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="table-responsive border mt-4">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Base Salary</th>
                            <th>Allowance</th>
                            <th>Bonus</th>
                            <th>Taxes</th>
                            <th>Pf Deduction</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaryDetail.map((salary, index) => (
                            <tr key={index}>
                                <td>{salary.user}</td>
                                <td>{salary.basicSalary}</td>
                                <td>{salary.allowances}</td>
                                <td>{salary.bonus}</td>
                                <td>{salary.effectiveDate}</td>
                                <td>{salary.pfDeduction}</td>
                                <td>{salary.taxDeduction}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalaryManagement;
