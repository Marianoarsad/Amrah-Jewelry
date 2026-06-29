// HOOKS AND LIBRARIES
import { useState, useEffect, useContext } from "react";
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

    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    // Only the homepage uses the transparent HeaderFull (white logo over the
    // hero). Every other route is a light-background content page, so it always
    // shows the solid HeaderMinimized — otherwise the white header is invisible.
    const isHome = location.pathname === "/";

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

            // Close dropdown on any scroll movement.
            // This triggers AnimatePresence exit animation (slide up + fade out),
            // then unmounts the dropdown after animation completes.
            if (activeCategory !== "") {
                setActiveCategory("");
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeCategory]);

    // On inner pages, keep header in "hovered" state (red logo, styled nav)
    // without showing any dropdown content (activeCategory remains empty)
    useEffect(() => {
        if (!isHome) {
            setHeaderHover(true);
        }
    }, [isHome]);

    // On the homepage, switch between HeaderFull (at top) and HeaderMinimized
    // (after scrolling 100px). Inner pages always use HeaderMinimized below.
    const headerType = headerChange ? (
        <HeaderMinimized
            key="headerMinimized"
            headerHover={headerHover}
            setHeaderHover={setHeaderHover}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isLoggedIn={isAuthenticated}
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
            isLoggedIn={isAuthenticated}
        />
    );

    // Inner pages: render a static <div> with HeaderMinimized (always visible,
    // regardless of scroll position).
    // Homepage: render a <motion.div> with slide animation that triggers when
    // switching between HeaderFull (at top) and HeaderMinimized (after scrolling).
    if (!isHome) {
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
                    isLoggedIn={isAuthenticated}
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