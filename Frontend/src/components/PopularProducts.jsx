import PearlBracelet from "../assets/pearl-bracelet.jpg";
/*
import CustomPrevArrow from "./CustomPrevArrow.jsx";
import CustomNextArrow from './CustomNextArrow.jsx';
*/

import styles from "../css/PopularProducts.module.css";

const products = [
    { name: "Pearl Bracelet", price: 20000, img: PearlBracelet },
    { name: "Pearl Necklace", price: 23400, img: PearlBracelet },
    { name: "Pearl Earrings", price: 87000, img: PearlBracelet },
    { name: "Pearl Pendant", price: 92000, img: PearlBracelet },
    { name: "Pearl Pendant", price: 37000, img: PearlBracelet },
    { name: "Pearl Pendant", price: 14000, img: PearlBracelet },
    { name: "Pearl Pendant", price: 19999, img: PearlBracelet },
];

export default function PopularProducts() {
    return (
        <div className={styles.popularProducts}>
            <h2>Popular Products</h2>
            <div className={styles.sliderContainer}></div>
        </div>
    );
}
