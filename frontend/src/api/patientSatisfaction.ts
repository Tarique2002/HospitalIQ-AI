import { API_URL as API } from "./config";
import axios from "axios";



export async function getPatientSatisfaction() {
  const response = await axios.get(
    `${API}/dashboard/patient-satisfaction`
  );

  return response.data;
}