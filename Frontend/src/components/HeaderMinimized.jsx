// HOOKS & LIBRARIES
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Search, Phone, ShoppingCart, User, LogOut } from "lucide-react";

// REACT HOOKS
import { useState } from "react";

// COMPONENTS
import Dropdown from "./Dropdown.jsx";
import NavItemMinimized from "./NavItemMinimized.jsx";

import styles from "../css/HeaderMinimized.module.css";

export default function HeaderMinimized({
    activeCategory,
    setActiveCategory,
    headerHover,
    setHeaderHover,
    isLoggedIn,
}) {
    function handleMouseEnter() {
        setHeaderHover(true);
    }

    function handleMouseLeave() {
        if (activeCategory === "") {
            setHeaderHover(false);
        }
    }

    return (
        <>
            <header
                className={styles.header}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <nav>
                    {/* LOGO */}
                    <NavLink
                        to="/"
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    >
                        <img
                            src="/amrah-logo-stand-alone.png"
                            alt="amrah-logo"
                            className={styles.logo}
                        />
                    </NavLink>

                    {/* NAV LINKS */}
                    <ul>
                        <NavItemMinimized
                            category={"EARRINGS"}
                            setActiveCategory={setActiveCategory}
                            setHeaderHover={setHeaderHover}
                        />
                        <NavItemMinimized
                            category={"NECKLACE"}
                            setActiveCategory={setActiveCategory}
                            setHeaderHover={setHeaderHover}
                        />
                        <NavItemMinimized
                            category={"RING"}
                            setActiveCategory={setActiveCategory}
                            setHeaderHover={setHeaderHover}
                        />
                        <NavItemMinimized
                            category={"BRACELET"}
                            setActiveCategory={setActiveCategory}
                            setHeaderHover={setHeaderHover}
                        />
                    </ul>
                </nav>

                <div className={styles.buttonContainer}>
                    <button>
                        <Search />
                    </button>
                    <div className={styles.verticalLine}></div>
                    {/*BUTTONS*/}
                    <button>
                        <Phone />
                    </button>
                    <button>
                        <ShoppingCart />
                    </button>
                    <button>{isLoggedIn ? <LogOut /> : <User />}</button>
                </div>
                {/*DROPDOWN*/}
                <AnimatePresence mode="wait">
                    {activeCategory && headerHover && (
                        <Dropdown
                            key={activeCategory}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            headerType={"headerMinimized"}
                            setHeaderHover={setHeaderHover}
                        />
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}