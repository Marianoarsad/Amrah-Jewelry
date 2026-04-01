// HOOKS
import { useState, useEffect } from "react";

// COMPONENTS
import { CircleArrowLeft, CircleArrowRight, CircleDot, Circle } from 'lucide-react';

// IMAGES
import HeroBackground from '/hero-background-5.jpg';

import styles from '../css/Hero.module.css'

export default function Carousel () {
    
    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.heroTextContainer}>
                <h3>NEW IN</h3>
                <h1>TIMELESS COLLECTION</h1>
                <p>Introducing timeless designs</p>
            </div>
            <button className={styles.shopNowBtn}><a href="/shop">Shop now</a></button>
        </section>
    )
}