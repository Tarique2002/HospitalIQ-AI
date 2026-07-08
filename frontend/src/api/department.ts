import { API_URL as API } from "./config";
import axios from "axios";



export async function getDepartmentPerformance() {
  const response = await axios.get(
    `${API}/dashboard/department-performance`
  );

  return response.data;
}