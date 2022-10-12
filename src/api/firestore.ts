import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_APIKEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTHDOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECTID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_REACT_APP_ID,
    measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const dbFirestore = getFirestore(app);

export default dbFirestore;
