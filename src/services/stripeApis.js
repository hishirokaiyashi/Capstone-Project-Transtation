import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const checkout = (cartItems, userId) => {
  return axios.put(`${BASE_URL}/stripe/creat-checkout-session`, {
    cartItems,
    userId,
  });
};
