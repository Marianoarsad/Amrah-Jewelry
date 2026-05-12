// HOOKS & LIBRARIES
import { NavLink } from "react-router-dom";
import { Search, Phone, ShoppingCart, User, LogOut } from "lucide-react";

// REACT HOOKS
import { useState } from "react";

// COMPONENTS
import Dropdown from "./Dropdown.jsx";

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
                    <NavLink to="#">
                        <img
                            src="/amrah-logo-stand-alone.png"
                            alt="amrah-logo"
                            className={styles.logo}
                        />
                    </NavLink>

                    {/* NAV LINKS */}
                    <ul>
                        <li>
                            <NavLink
                                to="#"
                                onMouseEnter={() => {
                                    setActiveCategory("earrings");
                                }}
                            >
                                EARRINGS
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="#"
                                onMouseEnter={() => {
                                    setActiveCategory("necklace");
                                }}
                            >
                                NECKLACE
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="#"
                                onMouseEnter={() => {
                                    setActiveCategory("rings");
                                }}
                            >
                                RINGS
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="#"
                                onMouseEnter={() => {
                                    setActiveCategory("bracelet");
                                }}
                            >
                                BRACELET
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="#"
                                onMouseEnter={() => {
                                    setActiveCategory("more");
                                }}
                            >
                                MORE
                            </NavLink>
                        </li>
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
                {activeCategory && headerHover ? (
                    <Dropdown
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        headerType={"headerMinimized"}
                        setHeaderHover={setHeaderHover}
                    />
                ) : null}
            </header>
        </>
    );
}
