import { initializeApp } from 'firebase/app';
import { getStorage } from'firebase/storage';
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  // Your Firebase configuration

    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  
    appId: process.env.NEXT_PUBLIC_APP_ID
  
};


const app = initializeApp(firebaseConfig);

export const clothesDB = getFirestore(app);
export const imageDB = getStorage(app);
export const auth = getAuth(app);

(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();