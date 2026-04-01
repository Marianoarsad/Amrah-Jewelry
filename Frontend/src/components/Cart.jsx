// HOOKS
import { useContext } from 'react';

import styles from '../css/CartModal.module.css';

// PACKAGES
import { ArrowLeft, ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";

// ASSETS
import EmptyCart from '/empty-cart.svg';

// COMPONENTS
import Modal from './UI/Modal.jsx';
import CartItem from './CartItem.jsx';

// CONTEXT
import UserProgressContext from '../store/UserProgressContext.jsx';
import CartContext from '../store/CartContext.jsx';

// UTIL
import { currencyFormatter } from '../util/formatting.js';

export default function Cart ({ ref }) {
    
    // { products, addProduct, removeProduct, clearCart  }
    const cartCtx = useContext(CartContext);
    //console.log(`cartCtx.products: ${cartCtx.products}`);

    // { progress, showCart, hideCart, showCheckout, hideCheckout }
    const userProgressCtx = useContext(UserProgressContext);

    function handleCloseCart () {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout () {
        userProgressCtx.showCheckout();
    }

    // FORMATTING CART TOTAL INTO CURRENCY
    const cartTotal = cartCtx.products.reduce((totalPrice, product) => {

        // MULTIPLYING THE QUANTITY AND PRICE OF ALL ITEMS IN THE CART
        return totalPrice + product.quantity * product.price

    }, 0);

    let content = (
        <>
            <button className={styles.modalActions} onClick={handleCloseCart}><ArrowLeft size={16} /></button>
            <div className={styles.cartBody}>
                <img src={EmptyCart} alt='empty cart' width="80rem"/>
                <span>YOUR CART IS EMPTY</span>
                <button><a>CONTINUE SHOPPING HERE</a></button>
            </div>
        </>
    )

    if (cartCtx.products.length > 1) {
        content = (
            <>
                <button className={styles.modalActions} onClick={handleCloseCart}><ArrowLeft size={16} /></button>
                <ul className={styles.cartBody}>
                    {/*CART ITEMS*/}
                    {cartCtx.products?.map((product) => (
                        <CartItem
                            key={product._id} 
                            product={product}
                        />
                    ))}
                </ul>
                <div className={styles.cartFooter}>
                    <div className={styles.cartFooterUpper}>
                        <p className={styles.subtotal}>Subtotal:</p>
                        <p className={styles.totalPrice}>{currencyFormatter.format(cartTotal)}</p>
                    </div>
                    <button 
                        className={styles.checkoutBtn}
                        onClick={handleGoToCheckout}
                    >
                        CONTINUE TO CHECKOUT
                    </button>
                </div>
            </>
        )
    }

    return (
        <Modal 
            className={styles.cart}
            open={userProgressCtx.progress === 'cart'}
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            {content}
        </Modal>
    );
}