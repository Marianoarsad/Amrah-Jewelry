// HOOKS AND LIBRARIES
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// IMAGES
import Necklace from "../assets/product-test-image-5.JPG";
import Ring from "../assets/product-test-image-4.JPG";
import Bracelet from "../assets/product-test-image-6.JPG";
import Earring from "../assets/product-test-image-2.jpg";

// STYLES
import styles from "../css/Dropdown.module.css";

const Dropdown = memo(function Dropdown({
    showPromo,
    activeCategory,
    setActiveCategory,
    headerType,
    setHeaderHover,
}) {
    const dropdownContent = useMemo(() => {
        if (activeCategory === "more") {
            return (
                <>
                    <ul style={{ gridColumnStart: "2" }}>
                        <li>
                            <Link to="#">
                                <strong>ABOUT US</strong>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">OUR STORIES</Link>
                        </li>
                        <li>
                            <Link to="#">MATERIALS</Link>
                        </li>
                        <li>
                            <Link to="#">SUSTAINABILITY</Link>
                        </li>
                        <li>
                            <Link to="#">STUDS</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="#">
                                <strong>SERVICES</strong>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">REPAIR</Link>
                        </li>
                        <li>
                            <Link to="#">BOOK AN APPOINTMENT</Link>
                        </li>
                    </ul>
                    <div className={styles.dropdownImgContainer}>
                        <img
                            className={styles.dropdownImg}
                            src={Necklace}
                            alt="more image"
                        />
                        <p>Lorem, ipsum dolor.</p>
                        <button>SHOP NOW</button>
                    </div>
                </>
            );
        }

        const categoryImages = {
            earring: Earring,
            necklace: Necklace,
            ring: Ring,
            bracelet: Bracelet,
        };

        return (
            <>
                <ul>
                    <li>
                        <Link to="#">
                            <strong>ALL {activeCategory.toUpperCase()}</strong>
                        </Link>
                    </li>
                </ul>

                <ul>
                    <li>
                        <Link to="#">
                            <strong>STYLE</strong>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">GEMSTONE</Link>
                    </li>
                    <li>
                        <Link to="#">HOOPS</Link>
                    </li>
                    <li>
                        <Link to="#">HUGGIES</Link>
                    </li>
                    <li>
                        <Link to="#">STUDS</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="#">
                            <strong>MATERIAL</strong>
                        </Link>
                    </li>
                    <li>
                        <Link to="#">GOLD</Link>
                    </li>
                    <li>
                        <Link to="#">SILVER</Link>
                    </li>
                </ul>
                <div className={styles.dropdownImgContainer}>
                    <img
                        className={styles.dropdownImg}
                        src={categoryImages[activeCategory] || Necklace}
                        alt="product image"
                    />
                </div>
            </>
        );
    }, [activeCategory]);

    return (
        <motion.div
            className={styles.dropdown}
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            // When user hovers out of the dropdown:
            // 1. Clear activeCategory - triggers AnimatePresence exit animation
            //    (slides up 25px with fade out over 0.25s), then unmount after animation completes
            // 2. Set headerHover to false - changes HeaderFull to "unhovered" state
            //    (white logo, white nav styling)
            onMouseLeave={() => {
                setActiveCategory("");
                setHeaderHover(false);
            }}
            style={{
                top: showPromo
                    ? "calc(15vh + var(--promo-height))"
                    : `${headerType === "headerMinimized" ? "9vh" : "15vh"}`,
            }}
        >
            {dropdownContent}
        </motion.div>
    );
});

export default Dropdown;
