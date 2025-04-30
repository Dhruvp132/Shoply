import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./firebase";
import { useStateValue } from './StateProvider';

function Signup() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [, dispatch] = useStateValue();
    
        useEffect(() => {
            dispatch({
                type: 'EMPTY_BASKET'
            });
        }, [dispatch]);

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    db.collection("users").doc(user.uid).set({
                        uid: user.uid,
                        email: user.email,
                        name: name,
                        phone: phone,
                        createdAt: new Date(),
                    })
                    .then(() => {
                        alert("Account created successfully, Now Please login");
                        history.push('/login');
                    })
                    .catch(error => alert(error.message));
                }
            })
            .catch(error => alert(error.message));
    };

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src="https://th.bing.com/th/id/R.e116e7eba13c7ad3264bcaab92438d14?rik=1bDK3EYRoEiRpw&riu=http%3a%2f%2fclipart-library.com%2fimg%2f862842.png&ehk=C3gXt%2bhb1XM7MhLuicguu8c%2f50hiuWn05ARKueOBp60%3d&risl=&pid=ImgRaw&r=0"
                    alt="Amazon Logo"
                />
            </Link>

            <div className='login__container'>
                <h1>Create Account</h1>

                <form>
                    <h5>Your name</h5>
                    <input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder=""
                        required
                    />

                    <h5>Mobile number</h5>
                    <input
                        type='tel'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder=""
                        required
                    />

                    <h5>E-mail</h5>
                    <input
                        type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                <h5>Address</h5>
                    <input
                        type='text'
                        onChange
                        required
                    />

                    <h5>Password</h5>
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <button type='submit' onClick={register} className='login__registerButton'>
                        Create your Amazon Account
                    </button>
                </form>

                <p>
                    By creating an account you agree to the SHOPLY Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <Link to="/login">
                    <button className='login__signInButton'>Already have an account? Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default Signup;