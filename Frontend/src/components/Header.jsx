// HOOKS AND LIBRARIES
import { useState, useEffect } from "react";

// COMPONENTS
import HeaderFull from "./HeaderFull.jsx";
import HeaderMinimized from "./HeaderMinimized.jsx";

// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";
import AuthContext from "../store/authContext.jsx";

export default function Header ({ 
    children, 
    className,
    onMouseEnter,
    onMouseLeave 
}) {

    const [ showPromo, setShowPromo ] = useState(true);
    const [ headerHover, setHeaderHover ] = useState(false);
    const [ activeCategory, setActiveCategory ] = useState('');

    const [ headerChange, setHeaderChange ] = useState(false);
    
    useEffect(() => {
        
        function handleScroll () {
            if (window.scrollY >= 100) {
                setHeaderChange(true);
            } else {
                setHeaderChange(false);
            }

            // When at the top of the website
            if (window.scrollY === 0) {
                setShowPromo(true);
            } else {
                setShowPromo(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const headerType = headerChange ? (
        <HeaderMinimized
            showPromo={showPromo}
            headerHover={headerHover}
            setHeaderHover={setHeaderHover}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
        />
    ) : (
        <HeaderFull
            showPromo={showPromo}
            headerHover={headerHover}
            setHeaderHover={setHeaderHover}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
        />
    );

    return (
        <>
            {headerType}
        </>
        
    )
}

// { headerChange ? 
//                     <HeaderFull
//                         showPromo={showPromo}
//                         activeCategory={activeCategory}
//                         headerHover={headerHover}
//                         headerType={headerType}
//                         setHeaderHover={setHeaderHover}
//                         setActiveCategory={setActiveCategory}
//                         isLoggedIn={isLoggedIn}
//                     /> : 
//                     <HeaderMinimized
//                         activeCategory={activeCategory}
//                         headerHover={headerHover}
//                         headerType={headerType}
//                         setHeaderHover={setHeaderHover}
//                         setActiveCategory={setActiveCategory}
//                         isLoggedIn={isLoggedIn}
//                     />
// }