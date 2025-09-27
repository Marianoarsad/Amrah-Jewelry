import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

//IMAGES
import EmptyCart from '/empty-cart.svg';

const CartModal = forwardRef((props, ref) => {
    
    
    return (
        <dialog ref={ref} className="cart-modal">
            <form method="dialog">
                <button><ArrowLeft /></button>
            </form>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".7rem",
                width: "100%",
                fontSize: "1.3rem"

            }}>
                <img src={EmptyCart} alt='empty cart' width="100rem"/>
                <p>Your cart is empty</p>
                <p>Continue shopping <a href='#'>here</a></p>
            </div>
            
            <div style={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                width: "100%", 
                height: "27%", 
                borderTop: "#C64B50 solid 1px"
            }}>
                <div style={{
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "80%",
                    marginTop: "1rem"
                }}>
                    <h3>YOU MAY LIKE</h3>
                    <button style={{padding: "0", background: "none", border: "none"}}>
                        <ChevronLeft style={{stroke: "#C64B50"}} />
                    </button>
                    <button style={{padding: "0", background: "none", border: "none"}}>
                        <ChevronRight style={{stroke: "#C64B50"}} />
                    </button>
                </div>
                <div style={{
                    width: "80%", 
                    height: "53%", 
                    border: "black solid 1px",
                    borderRadius: "1rem"
                }}>

                </div>   
            </div> 
        </dialog>
    );
});

export default CartModal;