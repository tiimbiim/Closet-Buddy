import styles from "@/styles/Wardrobe.module.css";
import React, {useEffect, useState} from 'react';
import Navbar from "@/comps/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { imageDB } from "@/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDownloadURL, ref, uploadBytes, listAll, list } from 'firebase/storage';
import Image from "next/image";

const settings = {      //https://react-slick.neostack.com/docs/example/ for me -tim
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const wardrobe = ({ auth }) => {
    //const images = ['https://truewerk.com/cdn/shop/files/t1_werkpants_mens_olive_flat_lay_4825e693-f588-4813-bff0-1d4c46ce82ce.jpg?v=1713822726&width=2400', 'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/89929EBC63DE42EA9701E67C8B731990/10460172.jpg','https://truewerk.com/cdn/shop/files/t2_werkpants_mens_sand_flat_lay_8ef2f98e-2d28-4d79-9661-ccab84a67cf3.jpg?v=1701119637&width=2400','https://www.mrporter.com/variants/images/3633577411310824/in/w2000_q60.jpg','https://www.togethxr.com/cdn/shop/files/231208_TGXR_Merch_Drop_Site_PDP_EWWS_Hoodie_1.jpg?v=1702064727']

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
                list(ref(imageDB, `user/${uid}/`)).then (imgs => {
                    
                    console.log(imgs);
                    
                    if(imgs.items.length === 0) { 
                        console.log("user has no images uploaded");
                        hasImages(false); 
                    }

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
            else {

            }

        });

        return() => unsubscribe();
        
    }, [currentAuth]);


    return (
        <>
            <Navbar/>
            <div className={styles.hero}>
                {!imagesUploaded && (
                    <div className={styles.banner}>
                        <h2 className={styles.bannerText}>Your wardrobe is empty!</h2>
                        <a className={styles.bannerLink} href="/ai_page"> Upload</a>
                        <h2 className={styles.bannerText}> your clothes to get started</h2>
                    </div>

                )}
                <h1 className={styles.category}>TOPS</h1>
                <Slider {...settings}>
                    {imgURL.map(dataVal => <div><img src={dataVal} height="450px" width="450px" /></div>)}
                    {/* {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={450}/>)} */}
                </Slider>

                <h1 className={styles.category}>BOTTOMS</h1>
                <Slider {...settings}>
                    {imgURL.map(dataVal => <div><img src={dataVal} height="450px" width="450px" /></div>)}
                    {/* {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={450}/>)} */}
                </Slider>
                
                <h1 className={styles.category}>SHOES</h1>
                <Slider {...settings}>
                    {imgURL.map(dataVal => <div><img src={dataVal} height="450px" width="450px" /></div>)}
                    {/* {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={450} />)} */}
                </Slider>
            </div>
        </>
    )
}


export default wardrobe;