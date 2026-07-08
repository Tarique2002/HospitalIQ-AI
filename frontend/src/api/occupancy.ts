import { API_URL } from "./config";
import axios from "axios";

export async function getOccupancy() {
  const res = await axios.get(
    `${API_URL}/dashboard/occupancy`
  );

  return res.data;
}