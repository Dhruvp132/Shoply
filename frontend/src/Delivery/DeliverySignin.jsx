import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const API_BASE = "http://localhost:5001/";

const SignIn = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch(`${API_BASE}delivery/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem("deliveryToken", data.token);
                history.replace("/delivery/dashboard");
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
        <div style={styles.page}>
            <a href="/">
                <img
                    style={styles.logo}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt="Amazon Logo"
                />
            </a>
            <div style={styles.container}>
                <h1 style={styles.heading}>Delivery User Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <h5 style={styles.label}>E-mail</h5>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <h5 style={styles.label}>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.signInButton}>Sign In</button>
                </form>
                <p style={styles.info}>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                {/* You can add a register button here if needed */}
                {message && (
                    <div style={{ ...styles.message, color: message.includes("success") ? "green" : "red" }}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    page: {
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 40,
    },
    logo: {
        width: 120,
        marginBottom: 20,
        objectFit: "contain",
    },
    container: {
        width: 350,
        minHeight: 350,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 24,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    heading: {
        fontWeight: 500,
        marginBottom: 20,
        fontSize: 24,
        textAlign: "left",
    },
    label: {
        margin: "10px 0 4px 0",
        fontWeight: 500,
        fontSize: 15,
    },
    input: {
        width: "100%",
        padding: 10,
        marginBottom: 10,
        border: "1px solid #a6a6a6",
        borderRadius: 4,
        fontSize: 16,
    },
    signInButton: {
        width: "100%",
        padding: 10,
        background: "#f0c14b",
        border: "1px solid #a88734",
        borderRadius: 4,
        color: "#111",
        fontWeight: 700,
        marginTop: 10,
        cursor: "pointer",
    },
    info: {
        fontSize: 12,
        color: "#555",
        margin: "18px 0 0 0",
        lineHeight: 1.5,
    },
    message: {
        marginTop: 16,
        textAlign: "center",
        fontWeight: 500,
    },
};

export default SignIn;