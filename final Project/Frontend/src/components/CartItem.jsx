// HOOKS & LIBRARIES
import { useContext } from "react";
import { Minus, Plus, X } from "lucide-react";

// ASSETS
import SampleImage from '../assets/pearl.png';

// CONTEXT
import CartContext from "../store/CartContext";

// UTIL
import { currencyFormatter } from "../util/formatting.js";

import styles from '../css/CartItem.module.css'

export default function CartItem ({ product }) {
    
    // CART CONTEXT
    const cartCtx = useContext(CartContext);

    function handleIncrease () {
        cartCtx.addProduct(product);
    }

    function handleDecrease () {
        cartCtx.removeProduct(product._id);
    }

    return (
        <li className={styles.cartItem}>
            <img src={SampleImage}/>
            <div className={styles.cartItemLeftBody}>

                <p className={styles.cartItemTitle}>{product.name}</p>
                <p className={styles.cartItemSize}>Size: 5</p>

                <div className={styles.cartItemActions}>
                    <Plus 
                        className={styles.cartItemBtn}
                        onClick={handleIncrease}
                    />
                    <p className={styles.cartItemQuantity}>{product.quantity}</p>
                    <Minus 
                        className={styles.cartItemBtn}
                        onClick={handleDecrease}
                    />
                </div>

            </div>
            <div className={styles.cartItemRight}>
                <X color="#c7464e" size={16}/>
                <p>{currencyFormatter.format(product.price)}</p>
            </div>
        </li>
    )
}