"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/index";
import { getUserFromToken } from "@/utils/token";

interface AuthContextType {
    user?: unknown;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    useEffect(() => {
        setUser(getUserFromToken());
        console.log("Retrieved user: ", user)
      }, []);

    const login = (token: string, user: User) => {
        console.log("Login function called with user:", user);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true); // ✅ Update authentication state
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false); // ✅ Update authentication state
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
