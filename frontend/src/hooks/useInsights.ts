import { useQuery } from "@tanstack/react-query";
import { getAIInsights } from "../api/insights";

export function useInsights() {
  return useQuery({
    queryKey: ["ai-insights"],
    queryFn: getAIInsights,
  });
}