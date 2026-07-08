import { useQuery } from "@tanstack/react-query";

import { getAdmissionsTrend } from "../api/admissions";

export function useAdmissions() {
  return useQuery({
    queryKey: ["admissions-trend"],
    queryFn: getAdmissionsTrend,
  });
}