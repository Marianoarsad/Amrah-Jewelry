// HOOKS AND LIBRARIES
import { useContext } from "react";
import { X, ChevronLeft } from 'lucide-react';

// CONTEXT
import UserProgressContext from "../../store/UserProgressContext.jsx";

// COMPONENTS
import Modal from "./Modal.jsx";

// ASSETS
import TestImage from '../../assets/test-image.jpg';
import ProductTestImage from '../../assets/product-test-image.jpg';

import styles from '../../css/Product.module.css';

export default function Product ({}) {
    
    const userProgressCtx = useContext(UserProgressContext);
    
    function handleHideProduct () {
        userProgressCtx.hideProduct()
    }

    function handleSubmit (e) {
        e.preventDefault();
    }

    return (
        <Modal
            className={styles.product}
            open={userProgressCtx.progress === 'view'}
            onClose={userProgressCtx.progress === 'view' ? handleHideProduct : null}
        >
            {/*BACK BUTTON*/}
            
            {/*MODAL BODY*/}
            <div className={styles.productBody}>
                <form 
                    className={styles.productBodyLeft}
                    onSubmit={handleSubmit}
                >
                    <button 
                        onClick={handleHideProduct}
                        className={styles.closeBtn}
                    >
                        <ChevronLeft color="#94161b" size={24}/>
                    </button>
                    <h3>Tiffany T</h3>
                    <p className={styles.shortDesc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, accusamus!</p>
                    <p className={styles.price}>₱20,000</p>
                    {/*MATERIALS*/}
                    <ul className={styles.materialsContainer}>
                        <li className={styles.material}>
                            <img src={TestImage}/>
                            <p>18k Rose Gold</p>
                        </li>
                        <li className={styles.material}>
                            <img src={TestImage}/>
                            <p>18k Yellow Gold</p>
                        </li>
                        <li className={styles.material}>
                            <img src={TestImage}/>
                            <p>18k White Gold</p>
                        </li>
                    </ul>
                    {/*SIZE*/}
                    <div className={styles.sizeContainer}>
                        <p>Size</p>
                        <div className={styles.sizeBtnContainer}>
                            <button>small</button>
                            <button>medium</button>
                            <button>large</button>
                        </div>
                    </div>
                    {/*BUTTONS*/}
                    <div className={styles.actionBtnContainer}>
                        <button className={`${styles.buyNow} ${styles.btn}`}>BUY NOW</button>
                        <button className={`${styles.addToCart} ${styles.btn}`}>ADD TO CART</button>
                    </div>
                </form>
                <div className={styles.productBodyRight}>
                    <img src={TestImage} alt="product-image"/>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, aliquam quidem fuga facilis distinctio, vitae sequi consequatur nulla eum aperiam explicabo optio commodi deleniti impedit veritatis voluptatum nemo. Ducimus, labore sunt eius nobis repudiandae molestias quisquam in facere asperiores quasi ex commodi iusto dignissimos odio itaque soluta doloremque magni voluptates nam minus dolores nesciunt. Consequuntur possimus id nostrum, porro iusto perspiciatis.
                    </p>
                    <ul className={styles.shortDescContainer}>
                        <li>● Lorem, ipsum dolor.</li>
                        <li>● Lorem, ipsum dolor.</li>
                        <li>● Lorem, ipsum dolor.</li>
                    </ul>
                </div>
            </div>
        </Modal>
    )
}