import apiClient from "./apiClient";
import { AuthResponse } from "@/types/index";

export const signup = async (name: string, email: string, password: string) => {
  const res = await apiClient.post<AuthResponse>("/auth/signup", { name, email, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await apiClient.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
};
