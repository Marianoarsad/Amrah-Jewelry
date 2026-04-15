// HOOKS AND LIBRARIES
import { Link } from 'react-router-dom';

// ASSETS
import GridImage1 from '../assets/grid-image-1.png';
import GridImage2 from '../assets/grid-image-2.png';
import GridImage3 from '../assets/grid-image-3.png';
import GridImage4 from '../assets/grid-image-4.png';


import styles from '../css/Follow.module.css'

export default function Follow ({}) {
    
    
    return (
        <section>
            <div className={styles.follow}>
                <h3>Follow us on Instagram</h3>
                <div className={styles.followGrid}>
                    <img src={GridImage1} alt='idontgiveafuck'/>
                    <img src={GridImage2} alt='idontgiveafuck'/>
                    <img src={GridImage3} alt='idontgiveafuck'/>
                    <img src={GridImage4} alt='idontgiveafuck'/>

                    <img src={GridImage1} alt='idontgiveafuck'/>
                    <img src={GridImage2} alt='idontgiveafuck'/>
                    <img src={GridImage3} alt='idontgiveafuck'/>
                    <img src={GridImage4} alt='idontgiveafuck'/>

                    <img src={GridImage1} alt='idontgiveafuck'/>
                    <img src={GridImage2} alt='idontgiveafuck'/>
                    <img src={GridImage3} alt='idontgiveafuck'/>
                    <img src={GridImage4} alt='idontgiveafuck'/>
                </div>
                <a href='https://www.instagram.com/' target="_blank"><button className={styles.igBtn}>INSTAGRAM</button></a>
            </div>
        </section>
    )
}