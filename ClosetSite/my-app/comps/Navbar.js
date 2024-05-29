import styles from "@/styles/Home.module.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from '../firebase.config'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";


const Navbar = () => {

    const [userPresent, setUserPresent] = useState(false);

    const currentAuth = getAuth();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(currentAuth, (user) => {

            if(user) {
                const uid = user.uid;
                console.log(uid, 'has logged in');
                setUserPresent(true);
            }
            else {
                console.log('NO ONE IS LOGGED IN RIGHT NOW');
            }

        });

        return() => unsubscribe();

    }, [auth]);

    const handleSignOut = () => {

        signOut(auth).then(val => {
            console.log(val, 'has logged out');
            setUserPresent(false);
        })

    }

    return (
        <div>
            <h1 className={styles.header}>CLOSETBUDDY</h1>
            <div className={styles.signin}>
                {!userPresent ? (
                    <a href='/login' className={styles.signinText}>Sign In</a>
                ) : (
                    
                    <a href='/' onClick={handleSignOut} className={styles.signinText}>Sign Out</a>
                )}
            </div>
            <div className={styles.btnbox}>
                <a href='/'>
                    <button>Home</button>
                </a>
                <a href='wardrobe'>
                    <button>Wardrobe</button>
                </a>
                <a href='scrollStyle'>
                    <button>Scroll n' Style</button>
                </a>
                <a href='saved_outfits'>
                    <button>Saved Outfits</button>
                </a>
                <a href='ai_page'>
                    <button><i class='fa fa-star'></i> Save with AI</button>
                </a>
            </div>
        </div>
    );
}

export default Navbar;