
// COMPONENTS
import Promo from "./Promo.jsx";

// IMAGES
import AmrahLogo from '../assets/amrah-logo.png';
import UserIcon from '/user-icon.svg';
import ShoppingBag from '/shopping-bag.svg'
import Search from '/magnifying-glass.svg';

export default function Header ({ onOpenCart, onOpenSignin }) {
    
    return (
        <header>
            
            {/* LOGO  */}
            <a>
                <img src={AmrahLogo} alt="amrah-logo" width="140rem"/>
            </a>
            <nav>
                <ul>
                    <li><a href='#'>HOME</a></li>
                    <li><a href='#'>SHOP</a></li>
                    <li><a href='#'>COLLECTIONS</a></li>
                    <li><a href='#'>SERVICES</a></li>
                    
                </ul>
                
            </nav>

            {/* ICONS  */}
            <p>
                    <button>
                        <img src={Search}  width="30rem"/>
                    </button>
                    <button onClick={onOpenCart}>
                        <img src={ShoppingBag}  width="30rem"/>
                    </button>
                    <button onClick={onOpenSignin}>
                        <img src={UserIcon}  width="30rem"/>
                    </button>    
            </p>
        </header>
    )
}