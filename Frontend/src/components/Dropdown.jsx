// HOOKS AND LIBRARIES
import { AnimatePresence, motion } from "framer-motion"; // eslint-disable-line no-unused-vars

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
        <AnimatePresence mode="wait">
            { activeCategory && 
            <motion.div 
                className={styles.dropdown}
                key={activeCategory}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                onMouseLeave={() => {
                    setActiveCategory('');
                    setHeaderHover(false);
                }}
                style={{ 
                    top: showPromo ? 'calc(15vh + var(--promo-height))' : `${headerType === 'headerMinimized' ? "9vh" : "15vh"}` 
                }}
            >
                { activeCategory === 'more' ? 
                <>
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
                </>
                : // ELSE 
                <>
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
                </>
                }
            </motion.div>
            }
        </AnimatePresence>
    )
}
