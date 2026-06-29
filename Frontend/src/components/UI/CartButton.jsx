import { useContext } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import CartContext from "../../store/CartContext.jsx";
import WishlistContext from "../../store/WishlistContext.jsx";
import styles from "../../css/HeaderButtons.module.css";

// Shopping cart icon with an animated live item-count badge.
export function CartButton({ iconClassName, onClick }) {
    const cartCtx = useContext(CartContext);
    const count = cartCtx.totalQuantity;

    return (
        <span
            className={styles.iconWrap}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`Open cart (${count} items)`}
        >
            <ShoppingCart className={iconClassName} />
            <AnimatePresence>
                {count > 0 && (
                    <motion.span
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
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
}

// Wishlist heart icon with a live count badge; links to the wishlist page.
export function WishlistButton({ iconClassName, onClick }) {
    const wishlistCtx = useContext(WishlistContext);
    const count = wishlistCtx.count;

    return (
        <span
            className={styles.iconWrap}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`Open wishlist (${count} items)`}
        >
            <Heart className={iconClassName} />
            <AnimatePresence>
                {count > 0 && (
                    <motion.span
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
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
}
