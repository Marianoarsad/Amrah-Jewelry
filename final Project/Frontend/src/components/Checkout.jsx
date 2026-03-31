// HOOKS & LIBRARIES
import { useContext, useActionState } from "react";
import { ArrowLeft } from "lucide-react";

// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";

// COMPONENTS
import Modal from "./UI/Modal.jsx";

// UTIL
import { isNotEmpty } from '../util/validation.js';

import styles from '../css/Checkout.module.css';

export default function Checkout () {
    
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    async function createOrderAction (prevFormState, formData) {
        // RETRIEVE FORM DATA FROM CLIENT
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const address = formData.get('address');

        let errors = [];

        // VALIDATION
        if(!isNotEmpty(firstName)) {
            errors.push('Please enter a first name.');
            console.log(`Errors: ${errors}`)
        }

        if(!isNotEmpty(lastName)) {
            errors.push('Please enter a valid last name.');
            console.log(`Errors: ${errors}`)
        }

        if(!isNotEmpty(email)) {
            errors.push('Please enter a valid email.');
            console.log(`Errors: ${errors}`)
        }

        if(!isNotEmpty(address)) {
            errors.push('Please enter a valid address.');
            console.log(`Errors: ${errors}`)
        }

        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {
                    firstName,
                    lastName,
                    email,
                    address
                }
            }
        }

        const response = await fetch(`http://localhost:8000/orders/create-order`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName, lastName, email, address})
        });
        
        return { errors: null, success: true }
    }

    function handleCloseCheckout () {
        userProgressCtx.hideCheckout();
    }

    function handleFinish () {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
    }
    
    const [ formState, formAction ] = useActionState(createOrderAction, { errors: null })

    if (formState.success) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success!</h2>
                <p>Your order is submitted successfully.</p>
                
                <button
                    className={styles.checkoutSubmitBtn} 
                    onClick={handleFinish}
                >
                    Okay
                </button>
                
            </Modal>
        )
    }

    return (
        <Modal
            className={styles.checkout}
            open={userProgressCtx.progress === 'checkout'}
            onClose={userProgressCtx.progress === 'checkout' ? handleCloseCheckout : null}
        >
            <button 
                className={styles.modalActions} 
                onClick={handleCloseCheckout}
            >
                <ArrowLeft size={16} />
            </button>
            <form 
                className={styles.checkoutForm}
                action={formAction}
            >
                <h2>Checkout</h2>
                <p>Total Amount: </p>
                <div className={styles.inputContainer}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text"
                        id="firstName"
                        name="firstName"
                        defaultValue={formState.enteredValues?.firstName}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text"
                        id="lastName"
                        name="lastName"
                        defaultValue={formState.enteredValues?.lastName}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={formState.enteredValues?.email}
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
                
                <button>CHECKOUT</button>
            </form>
        </Modal>
    )
}