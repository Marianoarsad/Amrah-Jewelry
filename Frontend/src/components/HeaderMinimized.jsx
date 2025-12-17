// STYLES
import styles from '../css/HeaderMinimized.module.css';

// PACKAGES
import { Search, Phone, ShoppingCart, User } from 'lucide-react';

export default function HeaderMinimized () {
    
    
    return (
        <>
            <header className={styles.header}>
                <nav>
                    {/* LOGO */}
                    <a href='#'>
                        <img src='/amrah-logo-stand-alone.png' alt='amrah-logo' className={styles.logo}/>
                    </a>
                    {/* NAV LINKS */}
                    <ul>
                        <li><a href='#'>EARRINGS</a></li>
                        <li><a href='#'>NECKLACE</a></li>
                        <li><a href='#'>RINGS</a></li>
                        <li><a href='#'>BRACELET</a></li>
                        <li><a href='#'>MORE</a></li>
                    </ul>
                </nav>

                <p>
                    <button><Search/></button>
                    <div className={styles.verticalLine}></div>
                    <button><Phone/></button>
                    <button><ShoppingCart/></button>
                    <button><User/></button>
                </p>
            </header>
        </>
    )
}