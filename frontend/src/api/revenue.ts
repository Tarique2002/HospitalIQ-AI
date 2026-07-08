import { API_URL } from "./config";
import axios from "axios";

const API = axios.create({
  baseURL: API_URL,
});

export const getRevenueTrend = async () => {
  const response = await API.get("/dashboard/revenue-trend");
  return response.data;
};