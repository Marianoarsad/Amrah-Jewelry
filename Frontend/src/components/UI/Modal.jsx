import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
    children,
    open,
    onClose,
    className,
    closeOnBackdrop = false,
}) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (!modal) return;

        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open]);

    // A click whose target is the <dialog> itself comes from the ::backdrop
    // (the dimmed area outside the panel). Clicks on the panel content target a
    // child element instead, so this only fires for true outside clicks.
    function handleClick(event) {
        if (closeOnBackdrop && event.target === dialog.current) {
            onClose?.();
        }
    }

    return createPortal(
        <dialog
            ref={dialog}
            className={className}
            onClose={onClose}
            onClick={closeOnBackdrop ? handleClick : undefined}
        >
            {children}
        </dialog>,
        document.getElementById("modal"),
    );
}
