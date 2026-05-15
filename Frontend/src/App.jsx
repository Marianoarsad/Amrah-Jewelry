// HOOKS & LIBRARIES
import { useRef, useEffect, useState, useContext } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

// COMPONENTS
import HeaderFull from "./components/HeaderFull.jsx";
import HeaderMinimized from "./components/HeaderMinimized.jsx";
import Footer from "./components/Footer.jsx";

// PAGES
import RootLayout from "./pages/RootLayout.jsx";
import ShopLayout from "./pages/ShopLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Homepage from "./pages/Homepage.jsx";
import Shop, { loader as productsLoader } from "./pages/Shop.jsx";

// MODALS
import Search from "./components/Search.jsx";
import Checkout from "./components/Checkout.jsx";
import Cart from "./components/Cart.jsx";
import Product from "./components/UI/Product.jsx";
import Authentication from "./components/Authentication.jsx";

// CONTEXT PROVIDER
import { AuthContextProvider } from "./store/authContext.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

// SERVICES (Helper Functions)
import { authService } from "./services/authService.js";

// CONTEXT
import AuthContext from "./store/authContext.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";

const router = createBrowserRouter([
    // DITO UNG MISMONG ROUTING WALA SA BACKEND GAGOOOOOOOO
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Homepage /> },
            {
                path: "shop",
                element: <ShopLayout />,
                children: [
                    {
                        index: true,
                        element: <Shop />,
                        loader: productsLoader,
                    },
                ],
            },
        ],
    },
]);

function App() {
    const [user, setUser] = useState(null);

    // CONTEXT
    const userProgressCtx = useContext(UserProgressContext);
    const authContext = useContext(AuthContext);

    // console.log(`authContext.user:  ${JSON.stringify(authContext.user)}`)
    // console.log(`authContext.isAuthenticated:  ${authContext.isAuthenticated}`)

    // HEADER CHANGE HANDLER

    // CHECK IF THERE IS A LOGGED IN USER
    let existingUser = authService.getCurrentUser();

    return (
        <AuthContextProvider>
            <UserProgressContextProvider>
                <CartContextProvider>
                    <RouterProvider router={router} />
                </CartContextProvider>
            </UserProgressContextProvider>
        </AuthContextProvider>
    );
}

export default App;

// TODO:

/* 
    FRONT-END:
    Important:

    Not Important:
    ⦿ Convert to modal & finalize UI UX of both login and register component (NOT FINAL)
*/

/*
    BACKEND:
    ⦿ Create Data Structure of products.
    ⦿ Create Data Structure of users.
    ⦿ Convert to SQL for practice.
*/

/*
    FEATURES:
    ⦿ Open product detail for each product.
    ⦿ Add loading screen / effect.
*/

/*
    STRUCTURE:
    ⦿ Integrate Redux.
    ⦿ Filter in backend not directly on the component(Shop.jsx).
*/

/*
    BUGS:
    ⦿ Header bug where HeaderMinimized does not render its dropdown. (minor)
*/
