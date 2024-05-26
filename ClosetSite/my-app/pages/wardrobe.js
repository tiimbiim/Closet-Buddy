import styles from "@/styles/Wardrobe.module.css";
import React, {useEffect} from 'react';
import Navbar from "@/comps/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import Image from "next/image";

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const wardrobe = () => {
    const images = ['https://truewerk.com/cdn/shop/files/t1_werkpants_mens_olive_flat_lay_4825e693-f588-4813-bff0-1d4c46ce82ce.jpg?v=1713822726&width=2400', 'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/89929EBC63DE42EA9701E67C8B731990/10460172.jpg','https://truewerk.com/cdn/shop/files/t2_werkpants_mens_sand_flat_lay_8ef2f98e-2d28-4d79-9661-ccab84a67cf3.jpg?v=1701119637&width=2400','https://www.mrporter.com/variants/images/3633577411310824/in/w2000_q60.jpg','https://www.togethxr.com/cdn/shop/files/231208_TGXR_Merch_Drop_Site_PDP_EWWS_Hoodie_1.jpg?v=1702064727']

    return (
        <>
            <Navbar/>
            <div className={styles.hero}>
                <h1 className={styles.category}>TOPS</h1>
                <Slider {...settings}>
                    {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={450}/>)}
                </Slider>
                <h1 className={styles.category}>BOTTOMS</h1>
                <Slider {...settings}>
                    {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={450}/>)}
                </Slider>
                <h1 className={styles.category}>SHOES</h1>
                <Slider {...settings}>
                    {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={450} />)}
                </Slider>
            </div>
        </>
    )
}


export default wardrobe;