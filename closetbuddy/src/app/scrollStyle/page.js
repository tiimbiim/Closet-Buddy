'use client'
import styles from "@/app/scrollStyle/scrollStyle.module.css";
import React, {useEffect, useState, useRef } from 'react';
import Navbar from "../../../comps/Navbar";
import { imageDB, clothesDB } from "../../../firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDownloadURL, ref, uploadString, listAll } from 'firebase/storage';
import ImageCarouselSS from "../../../comps/ImageCarouselSS";
import { v4 } from 'uuid'
import { collection, addDoc } from "firebase/firestore";


const scrollStyle = () => {

    const currentAuth = getAuth();

    //const [img, setImg] = useState('');
     const [imgURL, setImgURL] = useState([]);
     const [user, setUser] = useState([]);
     const [imagesUploaded, hasImages] = useState(true);
     const [currentSlide, setCurrentSlide] = useState(0);

     const carouselRefs = [useRef(null), useRef(null), useRef(null)];
 
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
 

    const  handleSlideChange = (index) => {

        setCurrentSlide(index);

    }

     const saveOutfit = async () => {
        const uid = user.uid;
        const outfitImages = [];
    
        // Iterate over all carouselRefs
        for (let i = 0; i < carouselRefs.length; i++) {
            const carouselRef = carouselRefs[i].current;
    
            if (carouselRef) {
                // Retrieve the src of the currently displayed image from each carousel
                const imgElement = carouselRef.querySelector('.slick-active img');
                const currentImgSrc = imgElement ? imgElement.src : null;
                
                // Add the src to the outfitImages array
                outfitImages.push(currentImgSrc);
            } else {
                console.error("Carousel ref is undefined for index:", i);
            }
        }
    
        console.log("Outfit Images:", outfitImages);
    
        try {
            const outfitRef = collection(clothesDB, `savedOutfits/${uid}/outfits`);
            const docRef = await addDoc(outfitRef, {
                images: outfitImages // Save the array of image srcs
            });
    
            console.log("Outfit saved successfully with ID:", docRef.id);
        } catch (error) {
            console.error("Error saving outfit:", error);
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
                    <ImageCarouselSS ref={carouselRefs[0]} imgURLs={imgURL} onSlideChange={() => handleSlideChange(0)} />
                    <ImageCarouselSS ref={carouselRefs[1]} imgURLs={imgURL} onSlideChange={() => handleSlideChange(1)} />
                    <ImageCarouselSS ref={carouselRefs[2]} imgURLs={imgURL} onSlideChange={() => handleSlideChange(2)} />
                    <br />
                    <br />
                    <button className={styles.button} onClick={saveOutfit}>Save Outfit</button>
                </div>
            </div>
        </>

     );
}
 
export default scrollStyle;