import { useContext } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, X, Heart } from "lucide-react";

import ToastContext from "../../store/ToastContext.jsx";
import styles from "../../css/Toast.module.css";

const ICONS = {
    success: Check,
    info: Info,
    error: X,
    wishlist: Heart,
};

export default function ToastHost() {
    const { toasts, removeToast } = useContext(ToastContext);

    const host = document.getElementById("modal") || document.body;

    return createPortal(
        <div className={styles.toastHost}>
            <AnimatePresence initial={false}>
                {toasts.map((toast) => {
                    const Icon = ICONS[toast.type] || Check;
                    return (
                        <motion.div
                            key={toast.id}
                            className={`${styles.toast} ${styles[toast.type] || ""}`}
                            initial={{ opacity: 0, y: -16, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 40, scale: 0.96 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={() => removeToast(toast.id)}
                            role="status"
                        >
                            {toast.image ? (
                                <img
                                    src={toast.image}
                                    alt=""
                                    className={styles.toastImage}
                                />
                            ) : (
                                <span className={styles.toastIcon}>
                                    <Icon size={16} />
                                </span>
                            )}
                            <p className={styles.toastMessage}>
                                {toast.message}
                            </p>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>,
        host,
    );
}
