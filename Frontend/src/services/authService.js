// HELPER FUNCTIONS FOR EXECUTING API CALLS

const API_URL = 'http://localhost:8000/api/auth';

export const authService = {
    async login (credentials) {
        // SENDS LOGIN CREDENTIALS TO BACKEND 1️⃣
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        // CONVERTS DATA RECEIVED (FROM THE BACKEND) INTO JSON 2️⃣
        const data = await response.json(); // Success or Fail

        // IF THERE IS AN ERROR 2️⃣
        if (!response.ok) {
            throw new Error(data.message || 'Login Failed');
        }

        // SAVE USER DATA TO LOCALSTORAGE FOR PERSISTENCE 3️⃣
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));

        // SENDS DATA TO CLIENT 3️⃣
        return data
    },

    async register (userData) {
        // SENDS UUSER INPUT TO BACKEND 1️⃣
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        // CONVERTS DATA RECEIVED (FROM THE BACKEND) INTO JSON 2️⃣
        const data = await response.json(); // Success or Fail

        // IF THERE IS AN ERROR 2️⃣
        if (!response.ok) {
            throw new Error(data.message || 'Registeration Failed');
        }

        // SENDS DATA TO CLIENT 4️⃣
        return data
    },

    async logout () {
        // IDENTIFY TOKEN 1️⃣
        const token = localStorage.getItem('token');

        // SENDS LOGOUT REQUEST TO BACKEND 1️⃣
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        // TERMINATE TOKEN & USER 2️⃣
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // RESPOND TO CLIENT 3️⃣
        return response.ok
    },

    getCurrentUser () {
        // DETERMINE CURRENT USER 1️⃣
        const user = localStorage.getItem('user');
        
        // IF USER FOUND, PARSE AND SEND USER DATA TO CLIENT 2️⃣
        if (user) return JSON.parse(user);
        
        // IF NO USER FOUND, SEND NOTHING TO CLIENT 2️⃣
        return null
    },

    getToken () {
        return localStorage.getItem('token');
    },

    isAuthenticated () {
        return !!this.getToken();
    }
}