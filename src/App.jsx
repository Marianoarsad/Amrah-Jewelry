import { useRef, useEffect, useState } from 'react';

// COMPONENTS
import Page from "./components/Page.jsx";
import Header from "./components/Header.jsx";
import Carousel from "./components/Carousel.jsx";
import Modal from "./components/Modal.jsx";
import PopularProducts from './components/PopularProducts.jsx';

function App() {

    const cart = useRef();
    const signin = useRef();

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

    return (
        <>
                <Modal ref={signin} type='signin'/>
                <Modal ref={cart} type='cart'/>
                <Header onOpenCart={handleOpenCart} onOpenSignin={handleOpenSignin} />
                <Carousel />
                <PopularProducts />
        </>
    )
}

export default App
