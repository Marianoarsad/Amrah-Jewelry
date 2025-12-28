import styles from '../css/CartModal.module.css';

// PACKAGES
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

// IMAGES
import EmptyCart from '/empty-cart.svg';

export default function CartModal ({ ref }) {
    
    return (
        <dialog ref={ref} className={styles.cartModal}>

            <form method="dialog">
                <button><ArrowLeft /></button>
            </form>

            <div className={styles.cartBody}>
                <img src={EmptyCart} alt='empty cart' width="100rem"/>
                <p>Your cart is empty</p>
                <p>Continue shopping <a href='#'>here</a></p>
            </div>
                
            <div className={styles.cartFooter}>
                <div className={styles.cartFooterBody}>
                    <h3>YOU MAY LIKE</h3>
                    <button className={styles.cartFooterBtn}>
                        <ChevronLeft style={{stroke: "#C64B50"}} />
                    </button>
                    <button className={styles.cartFooterBtn}>
                        <ChevronRight style={{stroke: "#C64B50"}} />
                    </button>
                </div>
                <div className={styles.cartFooterProductContainer}>

                </div>   
            </div> 
        </dialog>
    );
}