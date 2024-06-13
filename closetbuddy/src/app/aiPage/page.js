'use client'
import styles from "../aiPage/aiPage.module.css"
import React, {useEffect, useState} from 'react';
import Navbar from "../../../comps/Navbar";

import { FaUpload } from 'react-icons/fa6';
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth' 
import { imageDB, auth } from '../../../firebase.config';
import {v4} from "uuid";



const aiPage = () => {
    const [img, setImg] = useState('');
    const [imgURL, setImgURL] = useState([]);
    const [user, setUser] = useState([]);
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [category, setCategory] = useState('');

    const currentAuth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(currentAuth, (user) => {
            if(user) {
                setUser(user);
                const uid = user.uid;
                listAll(ref(imageDB, `user/${uid}/`)).then (imgs => {

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
    
    const handleUploadFile = () => {

        if(user && img && category) {

            const uid = user.uid;
            const imgRef = ref(imageDB, `user/${uid}/${category}/${v4()}`);
            uploadBytes(imgRef, img).then((value) => {

                getDownloadURL(value.ref).then((url) => {

                    setImgURL((data) => [...data, url]);
                    console.log("Image uploaded successfully:", url);
                    alert("Image uploaded successfully!");
                    setCategory('');
                }).catch(error => {
                    console.error("Error uploading image: ", error);
                    alert("Error uploading image: ", error);
                    setCategory('');
                })

            }).catch(error => {
                console.error("Error uploading image: ", error);
                alert("Error uploading image: ", error);
            })

        }
        else {

            alert("Please select a category and an image.");

        }

    }

    useEffect(() => {

        if(!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectURL = URL.createObjectURL(selectedFile)
        setPreview(objectURL)

        return() => URL.revokeObjectURL(objectURL)

    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
        setImg(e.target.files[0]);
    }


    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    return (
        <>
            <Navbar />
            <div className={styles.radioContainer}>
                <label>
                    <input type="radio" value="tops" checked={category === 'tops'} onChange={handleCategoryChange} />
                    Top
                </label>
                <label>
                    <input type="radio" value="bottoms" checked={category === 'bottoms'} onChange={handleCategoryChange} />
                    Bottoms
                </label>
                <label>
                    <input type="radio" value="shoes" checked={category === 'shoes'} onChange={handleCategoryChange} />
                    Shoes
                </label>
            </div>
            <div className={styles.hero}>
                <div className={styles.card}>
                    {selectedFile && <img src={preview} height={250} width={250} />}
                    <input className={styles.selectFileButton} type='file' accept='image/jpeg, image/png, image/jpg' onChange={onSelectFile}/>



                    <button className = {styles.uploadButton} onClick={handleUploadFile}>upload image</button>
                </div>
            </div>

        </>
    )
}


export default aiPage;
