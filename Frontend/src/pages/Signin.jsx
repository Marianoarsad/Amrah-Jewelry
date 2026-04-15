// HOOKS & LIBRARIES
import { useActionState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

// CONTEXT
import AuthContext from '../store/authContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

// COMPONENTS
import Modal from '../components/UI/Modal.jsx';

// UTIL
import { isNotEmpty } from '../util/validation.js';

import styles from '../css/Signin.module.css';

export default function Signin () {

    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const userProgressCtx = useContext(UserProgressContext);

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

    function handleCloseAuth () {
        userProgressCtx.close();
    }

    useEffect(() => {
            if (formState.success) {
                navigate('/home');
            }
    }, [formState.success, navigate]);

    return (
        <Modal
            className={styles.signIn}
            open={userProgressCtx.progress === 'auth'}
            onClose={userProgressCtx.progress === 'auth' ? handleCloseAuth : null}
        >
                <button className={styles.closeBtn} onClick={handleCloseAuth}><X/></button>

                <form 
                    className={styles.signinForm}
                    action={formAction}
                >
                    <div className={styles.formBtnContainer}>
                        <button>Sign In</button>
                        <button>Create Account</button>
                    </div>

                    <input 
                        type='text' 
                        id='username' 
                        name='username' 
                        defaultValue={formState.enteredValues?.username} 
                        placeholder='Enter username' 
                    />

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
        </Modal>
    )
}