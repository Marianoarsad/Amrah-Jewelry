// HOOKS & LIBRARIES
import { useContext, useState } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Heart,
    Minus,
    Plus,
    ShoppingBag,
    ChevronLeft,
    Truck,
    ShieldCheck,
    RefreshCw,
} from "lucide-react";

// CONTEXT
import CartContext from "../store/CartContext.jsx";
import ToastContext from "../store/ToastContext.jsx";
import WishlistContext from "../store/WishlistContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

// COMPONENTS
import Rating from "../components/UI/Rating.jsx";
import ProductItem from "../components/ProductItem.jsx";

// SERVICES & DATA
import { productService } from "../services/productService.js";
import { PRODUCTS } from "../data/products.js";

// UTIL
import { currencyFormatter } from "../util/formatting.js";

import FallbackImage from "../assets/pearl.png";
import styles from "../css/ProductDetail.module.css";

export default function ProductDetail() {
    const { product, related } = useLoaderData();

    const cartCtx = useContext(CartContext);
    const toastCtx = useContext(ToastContext);
    const wishlistCtx = useContext(WishlistContext);
    const userProgressCtx = useContext(UserProgressContext);
    const navigate = useNavigate();

    const gallery = product.images?.length
        ? product.images
        : [product.image || FallbackImage];

    const [activeImage, setActiveImage] = useState(gallery[0]);
    const [material, setMaterial] = useState(product.materials?.[0]?.name);
    const [size, setSize] = useState(product.sizes?.[0]);
    const [quantity, setQuantity] = useState(1);

    const wishlisted = wishlistCtx.isWishlisted(product._id);

    function buildCartProduct() {
        return {
            ...product,
            selectedSize: size,
            selectedMaterial: material,
        };
    }

    function handleAddToCart() {
        cartCtx.addProduct(buildCartProduct(), quantity);
        toastCtx.addToast(
            `${product.name} ${quantity > 1 ? `(x${quantity}) ` : ""}added to bag`,
            { image: product.image },
        );
    }

    function handleBuyNow() {
        cartCtx.addProduct(buildCartProduct(), quantity);
        userProgressCtx.showCheckout();
    }

    function handleToggleWishlist() {
        wishlistCtx.toggle(product);
        toastCtx.addToast(
            wishlisted ? "Removed from wishlist" : "Saved to wishlist",
            { type: "wishlist" },
        );
    }

    return (
        <motion.section
            className={styles.page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
                <ChevronLeft size={18} /> Back
            </button>

            <nav className={styles.breadcrumb}>
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to={`/shop?category=${product.category}`}>
                    {product.category}
                </Link>
                <span>/</span>
                <span className={styles.crumbActive}>{product.name}</span>
            </nav>

            <div className={styles.main}>
                {/* GALLERY */}
                <div className={styles.gallery}>
                    <div className={styles.thumbs}>
                        {gallery.map((img, i) => (
                            <button
                                key={i}
                                className={`${styles.thumb} ${
                                    activeImage === img ? styles.thumbActive : ""
                                }`}
                                onMouseEnter={() => setActiveImage(img)}
                                onClick={() => setActiveImage(img)}
                            >
                                <img src={img} alt={`${product.name} ${i + 1}`} />
                            </button>
                        ))}
                    </div>
                    <motion.div
                        className={styles.mainImageWrap}
                        key={activeImage}
                        initial={{ opacity: 0.4, scale: 1.01 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            className={styles.mainImage}
                            src={activeImage}
                            alt={product.name}
                            onError={(e) => {
                                e.currentTarget.src = FallbackImage;
                            }}
                        />
                    </motion.div>
                </div>

                {/* DETAILS */}
                <div className={styles.details}>
                    <span className={styles.categoryTag}>
                        {product.category}
                    </span>
                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.ratingRow}>
                        <Rating
                            value={product.rating || 0}
                            reviews={product.reviews}
                            size={16}
                            showValue
                        />
                    </div>

                    <p className={styles.price}>
                        {currencyFormatter.format(product.price)}
                    </p>

                    <p className={styles.shortDesc}>{product.description}</p>

                    {/* MATERIALS */}
                    {product.materials?.length > 0 && (
                        <div className={styles.optionGroup}>
                            <p className={styles.optionLabel}>
                                Material:{" "}
                                <span className={styles.optionValue}>
                                    {material}
                                </span>
                            </p>
                            <ul className={styles.materials}>
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
                                        <span>{m.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* SIZES */}
                    {product.sizes?.length > 0 && (
                        <div className={styles.optionGroup}>
                            <p className={styles.optionLabel}>
                                Size:{" "}
                                <span className={styles.optionValue}>
                                    {size}
                                </span>
                            </p>
                            <div className={styles.sizes}>
                                {product.sizes.map((s) => (
                                    <button
                                        key={s}
                                        className={`${styles.sizeBtn} ${
                                            size === s ? styles.sizeActive : ""
                                        }`}
                                        onClick={() => setSize(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* QUANTITY */}
                    <div className={styles.optionGroup}>
                        <p className={styles.optionLabel}>Quantity</p>
                        <div className={styles.qtyStepper}>
                            <button
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                                aria-label="Decrease quantity"
                            >
                                <Minus size={16} />
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                aria-label="Increase quantity"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className={styles.actions}>
                        <button
                            className={styles.addToCart}
                            onClick={handleAddToCart}
                        >
                            <ShoppingBag size={18} /> Add to Bag
                        </button>
                        <button
                            className={styles.buyNow}
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </button>
                        <button
                            className={`${styles.wishlistBtn} ${
                                wishlisted ? styles.wishlistActive : ""
                            }`}
                            onClick={handleToggleWishlist}
                            aria-label="Toggle wishlist"
                        >
                            <Heart
                                size={20}
                                fill={wishlisted ? "#c64b50" : "none"}
                            />
                        </button>
                    </div>

                    {/* TRUST BADGES */}
                    <ul className={styles.trust}>
                        <li>
                            <Truck size={18} /> Free insured shipping
                        </li>
                        <li>
                            <RefreshCw size={18} /> 30-day returns
                        </li>
                        <li>
                            <ShieldCheck size={18} /> Lifetime warranty
                        </li>
                    </ul>

                    {/* PRODUCT DETAILS */}
                    {product.details?.length > 0 && (
                        <div className={styles.specBlock}>
                            <h3>Details</h3>
                            <p>{product.longDescription}</p>
                            <ul>
                                {product.details.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* RELATED */}
            {related?.length > 0 && (
                <div className={styles.related}>
                    <h2>You may also like</h2>
                    <ul className={styles.relatedGrid}>
                        {related.map((p) => (
                            <ProductItem key={p._id} product={p} />
                        ))}
                    </ul>
                </div>
            )}
        </motion.section>
    );
}

export async function loader({ params }) {
    const product = await productService.getProductById(params.id);

    if (!product) {
        throw new Response(
            JSON.stringify({ message: "Product not found." }),
            { status: 404, statusText: "Not Found" },
        );
    }

    const related = PRODUCTS.filter(
        (p) => p.category === product.category && p._id !== product._id,
    ).slice(0, 4);

    return { product, related };
}
