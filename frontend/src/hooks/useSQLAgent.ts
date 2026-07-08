import { useMutation } from "@tanstack/react-query";
import { askAI } from "../api/sqlAgent";

export function useSQLAgent() {
  return useMutation({
    mutationFn: askAI,
  });
}