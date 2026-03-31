// HOOKS & LIBRARIES
import { useActionState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// CONTEXT
import AuthContext from '../store/authContext.jsx';

// UTIL
import { isNotEmpty } from '../util/validation.js';

import styles from '../css/Signin.module.css';

export default function Signin () {

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    async function SigninUserAction (prevFormState, formData) {
        // RETRIEVE FORM DATA FROM CLIENT
        const username = formData.get('username');
        const password = formData.get('password');

        
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

        // IF HAVE ERRORS, RETURN ERROR ARRAY
        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {
                    username,
                    password
                }
            }
        }

        try {
            await authContext.login({
                username,
                password
            });

            // IF NO ERRORS, RETURN SUCCESS STATE
            return { errors: null, success: true }
        } catch (error) {
            return {
                errors: [error.message || 'Login failed'],
                enteredValues: {
                    username,
                    password
                }
            }
        }
    }

    const [ formState, formAction ] = useActionState(SigninUserAction, { errors: null })

    useEffect(() => {
            if (formState.success) {
                navigate('/home');
            }
    }, [formState.success, navigate]);

    return (
        <section>
            <div className={styles.signIn}>
                <form 
                    className={styles.signinForm}
                    action={formAction}
                >
                    <h2>SIGN IN</h2>

                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text' 
                        id='username' 
                        name='username' 
                        defaultValue={formState.enteredValues?.username} 
                        placeholder='Enter username' 
                    />

                    <label htmlFor='password'>Password</label>
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
                    <div className={styles.signinActionsContainer}>
                        <button className={styles.signinBtn}>SIGN IN</button>
                        <Link to={'/register'} className={styles.signinFormBtn}>
                            <button className={styles.createBtn}>CREATE ACCOUNT</button> 
                        </Link>
                    </div>
                    
                </form>
            </div>
        </section>
    )
}