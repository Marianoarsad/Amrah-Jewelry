// HOOKS & LIBRARIES
import { useRef, useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// COMPONENTS
import Header from "./components/Header.jsx";
import HeaderMinimized from './components/HeaderMinimized.jsx';
import Cart from "./components/Cart.jsx";
import Footer from './components/Footer.jsx';
import Search from './components/Search.jsx';

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

    const [ showPromo, setShowPromo ] = useState(true);
    const [ headerChange, setHeaderChange ] = useState(true);
    const [ headerHover, setHeaderHover ] = useState(false);
    const [ activeCategory, setActiveCategory ] = useState('');
    const [ headerType, setHeaderType ] = useState('headerFull');
    
    // CONTEXT
    const userProgressCtx = useContext(UserProgressContext);
    const authContext = useContext(AuthContext);

    // HEADER CHANGE HANDLER
    useEffect(() => {   
        // CHECK IF THERE IS A LOGGED IN USER
        const currentUser = authService.getCurrentUser();

        if (currentUser) {
            //console.log(`LOGGED IN USER: ${currentUser}`);


            setUser(currentUser);
        }

        const handleScroll = () => {

            let verticalScroll = window.scrollY;

            if (verticalScroll <= 79) {
                setHeaderChange(true);
                setHeaderType('headerFull');
            }
            
            if (verticalScroll >= 80) {
                setHeaderChange(false);
                setHeaderType('headerMinimized');
            }

            // TO SIMPLIFY
            if ( verticalScroll === 0 ) {
                setShowPromo(true);
            } else {
                setShowPromo(false);
            }

        }

        window.addEventListener("scroll", handleScroll);  

    }, []);

    return (
        <BrowserRouter>
            <AuthContextProvider>
            <UserProgressContextProvider>
            <CartContextProvider>
                { headerChange ? 
                    <Header
                        showPromo={showPromo}
                        activeCategory={activeCategory}
                        headerHover={headerHover}
                        headerType={headerType}
                        setHeaderHover={setHeaderHover}
                        setActiveCategory={setActiveCategory}
                    /> : 
                    <HeaderMinimized
                        activeCategory={activeCategory}
                        headerHover={headerHover}
                        headerType={headerType}
                        setHeaderHover={setHeaderHover}
                        setActiveCategory={setActiveCategory}
                    />
                }
                <Routes>
                    <Route path='/' element={<Landing/>}/>
                    <Route path='/home' element={<Landing/>}/>
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='/sign-in' element={<Signin/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
                <Cart />
                <Search />
                <Footer />
            </CartContextProvider>
            </UserProgressContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App

// TODO:

// Build Search Component ✅
// Build Cart Component ✅
// Build Item Component (Modal)
// Build Checkout Component 


