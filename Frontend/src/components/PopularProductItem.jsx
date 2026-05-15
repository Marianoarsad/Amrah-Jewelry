import { Link } from "react-router-dom";

import styles from "../css/PopularProductItem.module.css";

export default function PopularProductItem({ img }) {
    return (
        <li className={`${styles.productItem} swiper-slide`}>
            <Link to="#" className={styles.productLink}>
                <img
                    className={styles.productImg}
                    src={img}
                    alt="Product Image"
                />
                <p className={styles.productTitle}>Title</p>
                <p className={styles.productDesc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </Link>
        </li>
    );
}
