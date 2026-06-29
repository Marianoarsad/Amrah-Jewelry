// HOOKS AND LIBRARIES
import { useContext, useActionState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";

// CONTEXT
import AuthContext from "../store/authContext.jsx";
import ToastContext from "../store/ToastContext.jsx";

// COMPONENTS
import FormField from "./UI/FormField.jsx";
import Button from "./UI/Button.jsx";

// UTIL
import { isNotEmpty, isEmail } from "../util/validation.js";

import styles from "../css/Auth.module.css";

export default function SigninForm({ onSuccess, onSwitchMode }) {
    const authContext = useContext(AuthContext);
    const toastCtx = useContext(ToastContext);

    async function signinAction(prevState, formData) {
        const email = formData.get("email");
        const password = formData.get("password");

        const fieldErrors = {};
        if (!isEmail(email)) fieldErrors.email = "Enter a valid email address.";
        if (!isNotEmpty(password))
            fieldErrors.password = "Please enter your password.";

        if (Object.keys(fieldErrors).length > 0) {
            return { fieldErrors, values: { email } };
        }

        try {
            const user = await authContext.login({ email, password });
            toastCtx.addToast(`Welcome back, ${user.firstName || "friend"}!`);
            onSuccess?.(user);
            return { success: true };
        } catch (error) {
            return {
                formError: error.message || "Sign in failed.",
                values: { email },
            };
        }
    }

    const [state, formAction, isPending] = useActionState(signinAction, {
        fieldErrors: {},
    });

    return (
        <form className={styles.form} action={formAction} noValidate>
            <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                icon={Mail}
                defaultValue={state.values?.email}
                error={state.fieldErrors?.email}
                autoComplete="email"
            />

            <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                icon={Lock}
                error={state.fieldErrors?.password}
                autoComplete="current-password"
            />

            <button type="button" className={styles.forgot}>
                Forgot password?
            </button>

            {state.formError && (
                <p className={styles.formError}>
                    <AlertCircle size={15} />
                    {state.formError}
                </p>
            )}

            <Button type="submit" fullWidth size="lg" loading={isPending}>
                {isPending ? "Signing in…" : "SIGN IN"}
            </Button>

            <p className={styles.switchPrompt}>
                New to Amrah?{" "}
                <button
                    type="button"
                    className={styles.switchLink}
                    onClick={() => onSwitchMode?.("register")}
                >
                    Create an account
                </button>
            </p>
        </form>
    );
}
