// HOOKS & LIBRARIES
import { Outlet, useNavigation } from "react-router-dom";

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

    return (
        <>
            <HeaderLayout />
            <main>
                {navigation.state === "loading" && <p>Loading...</p>}
                <Outlet />
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
