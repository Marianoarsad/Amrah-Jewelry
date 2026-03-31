import styles from '../../css/GridItem.module.css'

import sampleImage from '../../assets/pearl.png';

export default function GridItem ({ children, className }) {
    
    
    
    return (
        <li className={styles.shopGridMainItem}>
            <article>
                <img src={sampleImage}/>
                <p>Lorem Ipsum</p>
                <p>Pendant in Yellow Gold with Diamonds</p>
                <p className={styles.price}>₱9,600</p>
            </article>
            
        </li>
    )
}