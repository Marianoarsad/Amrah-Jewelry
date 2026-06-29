// HOOKS & LIBRARIES
import { createContext, useState, useEffect, useCallback } from "react";

// SERVICES
import { authService } from "../services/authService.js";

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async (credentials) => {},
    register: async (userData) => {},
    logout: () => {},
});

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Restore a persisted session on first load so the user stays signed in.
    useEffect(() => {
        const current = authService.getCurrentUser();
        if (current) setUser(current);
    }, []);

    const login = useCallback(async (credentials) => {
        setIsLoading(true);
        try {
            const session = await authService.login(credentials);
            setUser(session.user);
            return session.user;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (userData) => {
        setIsLoading(true);
        try {
            const session = await authService.register(userData);
            setUser(session.user);
            return session.user;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
    }, []);

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthContext;
