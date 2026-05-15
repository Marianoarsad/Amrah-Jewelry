import { Link } from "react-router-dom";

import styles from "../css/PopularProductItem.module.css";

export default function PopularProductItem({ id, img, title, desc, price }) {
    return (
        <li key={id} className={`${styles.productItem} swiper-slide`}>
            <Link to="#" className={styles.productLink}>
                <img
                    className={styles.productImg}
                    src={img}
                    alt="Product Image"
                />
                <p className={styles.productTitle}>{title}</p>
                <p className={styles.productDesc}>{desc}</p>
            </Link>
        </li>
    );
}
