import { createContext, useReducer, useEffect } from "react";

const STORAGE_KEY = "amrah-wishlist";

const WishlistContext = createContext({
    items: [],
    count: 0,
    isWishlisted: (id) => false,
    toggle: (product) => {},
    remove: (id) => {},
});

function loadInitial() {
    if (typeof window === "undefined") return { items: [] };
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) return { items: [] };
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed.items) ? parsed : { items: [] };
    } catch {
        return { items: [] };
    }
}

function reducer(state, action) {
    if (action.type === "TOGGLE") {
        const exists = state.items.some(
            (item) => item._id === action.product._id,
        );
        if (exists) {
            return {
                items: state.items.filter(
                    (item) => item._id !== action.product._id,
                ),
            };
        }
        return { items: [...state.items, action.product] };
    }

    if (action.type === "REMOVE") {
        return { items: state.items.filter((item) => item._id !== action.id) };
    }

    return state;
}

export function WishlistContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            /* ignore storage errors */
        }
    }, [state]);

    const value = {
        items: state.items,
        count: state.items.length,
        isWishlisted: (id) => state.items.some((item) => item._id === id),
        toggle: (product) => dispatch({ type: "TOGGLE", product }),
        remove: (id) => dispatch({ type: "REMOVE", id }),
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistContext;
