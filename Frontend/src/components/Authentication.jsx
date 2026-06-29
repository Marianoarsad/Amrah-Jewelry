// HOOKS & LIBRARIES
import { useState, useContext, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";

// COMPONENTS
import Modal from "./UI/Modal.jsx";
import SigninForm from "./SigninForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

// ASSETS
import SignInImage from "../assets/signin-img.jpg";

import styles from "../css/Authentication.module.css";

export default function Authentication() {
    const userProgressCtx = useContext(UserProgressContext);
    const [mode, setMode] = useState("signin"); // 'signin' | 'register'

    const open = userProgressCtx.progress === "auth";

    // Reset to the sign-in tab each time the modal is opened.
    useEffect(() => {
        if (open) setMode("signin");
    }, [open]);

    function handleClose() {
        userProgressCtx.close();
    }

    const isSignin = mode === "signin";

    return (
        <Modal
            className={styles.signIn}
            open={open}
            onClose={open ? handleClose : null}
        >
            <div className={styles.amrah}>
                <img src={SignInImage} alt="Amrah jewelry" />
            </div>

            <div className={styles.formContainer}>
                <button
                    className={styles.closeBtn}
                    onClick={handleClose}
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                <div className={styles.formInner}>
                    <header className={styles.formIntro}>
                        <h2>{isSignin ? "Welcome back" : "Create account"}</h2>
                        <p>
                            {isSignin
                                ? "Sign in to continue your Amrah experience."
                                : "Join Amrah for faster checkout and order history."}
                        </p>
                    </header>

                    <div className={styles.tabs} role="tablist">
                        <button
                            role="tab"
                            aria-selected={isSignin}
                            className={`${styles.tab} ${isSignin ? styles.tabActive : ""}`}
                            onClick={() => setMode("signin")}
                        >
                            Sign In
                        </button>
                        <button
                            role="tab"
                            aria-selected={!isSignin}
                            className={`${styles.tab} ${!isSignin ? styles.tabActive : ""}`}
                            onClick={() => setMode("register")}
                        >
                            Register
                        </button>
                        <span
                            className={styles.tabIndicator}
                            style={{
                                transform: isSignin
                                    ? "translateX(0%)"
                                    : "translateX(100%)",
                            }}
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, x: isSignin ? -14 : 14 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isSignin ? 14 : -14 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isSignin ? (
                                <SigninForm
                                    onSuccess={handleClose}
                                    onSwitchMode={setMode}
                                />
                            ) : (
                                <RegisterForm
                                    onSuccess={handleClose}
                                    onSwitchMode={setMode}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Modal>
    );
}
