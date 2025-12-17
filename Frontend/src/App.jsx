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
    const [ headerChange, setHeaderChange ] = useState(false);

    function handleOpenCart () {

        if (cart.current) {
            cart.current.showModal();
        }
        
    }

    function handleOpenSignin () {

        if (signin.current) {
            signin.current.showModal();
        }

    }

    let verticalScroll;
    window.addEventListener("scroll", () => {

        verticalScroll = window.scrollY;
        console.log(verticalScroll)

        if( verticalScroll === 0 ) {
            setShowPromo(true);
        }

        if ( verticalScroll !== 0 ) {
            setShowPromo(false);
        }
        
        if (verticalScroll <= 659) {
            setHeaderChange(true);
        }
        
        if ( verticalScroll >= 660 ) {
            setHeaderChange(false);
        }

    });

    return (
        <>  
                <Modal ref={signin} type='signin'/>
                <Modal ref={cart} type='cart'/>
                { headerChange ? <Header showPromo={showPromo} onOpenCart={handleOpenCart} onOpenSignin={handleOpenSignin}/> : <HeaderMinimized/>}
                <Carousel />
                <PopularProducts />
                <Categories />
                <Footer />
        </>
    )
}

export default App
