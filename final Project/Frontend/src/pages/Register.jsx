import { Link } from 'react-router-dom';

import styles from '../css/Register.module.css';

export default function Register ({ ref }) {

    return (
        <section>
            <div className={styles.register}>
                <form className={styles.registerForm}>
                    <h2>CREATE AN ACCOUNT</h2>

                    <label>Username</label>
                    <input placeholder='Enter username' />
                    <label>Password</label>
                    <input placeholder='Enter password' />
                    <label>Email</label>
                    <input placeholder='Enter email' />
                    
                    <a href='#'>Forgot password?</a>
                    <div className={styles.registerActionsContainer}>
                        <Link className={styles.registerFormBtn} to={'/#'}>
                            <button className={styles.registerBtn}>CREATE ACCOUNT</button>
                        </Link>
                        <Link className={styles.registerFormBtn} to={'/sign-in'}>
                            <button className={styles.cancelBtn}>CANCEL</button> 
                        </Link>   
                    </div>
                </form>
            </div>
        </section>
    )
}