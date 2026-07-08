import { API_URL } from "../api/config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const API = axios.create({
  baseURL: API_URL,
});

const getRevenueTrend = async () => {
  const response = await API.get("/dashboard/revenue-trend");
  return response.data;
};

export const useRevenue = () => {
  return useQuery({
    queryKey: ["revenue-trend"],
    queryFn: getRevenueTrend,
  });
};