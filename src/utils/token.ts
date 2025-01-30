import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "authToken";

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const getUserFromToken = (): { _id: string; name: string; email: string } | null => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode<{ _id: string; name: string; email: string }>(token);
        return decoded;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};
