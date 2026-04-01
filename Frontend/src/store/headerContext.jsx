import { createContext, useState } from "react";

const UserProgressContext = createContext({
    headerType: '', // 'full', 'minimized'
    showPromo: () => {},
    hidePromo: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
    showSearch: () => {},
    hideSearch: () => {}
});

export function UserProgressContextProvider({ children }) {

    const [ userProgress, setUserProgress ] = useState('');

    //console.log(userProgress);

    function showCart() {
        setUserProgress('cart');
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