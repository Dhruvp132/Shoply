import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./firebase"; // Firestore imported from firebase.js
import { useStateValue } from './StateProvider';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, dispatch] = useStateValue();

    useEffect(() => {
        dispatch({
            type: 'EMPTY_BASKET'
        });
    }, [dispatch]);

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/');
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
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the SHOPLY Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={() => {history.push("/signup")}} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    );
}

export default Login;
