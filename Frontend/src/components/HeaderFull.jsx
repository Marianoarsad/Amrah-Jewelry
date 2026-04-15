// PACKAGES
import { useContext, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Phone, Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// COMPONENTS
import Promo from "./Promo.jsx";
import Dropdown from "./Dropdown.jsx";
import Header from "./Header.jsx";

// ASSETS
import AmrahTextLogoBlack from '/amrah-logo-text-white.png';
import AmrahTextLogoRed from '/amrah-logo-text-red.png';
import AmrahLogo from '../assets/amrah-logo.png';
import UserIcon from '/user-icon.svg';
import ShoppingBag from '/shopping-bag.svg';

// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";
import AuthContext from "../store/authContext.jsx";

import styles from "../css/HeaderFull.module.css";

const HEADLINE = [
    'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    'Tempus leo eu aenean sed diam urna tempor!',
    'Pulvinar vivamus fringilla lacus nec metus bibendum egestas!'
]

export default function HeaderFull ({ 
    activeCategory,
    setActiveCategory,
    headerHover,
    setHeaderHover,
    showPromo,
    isLoggedIn
}) {

    const [ headlineIndex, setHeadlineIndex ] = useState(0);

    const userProgressCtx = useContext(UserProgressContext);
    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    function handleLogout () {
        authContext.logout();
        navigate('/sign-in')
    }

    function handleShowCart () {
        userProgressCtx.showCart();
    }

    function handleShowSearch () {
        userProgressCtx.showSearch();
    }

    function handleShowAuth () {
        userProgressCtx.showAuth();
    }

    function handleMouseEnter () {
        setHeaderHover(true);
    }

    function handleMouseLeave () {
        if (activeCategory === '') {
            setHeaderHover(false);
        }
    }

    function prevHeadline () {

        setHeadlineIndex((prevIndex) => {
        
            if (prevIndex === 0) {
                return HEADLINE.length - 1
            }

            return prevIndex - 1;
        });
        
    }
    
    function nextHeadline () {
        
        setHeadlineIndex((prevIndex) => {
            
            if (prevIndex === HEADLINE.length - 1) {
                return 0;
            }

            return prevIndex + 1;
        });

    }

    return (
        <>
            { showPromo && 
                <div id={styles.promo}>
                    <ChevronLeft className={styles.promoBtn} onClick={prevHeadline} />
                        <p>{HEADLINE[headlineIndex]}</p>
                    <ChevronRight className={styles.promoBtn} onClick={nextHeadline} />
                </div> 
            }
            
            <header 
                className={headerHover ? styles.headerHovered : styles.header}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{boxShadow: headerHover ?  "0 0 10px rgba(0, 0, 0, 0.5)" : "", top: showPromo ? "var(--promo-height)" : ""}}
            >
                {/* BUTTONS  */}
                <p style={{marginBottom: "2rem", marginLeft: "2rem"}}>
                    <Search 
                        onClick={handleShowSearch} 
                        className={ headerHover ? styles.navHover + ` ${styles.navBtn}` : styles.nav}
                    />
                    <Phone 
                        className={ headerHover ? styles.navHover + ` ${styles.navBtn}` : styles.nav}
                    />
                </p>
                {/* LOGO  */}
                <div className={styles.navPlaceHolder}>
                    <a href="/" style={{userSelect: "none"}}>
                        <img src={ headerHover ? AmrahTextLogoRed : AmrahTextLogoBlack} alt="amrah-logo" width="370rem"/>
                    </a>
                    <nav>
                        <ul>
                            <li>
                                <a 
                                    href='/shop' 
                                    className={`
                                        ${headerHover ? styles.navHover : styles.nav} 
                                        ${activeCategory === 'earrings' ? styles.active : ''}
                                    `}
                                    onMouseEnter={() => { setActiveCategory('earrings'); }}
                                >
                                    EARRINGS
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='/shop' 
                                    className={`
                                        ${headerHover ? styles.navHover : styles.nav} 
                                        ${activeCategory === 'necklace' ? styles.active : ''}
                                    `}
                                    onMouseEnter={() => { setActiveCategory('necklace'); }}
                                >
                                    NECKLACE
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='/shop' 
                                    className={`
                                        ${headerHover ? styles.navHover : styles.nav} 
                                        ${activeCategory === 'rings' ? styles.active : ''}
                                    `}
                                    onMouseEnter={() => { setActiveCategory('rings'); }}
                                >
                                    RINGS
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='/shop' 
                                    className={`
                                        ${headerHover ? styles.navHover : styles.nav} 
                                        ${activeCategory === 'bracelet' ? styles.active : ''}
                                    `}
                                    onMouseEnter={() => { setActiveCategory('bracelet'); }}
                                >
                                    BRACELET
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='/shop' 
                                    className={`
                                        ${headerHover ? styles.navHover : styles.nav} 
                                        ${activeCategory === 'more' ? styles.active : ''}
                                    `}
                                    onMouseEnter={() => { setActiveCategory('more'); }}
                                >
                                    MORE
                                </a>
                            </li>
                        </ul>    
                    </nav>
                </div>
                {/* BUTTONS  */}
                <p style={{marginBottom: "2rem", marginRight: "2rem"}} className={styles.btnContainer}>
                    <ShoppingCart
                        onClick={handleShowCart} 
                        className={ headerHover ? styles.navHover + ` ${styles.navBtn}` : styles.nav }
                    />
                    { isLoggedIn ? 
                        <LogOut 
                            className={ headerHover ? styles.navHover + ` ${styles.navBtn}` : styles.nav }
                            onClick={handleLogout}
                        />
                        :  
                        <User 
                            className={ headerHover ? styles.navHover + ` ${styles.navBtn}` : styles.nav }
                            onClick={handleShowAuth}
                        />
                    }
                </p>
            </header>
            {/*DROPDOWN*/}
            { activeCategory && headerHover ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setHeaderHover={setHeaderHover}
                    setActiveCategory={setActiveCategory}
                    showPromo={showPromo}
                /> : null
            }
        </>
    )
}