import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Navbar from "@/comps/Navbar";
import { BiCloset } from "react-icons/bi";
import { GiClothes } from "react-icons/gi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from "../firebase.config";
import { useState } from 'react'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const currentAuth = getAuth();

  const [userPresent, setUserPresent] = useState(false);

  onAuthStateChanged(currentAuth, (user) => {

    if(user) {

        const uid = user.uid;
        console.log(uid, 'has logged in');
        setUserPresent(true);

    }
    else {

        console.log('NO ONE IS LOGGED IN RIGHT NOW');

    }

})

  return (
    <>
      <Navbar/>
      <br></br>
      <h1 className={styles.title}>Welcome to ClosetBuddy!</h1>
      <br></br>
      <p className={styles.description}>Your on the go closet, where you can plan outfits and keep track of clothes, all in one place!</p>
      <br></br>
      <h2 className={styles.icon}><BiCloset /> <IoPhonePortraitOutline /> <GiClothes /> </h2>
      <h3 className={styles.description}>What Does Closet Buddy Offer?</h3>
      <br></br>
      <li className={styles.list}>Upload photos of the clothes you want to style</li>
      <li className={styles.list}>Automatically crop out outfits with our Generative AI Tool</li>
      <li className={styles.list}>Allows you to select different clothes to manually combine outfits</li>
      <li className={styles.list}>The ability to save your favorite outfit combos, Pinterest-style!</li>
      <br/>
      <br/>
      {!userPresent && (
        <h2 className={styles.description}>Please sign in first to use these features</h2>
      )}
    </>
  );
}
