import { useEffect } from "react";
// HOOKS & LIBRARIES
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { motion as Motion, AnimatePresence, useReducedMotion } from "framer-motion";

// COMPONENTS
import HeaderLayout from "../components/HeaderLayout.jsx";
import Footer from "../components/Footer.jsx";

// MODALS
import Search from "../components/Search.jsx";
import Checkout from "../components/Checkout.jsx";
import Cart from "../components/Cart.jsx";
import Product from "../components/UI/Product.jsx";
import Authentication from "../components/Authentication.jsx";

export default function RootLayout() {
    const reducedMotion = useReducedMotion();
    const navigation = useNavigation();
    const location = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

    return (
        <>
            <HeaderLayout />

            {/* Thin top loading bar while a route loader is pending */}
            <AnimatePresence>
                {navigation.state === "loading" && (
                    <Motion.div
                        initial={{ scaleX: 0, opacity: 1 }}
                        animate={{ scaleX: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            transformOrigin: "0% 50%",
                            background:
                                "var(--brand)",
                            zIndex: 5000,
                        }}
                    />
                )}
            </AnimatePresence>

            <main id="main-content" tabIndex={-1}>
                <AnimatePresence mode="wait">
                    <Motion.div
                        key={location.pathname}
                        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <Outlet />
                    </Motion.div>
                </AnimatePresence>

                <Search />
                <Checkout />
                <Cart />
                <Product />
                <Authentication />
            </main>
            <Footer />
        </>
    );
}
