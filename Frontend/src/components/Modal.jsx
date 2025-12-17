import { forwardRef, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Car } from 'lucide-react';

// IMAGES

// COMPONENTS
import CartModal from './CartModal.jsx';
import SigninModal from './SigninModal.jsx';

const Modal = forwardRef(({ type }, ref) => {

    let modalType;

    if (type === 'signin') {
        modalType = <SigninModal ref={ref} />;
    }

    if (type === 'cart') {
        modalType = <CartModal ref={ref} />
    }

    return (
        modalType
    )

});

export default Modal;