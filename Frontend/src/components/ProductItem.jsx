// HOOKS & LIBRARIES
import { useContext } from 'react';

// CONTEXT 
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

import styles from '../css/ProductItem.module.css'

import sampleImage from '../assets/pearl.png';

export default function ProductItem ({ children, className, id, name, category, description, price, product }) {
    
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    function handleShowProduct () {
        userProgressCtx.showProduct();
        //cartCtx.addProduct(product); ADDING PRODUCT TO CART
    }

    return (
        <li 
            className={styles.shopGridMainItem}
            onClick={handleShowProduct}
        >
            <article>
                <img src={sampleImage}/>
                <p>{name}</p>
                <p className={styles.price}>{price}</p>
            </article>
        </li>
    )
}