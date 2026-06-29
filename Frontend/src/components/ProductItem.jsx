// HOOKS & LIBRARIES
import { useContext, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag } from "lucide-react";

// CONTEXT
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import ToastContext from "../store/ToastContext";
import WishlistContext from "../store/WishlistContext";

// COMPONENTS
import Rating from "./UI/Rating.jsx";

// UTIL
import { currencyFormatter } from "../util/formatting.js";

import FallbackImage from "../assets/pearl.png";
import styles from "../css/ProductItem.module.css";

function ProductItem({ product, price }) {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const toastCtx = useContext(ToastContext);
    const wishlistCtx = useContext(WishlistContext);

    const navigate = useNavigate();

    const wishlisted = wishlistCtx.isWishlisted(product._id);

    function handleOpenDetail() {
        navigate(`/product/${product._id}`);
    }

    function handleQuickView(e) {
        e.stopPropagation();
        userProgressCtx.showProduct(product);
    }

    function handleAddToCart(e) {
        e.stopPropagation();
        cartCtx.addProduct(product);
        toastCtx.addToast(`${product.name} added to bag`, {
            image: product.image,
        });
    }

    function handleToggleWishlist(e) {
        e.stopPropagation();
        wishlistCtx.toggle(product);
        toastCtx.addToast(
            wishlisted
                ? `Removed from wishlist`
                : `${product.name} saved to wishlist`,
            { type: "wishlist" },
        );
    }

    return (
        <motion.li
            className={styles.card}
            onClick={handleOpenDetail}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            <div className={styles.imageWrap}>
                <img
                    className={styles.image}
                    src={product.image || FallbackImage}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = FallbackImage;
                    }}
                />

                {/* BADGES */}
                <div className={styles.badges}>
                    {product.isNew && (
                        <span className={`${styles.badge} ${styles.badgeNew}`}>
                            NEW
                        </span>
                    )}
                    {product.bestseller && (
                        <span className={`${styles.badge} ${styles.badgeBest}`}>
                            BESTSELLER
                        </span>
                    )}
                </div>

                {/* WISHLIST */}
                <button
                    className={`${styles.wishBtn} ${wishlisted ? styles.wishActive : ""}`}
                    onClick={handleToggleWishlist}
                    aria-label="Toggle wishlist"
                >
                    <Heart
                        size={18}
                        fill={wishlisted ? "#c64b50" : "none"}
                    />
                </button>

                {/* HOVER ACTIONS */}
                <div className={styles.hoverActions}>
                    <button
                        className={styles.quickViewBtn}
                        onClick={handleQuickView}
                    >
                        <Eye size={16} /> Quick View
                    </button>
                    <button
                        className={styles.addBtn}
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag size={16} /> Add to Bag
                    </button>
                </div>
            </div>

            <article className={styles.info}>
                <p className={styles.name}>{product.name}</p>
                <Rating
                    value={product.rating || 0}
                    reviews={product.reviews}
                    size={13}
                />
                <p className={styles.price}>
                    {price || currencyFormatter.format(product.price)}
                </p>
            </article>
        </motion.li>
    );
}

export default memo(ProductItem);
