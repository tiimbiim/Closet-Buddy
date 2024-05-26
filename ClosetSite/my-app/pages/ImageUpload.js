// components/ImageUpload.js

import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage';
import { imageDB } from '../firebase';
import {v4} from "uuid";


function ImageUpload() {
    
    const [img, setImg] =useState('');
    const[imgURL, setImgURL] =useState([]);

    const handleClick = () => {
        if(img !== null) {
            const imgRef = ref(imageDB, `files/${v4()}`)
            uploadBytes(imgRef, img).then(value=>{
                console.log(value)
                getDownloadURL(value.ref).then(url=>{
                    setImgURL(data=>[...data, url])
                })
            })
        }
    }

    useEffect(() => {
        listAll(ref(imageDB, "files")).then (imgs=>{
            console.log(imgs)
            imgs.items.forEach(val => {
                getDownloadURL(val).then(url=>{
                    setImgURL(data=>[...data, url])
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
            imgURL.map(dataVal=><div>
                <img src={dataVal} height ="200px" width="200px" />
                <br/>
            </div>
            )
            }
        </div>

    );

};

export default ImageUpload;
