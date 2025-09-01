import React, { useEffect, useState } from 'react'
import { addEmployee, getEmployeeById, updateEmployee } from '../Service/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

function AddEmployee() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleAddEmployee = (e) => {
        e.preventDefault();
        setLoading(true);
        addEmployee({
            name, email, phone, department
        }).then((response) => {
            setLoading(false);
            navigate("/")
        })
    }

    const handleUpdateEmployee = (e) => {
        e.preventDefault();
        setLoading(true);
        updateEmployee(id, {
            name, email, phone, department
        }).then((response) => {
            setLoading(false);
            navigate("/EmployeeList")
        })
    }

    const getById = () => {
        getEmployeeById(id).then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setDepart(res.data.department);

        })
    }

    useEffect(() => {
        getById();
    }, [id])

    const handleClear = (e) => {
        e.preventDefault();
        setName("");
        setEmail("");
        setPhone("");
        setDepartment("");
    }

    return (
        <Dashboard>
            <div className='d-flex justify-content-center align-items-center ' style={{ height: "90vh" }}>
                <form className='p-3 border' style={{ borderRadius: "10px", width: "400px" }} >
                    <h2 className='text-center text-primary'>{id ? "Update Employee" : "Add Employee"}</h2>
                    <div class="mb-3">
                        <label for="username" class="form-label text-secondary">Employee Username</label>
                        <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label text-secondary">Employee Email</label>
                        <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label text-secondary">Phone</label>
                        <input type="text" class="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="department" class="form-label text-secondary">Department</label>
                        <input type="text" class="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} />
                    </div>
                    <div className='d-flex gap-2'>
                        <button type="submit" class="btn btn-warning px-4" onClick={handleClear}>{loading ? "Loading ..." : "Clear"}</button>
                        <button type="submit" class="btn btn-secondary px-4" onClick={() => navigate(-1)}>{loading ? "Loading ..." : "Back"}</button>
                        {id ?
                            <button type="submit" class="btn btn-primary px-4" onClick={handleUpdateEmployee}>{loading ? "Loading ..." : "Update"}</button>
                            :

                            <button type="submit" class="btn btn-primary px-4" onClick={handleAddEmployee}>{loading ? "Loading ..." : "Submit"}</button>
                        }
                    </div>

                </form>
            </div>
        </Dashboard>
    )
}

export default AddEmployee
