import { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import WishlistContext from "../store/WishlistContext.jsx";
import ProductItem from "../components/ProductItem.jsx";

import styles from "../css/Wishlist.module.css";

export default function Wishlist() {
    const wishlistCtx = useContext(WishlistContext);

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h1>My Wishlist</h1>
                <p>
                    {wishlistCtx.count > 0
                        ? `${wishlistCtx.count} item${wishlistCtx.count > 1 ? "s" : ""} saved`
                        : "Pieces you love, saved for later"}
                </p>
            </header>

            {wishlistCtx.count === 0 ? (
                <div className={styles.empty}>
                    <Heart size={56} strokeWidth={1} />
                    <p>Your wishlist is empty</p>
                    <Link to="/shop" className={styles.shopLink}>
                        DISCOVER OUR PIECES
                    </Link>
                </div>
            ) : (
                <ul className={styles.grid}>
                    {wishlistCtx.items.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </ul>
            )}
        </section>
    );
}
