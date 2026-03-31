import { createContext, useReducer } from "react";

const CartContext = createContext({
    products: [],
    addProduct: (product) => {},
    removeProduct: (id) => {},
    clearCart: () => {}
})

function cartReducer( state, action ) {
    
    // ADD PRODUCT TO CART
    if (action.type === 'ADD_PRODUCT') {
        
        const existingCartProductIndex = state.products.findIndex(
            (product) => product._id === action.product._id
        );
        //console.log(`existingCartProductIndex: ${existingCartProductIndex}`);

        // COPY OF OLD ARRAY
        const updatedProducts = [ ...state.products ];
        //console.log(`updatedProducts: ${JSON.stringify(updatedProducts)}`);

        // IF ITEM ALREADY EXISTS
        if (existingCartProductIndex > -1) {
            
            const existingProduct = state.products[existingCartProductIndex];

            // SPREAD EXISTING PROPERTIES OF EXISTING ITEM 
            // AND ADD 1 TO ITS QUANTITY PROPERTY
            const updatedProduct = {
                ...existingProduct,
                quantity: existingProduct.quantity + 1
            };

            updatedProducts[existingCartProductIndex] = updatedProduct;

        } else {

            // IF ITEM DOES NOT EXIST
            updatedProducts.push({ ...action.product, quantity: 1 });

        }

        // RETURN NEW STATE/OBJECT
        return { ...state, products: updatedProducts };
    }

    if (action.type === 'REMOVE_PRODUCT') {

        console.log(action.id);

        const existingCartProductIndex = state.products.findIndex(
            (product) => product._id === action.id
        );
        console.log(`existingCartProductIndex: ${existingCartProductIndex}`);

        const existingProductItem = state.products[existingCartProductIndex];
        console.log(`existingProductItem: ${existingProductItem}`)

        // COPY OF OLD ITEMS ARRAY
        const updatedProducts = [ ...state.products ];

        if (existingProductItem.quantity === 1) {

            // REMOVE THE ENTIRE ITEM BEC QUANTITY WILL EQUAL TO 0
            updatedProducts.splice(existingCartProductIndex, 1);

        } else {

            // REDUCE QUANTITY PROPERTY OF PRODUCT
            const updatedProduct = {
                ...existingProductItem,
                quantity: existingProductItem.quantity - 1
            };

            // REPLACE THE SPECIFIC ITEM IN THE ITEMS ARRAY
            updatedProducts[existingCartProductIndex] = updatedProduct;

        }

        // RETURN NEW STATE/OBJECT
        return { ...state, products: updatedProducts }
    }

    // CLEARING CART
    if (action.type === "CLEAR_CART") {
        return { ...state, products: [] }
    }

    // if conditions didnt meet any IF BLOCK, return as an UNCHANGED STATE
    return state
}

export function CartContextProvider({ children }) {

    const [ cart, dispatchCartAction ] = useReducer(cartReducer, { products: [] });

    function addProduct(product) {
        dispatchCartAction({ type: 'ADD_PRODUCT', product: product })
    }

    function removeProduct(id) {
        dispatchCartAction({ type: 'REMOVE_PRODUCT', id });
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        products: cart.products,
        addProduct: addProduct,
        removeProduct: removeProduct,
        clearCart: clearCart
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext