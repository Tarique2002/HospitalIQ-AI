import { API_URL } from "./config";
import axios from "axios";

const API = axios.create({
  baseURL: API_URL,
});

export const getDashboardSummary = async () => {
  const response = await API.get("/dashboard/summary");
  return response.data;
};