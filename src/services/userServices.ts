import apiClient from "./apiClient";

import { setToken, getToken } from "@/utils/token";

export const editAccount = async (name: string, email: string, password?: string) => {
  const payload: { name: string; email: string; password?: string } = { name, email };
  if (password) {
    payload.password = password; // Include password only if it's being updated
  }

  const res = await apiClient.put("/api/user/edit", payload);
  
  // Store updated user details while keeping the same token
  const token = getToken();
  if (token) {
    setToken(token, res.data.user);
  }

  return res.data.user; // Return updated user object
};


export const deleteAccount = async () => {
  const res = await apiClient.delete("/api/user/delete");
  return res.data;
};
