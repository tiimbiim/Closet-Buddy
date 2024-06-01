'use client'
import styles from "@/app/scrollStyle/scrollStyle.module.css";
import React, {useEffect, useState} from 'react';
import Navbar from "../../../comps/Navbar";
import { imageDB } from "../../../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDownloadURL, ref, uploadString, listAll } from 'firebase/storage';
import ImageCarouselSS from "../../../comps/ImageCarouselSS";


const scrollStyle = () => {

    const currentAuth = getAuth();

    //const [img, setImg] = useState('');
     const [imgURL, setImgURL] = useState([]);
     const [user, setUser] = useState([]);
     const [imagesUploaded, hasImages] = useState(true);
 
     useEffect(() => {
         const unsubscribe = onAuthStateChanged(currentAuth, (user) => {
             if(user) {
                 setUser(user);
                 const uid = user.uid;
                 listAll(ref(imageDB, `user/${uid}/`)).then (imgs => {
 
                     if(imgs.items.length === 0) { 
                         console.log("user has no images uploaded");
                         hasImages(false); 
                     }
 
                     console.log(imgs);
                     imgs.items.forEach((val) => {
                         getDownloadURL(val).then((url) => {
 
                             setImgURL((data) => [...data, url]);
 
                         });
                     });
 
                 })
                 .catch((error) => {
                     alert(error.code);
                 });
 
             }
 
         });
 
         return() => unsubscribe();
         
     }, [currentAuth]);
 
     const saveOutfit = async () => {
         const uid = user.uid;
         try {
             const outfitRef = ref(imageDB, `users/${uid}/${v4()}.json`);
             await uploadString(outfitRef, JSON.stringify(imgURL), 'raw');
             console.log("Outfit saved successfully!");
         }
         catch (error) {
 
             console.error("Error saving outfit: ", error);
 
         }
     };

    return ( 

        <>
            <Navbar/>
            {!imagesUploaded && (
                <div className={styles.banner}>
                    <h2 className={styles.bannerText}>Your wardrobe is empty!</h2>
                    <a className={styles.bannerLink} href="/ai_page"> Upload</a>
                    <h2 className={styles.bannerText}> your clothes to get started</h2>
                </div>
            )}
            <div className={styles.hero}>
                <div className={styles.slideColumn}>
                    <ImageCarouselSS />
                    <ImageCarouselSS />
                    <ImageCarouselSS />
                    <button className={styles.button} onClick={saveOutfit}>Save Outfit</button>
                </div>
            </div>
        </>

     );
}
 
export default scrollStyle;