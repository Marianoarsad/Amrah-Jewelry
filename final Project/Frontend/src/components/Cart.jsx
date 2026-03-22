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

export default function Cart ({ ref }) {
    
    // ACCESSING USER PROGRESS { progress, showCart, hideCart, showCheckout, hideCheckout }
    const userProgressCtx = useContext(UserProgressContext);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    let content = (
        <>
            <div className={styles.cartBody}>
                <img src={EmptyCart} alt='empty cart' width="80rem"/>
                <span>YOUR CART IS EMPTY</span>
                <button><a>CONTINUE SHOPPING HERE</a></button>
            </div>
        </>
    )

    return (
        <Modal 
            className={styles.cart}
            open={userProgressCtx.progress === 'cart'}
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <button className={styles.modalActions} onClick={handleCloseCart}><ArrowLeft size={16} /></button>
            <ul className={styles.cartBody}>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </ul>
            <div className={styles.cartFooter}>
                <div className={styles.cartFooterUpper}>
                    <p className={styles.subtotal}>Subtotal:</p>
                    <p className={styles.totalPrice}>₱60,000</p>
                </div>
                <button className={styles.checkoutBtn}>CONTINUE TO CHECKOUT</button>
            </div>
        </Modal>
    );
}