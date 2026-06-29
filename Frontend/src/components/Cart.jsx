// HOOKS
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import styles from "../css/CartModal.module.css";

// PACKAGES
import { ArrowLeft, ShoppingBag, Trash2, Lock, Truck, Check } from "lucide-react";

// ASSETS
import EmptyCart from "/empty-cart.svg";

// COMPONENTS
import Modal from "./UI/Modal.jsx";
import CartItem from "./CartItem.jsx";

// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";

// UTIL
import { currencyFormatter } from "../util/formatting.js";

// Spend this much to unlock complimentary insured shipping.
const FREE_SHIPPING_THRESHOLD = 10000;

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const navigate = useNavigate();

    function handleCloseCart() {
        userProgressCtx.close();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    function handleContinueShopping() {
        userProgressCtx.close();
        navigate("/shop");
    }

    const cartTotal = cartCtx.totalPrice;
    const hasItems = cartCtx.products.length > 0;

    const remainingForFreeShipping = Math.max(
        0,
        FREE_SHIPPING_THRESHOLD - cartTotal,
    );
    const freeShippingUnlocked = remainingForFreeShipping === 0;
    const shippingProgress = Math.min(
        100,
        (cartTotal / FREE_SHIPPING_THRESHOLD) * 100,
    );

    let content;

    if (!hasItems) {
        content = (
            <>
                <div className={styles.cartHeader}>
                    <button
                        className={styles.modalActions}
                        onClick={handleCloseCart}
                        aria-label="Close cart"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <h3 className={styles.cartHeading}>Your Bag</h3>
                    <span className={styles.headerSpacer} />
                </div>
                <div className={styles.cartBody}>
                    <img src={EmptyCart} alt="empty cart" width="80" />
                    <span>Your bag is empty</span>
                    <p className={styles.emptySubtext}>
                        Discover pieces made to be treasured and passed on.
                    </p>
                    <button onClick={handleContinueShopping}>
                        CONTINUE SHOPPING
                    </button>
                </div>
            </>
        );
    } else {
        content = (
            <>
                <div className={styles.cartHeader}>
                    <button
                        className={styles.modalActions}
                        onClick={handleCloseCart}
                        aria-label="Close cart"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <h3 className={styles.cartHeading}>
                        Your Bag ({cartCtx.totalQuantity})
                    </h3>
                    <button
                        className={styles.clearBtn}
                        onClick={cartCtx.clearCart}
                        aria-label="Clear cart"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                {/* FREE SHIPPING PROGRESS */}
                <div className={styles.shippingBanner}>
                    <p className={styles.shippingMessage}>
                        {freeShippingUnlocked ? (
                            <>
                                <Check size={15} className={styles.shipIconOk} />
                                You&apos;ve unlocked free insured shipping!
                            </>
                        ) : (
                            <>
                                <Truck size={15} className={styles.shipIcon} />
                                You&apos;re{" "}
                                <strong>
                                    {currencyFormatter.format(
                                        remainingForFreeShipping,
                                    )}
                                </strong>{" "}
                                away from free shipping
                            </>
                        )}
                    </p>
                    <div className={styles.shippingTrack}>
                        <div
                            className={styles.shippingFill}
                            style={{ width: `${shippingProgress}%` }}
                        />
                    </div>
                </div>

                <ul className={styles.cartItemsList}>
                    <AnimatePresence initial={false}>
                        {cartCtx.products.map((product) => (
                            <CartItem key={product._id} product={product} />
                        ))}
                    </AnimatePresence>
                </ul>

                <div className={styles.cartFooter}>
                    <p className={styles.shippingNote}>
                        Shipping &amp; taxes calculated at checkout
                    </p>
                    <div className={styles.cartFooterUpper}>
                        <p className={styles.subtotal}>Subtotal</p>
                        <p className={styles.totalPrice}>
                            {currencyFormatter.format(cartTotal)}
                        </p>
                    </div>
                    <button
                        className={styles.checkoutBtn}
                        onClick={handleGoToCheckout}
                    >
                        <ShoppingBag size={18} />
                        CONTINUE TO CHECKOUT
                    </button>
                    <p className={styles.secureNote}>
                        <Lock size={12} /> Secure, encrypted checkout
                    </p>
                </div>
            </>
        );
    }

    return (
        <Modal
            className={styles.cart}
            open={userProgressCtx.progress === "cart"}
            onClose={
                userProgressCtx.progress === "cart" ? handleCloseCart : null
            }
            closeOnBackdrop
        >
            {content}
        </Modal>
    );
}
