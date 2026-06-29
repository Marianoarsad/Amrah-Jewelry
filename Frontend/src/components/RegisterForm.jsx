// HOOKS AND LIBRARIES
import { useContext, useActionState } from "react";
import { User, Mail, Lock, AlertCircle } from "lucide-react";

// CONTEXT
import AuthContext from "../store/authContext.jsx";
import ToastContext from "../store/ToastContext.jsx";

// COMPONENTS
import FormField from "./UI/FormField.jsx";
import Button from "./UI/Button.jsx";

// UTIL
import { isNotEmpty, isEmail, hasMinLength } from "../util/validation.js";

import styles from "../css/Auth.module.css";

export default function RegisterForm({ onSuccess, onSwitchMode }) {
    const authContext = useContext(AuthContext);
    const toastCtx = useContext(ToastContext);

    async function registerAction(prevState, formData) {
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        const fieldErrors = {};
        if (!isNotEmpty(firstName))
            fieldErrors.firstName = "First name is required.";
        if (!isNotEmpty(lastName))
            fieldErrors.lastName = "Last name is required.";
        if (!isEmail(email)) fieldErrors.email = "Enter a valid email address.";
        if (!hasMinLength(password, 6))
            fieldErrors.password = "Use at least 6 characters.";
        if (password !== confirmPassword)
            fieldErrors.confirmPassword = "Passwords do not match.";

        const values = { firstName, lastName, email };

        if (Object.keys(fieldErrors).length > 0) {
            return { fieldErrors, values };
        }

        try {
            const user = await authContext.register({
                firstName,
                lastName,
                email,
                password,
            });
            toastCtx.addToast(`Account created — welcome, ${user.firstName}!`);
            onSuccess?.(user);
            return { success: true };
        } catch (error) {
            return {
                formError: error.message || "Registration failed.",
                values,
            };
        }
    }

    const [state, formAction, isPending] = useActionState(registerAction, {
        fieldErrors: {},
    });

    return (
        <form className={styles.form} action={formAction} noValidate>
            <div className={styles.row}>
                <FormField
                    label="First Name"
                    name="firstName"
                    placeholder="First name"
                    icon={User}
                    defaultValue={state.values?.firstName}
                    error={state.fieldErrors?.firstName}
                    autoComplete="given-name"
                />
                <FormField
                    label="Last Name"
                    name="lastName"
                    placeholder="Last name"
                    defaultValue={state.values?.lastName}
                    error={state.fieldErrors?.lastName}
                    autoComplete="family-name"
                />
            </div>

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
                placeholder="At least 6 characters"
                icon={Lock}
                error={state.fieldErrors?.password}
                autoComplete="new-password"
            />

            <FormField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                icon={Lock}
                error={state.fieldErrors?.confirmPassword}
                autoComplete="new-password"
            />

            {state.formError && (
                <p className={styles.formError}>
                    <AlertCircle size={15} />
                    {state.formError}
                </p>
            )}

            <Button type="submit" fullWidth size="lg" loading={isPending}>
                {isPending ? "Creating account…" : "CREATE ACCOUNT"}
            </Button>

            <p className={styles.switchPrompt}>
                Already have an account?{" "}
                <button
                    type="button"
                    className={styles.switchLink}
                    onClick={() => onSwitchMode?.("signin")}
                >
                    Sign in
                </button>
            </p>
        </form>
    );
}
