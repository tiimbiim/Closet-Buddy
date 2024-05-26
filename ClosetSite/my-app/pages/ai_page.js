import styles from "@/styles/AiSave.module.css"
import React, {useEffect, useState} from 'react';
import Navbar from "@/comps/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FaUpload} from 'react-icons/fa6';
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth' 
import { imageDB, auth } from '../firebase';
import {v4} from "uuid";



const ai_save = () => {
    const [uploadFileURL, setUploadFileURL] = useState('');
    const [img, setImg] = useState('');
    const [imgURL, setImgURL] = useState([]);
    const [user, setUser] = useState([]);

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

    // function handleSubmitFile(e){
    //     console.log(e.target.files);
    //     setUploadFileURL(URL.createObjectURL(e.target.files[0]))
    // }
    
    const handleUploadFile = () => {

        if(user && img) {

            const uid = user.uid;
            const imgRef = ref(imageDB, `user/${uid}/${v4()}`);
            uploadBytes(imgRef, img).then((value) => {

                getDownloadURL(value.ref).then((url) => {

                    setImgURL((data) => [...data, url]);
                    console.log("Image uploaded successfully:", url);
                }).catch(error => {
                    console.error("Error uploading image: ", error);
                })

            }).catch(error => {
                console.error("Error uploading image: ", error);
            })

        }

    }

    return (
        <>
            <Navbar/>
            <div className={styles.hero}>
                <div className={styles.card}>
                    {uploadFileURL ?  imgURL.map(dataVal=> <img src={dataVal} height="200px" width="200px"/> ) : <FaUpload className={styles.icon}/>}
                    {/* <h1>something</h1> */}
                    {/* <FaUpload className={styles.icon} id='default'/> */}
                    {/* <input type='file' accept='image/jpeg, image/png, image/jpg' id= 'input-file' onClick={handleUploadFile}/> */}
                    {/* <label for='input-file'>upload image</label> <br/> */}
                    <input className={styles.selectFileButton} type='file' accept='image/jpeg, image/png, image/jpg' onChange={(e) => setImg(e.target.files[0])}/>
                    <button className = {styles.uploadButton} onClick={handleUploadFile}>upload image</button>
                </div>
            </div>

        </>
    )
}


export default ai_save;