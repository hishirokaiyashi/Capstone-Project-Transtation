import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const checkout = (order) => {
  console.log("checkout");
  return axios.post(`${BASE_URL}/stripe/create-checkout-session`, {
    order,
  });
};
