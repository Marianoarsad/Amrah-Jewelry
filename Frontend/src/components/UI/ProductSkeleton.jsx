import styles from "../../css/Skeleton.module.css";

// A single skeleton card used while the product grid is loading.
export function ProductSkeleton() {
    return (
        <li className={styles.card} aria-hidden="true">
            <div className={`${styles.image} ${styles.shimmer}`} />
            <div className={styles.body}>
                <div className={`${styles.line} ${styles.shimmer}`} />
                <div
                    className={`${styles.line} ${styles.short} ${styles.shimmer}`}
                />
                <div
                    className={`${styles.line} ${styles.price} ${styles.shimmer}`}
                />
            </div>
        </li>
    );
}

// Renders a grid of skeleton cards.
export default function ProductGridSkeleton({ count = 8 }) {
    return (
        <ul className={styles.grid}>
            {Array.from({ length: count }).map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </ul>
    );
}
