import React, { useEffect, useState } from 'react';
import { imageDB, auth } from '../firebase'
import { getDownloadURL, listAll } from 'firebase/storage';


const ImageViewer = () => {


    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
    
        const fetchImages = async => {
            const userId = auth.currentUser.uid;
            const listRef = ref(imageDB, userId);

            listAll(listRef)
                .then((result) =>  {

                    const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
                    Promise.all(urlPromises)
                        .then((urls) => {

                            setImages(urls);

                        })
                        .catch((error) => {
                            console.error('Error fetching image URLs:', error);
                            setError('Failed to load images: ' + error.message);
                        });

                })
                .catch((error) => {

                    console.error('Error listing files:', error);
                    setError('Failed to list images: ' + error.message);

                });


        };
    

        fetchImages();

    },[auth, imageDB]);

    return ( 

        <div>
            <h2>Your Images</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
            {images.map((url, index) => (
                <img key={index} src={url} alt={`User upload ${index}`} style={{ width: '100px', height: '100px' }} />
            ))}
        </div>
      </div>

     );
}
 
export default ImageViewer;