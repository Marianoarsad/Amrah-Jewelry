// HOOKS & LIBRARIES
import { useActionState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// CONTEXT
import AuthContext from '../store/authContext.jsx';

// UTIL
import { isNotEmpty } from '../util/validation.js';

import styles from '../css/Register.module.css';

export default function Register ({ ref }) {

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    
    async function registerUserAction (prevFormState, formData) {
        // RETRIEVE FORM DATA FROM CLIENT
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        console.log(`Username: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        let errors = [];

        // VALIDATION
        if(!isNotEmpty(username)) {
            errors.push('Please enter a valid username.');
            console.log(`Errors: ${errors}`)
        }

        if(!isNotEmpty(password)) {
            errors.push('Please enter a valid password.');
            console.log(`Errors: ${errors}`)
        }

        if(!isNotEmpty(email)) {
            errors.push('Please enter a valid email.');
            console.log(`Errors: ${errors}`)
        }

        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {
                    username,
                    email,
                    password
                }
            }
        }

        await authContext.register({
            username,
            email,
            password
        });

        return { errors: null, success: true }
    }

    const [ formState, formAction ] = useActionState(registerUserAction, { errors: null });

    useEffect(() => {
        if (formState.success) {
            navigate('/sign-in');
        }
    }, [formState.success, navigate]);

    return (
        <section>
            <div className={styles.register}>
                <form 
                    className={styles.registerForm}
                    action={formAction}
                >
                    <h2>CREATE AN ACCOUNT</h2>

                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text' 
                        id='username' 
                        name='username' 
                        defaultValue={formState.enteredValues?.username} 
                        placeholder='Enter username' 
                    />
                    <label>Email</label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        defaultValue={formState.enteredValues?.email} 
                        placeholder='Enter email' 
                    />
                    <label>Password</label>
                    <input 
                        type='password' 
                        id='password' 
                        name='password' 
                        defaultValue={formState.enteredValues?.password} 
                        placeholder='Enter password' 
                    />
                    {formState.errors && (
                        <ul className={styles.errors}>
                            {formState.errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <a href='#'>Forgot password?</a>
                    <div className={styles.registerActionsContainer}>
                        
                        <button className={styles.registerBtn}>CREATE ACCOUNT</button>
                        
                        <Link className={styles.registerFormBtn} to={'/sign-in'}>
                            <button className={styles.cancelBtn}>CANCEL</button> 
                        </Link>   
                    </div>
                </form>
            </div>
        </section>
    )
}