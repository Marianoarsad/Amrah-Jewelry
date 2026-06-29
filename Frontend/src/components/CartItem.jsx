// HOOKS & LIBRARIES
import { useContext, memo } from "react";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";

// ASSETS
import FallbackImage from "../assets/pearl.png";

// CONTEXT
import CartContext from "../store/CartContext";

// UTIL
import { currencyFormatter } from "../util/formatting.js";

import styles from "../css/CartItem.module.css";

function CartItem({ product }) {
    const cartCtx = useContext(CartContext);

    function handleIncrease() {
        cartCtx.addProduct(product);
    }

    function handleDecrease() {
        cartCtx.removeProduct(product._id);
    }

    function handleRemove() {
        cartCtx.removeEntireProduct(product._id);
    }

    const lineTotal = product.price * product.quantity;

    return (
        <motion.li
            className={styles.cartItem}
            layout
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.25 }}
        >
            <img
                src={product.image || FallbackImage}
                alt={product.name}
                onError={(e) => {
                    e.currentTarget.src = FallbackImage;
                }}
            />
            <div className={styles.cartItemLeftBody}>
                <p className={styles.cartItemTitle}>{product.name}</p>
                {product.selectedSize && (
                    <p className={styles.cartItemSize}>
                        Size: {product.selectedSize}
                    </p>
                )}

                <div className={styles.cartItemActions}>
                    <button
                        className={styles.stepBtn}
                        onClick={handleDecrease}
                        aria-label="Decrease quantity"
                    >
                        <Minus size={14} />
                    </button>
                    <p className={styles.cartItemQuantity}>
                        {product.quantity}
                    </p>
                    <button
                        className={styles.stepBtn}
                        onClick={handleIncrease}
                        aria-label="Increase quantity"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>
            <div className={styles.cartItemRight}>
                <button
                    className={styles.removeBtn}
                    onClick={handleRemove}
                    aria-label="Remove item"
                >
                    <X color="#c7464e" size={16} />
                </button>
                <p>{currencyFormatter.format(lineTotal)}</p>
            </div>
        </motion.li>
    );
}

export default memo(CartItem);
