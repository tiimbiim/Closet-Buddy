import styles from "@/styles/AiSave.module.css"
import React, { useState } from 'react';
import Navbar from "@/comps/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUpload } from 'react-icons/fa6';



const ai_save = () => {
    const [uploadFileURL, setUploadFileURL] = useState('');
    function handleSubmitFile(e) {
        console.log(e.target.files);
        setUploadFileURL(URL.createObjectURL(e.target.files[0]))
    }


    return (
        <>
            <Navbar />
            <div className={styles.hero}>
                <div className={styles.card}>
                    {/* <h1>something</h1> */}
                    {/* <FaUpload className={styles.icon} id='default'/> */}
                    {uploadFileURL ? <img src={uploadFileURL} width={300} height={300} /> : <FaUpload className={styles.icon} />}
                    <label for='input-file'>upload image</label>
                    <input type='file' accept='image/jpeg, image/png, image/jpg' id='input-file' onChange={handleSubmitFile} />
                </div>
            </div>

        </>
    )
}


export default ai_save;
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [file, setFile] = useState(null);

//     const onFileChange = event => {
//         setFile(event.target.files[0]);
//     };

//     const onFileUpload = () => {
//         const formData = new FormData();
//         formData.append("file", file);
//         axios.post("http://localhost:5000/remove-background", formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             },
//             responseType: 'blob'  // Important for handling the binary image response
//         })
//             .then(response => {
//                 const url = URL.createObjectURL(new Blob([response.data]));
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.setAttribute('download', 'result.png');
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link); // Clean up
//             })
//             .catch(error => console.log(error));
//     };

//     return (
//         <div>
//             <input type="file" onChange={onFileChange} />
//             <button onClick={onFileUpload}>
//                 Upload!
//             </button>
//         </div>
//     );
// }

// export default App;