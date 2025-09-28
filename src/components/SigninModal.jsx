import { ArrowLeft } from 'lucide-react';

export default function SigninModal ({ref}) {

    return (
        <dialog ref={ref} className='signin-modal'>
            <form method="dialog">
                <button><ArrowLeft /></button>
            </form>
        </dialog>
    )

}