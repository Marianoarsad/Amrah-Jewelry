
// COMPONENTS
import Promo from "./Promo.jsx";

// IMAGES
import AmrahLogo from '../assets/amrah-logo.png';
import UserIcon from '/user-icon.svg';
import ShoppingBag from '/shopping-bag.svg'
import Search from '/magnifying-glass.svg';

export default function Header ({ onOpenCart }) {
    
    return (
        <header>
            
            {/* LOGO  */}
            <a>
                <img src={AmrahLogo} alt="amrah-logo" width="140rem"/>
            </a>
            <nav>
                <ul>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>Shop</a></li>
                    <li><a href='#'>Collections</a></li>
                    <li><a href='#'>Services</a></li>
                    
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
                    <button>
                        <img src={UserIcon}  width="30rem"/>
                    </button>    
            </p>
        </header>
    )
}