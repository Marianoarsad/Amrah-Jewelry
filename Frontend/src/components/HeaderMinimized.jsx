// HOOKS & LIBRARIES
import { Search, Phone, ShoppingCart, User, LogOut } from 'lucide-react';

// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Dropdown from './Dropdown.jsx';

import styles from '../css/HeaderMinimized.module.css';

export default function HeaderMinimized ({ 
    activeCategory,
    setActiveCategory,
    headerHover,
    setHeaderHover,
    isLoggedIn
    }) {
    
    function handleMouseEnter () {
        setHeaderHover(true);
    }

    function handleMouseLeave () {
        if (activeCategory === '') {
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
                    <a href='#'>
                        <img src='/amrah-logo-stand-alone.png' alt='amrah-logo' className={styles.logo}/>
                    </a>

                    {/* NAV LINKS */}
                    <ul>
                        <li>
                            <a 
                                href='#'
                                onMouseEnter={() => {
                                    setActiveCategory('earrings')
                                }}
                            >
                                EARRINGS
                            </a>
                        </li>
                        <li>
                            <a 
                                href='#'
                                onMouseEnter={() => {
                                    setActiveCategory('necklace')
                                }}
                            >
                                NECKLACE
                            </a>
                        </li>
                        <li>
                            <a 
                                href='#'
                                onMouseEnter={() => {
                                    setActiveCategory('rings')
                                }}
                            >
                                RINGS
                            </a>
                        </li>
                        <li>
                            <a 
                                href='#'
                                onMouseEnter={() => {
                                    setActiveCategory('bracelet')
                                }}
                            >
                                BRACELET
                            </a>
                        </li>
                        <li>
                            <a 
                                href='#'
                                onMouseEnter={() => {
                                    setActiveCategory('more')
                                }}
                            >
                                MORE
                            </a>
                        </li>
                    </ul>
                </nav>
            
                <div className={styles.buttonContainer}>
                    <button><Search/></button>
                    <div className={styles.verticalLine}></div>
                    {/*BUTTONS*/}
                    <button><Phone/></button>
                    <button><ShoppingCart/></button>
                    <button>{ isLoggedIn ?  <LogOut/> : <User/>}</button>
                </div>
                {/*DROPDOWN*/}
                { activeCategory && headerHover ?
                    <Dropdown 
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        headerType={'headerMinimized'}
                        setHeaderHover={setHeaderHover}
                    /> : null
                }
            </header>
        </>
    )
}