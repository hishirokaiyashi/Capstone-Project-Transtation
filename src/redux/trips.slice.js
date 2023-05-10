import { createSlice } from "@reduxjs/toolkit";

import {
  sortTripsDescending,
  sortTripsAscending,
  checkBetweenTwoHours,
  isLaterHour,
} from "../utils/convertDatetime";

const initialState = {
  isLoading: false,
  sort: null,
  sortedList: [],
  category: null,
  categorizedList: [],
  departures: [],
  departuresList: [],
  arrivals: [],
  arrivalsList: [],
  price: [],
  error: null,
  trips: null,
  filteredTrips: null,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setTrips(state, action) {
      state.trips = action.payload;
      state.filteredTrips = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setFilter(state) {
      let filteredList = [];
      let allLists = [
        state.sortedList,
        state.categorizedList,
        state.departuresList,
        state.arrivalsList,
      ];

      // Check if any of the lists is empty
      let emptyLists = allLists.filter((list) => list.length === 0);

      if (emptyLists.length > 0) {
        // If any list is empty, remove it from the array
        allLists = allLists.filter((list) => list.length > 0);
      }

      if (emptyLists.length == 4) {
        if (state.departures.length !== 0 && state.departuresList.length == 0) {
          state.filteredTrips = [];
          return;
        }
        if (state.arrivals.length !== 0 && state.arrivalsList.length == 0) {
          state.filteredTrips = [];
          return;
        }
        state.filteredTrips = state.trips;
        return;
      }

      // Get the intersection of all non-empty lists
      if (allLists.length > 0) {
        filteredList = allLists.reduce((accumulator, currentList) => {
          return accumulator.filter((item) =>
            currentList.some((currentItem) => currentItem.uid === item.uid)
          );
        });
      }

      state.filteredTrips = filteredList;
    },
    sortTrips(state, action) {
      state.sort = action.payload;
      switch (action.payload) {
        case "Earliest Arrival": {
          const newList = sortTripsAscending(state.trips);
          state.sortedList = newList;
          break;
        }
        case "Latest Arrival": {
          const newList = sortTripsDescending(state.trips);
          state.sortedList = newList;
          break;
        }
        case "Cheapest Price": {
          const newList = [...state.trips];
          state.sortedList = newList.sort(
            (a, b) => a.ticketPrice - b.ticketPrice
          );
          break;
        }
        case "Highest Price": {
          const newList = [...state.trips];
          state.sortedList = newList.sort(
            (a, b) => b.ticketPrice - a.ticketPrice
          );
          break;
        }
      }
    },
    changeCategory(state, action) {
      state.category = action.payload;
      switch (action.payload) {
        case "Bed": {
          const newList = state.trips.filter((item) => item.type === "Bed");
          state.categorizedList = newList;
          break;
        }
        case "Seat": {
          const newList = state.trips.filter((item) => item.type === "Seat");
          state.categorizedList = newList;
          break;
        }
      }
    },
    changeDeparture(state, action) {
      if (!state.departures.includes(action.payload))
        state.departures = [...state.departures, action.payload];
      else {
        state.departures = state.departures.filter(
          (item) => item !== action.payload
        );
      }

      // Filter trips having suitable departure time
      if (state.departures.length > 0) {
        const newList = state.trips.filter((departure) => {
          let isBetween = false;
          for (let i = 0; i < state.departures.length; i++) {
            const [startTime, endTime] = state.departures[i].split(" - ");
            if (
              checkBetweenTwoHours(
                startTime,
                null,
                departure.departureTime,
                endTime
              )
            ) {
              isBetween = true;
              break;
            }
          }
          return isBetween;
        });
        state.departuresList = newList;
      }
    },
    changeArrival(state, action) {
      if (!state.arrivals.includes(action.payload))
        state.arrivals = [...state.arrivals, action.payload];
      else {
        state.arrivals = state.arrivals.filter(
          (item) => item !== action.payload
        );
      }

      // Filter trips having suitable arrival time
      if (state.arrivals.length > 0) {
        const newList = state.trips.filter((trip) => {
          let isBetween = false;
          for (let i = 0; i < state.arrivals.length; i++) {
            const [startTime, endTime] = state.arrivals[i].split(" - ");
            if (
              checkBetweenTwoHours(startTime, null, trip.arrivalTime, endTime)
            ) {
              isBetween = true;
              break;
            }
          }
          return isBetween;
        });
        state.arrivalsList = newList;
      }
    },
    resetFilter(state) {
      state.filteredTrips = state.trips;
      state.sort = null;
      state.sortedList = [];
      state.category = null;
      state.categorizedList = [];
      state.departures = [];
      state.departuresList = [];
      state.arrivals = [];
      state.arrivalsList = [];
      state.price = [150000, 1000000];
    },
  },
});

export const {
  setTrips,
  setLoading,
  setError,
  sortTrips,
  setPrice,
  setFilter,
  changeCategory,
  resetFilter,
  changeDeparture,
  changeArrival,
} = tripsSlice.actions;
export default tripsSlice.reducer;
