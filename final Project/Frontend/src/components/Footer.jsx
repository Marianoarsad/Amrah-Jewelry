// HOOKS
import { ArrowRight } from "lucide-react";

// RESOURCES
import FacebookLogo from "/facebook-logo.svg";
import ShopeeLogo from "/shopee-logo.svg";
import InstagramLogo from "/instagram-logo.svg";

// CSS
import styles from '../css/Footer.module.css';

export default function Footer ({}) {
    
    
    return (
        <footer className={styles.footer}>
            <div className={styles.footerUpperContainer}>
                <ul>
                    <li className={styles.footerUpperContainerHeader}>CATALOG</li>
                    <li className={styles.footerUpperContainerLinks}><a href="#">Best Sellers</a></li>
                    <li className={styles.footerUpperContainerLinks}><a href="#">New Arrival</a></li>
                </ul>
                <ul style={{marginLeft: "13rem"}}>
                    <li className={styles.footerUpperContainerHeader}>CUSTOMER SERVICES</li>
                    <li className={styles.footerUpperContainerLinks}><a href="#">FAQ</a></li>
                    <li className={styles.footerUpperContainerLinks}><a href="#">Refund Policy</a></li>
                    <li className={styles.footerUpperContainerLinks}><a href="#">Terms of Service</a></li>
                    <li className={styles.footerUpperContainerLinks}><a href="#">Contact Us</a></li>
                </ul>
                <ul style={{marginLeft: "13rem"}}>
                    <li className={styles.footerUpperContainerHeader}>MORE ABOUT US</li>
                    <li className={styles.footerUpperContainerLinks}><a href="#">About Us</a></li>
                    <li className={styles.footerUpperContainerLinks}><a href="#">Privacy Policy</a></li>
                    <li className={styles.footerUpperContainerLinks}><a href="#">Terms and Conditions</a></li>
                </ul>
            </div>
            <div className={styles.footerLowerContainer}>
                <div className={styles.newsletterContainer}>
                    <h3>Subscribe to our newsletter</h3>
                    <p>Be the first to know about our exclusive offers, new arrivals, and more.</p>
                    <form>
                        <input placeholder="Email"/>
                        <button>
                            <ArrowRight color="#c7464e"/>
                        </button>
                    </form>
                </div>
                <div className={styles.socmedContainer}>
                    <a href="#"><img className={styles.socmedLogo} src={ShopeeLogo} alt="shopee logo"/></a>
                    <a href="#"><img className={styles.socmedLogo} src={InstagramLogo} alt="instagram logo"/></a>
                    <a href="#"><img className={styles.socmedLogo} src={FacebookLogo} alt="facebook logo"/></a>
                </div>
            </div>
            <p className={styles.copyright}>©{new Date().getFullYear()} AMRAH JEWELRY</p>
        </footer>
    )
}