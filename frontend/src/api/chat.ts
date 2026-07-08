import { API_URL as API } from "./config";
import axios from "axios";



export async function sendMessage(question: string) {

    const response = await axios.post(
        `${API}/ai/v1/chat`,
        {
            question,
        }
    );

    return response.data;
}