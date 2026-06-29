import { memo } from "react";
import { Star } from "lucide-react";
import styles from "../../css/Rating.module.css";

// Renders a 5-star rating with half-star support.
function Rating({ value = 0, reviews, size = 14, showValue }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        const fill = Math.max(0, Math.min(1, value - (i - 1))); // 0..1 for this star
        stars.push(
            <span key={i} className={styles.star} style={{ width: size, height: size }}>
                <Star size={size} className={styles.starBg} />
                <span
                    className={styles.starFillWrap}
                    style={{ width: `${fill * 100}%` }}
                >
                    <Star size={size} className={styles.starFill} />
                </span>
            </span>,
        );
    }

    return (
        <span className={styles.rating} aria-label={`Rated ${value} out of 5`}>
            <span className={styles.stars}>{stars}</span>
            {showValue && <span className={styles.value}>{value.toFixed(1)}</span>}
            {reviews != null && (
                <span className={styles.reviews}>({reviews})</span>
            )}
        </span>
    );
}

export default memo(Rating);
