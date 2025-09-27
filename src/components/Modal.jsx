import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

// IMAGES

// COMPONENTS
import CartModal from './CartModal.jsx';
import { Car } from 'lucide-react';

const Modal = forwardRef(({  }, ref) => {

    const modal = <CartModal ref={ref} />;


    return (
        modal
    );
});

export default CartModal;