import styles from "@/styles/SavedOutfits.module.css";
// import React, {useEffect} from 'react';
import Navbar from "@/comps/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";



const savedOutfits = () => {
    return (
        <>
        <Navbar/>
        <div className={styles.hero}>
        <div className={styles.column}>
            </div>
            <div className={styles.column}>
            
            </div>
            <div className={styles.column}>
            
            </div>
            <div className={styles.column}>
                
            </div>
        </div>
        </>
    )
}


export default savedOutfits;