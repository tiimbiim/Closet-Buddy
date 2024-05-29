import styles from "@/styles/scrollStyle.module.css";
import React, {useEffect, useState} from 'react';
import Navbar from "@/comps/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { imageDB } from "@/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDownloadURL, ref, uploadString, listAll } from 'firebase/storage';
import { v4 } from 'uuid';

import Image from "next/image";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

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

    //const images = ['https://truewerk.com/cdn/shop/files/t1_werkpants_mens_olive_flat_lay_4825e693-f588-4813-bff0-1d4c46ce82ce.jpg?v=1713822726&width=2400', 'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/89929EBC63DE42EA9701E67C8B731990/10460172.jpg','https://truewerk.com/cdn/shop/files/t2_werkpants_mens_sand_flat_lay_8ef2f98e-2d28-4d79-9661-ccab84a67cf3.jpg?v=1701119637&width=2400','https://www.mrporter.com/variants/images/3633577411310824/in/w2000_q60.jpg','https://www.togethxr.com/cdn/shop/files/231208_TGXR_Merch_Drop_Site_PDP_EWWS_Hoodie_1.jpg?v=1702064727']
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
                    <Slider {...settings}>
                        {imgURL.map(dataVal => <div><img src={dataVal} height="250px" width="250px" /></div>)}
                        {/* {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={400}/>)} */}
                    </Slider>
                    <Slider {...settings}>
                        {imgURL.map(dataVal => <div><img src={dataVal} height="250px" width="250px" /></div>)}
                        {/* {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={400}/>)} */}
                    </Slider>
                    <Slider {...settings}>
                        {imgURL.map(dataVal => <div><img src={dataVal} height="250px" width="250px" /></div>)}
                        {/* {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={400}/>)} */}
                    </Slider>
                    <button className={styles.button} onClick={saveOutfit}>Save Outfit</button>
                </div>
            </div>
        </>
    )
}


export default scrollStyle;