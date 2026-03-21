import styles from '../css/SigninModal.module.css';

// PACKAGES
import { ArrowLeft } from 'lucide-react';

export default function SigninModal ({ ref }) {

    return (
        <dialog ref={ref} className={styles.signinModal}>

            <form className={styles.signinModalBackBtnContainer} method="dialog">
                <button><ArrowLeft /></button>
            </form>

            <h2>SIGN IN</h2>

            <form className={styles.signinForm}>
                <label>Email</label>
                <input placeholder='Enter email' />
                <label>Password</label>
                <input placeholder='Enter password' />
                
                <a href='#'>Forgot password?</a>
                <button className={styles.signinBtn}>SIGN IN</button>
                <button className={styles.createBtn}>CREATE ACCOUNT</button>    
            </form>

        </dialog>
    )
}