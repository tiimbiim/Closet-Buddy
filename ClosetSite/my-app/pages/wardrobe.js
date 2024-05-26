import styles from "@/styles/Wardrobe.module.css";
import React, {useEffect} from 'react';
import Navbar from "@/comps/Navbar";
import Image from "next/image";


const wardrobe = () => {
    const images = ['https://truewerk.com/cdn/shop/files/t1_werkpants_mens_olive_flat_lay_4825e693-f588-4813-bff0-1d4c46ce82ce.jpg?v=1713822726&width=2400', 'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/89929EBC63DE42EA9701E67C8B731990/10460172.jpg']

    return (
        <>
            <Navbar/>
            {images.map(image => <Image src={image} width={250} height={250}/>)}
            <div id='column1'></div>
            <div id='column2'></div>
            <div id='column3'></div>
            
        </>
    )
}


export default wardrobe;