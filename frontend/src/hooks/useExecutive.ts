import { useQuery } from "@tanstack/react-query";
import { getExecutiveKPIs } from "../api/executive";

export function useExecutive() {
  return useQuery({
    queryKey: ["executive-kpis"],
    queryFn: getExecutiveKPIs,
  });
}