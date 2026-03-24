// HOOKS & LIBRARIES
import { createContext, useState, useEffect } from "react";

// SERVICES (Helper Functions)
import { authService } from '../services/authService.js';

const AuthContext = createContext({
    user: null,
    login: (credentials) => {},
    register: (userData) => {},
    logout: () => {},
    isAuthenticated: false
});

export function AuthContextProvider({ children }) {

    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    // useEffect(() => {
    //     const currentUser = authService.getCurrentUser();
    //     console.log(`Current User: ${JSON.stringify(currentUser)}`);

    //     if (currentUser) {
    //         setUser(currentUser);
    //     }

    // }, []);

    async function login (credentials) {
        const res = await authService.login(credentials);
        console.log(res);
        setUser(res);
        return res
    }

    async function register (userData) {
        const data = await authService.register(userData);
        return data;
    }

    async function logout () {
        await authService.logout();
        setUser(null);
    }

    const authContext = {
        user: user,
        isLoading,
        login,
        register,
        logout,
        // Double Negation Operator
        isAuthenticated: !!user // true or false
    }

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}

export default AuthContext;