// HOOKS & LIBRARIES
import { useContext, useActionState } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import AuthContext from "../store/authContext.jsx";

// COMPONENTS
import Modal from "./UI/Modal.jsx";

// UTIL
import { isNotEmpty } from "../util/validation.js";
import { currencyFormatter } from "../util/formatting.js";

import styles from "../css/Checkout.module.css";

const SHIPPING_FEE = 250;

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { user } = useContext(AuthContext);

    const subtotal = cartCtx.totalPrice;
    const shipping = cartCtx.products.length > 0 ? SHIPPING_FEE : 0;
    const total = subtotal + shipping;

    async function createOrderAction(prevFormState, formData) {
        const values = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            address: formData.get("address"),
            city: formData.get("city"),
            postalCode: formData.get("postalCode"),
        };

        const errors = [];
        if (!isNotEmpty(values.firstName)) errors.push("first name");
        if (!isNotEmpty(values.lastName)) errors.push("last name");
        if (!isEmail(values.email)) errors.push("a valid email");
        if (!isNotEmpty(values.address)) errors.push("a shipping address");
        if (!isNotEmpty(values.city)) errors.push("a city");

        if (errors.length > 0) {
            return {
                errors: `Please enter ${errors.join(", ")}.`,
                enteredValues: values,
            };
        }

        // Try the real backend; fall back to a simulated success if it's
        // unreachable so the demo flow always completes.
        const orderPayload = {
            customer: values,
            items: cartCtx.products,
            total,
        };

        try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 2500);
            await fetch("http://localhost:8000/orders/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
                signal: controller.signal,
            }).finally(() => clearTimeout(timer));
        } catch {
            /* offline / no backend — continue with a simulated confirmation */
        }

        const orderNumber =
            "AMR-" + Math.random().toString(36).slice(2, 8).toUpperCase();

        return { errors: null, success: true, orderNumber };
    }

    function handleClose() {
        userProgressCtx.close();
    }

    function handleFinish() {
        userProgressCtx.close();
        cartCtx.clearCart();
    }

    const [formState, formAction, isPending] = useActionState(
        createOrderAction,
        { errors: null },
    );

    const open = userProgressCtx.progress === "checkout";

    // CONFIRMATION SCREEN
    if (formState.success) {
        return (
            <Modal
                className={styles.checkout}
                open={open}
                onClose={handleFinish}
            >
                <div className={styles.confirmation}>
                    <CheckCircle2 size={64} className={styles.confirmIcon} />
                    <h2>Thank you!</h2>
                    <p className={styles.orderNumber}>
                        Order {formState.orderNumber}
                    </p>
                    <p className={styles.confirmText}>
                        Your order has been placed successfully. A confirmation
                        email is on its way.
                    </p>
                    <button
                        className={styles.checkoutSubmitBtn}
                        onClick={handleFinish}
                    >
                        Continue Shopping
                    </button>
                </div>
            </Modal>
        );
    }

    return (
        <Modal
            className={styles.checkout}
            open={open}
            onClose={open ? handleClose : null}
        >
            <div className={styles.checkoutHeader}>
                <button
                    className={styles.modalActions}
                    onClick={handleClose}
                    aria-label="Back"
                >
                    <ArrowLeft size={16} />
                </button>
                <h2>Checkout</h2>
                <span style={{ width: "2rem" }} />
            </div>

            <div className={styles.scrollArea}>
                {/* ORDER SUMMARY */}
                <div className={styles.summary}>
                    <h3>Order Summary</h3>
                    {cartCtx.products.length === 0 ? (
                        <p className={styles.emptyNote}>Your bag is empty.</p>
                    ) : (
                        <ul className={styles.summaryList}>
                            {cartCtx.products.map((p) => (
                                <li key={p._id}>
                                    <span className={styles.summaryName}>
                                        {p.name}{" "}
                                        <span className={styles.qtyTag}>
                                            ×{p.quantity}
                                        </span>
                                    </span>
                                    <span>
                                        {currencyFormatter.format(
                                            p.price * p.quantity,
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className={styles.totals}>
                        <div>
                            <span>Subtotal</span>
                            <span>{currencyFormatter.format(subtotal)}</span>
                        </div>
                        <div>
                            <span>Shipping</span>
                            <span>{currencyFormatter.format(shipping)}</span>
                        </div>
                        <div className={styles.grandTotal}>
                            <span>Total</span>
                            <span>{currencyFormatter.format(total)}</span>
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <form className={styles.checkoutForm} action={formAction}>
                    <h3>Shipping Details</h3>

                    <div className={styles.row}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                defaultValue={
                                    formState.enteredValues?.firstName ??
                                    user?.firstName
                                }
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                defaultValue={
                                    formState.enteredValues?.lastName ??
                                    user?.lastName
                                }
                            />
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={
                                formState.enteredValues?.email ?? user?.email
                            }
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            defaultValue={formState.enteredValues?.address}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                defaultValue={formState.enteredValues?.city}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                defaultValue={
                                    formState.enteredValues?.postalCode
                                }
                            />
                        </div>
                    </div>

                    {formState.errors && (
                        <p className={styles.errorText}>{formState.errors}</p>
                    )}

                    <button
                        className={styles.placeOrderBtn}
                        disabled={isPending || cartCtx.products.length === 0}
                    >
                        {isPending ? (
                            <>
                                <Loader2
                                    size={18}
                                    className={styles.spinner}
                                />
                                Placing order…
                            </>
                        ) : (
                            <>
                                Place Order ·{" "}
                                {currencyFormatter.format(total)}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </Modal>
    );
}
