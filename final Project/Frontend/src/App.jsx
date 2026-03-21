// HOOKS & LIBRARIES
import { useRef, useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// COMPONENTS
import Landing from './pages/Landing.jsx';
import Shop from './pages/Shop.jsx';
import Header from "./components/Header.jsx";
import HeaderMinimized from './components/HeaderMinimized.jsx';
import Cart from "./components/Cart.jsx";

// CONTEXT PROVIDER
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';

// CONTEXT
import UserProgressContext from './store/UserProgressContext.jsx';

function App() {

    const [ showPromo, setShowPromo ] = useState(true);
    const [ headerChange, setHeaderChange ] = useState(true);
    const [ headerHover, setHeaderHover ] = useState(false);
    const [ activeCategory, setActiveCategory ] = useState('');
    const [ headerType, setHeaderType ] = useState('headerFull');
    
    const userProgressCtx = useContext(UserProgressContext);

    // HEADER CHANGE HANDLER
    useEffect(() => {

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

    }, [])

    return (
        <BrowserRouter>
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
                    <Route path='/shop' element={<Shop/>}/>
                </Routes>
                <Cart />
            </CartContextProvider>
            </UserProgressContextProvider>
        </BrowserRouter>
    )
}

export default App
