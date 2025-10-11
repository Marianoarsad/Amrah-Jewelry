import { ArrowLeft } from 'lucide-react';

export default function SigninModal ({ref}) {

    return (
        <dialog ref={ref} className='signin-modal'>
            <form className='signin-modal-back-btn-container' method="dialog">
                <button><ArrowLeft /></button>
            </form>
            <h2>SIGN IN</h2>
            <form className='signin-form'>
                <label>Email</label>
                <input placeholder='Enter email' />
                <label>Password</label>
                <input placeholder='Enter password' />
                
                <a href='#'>Forgot password?</a>
                <button className='signin-btn'>SIGN IN</button>
                <button className='create-btn'>CREATE ACCOUNT</button>    
            </form>
        </dialog>
    )

}