// HOOKS & LIBRARIES
import { Minus, Plus, X } from "lucide-react";

// ASSETS
import SampleImage from '../assets/pearl.png';

import styles from '../css/CartItem.module.css'

export default function CartItem ({}) {
    
    return (
        <li className={styles.cartItem}>
            <img src={SampleImage}/>
            <div className={styles.cartItemLeftBody}>

                <p className={styles.cartItemTitle}>Pearl Bracelet</p>
                <p className={styles.cartItemSize}>Size: 5</p>

                <div className={styles.cartItemActions}>
                    <Plus className={styles.cartItemBtn}/>
                    <p className={styles.cartItemQuantity}>1</p>
                    <Minus className={styles.cartItemBtn}/>
                </div>

            </div>
            <div className={styles.cartItemRight}>
                <X color="#c7464e" size={16}/>
                <p>₱20,000</p>
            </div>
        </li>
    )
}