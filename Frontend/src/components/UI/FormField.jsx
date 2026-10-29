import { useState, useId } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

import styles from "../../css/FormField.module.css";

/**
 * Accessible labeled input with focus + error states.
 * Supports text/email/password/number/tel and a password visibility toggle.
 */
export default function FormField({
    label,
    id,
    name,
    type = "text",
    error,
    icon: Icon,
    className = "",
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const fieldId = id || `${name}-${generatedId}`;
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <Motion.div
            className={`${styles.field} ${className}`}
            initial={false}
            transition={{ duration: 0.35 }}
        >
            {label && (
                <label htmlFor={fieldId} className={styles.label}>
                    {label}
                </label>
            )}

            <div
                className={`${styles.inputWrap} ${error ? styles.inputError : ""}`}
            >
                {Icon && <Icon size={17} className={styles.leadingIcon} />}
                <input
                    id={fieldId}
                    name={name}
                    type={inputType}
                    className={styles.input}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${fieldId}-error` : undefined}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        className={styles.toggle}
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={16} />
                        ) : (
                            <Eye size={16} />
                        )}
                    </button>
                )}
            </div>

            <AnimatePresence>
                {error && (
                    <Motion.p
                        role="alert"
                        id={`${fieldId}-error`}
                        className={styles.errorText}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                    >
                        <AlertCircle size={13} />
                        {error}
                    </Motion.p>
                )}
            </AnimatePresence>
        </Motion.div>
    );
}
