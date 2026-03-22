import styles from '../../css/ProductItem.module.css'

import sampleImage from '../../assets/pearl.png';

export default function ProductItem ({ children, className }) {
    
    
    
    return (
        <li className={styles.shopGridMainItem}>
            <article>
                <img src={sampleImage}/>
                <p>Lorem Ipsum</p>
                <p className={styles.price}>₱9,600</p>
            </article>
        </li>
    )
}