import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', // 'cart', 'checkout', 'search'
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
    showSearch: () => {},
    hideSearch: () => {}
});

export function UserProgressContextProvider({ children }) {

    const [ userProgress, setUserProgress ] = useState('');

    function showCart() {
        setUserProgress('cart');
        console.log(userProgress);
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('');
    }

    function showSearch() {
        setUserProgress('search');
    }

    function hideSearch() {
        setUserProgress('');
    }

    const userProgressContext = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        showSearch,
        hideSearch
    }

    return <UserProgressContext.Provider value={userProgressContext}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;