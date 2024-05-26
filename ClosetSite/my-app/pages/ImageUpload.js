// components/ImageUpload.js

import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth' 
import { imageDB, auth } from '../firebase';
import {v4} from "uuid";


function ImageUpload() {

    const [img,setImg] =useState('');
    const [imgUrl,setImgUrl] =useState([]);
    const [user, setUser] =useState([]);

    const currentAuth = getAuth();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(currentAuth, (user) => {

            if(user) {
                setUser(user);
                const uid = user.uid;
                listAll(ref(imageDB, `user/${uid}/`)).then (imgs=> {

                    console.log(imgs)
                    imgs.items.forEach((val) => {
                        getDownloadURL(val).then((url) => {

                            setImgUrl((data) => [...data, url]);

                        });
                    });

                })
                .catch((error) => {

                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        default:
                            // Handle other errors
                            break;
                    }

                });
            }   

        });

        return() => unsubscribe();

    }, [currentAuth]); 

    
    const handleClick = () => {
        if(user && img) {

            const uid = user.uid;
            const imgRef = ref(imageDB, `user/${uid}/${v4()}`);
            uploadBytes(imgRef, img).then((value) => {

                getDownloadURL(value.ref).then((url) => {

                    setImgUrl((data) => [...data, url]);

                })

            })

        }
    }


    return (
        <div>

            <input type="file" onChange={(e) => setImg(e.target.files[0])}/>
            <button onClick={handleClick}>Upload</button>
            <br/>
            {
                imgUrl.map(dataVal=><div>
                    <img src={dataVal} height ="200px" width="200px" />
                <br/>
            </div>
            )
            }
        </div>

    );

};

export default ImageUpload;
