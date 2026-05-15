import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import PopularProductItem from "./PopularProductItem.jsx";

// ASSETS
import productImage1 from "../assets/product-test-image-1.jpg";
import productImage2 from "../assets/product-test-image-2.jpg";
import productImage3 from "../assets/product-test-image-3.jpg";
import productImage4 from "../assets/product-test-image-4.jpg";
import productImage5 from "../assets/product-test-image-5.jpg";
import productImage6 from "../assets/product-test-image-6.jpg";
import productImage7 from "../assets/product-test-image-7.jpg";

import styles from "../css/PopularProducts.module.css";

Swiper.use([Navigation, Pagination]);

const products = [
    { name: "Pearl Bracelet", price: 20000, img: productImage1 },
    { name: "Pearl Necklace", price: 23400, img: productImage2 },
    { name: "Pearl Earrings", price: 87000, img: productImage3 },
    { name: "Pearl Pendant", price: 92000, img: productImage4 },
    { name: "Pearl Pendant", price: 37000, img: productImage5 },
    { name: "Pearl Pendant", price: 14000, img: productImage6 },
    { name: "Pearl Pendant", price: 19999, img: productImage7 },
];

export default function PopularProducts() {
    const swiperRef = useRef(null);

    useEffect(() => {
        swiperRef.current = new Swiper(".swiper-popular", {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 16,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        });

        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
            }
        };
    }, []);

    return (
        <div className={styles.popularProducts}>
            <h2>Popular Products</h2>
            <div className="swiper swiper-popular">
                <ul className="swiper-wrapper">
                    <PopularProductItem
                        className={`${styles.productItem} swiper-slide`}
                        img={productImage2}
                    >
                        <Link to="#" className={styles.productLink}>
                            <img
                                className={styles.productImg}
                                src={productImage1}
                                alt="Product Image"
                            />
                            <p className={styles.productTitle}>Title</p>
                            <p className={styles.productDesc}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </Link>
                    </PopularProductItem>
                    <li className={`${styles.productItem} swiper-slide`}>
                        <Link to="#" className={styles.productLink}>
                            <img
                                className={styles.productImg}
                                src={productImage2}
                                alt="Product Image"
                            />
                            <p className={styles.productTitle}>Title</p>
                            <p className={styles.productDesc}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </Link>
                    </li>
                    <li className={`${styles.productItem} swiper-slide`}>
                        <Link to="#" className={styles.productLink}>
                            <img
                                className={styles.productImg}
                                src={productImage3}
                                alt="Product Image"
                            />
                            <p className={styles.productTitle}>Title</p>
                            <p className={styles.productDesc}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </Link>
                    </li>
                    <li className={`${styles.productItem} swiper-slide`}>
                        <Link to="#" className={styles.productLink}>
                            <img
                                className={styles.productImg}
                                src={productImage4}
                                alt="Product Image"
                            />
                            <p className={styles.productTitle}>Title</p>
                            <p className={styles.productDesc}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </Link>
                    </li>
                    <li className={`${styles.productItem} swiper-slide`}>
                        <Link to="#" className={styles.productLink}>
                            <img
                                className={styles.productImg}
                                src={productImage5}
                                alt="Product Image"
                            />
                            <p className={styles.productTitle}>Title</p>
                            <p className={styles.productDesc}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </Link>
                    </li>
                    <li className={`${styles.productItem} swiper-slide`}>
                        <Link to="#" className={styles.productLink}>
                            <img
                                className={styles.productImg}
                                src={productImage6}
                                alt="Product Image"
                            />
                            <p className={styles.productTitle}>Title</p>
                            <p className={styles.productDesc}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </Link>
                    </li>
                    <li className={`${styles.productItem} swiper-slide`}>
                        <Link to="#" className={styles.productLink}>
                            <img
                                className={styles.productImg}
                                src={productImage7}
                                alt="Product Image"
                            />
                            <p className={styles.productTitle}>Title</p>
                            <p className={styles.productDesc}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </Link>
                    </li>
                </ul>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
        </div>
    );
}
