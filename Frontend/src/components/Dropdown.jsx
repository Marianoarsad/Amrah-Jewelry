// HOOKS AND LIBRARIES
import { useEffect } from 'react';

// IMAGES
import TestImage from '/test-image.JPG';

// STYLES
import styles from '../css/Dropdown.module.css';

export default function Dropdown ({
        showPromo, 
        activeCategory, 
        setActiveCategory,
        headerType, 
        setHeaderHover,
    }) {
    
    // Prevents scrolling whenever dropdown is rendered
    // useEffect(() => {
    //     document.body.style.overflow = 'visible';
    //     return () => {
    //         document.body.style.overflow = '';
    //     };
    // }, []);
    
    return (
        <>  
            { activeCategory === 'more' ? 
            <div 
                className={styles.dropdown}
                onMouseLeave={() => {
                    setActiveCategory('');
                    setHeaderHover(false);
                }}
                style={{ 
                    top: showPromo ? 'calc(15vh + var(--promo-height))' : `${headerType === 'headerMinimized' ? "9vh" : "15vh"}` 
                }}
            >
                <ul style={{gridColumnStart: '2'}}>
                    <li><a href='#'><strong>ABOUT US</strong></a></li>
                    <li><a href='#'>OUR STORIES</a></li>
                    <li><a href='#'>MATERIALS</a></li>
                    <li><a href='#'>SUSTAINABILITY</a></li>
                    <li><a href='#'>STUDS</a></li>
                </ul>
                <ul>
                    <li><a href='#'><strong>SERVICES</strong></a></li>
                    <li><a href='#'>REPAIR</a></li>
                    <li><a href='#'>BOOK AN APPOINTMENT</a></li>
                </ul>
                <div className={styles.dropdownImgContainer}>
                    <p>Lorem, ipsum dolor.</p>
                    <button>SHOP NOW</button>
                </div>
                
            </div>
            : // ELSE 
            <div 
                className={styles.dropdown}
                onMouseLeave={() => {
                    setActiveCategory('');
                    setHeaderHover(false);
                }}
                style={{ 
                    top: showPromo ? 'calc(15vh + var(--promo-height))' : `${headerType === 'headerMinimized' ? "9vh" : "15vh"}`, 
                }}
            >   
                <ul>
                    <li><a href='#'><strong>ALL {activeCategory.toUpperCase()}</strong></a></li>
                </ul>
                
                
                <ul>
                    <li><a href='#'><strong>STYLE</strong></a></li>
                    <li><a href='#'>GEMSTONE</a></li>
                    <li><a href='#'>HOOPS</a></li>
                    <li><a href='#'>HUGGIES</a></li>
                    <li><a href='#'>STUDS</a></li>
                </ul>
                <ul>
                    <li><a href='#'><strong>MATERIAL</strong></a></li>
                    <li><a href='#'>GOLD</a></li>
                    <li><a href='#'>SILVER</a></li>
                </ul>
                <div className={styles.dropdownImgContainer}>
                    <p>Lorem, ipsum dolor.</p>
                    <button>SHOP NOW</button>
                </div>
            </div>
            }
        </>
    )
}