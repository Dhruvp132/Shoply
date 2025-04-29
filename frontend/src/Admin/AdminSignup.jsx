import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
        <div className="login" style={{ background: "#fff", minHeight: "100vh" }}>
            <a href="/">
                <img
                    className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt="Amazon Logo"
                    style={{ width: 120, margin: "30px auto 20px", display: "block" }}
                />
            </a>
            <div className="login__container" style={containerStyle}>
                <h1 style={{ fontSize: 24, marginBottom: 20, textAlign: "center" }}>Admin Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <h5 style={{ marginBottom: 4 }}>E-mail</h5>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="Admin email"
                        style={inputStyle}
                    />

                    <h5 style={{ margin: "16px 0 4px" }}>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                        style={inputStyle}
                    />

                    <button type="submit" style={buttonStyle}>
                        Sign Up as Admin
                    </button>
                </form>
                <button onClick={() => history.push("/admin/login")} style={buttonStyle}>
                    Login as Admin
                </button>
                <p style={{ fontSize: 12, margin: "16px 0" }}>
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

const containerStyle = {
    width: 350,
    margin: "0 auto",
    padding: 24,
    border: "1px solid #ccc",
    borderRadius: 8,
    background: "#f3f3f3",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};
const inputStyle = {
    width: "100%",
    padding: 8,
    marginBottom: 4,
    border: "1px solid #a6a6a6",
    borderRadius: 4,
    fontSize: 16
};
const buttonStyle = {
    width: "100%",
    padding: 10,
    background: "#232f3e",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer"
};

export default AdminSignUp;