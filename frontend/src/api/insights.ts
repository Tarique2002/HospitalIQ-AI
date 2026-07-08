import { API_URL as API } from "./config";
import axios from "axios";



export async function getAIInsights() {
  const response = await axios.get(
    `${API}/dashboard/ai-insights`
  );

  return response.data;
}