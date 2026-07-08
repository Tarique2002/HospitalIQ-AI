import { API_URL as API } from "./config";
import axios from "axios";



export async function getAdmissionsTrend() {
  const response = await axios.get(
    `${API}/dashboard/admissions-trend`
  );

  return response.data;
}