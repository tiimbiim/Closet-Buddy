import React, { useState } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "@/styles/auth.module.css";

function login() {

    const [login, setLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                setIsAuthenticated(true);
            }).catch(err => {
                alert(err.code)
            })
        }
        else {
            signInWithEmailAndPassword(auth, email, password).then(data=> {
                console.log(data, "authData");
                setIsAuthenticated(true);
            }).catch(err => {
                alert(err.code)
            })
        }

    }

    return(
        <div className={styles.App}>
            {!isAuthenticated && (
                <div className={styles.row}>
                    <div className={login === false ? styles.activeColor : styles.pointer} onClick={()=>setLogin(false)}>Sign Up</div>
                    <div className={login === true ? styles.activeColor : styles.pointer} onClick={()=>setLogin(true)}>Sign In</div>
                </div>
            )}
            {!isAuthenticated && (
                <h1 className={styles.header}>{login?'Sign In': 'Sign Up'}</h1>
            )}
            {!isAuthenticated ? (
                <form onSubmit={(e)=>handleSubmit(e, login?'signin':'signup')}>
                    <input name="email" placeholder="email" className={styles.inputArea}/> <br/>
                    <input name="password" type="password" placeholder="password" className={styles.inputArea}/> <br/>
                    <button className={styles.button}>{login?'Sign In': 'Sign Up'}</button>
                </form>
            ) : (
                <div>
                    <h3 className={styles.link}>Thank you for signing in! You can now start customizing your wardrobe!</h3>
                    <a href="/" className={styles.link}>Click to return to Home</a>
                </div>
            )}
        </div>

    );

}

export default login