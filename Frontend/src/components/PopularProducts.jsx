import { useRef, useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import PopularProductItem from "./PopularProductItem.jsx";

// DATA
import { getPopularProducts } from "../data/products.js";

import styles from "../css/PopularProducts.module.css";

Swiper.use([Navigation, Pagination]);

const products = getPopularProducts().map((p) => ({
    id: p._id,
    title: p.name,
    desc: p.description,
    price: p.price,
    img: p.image,
}));

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
                            key={product.id}
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
