import styles from "@/styles/AiSave.module.css"
import React, {useState} from 'react';
import Navbar from "@/comps/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FaUpload} from 'react-icons/fa6';



const ai_save = () => {
    const[uploadFileURL, setUploadFileURL] = useState('');
    function handleSubmitFile(e){
        console.log(e.target.files);
        setUploadFileURL(URL.createObjectURL(e.target.files[0]))
        }
    

    return (
        <>
            <Navbar/>
            <div className={styles.hero}>
                <div className={styles.card}>
                    {/* <h1>something</h1> */}
                    {/* <FaUpload className={styles.icon} id='default'/> */}
                    {uploadFileURL ?  <img src={uploadFileURL} width={300} height={300}/> : <FaUpload className={styles.icon}/>}
                    <label for='input-file'>upload image</label>
                    <input type='file' accept='image/jpeg, image/png, image/jpg' id= 'input-file' onChange={handleSubmitFile}/>
                </div>
            </div>

        </>
    )
}


export default ai_save;