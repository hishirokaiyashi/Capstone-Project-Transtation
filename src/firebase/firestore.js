import app from "./index.js";

import {
  getFirestore,
  query,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  collectionGroup,
  where,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const firestore = getFirestore(app);

const getDateTripsFromId = async (id) => {
  const q = query(
    collection(firestore, "trips"),
    where("uid", ">=", id),
    where("uid", "<=", id + "\uf8ff")
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot;
};

const getRouteFromId = async (id) => {
  const routeDoc = await getDoc(doc(firestore, "routes", id));
  const routeData = routeDoc.data();
  return routeData;
};

const getSeatsFromTripId = async (id) => {
  const seatsRef = collection(firestore, "trips", id, "SEATS");
};

export { getDateTripsFromId, getRouteFromId };
export default firestore;
