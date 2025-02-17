
const TOKEN_KEY = "authToken";
const USER_KEY = "authUser"; // Store user data separately

// Store Token & User Info in localStorage
export const setToken = (token: string, user: { name: string; email: string }) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log("user set to : " , user) // Store user details
};

// Retrieve Token from localStorage
export const getToken = (): string | null => {
    return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
};

// Remove Token & User Info from localStorage (Logout)
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

// Retrieve User Info from localStorage
export const getUserFromToken = (): { name: string; email: string } | null => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (!storedUser) return null;
    
    try {
        return JSON.parse(storedUser); // Retrieve user info
    } catch (error) {
        console.error("Failed to parse user data:", error);
        return null;
    }
};

// Check if User is Authenticated
export const isAuthenticated = (): boolean => {
    return !!getToken();
};
