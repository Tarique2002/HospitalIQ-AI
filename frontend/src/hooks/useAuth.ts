import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import type { LoginRequest } from "../api/auth";

export function useAuth() {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
  });
}