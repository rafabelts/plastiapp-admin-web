"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService } from "../infrastructure/services/AuthService";

interface User {
    id: number;
    name: string;
    type: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            const currentUser = authService.getCurrentUser();
            const token = authService.getAccessToken();

            if (currentUser && token) {
                setUser(currentUser);
            }

            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const userData = await authService.login(email, password);
        setUser(userData);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout
            }
            }
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}