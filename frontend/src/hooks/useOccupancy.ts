import { useQuery } from "@tanstack/react-query";
import { getOccupancy } from "../api/occupancy";

export function useOccupancy() {
  return useQuery({
    queryKey: ["occupancy"],
    queryFn: getOccupancy,
  });
}