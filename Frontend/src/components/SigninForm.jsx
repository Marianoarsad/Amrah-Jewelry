// HOOKS AND LIBRARIES
import { useState, useActionState } from "react";
import { Link } from "react-router-dom";

import styles from "../css/SigninForm.module.css";

export default function SigninForm() {
    async function SigninUserAction(prevFormState, formData) {
        // RETRIEVE FORM DATA FROM CLIENT
        const username = formData.get("username");
        const password = formData.get("password");

        let errors = [];

        // VALIDATION
        if (!isNotEmpty(username)) {
            errors.push("Please enter a valid username.");
            console.log(`Errors: ${errors}`);
        }

        if (!isNotEmpty(password)) {
            errors.push("Please enter a valid password.");
            console.log(`Errors: ${errors}`);
        }

        // IF HAVE ERRORS, RETURN ERROR ARRAY
        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {
                    username,
                    password,
                },
            };
        }

        try {
            await authContext.login({
                username,
                password,
            });

            // IF NO ERRORS, RETURN SUCCESS STATE
            return { errors: null, success: true };
        } catch (error) {
            return {
                errors: [error.message || "Login failed"],
                enteredValues: {
                    username,
                    password,
                },
            };
        }
    }

    const [formState, formAction] = useActionState(SigninUserAction, {
        errors: null,
    });

    const [userFormState, setUserFormState] = useState("signin");

    return (
        <form className={styles.signinForm} action={formAction}>
            <input
                type="text"
                id="username"
                name="username"
                defaultValue={formState.enteredValues?.username}
                placeholder="Username"
                autoComplete="off"
            />

            <input
                type="password"
                id="password"
                name="password"
                defaultValue={formState.enteredValues?.password}
                placeholder="Password"
                autoComplete="off"
            />
            {/* 
                {formState.errors && (
                        <ul className={styles.errors}>
                            {formState.errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                )} 
             */}
            <a href="#">Forgot password</a>
            <div className={styles.signinActionsContainer}>
                <button className={styles.signinBtn}>SIGN IN</button>

                <h3>Create an account</h3>
                <div className={styles.list}>
                    <ul className={styles.firstList}>
                        <li>● Faster Checkout</li>
                        <li>● Access order history</li>
                    </ul>
                    <ul className={styles.secondList}>
                        <li>● Faster Checkout</li>
                        <li>● Access order history</li>
                    </ul>
                </div>

                <Link to={"/register"} className={styles.signinFormBtn}>
                    <button className={styles.createBtn}>CREATE ACCOUNT</button>
                </Link>
            </div>
        </form>
    );
}
