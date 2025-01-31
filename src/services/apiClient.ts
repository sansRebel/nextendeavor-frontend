import axios from "axios";
import { getToken } from "@/utils/token"; 

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://nextendeavor-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach Authorization header if token exists
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
