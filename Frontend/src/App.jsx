import { useRef, useEffect, useState } from 'react';

// COMPONENTS
import Header from "./components/Header.jsx";
import HeaderMinimized from './components/HeaderMinimized.jsx';
import Page from "./components/Page.jsx";
import Carousel from "./components/Carousel.jsx";
import Modal from "./components/Modal.jsx";
import PopularProducts from './components/PopularProducts.jsx';
import Categories from './components/Categories.jsx';
import Footer from './components/Footer.jsx';

function App() {

    const cart = useRef();
    const signin = useRef();

    const [ showPromo, setShowPromo ] = useState(true);
    const [ headerChange, setHeaderChange ] = useState(true);
    const [ headerHover, setHeaderHover ] = useState(false);
    const [ activeCategory, setActiveCategory ] = useState('');
    const [ headerType, setHeaderType ] = useState('headerFull');

    // TO FIX
    function handleOpenCart () {

        if (cart.current) {
            cart.current.showModal();
        }
        
    }

    // TO FIX
    function handleOpenSignin () {

        if (signin.current) {
            signin.current.showModal();
        }

    }

    
    // HEADER CHANGE HANDLER    
    useEffect(() => {

        const handleScroll = () => {

            let verticalScroll = window.scrollY;

            if (verticalScroll <= 659) {
                setHeaderChange(true);
                setHeaderType('headerFull');
            } 
            
            if (verticalScroll >= 660) {
                setHeaderChange(false);
                setHeaderType('headerMinimized');
            }

            // TO SIMPLIFY
            if ( verticalScroll === 0 ) {
                setShowPromo(true);
            }

            if ( verticalScroll !== 0 ) {
                setShowPromo(false);
            }
        }

        window.addEventListener("scroll", handleScroll);  

    }, [])

    return (
        <>  
                <Modal ref={signin} type='signin'/>
                <Modal ref={cart} type='cart'/>
                { headerChange ? 
                    
                    <Header
                        cartRef={cart}
                        signinRef={signin}
                        showPromo={showPromo}
                        activeCategory={activeCategory}
                        headerHover={headerHover}
                        headerType={headerType}
                        setHeaderHover={setHeaderHover}
                        setActiveCategory={setActiveCategory}
                        handleOpenCart={handleOpenCart} 
                        handleOpenSignin={handleOpenSignin}
                        
                    /> : 
                    <HeaderMinimized
                        activeCategory={activeCategory}
                        headerHover={headerHover}
                        headerType={headerType}
                        setHeaderHover={setHeaderHover}
                        setActiveCategory={setActiveCategory}
                        onOpenCart={handleOpenCart} 
                        onOpenSignin={handleOpenSignin}
                    />
                }
                <Carousel />
                <PopularProducts />
                <Categories />
                <Footer />
        </>
    )
}

export default App
