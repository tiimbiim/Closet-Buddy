import styles from "@/styles/SavedOutfits.module.css";
// import React, {useEffect} from 'react';
import Navbar from "@/comps/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";



const savedOutfits = () => {
    const images = ['https://truewerk.com/cdn/shop/files/t1_werkpants_mens_olive_flat_lay_4825e693-f588-4813-bff0-1d4c46ce82ce.jpg?v=1713822726&width=2400', 'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/89929EBC63DE42EA9701E67C8B731990/10460172.jpg','https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/89929EBC63DE42EA9701E67C8B731990/10460172.jpg']
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

        {/* <div className={styles.hero}>
            <div className={styles.columnLeft}>
                <div className={styles.tab}>
                {images.map(image => <Image className={styles.imageSetting} src={image} width={100} height={100}/>)}
                <h1>Outfit 1</h1>
                </div>
                <div className={styles.tab}>
                {images.map(image => <Image className={styles.imageSetting} src={image} width={100} height={100}/>)}
                <h1>Outfit 3</h1>
                </div>
                <div className={styles.tab}>
                {images.map(image => <Image className={styles.imageSetting} src={image} width={100} height={100}/>)}
                <h1>Outfit 5</h1>
                </div>
            </div>
            <div className={styles.columnRight}>
                <div className={styles.tab}>
                {images.map(image => <Image className={styles.imageSetting} src={image} width={100} height={100}/>)}
                <h1>Outfit 2</h1>
                </div>
                <div className={styles.tab}>
                {images.map(image => <Image className={styles.imageSetting} src={image} width={100} height={100}/>)}
                <h1>Outfit 4</h1>
                </div>
                
            </div>
        </div> */}
        </>
    )
}


export default savedOutfits;