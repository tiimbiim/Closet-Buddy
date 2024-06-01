'use client'
import React, {useState, useEffect} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDownloadURL, ref, uploadBytes, listAll, list } from 'firebase/storage';
import {imageDB} from "../firebase.config"


const settings = {      //https://react-slick.neostack.com/docs/example/ for me -tim
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const ImageCarousel = ({auth}) => {

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
        <div>

            <Slider {...settings}>
                {imgURL.map(dataVal => <div key={user.uid}><img alt="clothing image" src={dataVal} height="450px" width="450px" /></div>)}
                {/* {images.map(image => <Image className={styles.imageSetting} src={image} width={200} height={450}/>)} */}
            </Slider>

        </div>
     );
}
 
export default ImageCarousel;
