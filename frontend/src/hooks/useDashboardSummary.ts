import { API_URL } from "../api/config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API = axios.create({
  baseURL: API_URL,
});

const fetchSummary = async () => {
  const { data } = await API.get("/dashboard/summary");
  return data;
};

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: fetchSummary,
  });
};