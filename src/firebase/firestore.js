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
import { toast } from "react-toastify";

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

  for (let i = 1; i <= 20; i++) {
    const seatId = `B${i.toString().padStart(2, "0")}`;
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

//
const createOrder = async (order) => {
  try {
    await setDoc(doc(firestore, "orders", order.booking_id), {
      uid: order.booking_id,
      user_id: order.user_id,
      trip_id: order.trip_id,
      displayName: order.displayName,
      email: order.email,
      phoneNumber: order.phoneNumber,
      from: order.from,
      to: order.to,
      note: order.note,
      pickUp: order.pickUp,
      final: order.final,
      ticketAmount: order.ticketAmount,
      ticketPrice: order.ticketPrice,
      totalPrice: order.ticketAmount * order.ticketPrice,
      tickets: order.tickets,
      type: order.type,
      date: order.date,
      totalSeats: order.totalSeats,
      note: order.note,
      departureTime: order.departureTime,
      arrivalTime: order.arrivalTime,
      createdAt: serverTimestamp(),
      status: order.status,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      paidTime: order.paidTime,
    });
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

const createOrder2 = async (order) => {
  try {
    await setDoc(doc(firestore, "orders", order.booking_id), {
      uid: order.booking_id,
      user_id: order.user_id,
      trip_id: order.trip_id,
      displayName: order.displayName,
      email: order.email,
      phoneNumber: order.phoneNumber,
      from: order.from,
      to: order.to,
      note: order.note,
      pickUp: order.pickUp,
      final: order.final,
      ticketAmount: order.ticketAmount,
      ticketPrice: order.ticketPrice,
      totalPrice: order.ticketAmount * order.ticketPrice,
      tickets: order.tickets,
      type: order.type,
      date: order.date,
      totalSeats: order.totalSeats,
      note: order.note,
      departureTime: order.departureTime,
      arrivalTime: order.arrivalTime,
      createdAt: serverTimestamp(),
      status: order.status,
      paymentMethod: "card",
      paymentStatus: "Paid",
      paidTime: order.paidTime,
    });
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

const setSeatsByTripId = async (tripId, seatIds, userId, orderId) => {
  const tripRef = doc(firestore, "trips", tripId);
  const tripSnapshot = await getDoc(tripRef);

  const numSeats = seatIds.length;

  if (tripSnapshot.exists()) {
    const tripData = tripSnapshot.data();
    const { totalSeats, availableSeats } = tripData;

    if (totalSeats >= numSeats && availableSeats >= numSeats) {
      await updateDoc(tripRef, {
        availableSeats: availableSeats - numSeats,
      });

      console.log("Available seats updated successfully!");
    } else {
      console.error("Not enough available seats to reserve.");
      return;
    }
  } else {
    console.error("Trip not found.");
    return;
  }

  const seatsRef = collection(firestore, "trips", tripId, "SEATS");

  seatIds.forEach(async (seatId) => {
    const seatDocRef = doc(seatsRef, seatId);
    await updateDoc(seatDocRef, {
      status: "Unavailable",
      user_id: userId,
      order_id: orderId,
    });
  });
};

const getOrderById = async (orderId) => {
  const ordersRef = collection(firestore, "orders");
  const orderQuerySnapshot = await getDocs(
    query(ordersRef, where("uid", "==", orderId))
  );

  if (orderQuerySnapshot.empty) {
    return null;
  } else {
    return orderQuerySnapshot.docs[0].data();
  }
};

export {
  getDateTripsFromId,
  getRouteFromId,
  getSeatsFromTripId,
  createSeats,
  getUnavailableSeats,
  createOrder,
  createOrder2,
  setSeatsByTripId,
  getOrderById,
};
export default firestore;
