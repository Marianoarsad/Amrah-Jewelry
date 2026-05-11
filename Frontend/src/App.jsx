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
import Header from "./components/Header.jsx";
import HeaderFull from "./components/HeaderFull.jsx";
import HeaderMinimized from "./components/HeaderMinimized.jsx";
import Footer from "./components/Footer.jsx";

// PAGES
import RootLayout from "./pages/RootLayout.jsx";
import ShopLayout from "./pages/ShopLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Homepage from "./pages/Homepage.jsx";
import Shop from "./pages/Shop.jsx";

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
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Homepage /> },
            {
                path: "shop",
                element: <ShopLayout />,
                children: [{ index: true, element: <Shop /> }],
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
    ⦿ Convert to modal & finalize UI UX of both login and register component (NOT FINAL)
    ⦿ Change Header style when on light backgrounds
    ⦿ Refactor Routing using react-router-dom
*/

/*
    BACKEND:
    ⦿ Create Data Structure of products.
    ⦿ Create Data Structure of users.
*/

/*
    FEATURES:
    ⦿ Add loading screen/effect.
*/

/*
    STRUCTURE:
    ⦿ Improve routing of react-router-dom.
    ⦿ Integrate Redux.
*/

/*
    BUGS:
    ⦿ Header bug where HeaderMinimized does not render its dropdown. (minor)
*/
