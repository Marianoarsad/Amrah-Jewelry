// HOOKS & LIBRARIES
import { useRef, useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// COMPONENTS
import Header from './components/Header.jsx';
import HeaderFull from "./components/HeaderFull.jsx";
import HeaderMinimized from './components/HeaderMinimized.jsx';
import Cart from "./components/Cart.jsx";
import Footer from './components/Footer.jsx';
import Search from './components/Search.jsx';
import Checkout from './components/Checkout.jsx';
import Product from './components/UI/Product.jsx';

// PAGES
import Landing from './pages/Landing.jsx';
import Register from './pages/Register.jsx';
import Signin from './pages/Signin.jsx';
import Shop from './pages/Shop.jsx';

// CONTEXT PROVIDER
import { AuthContextProvider } from './store/authContext.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

// SERVICES (Helper Functions)
import { authService } from './services/authService.js';

// CONTEXT
import AuthContext from './store/authContext.jsx';
import UserProgressContext from './store/UserProgressContext.jsx';

function App() {

    const [ user, setUser ] = useState(null);
    
    // CONTEXT
    const userProgressCtx = useContext(UserProgressContext);
    const authContext = useContext(AuthContext);

    // console.log(`authContext.user:  ${JSON.stringify(authContext.user)}`)
    // console.log(`authContext.isAuthenticated:  ${authContext.isAuthenticated}`)

    // HEADER CHANGE HANDLER
    
    // CHECK IF THERE IS A LOGGED IN USER
    let existingUser = authService.getCurrentUser();


    return (
        <BrowserRouter>
            <AuthContextProvider>
            <UserProgressContextProvider>
            <CartContextProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<Landing/>}/>
                    <Route path='/home' element={<Landing/>}/>
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='/sign-in' element={<Signin/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
                <Cart />
                <Search />
                <Checkout />
                <Footer />
                <Product />
            </CartContextProvider>
            </UserProgressContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App

// TODO:
/* 
    FRONT-END
    ⦿ Convert to modal and redesign login and register component
*/
/*
    BACKEND:
    ⦿ Fix Header bug where HeaderMinimized does not render its dropdown.
*/