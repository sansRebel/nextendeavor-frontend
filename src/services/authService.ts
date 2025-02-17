import apiClient from "./apiClient";
import { AuthResponse } from "@/types/index";
import { setToken } from "@/utils/token";

export const signup = async (name: string, email: string, password: string) => {
  const res = await apiClient.post("/api/auth/signup", { name, email, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await apiClient.post<AuthResponse>("/api/auth/login", { email, password });
  setToken(res.data.token, res.data.user); // Store token and user info
  return res.data;
};
