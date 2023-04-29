// Initialize the config of Firebase
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-app-c6127.firebaseapp.com",
  projectId: "my-app-c6127",
  storageBucket: "my-app-c6127.appspot.com",
  messagingSenderId: "929814470899",
  appId: "1:929814470899:web:5f895542aa7de0e8c39786",
  measurementId: "G-QL3KB4VTXM",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyD0R21Q4i_kN7QBVJZhEj9oBW5WezuOPCk",
//   authDomain: "capstone-project-bd035.firebaseapp.com",
//   projectId: "capstone-project-bd035",
//   storageBucket: "capstone-project-bd035.appspot.com",
//   messagingSenderId: "71564256659",
//   appId: "1:71564256659:web:6a02cfda4700c757e77466",
//   measurementId: "G-G7EJGRF1H4",
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
