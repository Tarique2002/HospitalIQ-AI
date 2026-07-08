import { API_URL as API } from "./config";
import axios from "axios";



export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  role: string;
}

export interface User {
  id: number;
  name: string;
  full_name?: string; // alias for display purposes
  email: string;
  role: string;
  is_active: boolean;
}

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    `${API}/auth/login`,
    data
  );

  return response.data;
}

export async function getCurrentUser(
  token: string
): Promise<User> {
  const response = await axios.get<User>(
    `${API}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}