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
    {
        id: "p1",
        title: "Pearl Bracelet",
        desc: "Lorem ipsum dolor sit amet consecteturadipisicing elit.",
        price: 20000,
        img: productImage1,
    },
    {
        id: "p2",
        title: "Pearl Necklace",
        desc: "Lorem ipsum dolor sit amet consecteturadipisicing elit.",
        price: 23400,
        img: productImage2,
    },
    {
        id: "p3",
        title: "Pearl Earrings",
        desc: "Lorem ipsum dolor sit amet consecteturadipisicing elit.",
        price: 87000,
        img: productImage3,
    },
    {
        id: "p4",
        title: "Pearl Pendant",
        desc: "Lorem ipsum dolor sit amet consecteturadipisicing elit.",
        price: 92000,
        img: productImage4,
    },
    {
        id: "p5",
        title: "Pearl Pendant",
        desc: "Lorem ipsum dolor sit amet consecteturadipisicing elit.",
        price: 37000,
        img: productImage5,
    },
    {
        id: "p6",
        title: "Pearl Pendant",
        desc: "Lorem ipsum dolor sit amet consecteturadipisicing elit.",
        price: 14000,
        img: productImage6,
    },
    {
        id: "p7",
        title: "Pearl Pendant",
        desc: "Lorem ipsum dolor sit amet consecteturadipisicing elit.",
        price: 19999,
        img: productImage7,
    },
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
                    {products.map((product) => (
                        <PopularProductItem
                            id={product.id}
                            img={product.img}
                            title={product.title}
                            desc={product.desc}
                            price={product.price}
                        />
                    ))}
                </ul>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
        </div>
    );
}
