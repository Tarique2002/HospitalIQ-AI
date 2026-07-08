import { useQuery } from "@tanstack/react-query";

import { getPatientSatisfaction } from "../api/patientSatisfaction";

export function usePatientSatisfaction() {
  return useQuery({
    queryKey: ["patient-satisfaction"],
    queryFn: getPatientSatisfaction,
  });
}