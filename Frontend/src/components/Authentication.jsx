// HOOKS & LIBRARIES
import { useState, useActionState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

// CONTEXT
import AuthContext from "../store/authContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

// COMPONENTS
import Modal from "./UI/Modal.jsx";
import SigninForm from "./SigninForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

// UTIL
import { isNotEmpty } from "../util/validation.js";

// ASSETS
import SignInImage from "../assets/signin-img.jpg";

import styles from "../css/Authentication.module.css";

export default function Signin() {
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const userProgressCtx = useContext(UserProgressContext);

    const [userFormState, setUserFormState] = useState("signin");

    function handleSigninForm() {
        setUserFormState("signin");
    }

    function handleRegisterForm() {
        setUserFormState("register");
    }

    function handleCloseAuth() {
        userProgressCtx.close();
    }

    let form = <SigninForm />;

    if (userFormState === "register") {
        form = <RegisterForm />;
    }

    return (
        <Modal
            className={styles.signIn}
            open={userProgressCtx.progress === "auth"}
            onClose={
                userProgressCtx.progress === "auth" ? handleCloseAuth : null
            }
        >
            <div className={styles.amrah}>
                <img src={SignInImage} />
            </div>
            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <button
                        className={styles.authBtn}
                        onClick={handleSigninForm}
                    >
                        Sign In
                    </button>
                    <button
                        className={styles.authBtn}
                        onClick={handleRegisterForm}
                    >
                        Create Account
                    </button>
                    <button
                        className={styles.closeBtn}
                        onClick={handleCloseAuth}
                    >
                        <X />
                    </button>
                </div>

                {form}
            </div>
        </Modal>
    );
}
