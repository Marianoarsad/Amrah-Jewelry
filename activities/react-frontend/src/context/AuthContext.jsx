import { createContext, useContext, useState, useEffect } from "react";

import { authService } from "../service/authService.js";

const AuthContext = createContext(null);

export function AuthContextProvider ({ children }) {
    
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    
    useEffect(() => {

        const currentUser = authService.getCurrentUser();

        if (currentUser) {
            setUser(currentUser);
        }

        setLoading(false);

    }, [])

    async function login (credentials) {
        
        const data = await authService.login(credentials);
        setUser(data.user);
        return data
    }

    async function register (userData) {
        
        const data = await authService.login(credentials);
        return data

    }

    async function logout () {
        await authService.logout();
        setUser(null);
    }

    const authContext = {
        user: user,
        login: login,
        register: register,
        logout: logout,
        loading: loading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be within auth provider");
    }
    
}

export default AuthContext;