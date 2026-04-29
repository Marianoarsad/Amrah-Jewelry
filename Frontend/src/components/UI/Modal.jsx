import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// COMPONENTS
import CartModal from "../Cart.jsx";
import SigninModal from "../Authentication.jsx";

export default function Modal({ children, open, onClose, className }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (!modal) return;

        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open]);

    return createPortal(
        <dialog ref={dialog} className={className} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById("modal"),
    );
}
