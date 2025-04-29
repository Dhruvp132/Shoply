import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// You can import a CSS file for styling similar to Signup.js
import "../Login.css";

const API_BASE = "http://localhost:5001/";

const AdminSignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch(`${API_BASE}admin/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.status === 200) {
                history.replace('/admin/login');
                setMessage(data.msg);
            } else {
                setMessage(data.msg || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            setMessage("Network error");
        }
    };

    return (
        <div className='login'>
            <a href='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    alt="Amazon Logo"
                />
            </a>
            <div className='login__container'>
                <h1>Admin Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <h5>E-mail</h5>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="Admin email"
                    />

                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />

                    <button type="submit" className='login__registerButton'>
                        Sign Up as Admin
                    </button>
                </form>
                <p>
                    By creating an admin account you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.
                </p>
                {message && (
                    <div style={{ marginTop: 16, color: message.includes("success") ? "green" : "red", textAlign: "center" }}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSignUp;