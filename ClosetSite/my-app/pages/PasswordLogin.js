import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { auth, firebaseObserver } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";

function PasswordLogin() {

    const [login, setLogin] = useState(false);

    const currentAuth = getAuth();

    onAuthStateChanged(currentAuth, (user) => {

        if(user) {

            const uid = user.uid;
            console.log(uid, 'has logged in');

        }
        else {

            console.log('NO ONE IS LOGGED IN RIGHT NOW');

        }

    })

    const handleSubmit = (e, type) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.email.value;

        if(type == 'signup') {

            createUserWithEmailAndPassword(auth, email, password).then(data=> {
                console.log(data, "authData");
            }).catch(err => {
                alert(err.code)
                setLogin(true);
            })
        }
        else {
            signInWithEmailAndPassword(auth, email, password).then(data=> {
                console.log(data, "authData");
            }).catch(err => {
                alert(err.code)
            })
        }

    }

    return(
        <div>
            <div className = "row">
                <div onClick={()=>setLogin(false)}>Sign Up</div>
                <div onClick={()=>setLogin(true)}>Sign In</div>
            </div>

            <h1>{login?'Sign In': 'Sign Up'}</h1>
            <form onSubmit={(e)=>handleSubmit(e, login?'signin':'signup')}>
                <input name="email" placeholder="email"/> <br/>
                <input name="password" type="password" placeholder="password"/> <br/>
                <button>{login?'Sign In': 'Sign Up'}</button>
            </form>
        </div>

    );

}

export default PasswordLogin