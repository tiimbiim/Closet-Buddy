// components/ImageUpload.js

import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage';
import { imageDB, auth } from '../firebase';
import {v4} from "uuid";


function ImageUpload() {

    const [img,setImg] =useState('');
    const [imgUrl,setImgUrl] =useState([]);

    const handleClick = () => {
        if(img !== null) {
            const imgRef = ref(imageDB, `user/${auth.currentUser.uid}`)
            uploadBytes(imgRef, img).then(value=>{
                console.log(value)
                getDownloadURL(value.ref).then(url=>{
                    setImgURL(data=>[...data, url])
                })
            })
        }
    }

    useEffect(() => {
        listAll(ref(imageDB, `user/`)).then (imgs=>{
            console.log(imgs)
            imgs.items.forEach(val => {
                getDownloadURL(val).then(url=>{
                    setImgUrl(data=>[...data, url])
                })
            })

        })

    },[])

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
