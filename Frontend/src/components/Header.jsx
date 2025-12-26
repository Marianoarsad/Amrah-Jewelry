
// STYLES
import styles from "../css/Header.module.css";

// COMPONENTS
import Promo from "./Promo.jsx";
import Dropdown from "./Dropdown.jsx";

// PACKAGES
import { useState } from "react";
import { ChevronLeft, ChevronRight, Phone, Search, ShoppingCart, User } from 'lucide-react';

// IMAGES
import AmrahTextLogoWhite from '/amrah-logo-text-white.png';
import AmrahTextLogoRed from '/amrah-logo-text-red.png'
import AmrahLogo from '../assets/amrah-logo.png';
import UserIcon from '/user-icon.svg';
import ShoppingBag from '/shopping-bag.svg'

const HEADLINE = [
    'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    'Tempus leo eu aenean sed diam urna tempor!',
    'Pulvinar vivamus fringilla lacus nec metus bibendum egestas!'
]

export default function Header ({ activeCategory, setActiveCategory, headerHover, setHeaderHover, onOpenCart, onOpenSignin, showPromo }) {

    const [ headlineIndex, setHeadlineIndex ] = useState(0);

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
            { showPromo ?   <div id={styles.promo}>
                                <ChevronLeft className={styles.promoBtn} onClick={prevHeadline} />
                                    <p>{HEADLINE[headlineIndex]}</p>
                                <ChevronRight className={styles.promoBtn} onClick={nextHeadline} />
                            </div> 
            : null}
            
            <header 
                className={headerHover ? styles.headerHovered : styles.header}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
                style={{boxShadow: headerHover ?  "0 0 10px rgba(0, 0, 0, 0.5)" : "", top: showPromo ? "var(--promo-height)" : ""}}
            >

                {/* BUTTONS  */}
                <p style={{marginBottom: "2rem", marginLeft: "2rem"}}>
                    <Search className={ headerHover ? styles.navHover + ` ${styles.navBtn}` : styles.nav}/>
                    <Phone className={ headerHover ? styles.navHover + ` ${styles.navBtn}` : styles.nav}/>
                </p>
                
                {/* LOGO  */}
                <div className={styles.navPlaceHolder}>
                    <a href="#" style={{userSelect: "none"}}>
                        <img src={ headerHover ? AmrahTextLogoRed : AmrahTextLogoWhite} alt="amrah-logo" width="370rem"/>
                    </a>
                    <nav>
                        <ul>
                            <li>
                                <a 
                                    href='#' 
                                    className={`${headerHover ? styles.navHover : styles.nav} ${activeCategory === 'earrings' ? styles.active : ''}`}
                                    onMouseEnter={() => { setActiveCategory('earrings'); }}
                                >
                                    EARRINGS
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='#' 
                                    className={`${headerHover ? styles.navHover : styles.nav} ${activeCategory === 'necklace' ? styles.active : ''}`}
                                    onMouseEnter={() => { setActiveCategory('necklace'); }}
                                >
                                    NECKLACE
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='#' 
                                    className={`${headerHover ? styles.navHover : styles.nav} ${activeCategory === 'rings' ? styles.active : ''}`}
                                    onMouseEnter={() => { setActiveCategory('rings'); }}
                                >
                                    RINGS
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='#' 
                                    className={`${headerHover ? styles.navHover : styles.nav} ${activeCategory === 'bracelet' ? styles.active : ''}`}
                                    onMouseEnter={() => { setActiveCategory('bracelet'); }}
                                >
                                    BRACELET
                                </a>
                            </li>
                            <li>
                                <a 
                                    href='#' 
                                    className={`${headerHover ? styles.navHover : styles.nav} ${activeCategory === 'more' ? styles.active : ''}`}
                                    onMouseEnter={() => { setActiveCategory('more'); }}
                                >
                                    MORE
                                </a>
                            </li>
                        </ul>    
                    </nav>
                </div>

                {/* BUTTONS  */}
                <p style={{marginBottom: "2rem", marginRight: "2rem"}}>
                    <ShoppingCart className={ headerHover ? styles.navHover + ` ${styles.navBtn}` : styles.nav} style={{cursor: "pointer"}}/>
                    <User className={ headerHover ? styles.navHover + ` ${styles.navBtn}` : styles.nav} style={{cursor: "pointer"}}/>
                </p>

            </header>

            {activeCategory === 'earrings' && headerHover ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setHeaderHover={setHeaderHover}
                    setActiveCategory={setActiveCategory}
                    showPromo={showPromo}
                /> : null
            }

            {activeCategory === 'necklace' && headerHover ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setHeaderHover={setHeaderHover}
                    setActiveCategory={setActiveCategory}
                    showPromo={showPromo}
                /> : null
            }

            {activeCategory === 'rings' && headerHover ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setHeaderHover={setHeaderHover}
                    setActiveCategory={setActiveCategory}
                    showPromo={showPromo}
                /> : null
            }

            {activeCategory === 'bracelet' && headerHover ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setHeaderHover={setHeaderHover}
                    setActiveCategory={setActiveCategory}
                    showPromo={showPromo}
                /> : null
            }

            {activeCategory === 'more' && headerHover ? 
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