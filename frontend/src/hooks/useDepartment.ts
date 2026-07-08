import { useQuery } from "@tanstack/react-query";

import { getDepartmentPerformance } from "../api/department";

export function useDepartment() {
  return useQuery({
    queryKey: ["department-performance"],
    queryFn: getDepartmentPerformance,
  });
}