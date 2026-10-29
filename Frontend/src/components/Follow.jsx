// HOOKS AND LIBRARIES
import { Link } from "react-router-dom";

// ASSETS
import GridImage1 from "../assets/grid-image-1.webp";
import GridImage2 from "../assets/grid-image-2.webp";
import GridImage3 from "../assets/grid-image-3.webp";
import GridImage4 from "../assets/grid-image-4.webp";
import styles from "../css/Follow.module.css";
export default function Follow() {
  return <section>
            <div className={styles.follow}>
                <h3>Follow us on Instagram</h3>
                <div className={styles.followGrid}>
                    <img src={GridImage1} alt="Jewelry collection detail" loading="lazy" width="400" height="400" />
                    <img src={GridImage2} alt="Jewelry collection detail" loading="lazy" width="400" height="400" />
                    <img src={GridImage3} alt="Jewelry collection detail" loading="lazy" width="400" height="400" />
                    <img src={GridImage4} alt="Jewelry collection detail" loading="lazy" width="400" height="400" />
                </div>
                <Link className={styles.igBtn} to="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    INSTAGRAM
                </Link>
            </div>
        </section>;
}
