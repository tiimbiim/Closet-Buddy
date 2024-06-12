'use client'
import React, {useState, useEffect, forwardRef} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDownloadURL, ref, uploadBytes, listAll, list } from 'firebase/storage';
import { imageDB } from "../firebase.config"



const ImageCarouselSS = forwardRef(({ imgURLs, onSlideChange }, ref) => {
    
    const settings = {      //https://react-slick.neostack.com/docs/example/ for me -tim
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (currentSlide) => {
            onSlideChange(currentSlide);
        }
    };

    const currentAuth = getAuth();

    const [imgURL, setImgURL] = useState([]);

    useEffect(() => {
        if (imgURLs.length > 0) {
            setImgURL(imgURLs);
        }
    }, [imgURLs]);



    return ( 
        <div ref={ref}>

            <Slider {...settings}>
                {imgURL.map((dataVal, index) => (

                    <div key ={index}><img alt="clothing image" src={dataVal} height="250px" width="250px" /></div>

                ))}
                {/* {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={450}/>)} */}
            </Slider>

        </div>
     );
});
 
export default ImageCarouselSS;
