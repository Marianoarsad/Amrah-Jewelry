import { useRef, useEffect } from "react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import PopularProductItem from "./PopularProductItem.jsx";

// DATA


import styles from "../css/PopularProducts.module.css";



export default function PopularProducts({ products: catalog }) {
    const featured = (catalog.some((p) => p.popular) ? catalog.filter((p) => p.popular) : catalog).slice(0, 12);
    const products = featured.map((p) => ({id:p._id,title:p.name,desc:p.description,price:p.price,img:p.image}));
    const swiperRef = useRef(null);

    useEffect(() => {
        swiperRef.current = new SwiperCore(".swiper-popular", {
            modules: [Navigation, Pagination],
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
            <div className="section-heading"><p className="eyebrow">The collection</p><h2>Popular Products</h2></div>
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
