import styles from "./page.module.css";
import React from "react";
import Navbar from "../../comps/Navbar";
import { BiCloset } from "react-icons/bi";
import { GiClothes } from "react-icons/gi";
import { IoPhonePortraitOutline } from "react-icons/io5";



export default function Home() {


  return (
    <>
      <Navbar />
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
    </>
  );
}