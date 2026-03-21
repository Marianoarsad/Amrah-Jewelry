import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: () => {},
    removeItem: () => {}
})

function cartReducer( state, action ) {

}

export function CartContextProvider({ children }) {

    const [ cart, cartContextAction ] = useReducer(cartReducer, { items: [] });

    function addItem(item) {

    }

    function removeItem(id) {

    }

    const cartContext = {
        items: cart.items,
        addItem: addItem,
        removeItem: removeItem
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>

}