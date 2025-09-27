import { useRef, useEffect } from 'react';

// COMPONENTS
import Page from "./components/Page.jsx";
import Header from "./components/Header.jsx";
import Carousel from "./components/Carousel.jsx";
import CartModal from "./components/CartModal.jsx";

function App() {

    const cart = useRef()
    
    function handleOpenCart () {

        if (cart.current) {
            cart.current.showModal();
        }

    }

    return (
        <>
                <CartModal ref={cart} />
                <Header onOpenCart={handleOpenCart} />
                <Carousel />
        </>
    )
}

export default App
