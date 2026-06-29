import { createContext, useReducer, useEffect } from "react";

const STORAGE_KEY = "amrah-cart";

const CartContext = createContext({
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
    addProduct: (product, quantity) => {},
    removeProduct: (id) => {},
    updateQuantity: (id, quantity) => {},
    removeEntireProduct: (id) => {},
    clearCart: () => {},
});

// Load any previously persisted cart from localStorage.
function loadInitialCart() {
    if (typeof window === "undefined") return { products: [] };
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) return { products: [] };
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed.products) ? parsed : { products: [] };
    } catch {
        return { products: [] };
    }
}

function cartReducer(state, action) {
    // ADD PRODUCT TO CART (optionally more than one at a time)
    if (action.type === "ADD_PRODUCT") {
        const amount = action.quantity ?? 1;

        const existingIndex = state.products.findIndex(
            (product) => product._id === action.product._id,
        );

        const updatedProducts = [...state.products];

        if (existingIndex > -1) {
            const existingProduct = state.products[existingIndex];
            updatedProducts[existingIndex] = {
                ...existingProduct,
                quantity: existingProduct.quantity + amount,
            };
        } else {
            updatedProducts.push({ ...action.product, quantity: amount });
        }

        return { ...state, products: updatedProducts };
    }

    // DECREMENT QUANTITY BY ONE (removes the line when it hits zero)
    if (action.type === "REMOVE_PRODUCT") {
        const existingIndex = state.products.findIndex(
            (product) => product._id === action.id,
        );
        if (existingIndex === -1) return state;

        const existingProduct = state.products[existingIndex];
        const updatedProducts = [...state.products];

        if (existingProduct.quantity === 1) {
            updatedProducts.splice(existingIndex, 1);
        } else {
            updatedProducts[existingIndex] = {
                ...existingProduct,
                quantity: existingProduct.quantity - 1,
            };
        }

        return { ...state, products: updatedProducts };
    }

    // SET AN EXACT QUANTITY FOR A LINE ITEM
    if (action.type === "UPDATE_QUANTITY") {
        const existingIndex = state.products.findIndex(
            (product) => product._id === action.id,
        );
        if (existingIndex === -1) return state;

        const updatedProducts = [...state.products];

        if (action.quantity <= 0) {
            updatedProducts.splice(existingIndex, 1);
        } else {
            updatedProducts[existingIndex] = {
                ...updatedProducts[existingIndex],
                quantity: action.quantity,
            };
        }

        return { ...state, products: updatedProducts };
    }

    // REMOVE AN ENTIRE LINE ITEM REGARDLESS OF QUANTITY
    if (action.type === "REMOVE_ENTIRE_PRODUCT") {
        return {
            ...state,
            products: state.products.filter(
                (product) => product._id !== action.id,
            ),
        };
    }

    // CLEAR THE CART
    if (action.type === "CLEAR_CART") {
        return { ...state, products: [] };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(
        cartReducer,
        undefined,
        loadInitialCart,
    );

    // Persist the cart on every change so it survives reloads.
    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch {
            /* storage may be unavailable (private mode) — fail silently */
        }
    }, [cart]);

    function addProduct(product, quantity = 1) {
        dispatchCartAction({ type: "ADD_PRODUCT", product, quantity });
    }

    function removeProduct(id) {
        dispatchCartAction({ type: "REMOVE_PRODUCT", id });
    }

    function updateQuantity(id, quantity) {
        dispatchCartAction({ type: "UPDATE_QUANTITY", id, quantity });
    }

    function removeEntireProduct(id) {
        dispatchCartAction({ type: "REMOVE_ENTIRE_PRODUCT", id });
    }

    function clearCart() {
        dispatchCartAction({ type: "CLEAR_CART" });
    }

    const totalQuantity = cart.products.reduce(
        (sum, product) => sum + product.quantity,
        0,
    );

    const totalPrice = cart.products.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0,
    );

    const cartContext = {
        products: cart.products,
        totalQuantity,
        totalPrice,
        addProduct,
        removeProduct,
        updateQuantity,
        removeEntireProduct,
        clearCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
