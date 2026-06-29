// HOOKS AND LIBRARIES
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowRight } from "lucide-react";

// CONTEXT
import UserProgressContext from "../../store/UserProgressContext.jsx";
import CartContext from "../../store/CartContext.jsx";
import ToastContext from "../../store/ToastContext.jsx";

// COMPONENTS
import Modal from "./Modal.jsx";
import Rating from "./Rating.jsx";

// UTIL
import { currencyFormatter } from "../../util/formatting.js";

import FallbackImage from "../../assets/pearl.png";
import styles from "../../css/Product.module.css";

export default function Product() {
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);
    const toastCtx = useContext(ToastContext);
    const navigate = useNavigate();

    const product = userProgressCtx.selectedProduct;

    const [material, setMaterial] = useState(null);
    const [size, setSize] = useState(null);

    // Reset selected options whenever a new product is opened.
    useEffect(() => {
        if (product) {
            setMaterial(product.materials?.[0]?.name || null);
            setSize(product.sizes?.[0] || null);
        }
    }, [product]);

    function handleHideProduct() {
        userProgressCtx.close();
    }

    function handleAddToCart() {
        cartCtx.addProduct({
            ...product,
            selectedSize: size,
            selectedMaterial: material,
        });
        toastCtx.addToast(`${product.name} added to bag`, {
            image: product.image,
        });
    }

    function handleBuyNow() {
        cartCtx.addProduct({
            ...product,
            selectedSize: size,
            selectedMaterial: material,
        });
        userProgressCtx.showCheckout();
    }

    function handleViewFull() {
        userProgressCtx.close();
        navigate(`/product/${product._id}`);
    }

    const open = userProgressCtx.progress === "view";

    return (
        <Modal
            className={styles.product}
            open={open}
            onClose={open ? handleHideProduct : null}
        >
            {product && (
                <div className={styles.productBody}>
                    <div className={styles.productBodyLeft}>
                        <button
                            onClick={handleHideProduct}
                            className={styles.closeBtn}
                            aria-label="Close"
                        >
                            <ChevronLeft color="#94161b" size={24} />
                        </button>

                        <h3>{product.name}</h3>
                        <p className={styles.shortDesc}>
                            {product.description}
                        </p>
                        <div className={styles.ratingRow}>
                            <Rating
                                value={product.rating || 0}
                                reviews={product.reviews}
                                size={15}
                                showValue
                            />
                        </div>
                        <p className={styles.price}>
                            {currencyFormatter.format(product.price)}
                        </p>

                        {/* MATERIALS */}
                        {product.materials?.length > 0 && (
                            <ul className={styles.materialsContainer}>
                                {product.materials.map((m) => (
                                    <li
                                        key={m.name}
                                        className={`${styles.material} ${
                                            material === m.name
                                                ? styles.materialActive
                                                : ""
                                        }`}
                                        onClick={() => setMaterial(m.name)}
                                    >
                                        <img src={m.image} alt={m.name} />
                                        <p>{m.name}</p>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* SIZE */}
                        {product.sizes?.length > 0 && (
                            <div className={styles.sizeContainer}>
                                <p>Size</p>
                                <div className={styles.sizeBtnContainer}>
                                    {product.sizes.map((s) => (
                                        <button
                                            key={s}
                                            className={
                                                size === s
                                                    ? styles.sizeActive
                                                    : ""
                                            }
                                            onClick={() => setSize(s)}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BUTTONS */}
                        <div className={styles.actionBtnContainer}>
                            <button
                                className={`${styles.buyNow} ${styles.btn}`}
                                onClick={handleBuyNow}
                            >
                                BUY NOW
                            </button>
                            <button
                                className={`${styles.addToCart} ${styles.btn}`}
                                onClick={handleAddToCart}
                            >
                                ADD TO CART
                            </button>
                            <button
                                className={styles.viewFull}
                                onClick={handleViewFull}
                            >
                                View full details <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    <div className={styles.productBodyRight}>
                        <img
                            src={product.image || FallbackImage}
                            alt={product.name}
                            onError={(e) => {
                                e.currentTarget.src = FallbackImage;
                            }}
                        />
                        <p>{product.longDescription || product.description}</p>
                        {product.details?.length > 0 && (
                            <ul className={styles.shortDescContainer}>
                                {product.details.map((d, i) => (
                                    <li key={i}>● {d}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    );
}
