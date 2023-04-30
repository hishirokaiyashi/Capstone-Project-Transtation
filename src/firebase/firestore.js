import app from "./index.js";
import { useCallback } from "react";
import {
  getFirestore,
  query,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const firestore = getFirestore(app);

const getDateTripsFromId = (id, callback) => {
  const q = query(
    collection(firestore, "trips"),
    where("uid", ">=", id),
    where("uid", "<=", id + "\uf8ff")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => doc.data());
    callback(data);
  });
  return unsubscribe;
};

const getRouteFromId = async (id) => {
  const routeDoc = await getDoc(doc(firestore, "routes", id));
  const routeData = routeDoc.data();
  return routeData;
};

const getSeatsFromTripId = (tripId, onUpdate) => {
  const docRef = doc(collection(firestore, "trips"), tripId);
  const seatsCollectionRef = collection(docRef, "SEATS");
  const unsubscribe = onSnapshot(seatsCollectionRef, (querySnapshot) => {
    const seats = [];
    querySnapshot.forEach((doc) => {
      seats.push({ id: doc.id, ...doc.data() });
    });
    onUpdate(seats);
  });

  return unsubscribe;
};

// const getUnavailableSeats = async (tripId, seats) => {
//   const tripRef = doc(collection(firestore, "trips"), tripId);
//   const seatsQuerySnapshot = await collection(tripRef, "SEATS")
//     .where("id", "in", seats)
//     .get();
//   const unavailableSeats = seatsQuerySnapshot.docs.filter(
//     (doc) => doc.data().status === "Unavailable"
//   );
//   if (unavailableSeats.length > 0) {
//     const unavailableSeatIds = unavailableSeats.map((seat) => seat.data().id);
//     return unavailableSeatIds;
//   } else {
//     return [];
//   }
// };
const getUnavailableSeats = async (tripId, seats) => {
  const tripRef = collection(firestore, "trips");
  const seatsQuerySnapshot = await getDocs(
    query(
      collection(tripRef, tripId, "SEATS"),
      where("id", "in", seats),
      where("status", "==", "Unavailable")
    )
  );
  if (seatsQuerySnapshot.empty) {
    return [];
  } else {
    const unavailableSeatIds = seatsQuerySnapshot.docs.map((seat) => seat.id);
    return unavailableSeatIds;
  }
};
const createSeats = async (tripId) => {
  const seatsRef = collection(firestore, "trips", tripId, "SEATS");

  for (let i = 1; i <= 45; i++) {
    const seatId = `A${i.toString().padStart(2, "0")}`;
    const seatData = {
      id: seatId,
      status: "Available",
      user_id: null,
      order_id: null,
    };
    const seatDocRef = doc(seatsRef, seatId);
    await setDoc(seatDocRef, seatData);
  }
};

export {
  getDateTripsFromId,
  getRouteFromId,
  getSeatsFromTripId,
  createSeats,
  getUnavailableSeats,
};
export default firestore;
