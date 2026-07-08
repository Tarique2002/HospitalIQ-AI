import { API_URL as API } from "./config";
import axios from "axios";



export async function getExecutiveKPIs() {
  const response = await axios.get(
    `${API}/dashboard/executive-kpis`
  );

  return response.data;
}