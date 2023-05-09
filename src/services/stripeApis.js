import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Dùng khi bị lỗi
// const BASE_URL = "https://capstone-payment-stripe.vercel.app/api"; // Nếu bị lỗi thì dùng cái trên

export const checkout = (order) => {
  return axios.post(`${BASE_URL}/stripe/create-checkout-session`, {
    order,
  });
};
