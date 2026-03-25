// HOOKS & LIBRARIES
import { useContext } from 'react';

// CONTEXT 
import CartContext from '../store/CartContext';

import styles from '../css/ProductItem.module.css'

import sampleImage from '../assets/pearl.png';

export default function ProductItem ({ children, className, id, name, category, description, price, product }) {
    
    const cartCtx = useContext(CartContext);

    function handleAddProductToCart () {
        cartCtx.addProduct(product);
    }

    return (
        <li 
            className={styles.shopGridMainItem}
            onClick={handleAddProductToCart}
        >
            <article>
                <img src={sampleImage}/>
                <p>{name}</p>
                <p className={styles.price}>{price}</p>
            </article>
        </li>
    )
}