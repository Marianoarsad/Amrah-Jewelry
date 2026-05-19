// HOOKS AND LIBRARIES
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// COMPONENTS
import HeaderFull from "./HeaderFull.jsx";
import HeaderMinimized from "./HeaderMinimized.jsx";

// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";
import AuthContext from "../store/authContext.jsx";

export default function HeaderLayout({
    children,
    className,
    onMouseEnter,
    onMouseLeave,
}) {
    const [showPromo, setShowPromo] = useState(true);
    const [headerHover, setHeaderHover] = useState(false);
    const [activeCategory, setActiveCategory] = useState("");

    const [headerChange, setHeaderChange] = useState(false);

    const location = useLocation();

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY >= 100) {
                setHeaderChange(true);
            } else {
                setHeaderChange(false);
            }

            // When at the top
            if (window.scrollY === 0) {
                setShowPromo(true);
            } else {
                setShowPromo(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // On /shop page, keep header in "hovered" state (red logo, styled nav)
    // without showing any dropdown content (activeCategory remains empty)
    useEffect(() => {
        if (location.pathname === "/shop") {
            setHeaderHover(true);
        }
    }, [location.pathname]);

    // On /shop page, always show HeaderMinimized regardless of scroll position
    // On other pages, switch between HeaderFull and HeaderMinimized based on scroll
    const headerType = location.pathname === "/shop" || headerChange ? (
        <HeaderMinimized
            key="headerMinimized"
            headerHover={headerHover}
            setHeaderHover={setHeaderHover}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
        />
    ) : (
        <HeaderFull
            key="headerFull"
            showPromo={showPromo}
            headerHover={headerHover}
            setHeaderHover={setHeaderHover}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            headerChange={headerChange}
        />
    );

    // On /shop page: render a static <div> (no animation needed since HeaderMinimized
    // is always shown regardless of scroll position)
    // On other pages: render a <motion.div> with slide animation that triggers when
    // switching between HeaderFull (at top) and HeaderMinimized (after scrolling 100px)
    if (location.pathname === "/shop") {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "120px",
                    zIndex: 100,
                }}
            >
                <HeaderMinimized
                    key="headerMinimized"
                    headerHover={headerHover}
                    setHeaderHover={setHeaderHover}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
            </div>
        );
    }

    return (
        <motion.div
            key={headerChange ? "headerMinimized" : "headerFull"}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "120px",
                zIndex: 100,
            }}
        >
            {headerType}
        </motion.div>
    );
}