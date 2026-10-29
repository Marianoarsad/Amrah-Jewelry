import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { AnimatePresence, motion as Motion } from "framer-motion";

import CartContext from "../../store/CartContext.jsx";
import WishlistContext from "../../store/WishlistContext.jsx";
import styles from "../../css/HeaderButtons.module.css";

// Shopping cart icon with an animated live item-count badge.
export function CartButton({ iconClassName, onClick }) {
    const cartCtx = useContext(CartContext);
    const count = cartCtx.totalQuantity;

    return (
        <button
            type="button"
            className={styles.iconWrap}
            onClick={onClick}
            aria-label={`Open cart (${count} items)`}
        >
            <ShoppingCart className={iconClassName} />
            <AnimatePresence>
                {count > 0 && (
                    <Motion.span
                        key={count}
                        className={styles.badge}
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 18,
                        }}
                    >
                        {count}
                    </Motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}

// Wishlist heart icon with a live count badge; links to the wishlist page.
export function WishlistButton({ iconClassName, onClick }) {
    const wishlistCtx = useContext(WishlistContext);
    const count = wishlistCtx.count;

    return (
        <Link
            to="/wishlist"
            className={styles.iconWrap}
            onClick={onClick}
            aria-label={`Open wishlist (${count} items)`}
        >
            <Heart className={iconClassName} />
            <AnimatePresence>
                {count > 0 && (
                    <Motion.span
                        key={count}
                        className={styles.badge}
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 18,
                        }}
                    >
                        {count}
                    </Motion.span>
                )}
            </AnimatePresence>
        </Link>
    );
}
