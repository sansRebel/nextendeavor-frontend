import apiClient from "./apiClient";
import { AuthResponse } from "@/types/index";
import { setToken } from "@/utils/token";

export const signup = async (name: string, email: string, password: string) => {
  const res = await apiClient.post<AuthResponse>("/auth/signup", { name, email, password });
  setToken(res.data.token);
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await apiClient.post<AuthResponse>("/auth/login", { email, password });
  setToken(res.data.token);
  return res.data;
};
