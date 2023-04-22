// Initialize the config of Firebase
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "my-app-c6127.firebaseapp.com",
    projectId: "my-app-c6127",
    storageBucket: "my-app-c6127.appspot.com",
    messagingSenderId: "929814470899",
    appId: "1:929814470899:web:5f895542aa7de0e8c39786",
    measurementId: "G-QL3KB4VTXM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

export default app;
