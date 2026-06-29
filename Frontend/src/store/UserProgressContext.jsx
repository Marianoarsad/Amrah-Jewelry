import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: "", // 'cart', 'checkout', 'search', 'view', 'auth'
    selectedProduct: null,
    showCart: () => {},
    showCheckout: () => {},
    showSearch: () => {},
    showProduct: (product) => {},
    showAuth: () => {},
    close: () => {},
});

export function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    function showCart() {
        setUserProgress("cart");
    }

    function showCheckout() {
        setUserProgress("checkout");
    }

    function showSearch() {
        setUserProgress("search");
    }

    // Opens the quick-view modal for a specific product.
    function showProduct(product = null) {
        if (product) setSelectedProduct(product);
        setUserProgress("view");
    }

    function showAuth() {
        setUserProgress("auth");
    }

    function close() {
        setUserProgress("");
    }

    const userProgressContext = {
        progress: userProgress,
        selectedProduct,
        showCart,
        showCheckout,
        showSearch,
        showProduct,
        showAuth,
        close,
    };

    return (
        <UserProgressContext.Provider value={userProgressContext}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;
