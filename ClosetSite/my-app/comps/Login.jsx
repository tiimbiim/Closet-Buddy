import React, { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                console.log(userCredential.user.uid);
            })
            .catch((error) => {
                console.log(error);
            })


    };

    return ( 

        <div>
            <form onSubmit={logIn}>
                <h1>Log In</h1>
                <input type="email" placeholder="Please enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type="password" placeholder="Please enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button type='submit'>Log In</button>
            </form>
        </div>

     );
}
 
export default Login;