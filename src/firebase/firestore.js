import app from "./index.js";

import { getFirestore } from "firebase/firestore";

const firestore = getFirestore(app);

export default firestore;
