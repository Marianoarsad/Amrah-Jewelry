import { Loader2 } from "lucide-react";
import styles from "../../css/Button.module.css";

/**
 * Standardized button used across the app.
 * variant: "primary" | "outline" | "ghost"
 * size:    "sm" | "md" | "lg"
 * When `loading` is true the button is disabled and shows a spinner.
 */
export default function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled = false,
    className = "",
    type = "button",
    ...props
}) {
    const classes = [
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 size={16} className={styles.spinner} />}
            {children}
        </button>
    );
}
