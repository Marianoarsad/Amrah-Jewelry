import { useActionState } from "react";

import styles from "../css/RegisterForm.module.css";

export default function RegisterForm() {
    async function SigninUserAction(prevFormState, formData) {
        // RETRIEVE FORM DATA FROM CLIENT
        const first = formData.get("first");
        const last = formData.get("last");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const phone = formData.get("phone");
        const gender = formData.get("gender");
        const relationship = formData.get("relationship");

        let errors = [];

        // VALIDATION
        if (!isNotEmpty(first)) {
            errors.push("Please enter a valid username.");
            console.log(`Errors: ${errors}`);
        }

        if (!isNotEmpty(last)) {
            errors.push("Please enter a valid password.");
            console.log(`Errors: ${errors}`);
        }
        if (!isNotEmpty(password)) {
            errors.push("Please enter a valid username.");
            console.log(`Errors: ${errors}`);
        }

        if (!isNotEmpty(confirmPassword)) {
            errors.push("Please enter a valid password.");
            console.log(`Errors: ${errors}`);
        }

        if (!isNotEmpty(phone)) {
            errors.push("Please enter a valid username.");
            console.log(`Errors: ${errors}`);
        }

        // IF HAVE ERRORS, RETURN ERROR ARRAY
        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {
                    first,
                    last,
                    password,
                    confirmPassword,
                    phone,
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
                    first,
                    last,
                    password,
                    confirmPassword,
                    phone,
                },
            };
        }
    }

    const [formState, formAction] = useActionState(SigninUserAction, {
        errors: null,
    });

    return (
        <form className={styles.registerForm} action={formAction}>
            <input
                type="text"
                id="first"
                name="first"
                defaultValue={formState.enteredValues?.firstname}
                placeholder="First Name*"
                autoComplete="off"
            />

            <input
                type="text"
                id="last"
                name="last"
                defaultValue={formState.enteredValues?.lastname}
                placeholder="Last Name*"
                autoComplete="off"
            />

            <input
                type="email"
                id="email"
                name="email"
                defaultValue={formState.enteredValues?.email}
                placeholder="Email*"
                autoComplete="off"
            />

            <input
                type="password"
                id="password"
                name="password"
                defaultValue={formState.enteredValues?.password}
                placeholder="Password*"
                autoComplete="off"
            />

            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                defaultValue={formState.enteredValues?.confirmPassword}
                placeholder="Confirm Password*"
                autoComplete="off"
            />

            <input
                type="number"
                id="phone"
                name="phone"
                defaultValue={formState.enteredValues?.phone}
                placeholder="Mobile Number*"
                autoComplete="off"
            />

            <h3>Optional Info</h3>

            <select
                id="gender"
                name="gender"
                defaultValue={formState.enteredValues?.gender}
                placeholder="Relationship Status"
            >
                <option value="married">Male</option>
                <option value="engaged">Female</option>
                <option value="single">Other</option>
            </select>

            <select
                id="relationship"
                name="relationship"
                defaultValue={formState.enteredValues?.relationship}
                placeholder="Relationship Status"
            >
                <option value="married">Married</option>
                <option value="engaged">Engaged</option>
                <option value="single">Single</option>
            </select>

            {/* 
                {formState.errors && (
                    <ul className={styles.errors}>
                        {formState.errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
            */}
            <div className={styles.signinActionsContainer}>
                <button className={styles.registerBtn}>REGISTER</button>
            </div>
        </form>
    );
}
