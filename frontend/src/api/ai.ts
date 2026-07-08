import { API_URL as API } from "./config";
import axios from "axios";



export async function generateAIReport() {
  const response = await axios.post(
    `${API}/ai/v1/report`
  );

  return response.data;
}