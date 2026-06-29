// HOOKS & LIBRARIES
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Search, Phone, ShoppingCart, User, LogOut } from "lucide-react";

// REACT HOOKS
import { useState, useContext } from "react";

// COMPONENTS
import Dropdown from "./Dropdown.jsx";
import NavItemMinimized from "./NavItemMinimized.jsx";
import { CartButton, WishlistButton } from "./UI/CartButton.jsx";

// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";
import AuthContext from "../store/authContext.jsx";
import ToastContext from "../store/ToastContext.jsx";

import styles from "../css/HeaderMinimized.module.css";

export default function HeaderMinimized({
    activeCategory,
    setActiveCategory,
    headerHover,
    setHeaderHover,
    isLoggedIn,
}) {
    const userProgressCtx = useContext(UserProgressContext);
    const authContext = useContext(AuthContext);
    const toastCtx = useContext(ToastContext);
    const navigate = useNavigate();

    function handleLogout() {
        authContext.logout();
        toastCtx.addToast("You've been signed out.", { type: "info" });
        navigate("/");
    }

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
                    <button onClick={() => userProgressCtx.showSearch()}>
                        <Search />
                    </button>
                    <div className={styles.verticalLine}></div>
                    {/*BUTTONS*/}
                    <button>
                        <Phone />
                    </button>
                    <button onClick={() => navigate("/wishlist")}>
                        <WishlistButton onClick={() => navigate("/wishlist")} />
                    </button>
                    <button onClick={() => userProgressCtx.showCart()}>
                        <CartButton
                            onClick={() => userProgressCtx.showCart()}
                        />
                    </button>
                    <button
                        onClick={() =>
                            isLoggedIn
                                ? handleLogout()
                                : userProgressCtx.showAuth()
                        }
                    >
                        {isLoggedIn ? <LogOut /> : <User />}
                    </button>
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