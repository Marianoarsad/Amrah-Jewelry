// HOOKS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import {
    CircleArrowLeft,
    CircleArrowRight,
    CircleDot,
    Circle,
} from "lucide-react";

// IMAGES
import HeroBackground from "/hero-background-5.jpg";

import styles from "../css/Hero.module.css";

export default function Carousel() {
    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.heroTextContainer}>
                <h3>NEW IN</h3>
                <h1>TIMELESS COLLECTION</h1>
                <p>Introducing timeless designs</p>
            </div>
            <Link className={styles.shopNowBtn} to="/shop">
                SHOP NOW
            </Link>
        </section>
    );
}
