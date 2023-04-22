import axios from "axios";

const getRoute = async (start, end) => {
  const routeApi = import.meta.env.VITE_OPENROUTE_API_KEY;
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${routeApi}&start=${start}&end=${end}`;
  const response = await axios.get(url);
  return response.data;
};

export default getRoute;
