import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', // 'cart', 'checkout', 'search', 'view', 'auth'
    showCart: () => {},
    showCheckout: () => {},
    showSearch: () => {},
    showProduct: () => {},
    showAuth: () => {},
    close: () => {}
});

export function UserProgressContextProvider({ children }) {

    const [ userProgress, setUserProgress ] = useState('');

    function showCart () {
        setUserProgress('cart');
    }

    function showCheckout () {
        setUserProgress('checkout');
    }

    function showSearch () {
        setUserProgress('search');
    }

    function showProduct () {
        setUserProgress('view');
    }

    function showAuth () {
        setUserProgress('auth');
    }

    function close () {
        setUserProgress('');
    }

    const userProgressContext = {
        progress: userProgress,
        showCart,
        showCheckout,
        showSearch,
        showProduct,
        showAuth,
        close
    }

    return <UserProgressContext.Provider value={userProgressContext}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;