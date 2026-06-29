// HOOKS & LIBRARIES
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
    const navigation = useNavigation();
    const location = useLocation();

    return (
        <>
            <HeaderLayout />

            {/* Thin top loading bar while a route loader is pending */}
            <AnimatePresence>
                {navigation.state === "loading" && (
                    <motion.div
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
                                "linear-gradient(90deg, #c64b50, #e08a8e)",
                            zIndex: 5000,
                        }}
                    />
                )}
            </AnimatePresence>

            <main>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>

                <Search />
                <Checkout />
                <Cart />
                <Product />
                <Authentication />
                <Footer />
            </main>
        </>
    );
}
