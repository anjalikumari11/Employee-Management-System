import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { adminLogin } from '../Service/EmployeeService';  // your API call
import loginImg from '/EmsLogin.jpg';
import "./login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await adminLogin({ email, password });
            console.log("Login Response:", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/")
        } catch (error) {
            console.error("Login Failed:", error);
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center">
            <div className="login-box d-flex">
                {/* Left: Login Form */}
                <div className="login-form p-4">
                    <div className="card text-white bg-transparent border-0 shadow-none" style={{ width: '22rem' }}>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <h2 className="text-center mb-4">Login</h2>

                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control bg-secondary text-white"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control bg-secondary text-white"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <div className="checkbox mb-3 text-white">
                                    <label className='d-flex justify-content-between'>
                                        <p>
                                            <input type="checkbox" value="remember-me" /> Remember me
                                        </p>
                                        <p>
                                            New User? <NavLink to={'/register'}>Register</NavLink>
                                        </p>
                                    </label>
                                </div>

                                {/* Login Button */}
                                <button
                                    className="w-100 btn btn-lg btn-primary"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="login-image d-none d-md-block" style={{
                    backgroundImage:`url('${loginImg}')`,
                    backgroundPosition:"center",
                    backgroundSize:"cover"
                }}>
                    {/* <img src={} style={{
                        objectFit:"cover",
                    }} alt="Cute" height={500} /> */}
                </div>
            </div>
        </div>
    )
}

export default Login;
