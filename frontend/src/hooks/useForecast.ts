import { useQuery } from "@tanstack/react-query";
import { getForecast } from "../api/forecast";

export function useForecast() {
  return useQuery({
    queryKey: ["forecast"],
    queryFn: getForecast,
  });
}