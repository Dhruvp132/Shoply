import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../Login.css"; // Reuse the same CSS as Signup for consistency

const API_BASE = "http://localhost:5001/";

const DeliverySignup = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch(`${API_BASE}delivery/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name, phone }),
            });
            const data = await res.json();
            if (res.status === 200) {
                setMessage(data.msg);
                setTimeout(() => history.replace("/delivery/login"), 1000);
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
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://th.bing.com/th/id/R.e116e7eba13c7ad3264bcaab92438d14?rik=1bDK3EYRoEiRpw&riu=http%3a%2f%2fclipart-library.com%2fimg%2f862842.png&ehk=C3gXt%2bhb1XM7MhLuicguu8c%2f50hiuWn05ARKueOBp60%3d&risl=&pid=ImgRaw&r=0

'
                    alt="Amazon Logo"
                    style={{ width: 25, margin: "30px auto 20px", display: "block" }}
                />
            </Link>

            <div className='login__container'>
                <h1>Delivery User Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <h5>Your name</h5>
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="First and last name"
                        required
                    />

                    <h5>Mobile number</h5>
                    <input
                        type='tel'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Mobile number"
                        required
                    />

                    <h5>E-mail</h5>
                    <input
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <h5>Password</h5>
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <button type='submit' className='login__registerButton'>
                        Create your Delivery Account
                    </button>
                </form>
                {message && (
                    <div style={{ marginTop: 16, textAlign: "center", color: message.includes("success") ? "green" : "red" }}>
                        {message}
                    </div>
                )}
                <p>
                    By creating an account you agree to the SHOPLY Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <Link to="/delivery/login">
                    <button className='login__signInButton'>Already have an account? Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default DeliverySignup;