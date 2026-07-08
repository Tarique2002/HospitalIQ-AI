import { API_URL as API } from "./config";
import axios from "axios";



export async function getNotifications() {
  const response = await axios.get(
    `${API}/dashboard/notifications`
  );

  return response.data;
}