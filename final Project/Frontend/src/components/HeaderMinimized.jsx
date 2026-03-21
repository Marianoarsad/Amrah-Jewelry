// STYLES
import styles from '../css/HeaderMinimized.module.css';

// PACKAGES
import { Search, Phone, ShoppingCart, User } from 'lucide-react';

// REACT HOOKS
import { useState } from 'react';

// COMPONENTS
import Dropdown from './Dropdown.jsx';

export default function HeaderMinimized ({ 
    activeCategory,
    setActiveCategory,
    headerType,
    setHeaderHover
    }) {

    return (
        <>
            <header className={styles.header}>
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
                    <button><Phone/></button>
                    <button><ShoppingCart/></button>
                    <button><User/></button>
                </div>
            </header>

            {activeCategory === 'earrings' ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    headerType={headerType}
                    setHeaderHover={setHeaderHover}
                /> 
                : null
            }
            {activeCategory === 'necklace' ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    headerType={headerType}
                    setHeaderHover={setHeaderHover}
                /> 
                : null
            }
            {activeCategory === 'rings' ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    headerType={headerType}
                    setHeaderHover={setHeaderHover}
                /> 
                : null
            }
            {activeCategory === 'bracelet' ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    headerType={headerType}
                    setHeaderHover={setHeaderHover}
                /> 
                : null
            }
            {activeCategory === 'more' ? 
                <Dropdown 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    headerType={headerType}
                    setHeaderHover={setHeaderHover}
                /> 
                : null
            }
        </>
    )
}