import { useMutation } from "@tanstack/react-query";

import { generateAIReport } from "../api/ai";

export function useAIReport() {
  return useMutation({
    mutationFn: generateAIReport,
  });
}