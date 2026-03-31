// HOOKS & LIBRARIES
import { createContext, useState, useEffect, useReducer } from "react";

// SERVICES (Helper Functions)
import { authService } from '../services/authService.js';

const AuthContext = createContext({
    user: null,
    login: (credentials) => {},
    register: (userData) => {},
    logout: () => {}
});

export function AuthContextProvider({ children }) {

    const [ currentUser, setCurrentUser ] = useState(null);
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
        //console.log(res);
        setCurrentUser(res);
        return res
    }

    async function register (userData) {
        const data = await authService.register(userData);
        return data;
    }

    async function logout () {
        await authService.logout();
        setCurrentUser(null);
    }

    const authContext = {
        user: currentUser,
        isLoading,
        login,
        register,
        logout,
    }

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}

export default AuthContext;