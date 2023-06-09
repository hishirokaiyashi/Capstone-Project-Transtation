import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFulfilled: false,
  error: null,
  order: {
    booking_id: null,
    displayName: "",
    user_id: null,
    trip_id: null,
    tickets: null,
    ticketAmount: null,
    ticketPrice: null,
    totalPrice: null,
    totalSeats: null,
    departureTime: null,
    arrivalTime: null,
    from: null,
    to: null,
    type: null,
    date: null,
    image: null,
    pickUp: {
      location: "",
      time: "",
      name: "",
    },
    final: {
      location: "",
      time: "",
      name: "",
    },
    address: "",
    email: "",
    phoneNumber: "",
    createdAt: null,
    status: "Pending",
    paymentMethod: null,
    paymentStatus: "Unpaid",
    paidTime: null,
    note: "",
  },
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setFulfilled(state, action) {
      state.isFulfilled = action.payload;
    },
    setTripInfo(state, action) {
      state.order.booking_id = action.payload.booking_id;
      state.order.trip_id = action.payload.trip_id;
      state.order.tickets = action.payload.seats;
      state.order.ticketAmount = action.payload.seats.length;
      state.order.ticketPrice = action.payload.ticketPrice;
      state.order.totalPrice =
        action.payload.seats.length * action.payload.ticketPrice;
      state.order.totalSeats = action.payload.totalSeats;
      state.order.type = action.payload.type;
      state.order.date = action.payload.date;
      state.order.departureTime = action.payload.departureTime;
      state.order.arrivalTime = action.payload.arrivalTime;
      state.order.from = action.payload.from;
      state.order.to = action.payload.to;
      state.order.image = action.payload.image;
    },
    setPoints(state, action) {
      state.order.pickUp = action.payload.pickUp;
      state.order.final = action.payload.final;
    },
    setPickUpPoints(state, action) {
      state.order.pickUp = {
        location: action.payload.location,
        time: action.payload.time,
        name: action.payload.name,
      };
    },
    setFinalPoints(state, action) {
      state.order.final = {
        location: action.payload.location,
        time: action.payload.time,
        name: action.payload.name,
      };
    },
    setUserInfo(state, action) {
      state.order.user_id = action.payload.user_id;
      state.order.email = action.payload.email;
      state.order.displayName = action.payload.displayName;
      state.order.phoneNumber = action.payload.phoneNumber;
      state.order.note = action.payload.note;
    },
    setMethod(state, action) {
      state.order.paymentMethod = action.payload.paymentMethod;
    },
    setPayment(state, action) {
      state.order.paymentStatus = action.payload.paymentStatus;
      state.order.paidTime = action.payload.paidTime;
      state.order.status = action.payload.status;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setTickets(state, action) {
      state.order.tickets = action.payload;
      state.order.ticketAmount = action.payload.length;
      state.order.totalPrice = action.payload.length * state.order.ticketPrice;
    },
    resetOrderState: (state, action) => {
      // Đặt giá trị của order về giá trị mặc định với trip_id mới
      state.order = {
        booking_id: null,
        displayName: "",
        user_id: null,
        trip_id: action.payload, // trip_id mới được truyền vào
        tickets: null,
        ticketAmount: null,
        ticketPrice: null,
        totalPrice: null,
        totalSeats: null,
        departureTime: null,
        arrivalTime: null,
        type: null,
        date: null,
        pickUp: {
          location: "",
          time: "",
          name: "",
        },
        final: {
          location: "",
          time: "",
          name: "",
        },
        address: "",
        email: "",
        phoneNumber: "",
        createdAt: null,
        status: "Pending",
        paymentMethod: null,
        paymentStatus: "Unpaid",
        paidTime: null,
        note: "",
      };
    },
  },
});

export const {
  setFulfilled,
  setTripInfo,
  setPoints,
  setPickUpPoints,
  setFinalPoints,
  setUserInfo,
  setMethod,
  setPayment,
  setError,
  resetOrderState,
  setTickets,
} = orderSlice.actions;

export default orderSlice.reducer;
