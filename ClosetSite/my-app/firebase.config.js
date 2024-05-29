import { initializeApp } from 'firebase/app';
import { getStorage } from'firebase/storage';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  // Your Firebase configuration

    apiKey: "AIzaSyDOt2W5L9zwNkY-8yz5tJNLQFw7BbL8xao",
  
    authDomain: "closetbuddy-c85b0.firebaseapp.com",
  
    projectId: "closetbuddy-c85b0",
  
    storageBucket: "closetbuddy-c85b0.appspot.com",
  
    messagingSenderId: "1058464916657",
  
    appId: "1:1058464916657:web:ca2ba09947b8934deaee90"
  
};


const app = initializeApp(firebaseConfig);

export const imageDB = getStorage(app);
export const auth = getAuth(app);

//export { imageDB, auth };