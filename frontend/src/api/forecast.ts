import { API_URL as API } from "./config";
import axios from "axios";



export async function getForecast() {
  const response = await axios.get(
    `${API}/dashboard/forecast`
  );

  return response.data;
}