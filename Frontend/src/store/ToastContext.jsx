import { createContext, useState, useCallback, useRef } from "react";

const ToastContext = createContext({
    toasts: [],
    addToast: (message, options) => {},
    removeToast: (id) => {},
});

export function ToastContextProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const idRef = useRef(0);

    const removeToast = useCallback((id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback(
        (message, options = {}) => {
            const id = ++idRef.current;
            const toast = {
                id,
                message,
                type: options.type || "success", // 'success' | 'info' | 'error'
                image: options.image || null,
                duration: options.duration ?? 2600,
            };
            setToasts((current) => [...current, toast]);

            if (toast.duration > 0) {
                setTimeout(() => removeToast(id), toast.duration);
            }
            return id;
        },
        [removeToast],
    );

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export default ToastContext;
