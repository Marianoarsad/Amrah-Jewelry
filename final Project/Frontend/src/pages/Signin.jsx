import { Link } from 'react-router-dom';

import styles from '../css/Signin.module.css';

export default function Signin ({ ref }) {

    return (
        <section>
            <div className={styles.signIn}>
                <form className={styles.signinForm}>
                    <h2>SIGN IN</h2>

                    <label>Email</label>
                    <input placeholder='Enter email' />
                    <label>Password</label>
                    <input placeholder='Enter password' />
                    
                    <a href='#'>Forgot password?</a>
                    <div className={styles.signinActionsContainer}>
                        <Link to={'/#'} className={styles.signinFormBtn}>
                            <button className={styles.signinBtn}>SIGN IN</button>
                        </Link>
                        <Link to={'/register'} className={styles.signinFormBtn}>
                            <button className={styles.createBtn}>CREATE ACCOUNT</button> 
                        </Link>
                    </div>
                    
                </form>
            </div>
        </section>
    )
}