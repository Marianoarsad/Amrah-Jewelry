// HOOKS
import { useContext } from 'react';

import styles from '../css/CartModal.module.css';

// PACKAGES
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

// IMAGES
import EmptyCart from '/empty-cart.svg';

// COMPONENTS
import Modal from './UI/Modal.jsx';

// CONTEXT
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Cart ({ ref }) {
    
    // ACCESSING USER PROGRESS { progress, showCart, hideCart, showCheckout, hideCheckout }
    const userProgressCtx = useContext(UserProgressContext);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    return (
        <Modal 
            className={styles.cartModal} 
            open={userProgressCtx.progress === 'cart'}
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
        >
            <button className={styles.modalActions} onClick={handleCloseCart}><ArrowLeft /></button>
            <div className={styles.cartBody}>
                <img src={EmptyCart} alt='empty cart' width="80rem"/>
                <span>YOUR CART IS EMPTY</span>
                <button><a>CONTINUE SHOPPING HERE</a></button>
            </div>
        </Modal>
    );
}