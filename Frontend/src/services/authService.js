// ============================================================================
// AUTH SERVICE
// ----------------------------------------------------------------------------
// Tries the real backend first; if it's unreachable it falls back to a
// localStorage-backed mock so the auth flow is fully functional standalone.
// Session (user + token) is persisted so the user stays logged in on reload.
// ============================================================================

const API_URL = "http://localhost:8000/api/auth";

const SESSION_KEY = "amrah-auth"; // { user, token }
const USERS_KEY = "amrah-users"; // mock user store

// --- low level storage helpers --------------------------------------------
function readJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        /* storage unavailable — ignore */
    }
}

function persistSession(session) {
    writeJSON(SESSION_KEY, session);
}

function makeToken() {
    return "mock-" + Math.random().toString(36).slice(2) + Date.now();
}

function fetchWithTimeout(url, options, ms = 2500) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    return fetch(url, { ...options, signal: controller.signal }).finally(() =>
        clearTimeout(timer),
    );
}

// --- mock implementations --------------------------------------------------
const mockAuth = {
    register({ firstName, lastName, email, password }) {
        const users = readJSON(USERS_KEY, []);
        const exists = users.some(
            (u) => u.email.toLowerCase() === email.toLowerCase(),
        );
        if (exists) {
            throw new Error("An account with this email already exists.");
        }

        const user = {
            id: makeToken(),
            firstName,
            lastName,
            email,
            password, // demo only — never store plaintext passwords in production
        };
        users.push(user);
        writeJSON(USERS_KEY, users);

        const { password: _pw, ...safeUser } = user;
        const session = { user: safeUser, token: makeToken() };
        persistSession(session);
        return session;
    },

    login({ email, password }) {
        const users = readJSON(USERS_KEY, []);
        const match = users.find(
            (u) =>
                u.email.toLowerCase() === email.toLowerCase() &&
                u.password === password,
        );
        if (!match) {
            throw new Error("Invalid email or password.");
        }

        const { password: _pw, ...safeUser } = match;
        const session = { user: safeUser, token: makeToken() };
        persistSession(session);
        return session;
    },
};

// --- public API ------------------------------------------------------------
export const authService = {
    async login(credentials) {
        try {
            const response = await fetchWithTimeout(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed");

            const session = { user: data.user || data, token: data.token };
            persistSession(session);
            return session;
        } catch (error) {
            // Network/timeout → use the mock store. Re-throw real auth errors.
            if (error.name === "AbortError" || error instanceof TypeError) {
                return mockAuth.login(credentials);
            }
            throw error;
        }
    },

    async register(userData) {
        try {
            const response = await fetchWithTimeout(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.message || "Registration failed");

            const session = { user: data.user || data, token: data.token };
            persistSession(session);
            return session;
        } catch (error) {
            if (error.name === "AbortError" || error instanceof TypeError) {
                return mockAuth.register(userData);
            }
            throw error;
        }
    },

    logout() {
        try {
            localStorage.removeItem(SESSION_KEY);
        } catch {
            /* ignore */
        }
        return true;
    },

    getSession() {
        return readJSON(SESSION_KEY, null);
    },

    getCurrentUser() {
        const session = readJSON(SESSION_KEY, null);
        return session?.user || null;
    },

    getToken() {
        const session = readJSON(SESSION_KEY, null);
        return session?.token || null;
    },

    isAuthenticated() {
        return !!this.getToken();
    },
};

export default authService;
