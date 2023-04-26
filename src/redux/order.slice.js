import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFulfilled: false,
  error: null,
  order: {
    displayName: "",
    user_id: null,
    trip_id: null,
    tickets: null,
    ticketAmount: null,
    ticketPrice: null,
    totalPrice: null,
    pickUp: null,
    final: null,
    address: "",
    email: "",
    phoneNumber: "",
    createdAt: null,
    status: "Pending",
    transitFrom: null,
    transitTo: null,
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
      state.order.trip_id = action.payload.trip_id;
      state.order.tickets = action.payload.seats;
      state.order.seatAmount = action.payload.seats.lenght;
      state.order.ticketPrice = action.payload.ticketPrice;
      state.order.totalPrice =
        action.payload.seats.length * action.payload.ticketPrice;
    },
    setPoints(state, action) {
      state.order.pickUp = action.payload.pickUp;
      state.order.final = action.payload.final;
    },
    setPickUpPoints(state, action) {
      state.order.pickUp = action.payload;
    },
    setFinalPoints(state, action) {
      state.order.final = action.payload;
    },
    setUserInfo(state, action) {
      state.order.user_id = action.payload.user_id;
      state.order.email = action.payload.email;
      state.order.address = action.payload.address;
      state.order.displayName = action.payload.displayName;
      state.order.transitFrom = action.payload.transitFrom;
      state.order.transitTo = action.payload.transitTo;
      state.order.phoneNumber = action.payload.phoneNumber;
      state.order.note = action.payload.note;
    },
    setMethod(state, action) {
      state.paymentMethod = action;
    },
    setPayment(state, action) {
      state.paymentStatus = action.paymentStatus;
      state.paidTime = action.paidTime;
      state.status = action.status;
    },
    setError(state, action) {
      state.error = action.payload;
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
} = orderSlice.actions;

export default orderSlice.reducer;
