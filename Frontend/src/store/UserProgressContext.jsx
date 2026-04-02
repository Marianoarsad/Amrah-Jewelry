import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '', // 'cart', 'checkout', 'search', 'view'
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
    showSearch: () => {},
    hideSearch: () => {},
    showProduct: () => {},
    hideProduct: () => {}
});

export function UserProgressContextProvider({ children }) {

    const [ userProgress, setUserProgress ] = useState('');

    //console.log(userProgress);

    function showCart () {
        setUserProgress('cart');
    }

    function hideCart () {
        setUserProgress('');
    }

    function showCheckout () {
        setUserProgress('checkout');
    }

    function hideCheckout () {
        setUserProgress('');
    }

    function showSearch () {
        setUserProgress('search');
    }

    function hideSearch () {
        setUserProgress('');
    }

    function showProduct () {
        setUserProgress('view');
    }

    function hideProduct () {
        setUserProgress('');
    }

    const userProgressContext = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        showSearch,
        hideSearch,
        showProduct,
        hideProduct
    }

    return <UserProgressContext.Provider value={userProgressContext}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;