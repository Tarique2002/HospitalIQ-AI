import { API_URL as API } from "./config";
import axios from "axios";



export async function askAI(question: string) {
  const response = await axios.post(
    `${API}/ai/sql`,
    {
      question,
    }
  );

  return response.data;
}