import { memo } from "react";
import { Link } from "react-router-dom";

import { currencyFormatter } from "../util/formatting.js";
import styles from "../css/PopularProductItem.module.css";

function PopularProductItem({ id, img, title, desc, price }) {
    return (
        <li className={`${styles.productItem} swiper-slide`}>
            <Link to={`/product/${id}`} className={styles.productLink}>
                <img
                    className={styles.productImg}
                    src={img}
                    alt={title}
                />
                <p className={styles.productTitle}>{title}</p>
                {price != null ? (
                    <p className={styles.productPrice}>
                        {currencyFormatter.format(price)}
                    </p>
                ) : (
                    <p className={styles.productDesc}>{desc}</p>
                )}
            </Link>
        </li>
    );
}

export default memo(PopularProductItem);
