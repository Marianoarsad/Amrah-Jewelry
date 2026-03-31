// IMAGES
import TestImage from '/image-4.jpg';

// STYLES
import styles from '../css/Dropdown.module.css';

export default function Dropdown ({
        showPromo, 
        activeCategory, 
        setActiveCategory,
        headerType, 
        setHeaderHover,
    }) {
    
    return (
        <>  
            {activeCategory === 'more' ? 
            <div 
                className={styles.dropdown}
                onMouseLeave={() => {
                    setActiveCategory('');
                    setHeaderHover(false);
                }}
                style={{ top: showPromo ? 'calc(15vh + var(--promo-height))' : `${headerType === 'headerMinimized' ? "9vh" : "15vh"}` }}
            >
                <ul>
                    <li style={{marginTop: "2rem", marginLeft: "8rem"}}><a href='#'><strong>ABOUT US</strong></a></li>
                    <li style={{marginTop: "1rem" ,marginLeft: "8rem"}}><a href='#'>OUR STORIES</a></li>
                    <li style={{marginTop: ".7rem", marginLeft: "8rem"}}><a href='#'>MATERIALS</a></li>
                    <li style={{marginTop: ".7rem", marginLeft: "8rem"}}><a href='#'>SUSTAINABILITY</a></li>
                    <li style={{marginTop: ".7rem", marginLeft: "8rem"}}><a href='#'>STUDS</a></li>
                </ul>
                <ul>
                    <li style={{marginTop: "2rem", marginLeft: "8rem"}}><a href='#'><strong>SERVICES</strong></a></li>
                    <li style={{marginTop: "1rem", marginLeft: "8rem"}}><a href='#'>REPAIR</a></li>
                    <li style={{marginTop: ".7rem", marginLeft: "8rem"}}><a href='#'>BOOK AN APPOINTMENT</a></li>
                </ul>
                <img 
                    src={TestImage} 
                    alt='product image'
                />
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
                <a style={{marginTop: "2rem", marginLeft: "8rem"}} href='#'><strong>ALL {activeCategory.toUpperCase()}</strong></a>
                
                <ul>
                    <li style={{marginTop: "2rem", marginLeft: "8rem"}}><a href='#'><strong>STYLE</strong></a></li>
                    <li style={{marginTop: "1rem" ,marginLeft: "8rem"}}><a href='#'>GEMSTONE</a></li>
                    <li style={{marginTop: ".7rem", marginLeft: "8rem"}}><a href='#'>HOOPS</a></li>
                    <li style={{marginTop: ".7rem", marginLeft: "8rem"}}><a href='#'>HUGGIES</a></li>
                    <li style={{marginTop: ".7rem", marginLeft: "8rem"}}><a href='#'>STUDS</a></li>
                </ul>
                <ul>
                    <li style={{marginTop: "2rem", marginLeft: "8rem"}}><a href='#'><strong>MATERIAL</strong></a></li>
                    <li style={{marginTop: "1rem", marginLeft: "8rem"}}><a href='#'>GOLD</a></li>
                    <li style={{marginTop: ".7rem", marginLeft: "8rem"}}><a href='#'>SILVER</a></li>
                </ul>
                <img 
                    src={TestImage} 
                    alt='product image'
                />
            </div>
            }
        </>
    )
}