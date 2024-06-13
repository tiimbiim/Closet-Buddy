'use client'
import { collection, getDocs, query, where } from "firebase/firestore";
import { clothesDB, auth, imageDB } from "../firebase.config"
import React, { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import styles from "@/app/savedOutfits/savedOutfits.module.css"

const SavedOutfitBlock = () => {
    const [outfits, setOutfits] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchOutfits = async (currentUser) => {

            if(!currentUser) { return; }

            const uid = currentUser.uid;

            console.log("Curren user: ", uid);

            const outfitRef = collection(clothesDB, `savedOutfits/${uid}/outfits`);

            console.log("Attempting to access ", `savedOutfits/${uid}/outfits`);

            const userOutfitQuery = query(outfitRef, where("owner", "==", uid));
            const querySnapshot = await getDocs(userOutfitQuery);

            const outfitsData = await Promise.all (

                querySnapshot.docs.map(async (outfitDoc) => {

                    const outfitData = outfitDoc.data();
                    const imageUrls = outfitData.images;

                    const images = await Promise.all (

                        imageUrls.map(async (url) => {

                            const imageRef = ref(imageDB, url);
                            const imageUrl = await getDownloadURL(imageRef);
                            console.log("Image URL: ", imageUrl);
                            return imageUrl;

                        })

                    );

                    // const outfitData = outfitDoc.data();
                    
                    // const imageRef = ref(imageDB, `user/${uid}/`);
                    // const imageSnapshot = await listAll(imageRef);
                    // let imageUrl = '';

                    // if(imageSnapshot.items.length > 0) {

                    //     imageUrl = await getDownloadURL(imageSnapshot.items[0]);
                    //     console.log("Image URL: ", imageUrl);

                    // }
                    return {

                        id: outfitDoc.id,
                        ...outfitData,
                        imageUrl: images

                    };

                })

            )
            setOutfits(outfitsData);
        };

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchOutfits(currentUser);
            }
        });


        fetchOutfits();

        return () => unsubscribe();

    }, []);

    return ( 

        <div className={styles.container}>
            {outfits.map(outfit => (
                <div key={outfit.id} className={styles.outfit}>
                    <h3>Outfit ID: {outfit.id}</h3>
                    <div className={styles.imageGrid}>
                        {outfit.images.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={imageUrl}
                                alt={`Outfit ${outfit.id} Image ${index + 1}`}
                                // className={styles.image}
                                height="250px" width="250px"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>

     );
}
 
export default SavedOutfitBlock;