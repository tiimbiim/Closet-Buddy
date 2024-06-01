'use client'
import React, {useState, useEffect} from 'react'
import { auth } from '../firebase.config'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "@/app/page.module.css"
import { useRouter } from "next/navigation"


export default function SignInOutButton() {

    const [userPresent, setUserPresent] = useState(false);

    const currentAuth = getAuth();
    const router = useRouter();

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

    }, [currentAuth]);

    const handleSignOut = () => {

        signOut(auth).then(val => {
            console.log(val, 'has logged out');
            setUserPresent(false);
            router.push("/")
            
        })

    }

  return (
    <div>
        {!userPresent ? (
            <a href='loginPage' className={styles.signinText}>
                <button>Sign In</button>
                </a>
        ) : (
            
            <a onClick={handleSignOut} className={styles.signinText}>
                <button>Sign Out</button>
                </a>
        )}
    </div>
  )
}
