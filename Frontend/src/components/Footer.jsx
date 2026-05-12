// HOOKS
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// RESOURCES
// import FacebookLogo from "/facebook-logo.svg";
import ShopeeLogo from "/shopee-logo.svg";
import InstagramLogo from "/instagram-logo.svg";

// CSS
import styles from "../css/Footer.module.css";

export default function Footer({}) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerUpperContainer}>
                <ul>
                    <li className={styles.footerUpperContainerHeader}>
                        CATALOG
                    </li>
                    <li className={styles.footerUpperContainerLinks}>
                        <Link to="#">Best Sellers</Link>
                    </li>
                    <li className={styles.footerUpperContainerLinks}>
                        <Link to="#">New Arrival</Link>
                    </li>
                </ul>
                <ul style={{ marginLeft: "13rem" }}>
                    <li className={styles.footerUpperContainerHeader}>
                        CUSTOMER SERVICES
                    </li>
                    <li className={styles.footerUpperContainerLinks}>
                        <Link to="#">FAQ</Link>
                    </li>
                    <li className={styles.footerUpperContainerLinks}>
                        <Link to="#">Refund Policy</Link>
                    </li>
                    <li className={styles.footerUpperContainerLinks}>
                        <Link to="#">Terms of Service</Link>
                    </li>
                    <li className={styles.footerUpperContainerLinks}>
                        <Link to="#">Contact Us</Link>
                    </li>
                </ul>
                <ul style={{ marginLeft: "13rem" }}>
                    <li className={styles.footerUpperContainerHeader}>
                        MORE ABOUT US
                    </li>
                    <li className={styles.footerUpperContainerLinks}>
                        <Link to="#">About Us</Link>
                    </li>
                    <li className={styles.footerUpperContainerLinks}>
                        <Link to="#">Privacy Policy</Link>
                    </li>
                    <li className={styles.footerUpperContainerLinks}>
                        <Link to="#">Terms and Conditions</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.footerLowerContainer}>
                <div className={styles.newsletterContainer}>
                    <h3>Subscribe to our newsletter</h3>
                    <p>
                        Be the first to know about our exclusive offers, new
                        arrivals, and more.
                    </p>
                    <form>
                        <input placeholder="Email" />
                        <button>
                            <ArrowRight color="#c7464e" />
                        </button>
                    </form>
                </div>
                <div className={styles.socmedContainer}>
                    <Link to="#">
                        <img
                            className={styles.socmedLogo}
                            src={ShopeeLogo}
                            alt="shopee logo"
                        />
                    </Link>
                    <Link to="#">
                        <img
                            className={styles.socmedLogo}
                            src={InstagramLogo}
                            alt="instagram logo"
                        />
                    </Link>
                    {/* <a href="#"><img className={styles.socmedLogo} src={FacebookLogo} alt="facebook logo"/></a> */}
                </div>
            </div>
            <p className={styles.copyright}>
                ©{new Date().getFullYear()} AMRAH JEWELRY
            </p>
        </footer>
    );
}
