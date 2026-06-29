// HOOKS & LIBRARIES
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// EAGER PAGES (app shell — always needed)
import RootLayout from "./pages/RootLayout.jsx";
import ShopLayout from "./pages/ShopLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

// CONTEXT PROVIDERS
import { AuthContextProvider } from "./store/authContext.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import { ToastContextProvider } from "./store/ToastContext.jsx";
import { WishlistContextProvider } from "./store/WishlistContext.jsx";

// GLOBAL UI
import ToastHost from "./components/UI/ToastHost.jsx";
import RouteFallback from "./components/UI/RouteFallback.jsx";

// Route-level code splitting: each page (and its loader) is fetched on demand.
// React Router treats the dynamic import as part of the navigation's loading
// phase, so the top progress bar in RootLayout covers the wait.
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { default: Component } = await import(
                        "./pages/Homepage.jsx"
                    );
                    return { Component };
                },
            },
            {
                path: "shop",
                element: <ShopLayout />,
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const { default: Component, loader } = await import(
                                "./pages/Shop.jsx"
                            );
                            return { Component, loader };
                        },
                    },
                ],
            },
            {
                path: "product/:id",
                lazy: async () => {
                    const { default: Component, loader } = await import(
                        "./pages/ProductDetail.jsx"
                    );
                    return { Component, loader };
                },
            },
            {
                path: "wishlist",
                lazy: async () => {
                    const { default: Component } = await import(
                        "./pages/Wishlist.jsx"
                    );
                    return { Component };
                },
            },
        ],
    },
]);

function App() {
    return (
        <AuthContextProvider>
            <ToastContextProvider>
                <WishlistContextProvider>
                    <UserProgressContextProvider>
                        <CartContextProvider>
                            <RouterProvider
                                router={router}
                                fallbackElement={<RouteFallback />}
                            />
                            <ToastHost />
                        </CartContextProvider>
                    </UserProgressContextProvider>
                </WishlistContextProvider>
            </ToastContextProvider>
        </AuthContextProvider>
    );
}

export default App;
