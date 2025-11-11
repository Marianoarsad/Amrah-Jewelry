import { ArrowRight } from "lucide-react";

import FacebookLogo from "/facebook-logo.svg";
import ShopeeLogo from "/shopee-logo.svg";
import InstagramLogo from "/instagram-logo.svg";

export default function Footer ({}) {
    
    
    return (
        <footer>
            <div className="footer-upper-container">
                <ul>
                    <li className="footer-upper-container-header">CATALOG</li>
                    <li className="footer-upper-container-links"><a href="#">Best Sellers</a></li>
                    <li className="footer-upper-container-links"><a href="#">New Arrival</a></li>
                </ul>
                <ul style={{marginLeft: "13rem"}}>
                    <li className="footer-upper-container-header">CUSTOMER SERVICES</li>
                    <li className="footer-upper-container-links"><a href="#">FAQ</a></li>
                    <li className="footer-upper-container-links"><a href="#">Refund Policy</a></li>
                    <li className="footer-upper-container-links"><a href="#">Terms of Service</a></li>
                    <li className="footer-upper-container-links"><a href="#">Contact Us</a></li>
                </ul>
                <ul style={{marginLeft: "13rem"}}>
                    <li className="footer-upper-container-header">MORE ABOUT US</li>
                    <li className="footer-upper-container-links"><a href="#">About Us</a></li>
                    <li className="footer-upper-container-links"><a href="#">Privacy Policy</a></li>
                    <li className="footer-upper-container-links"><a href="#">Terms and Conditions</a></li>
                </ul>
            </div>
            <div className="footer-lower-container">
                <div className="newsletter-container">
                    <h3>Subscribe to our newsletter</h3>
                    <p>Be the first to know about our exclusive offers, new arrivals, and more.</p>
                    <form>
                        <input placeholder="Email"/>
                        <button>
                            <ArrowRight color="#c7464e"/>
                        </button>
                    </form>
                </div>
                <div className="socmed-container">
                    <a href="#"><img className="socmed-logo" src={ShopeeLogo} alt="shopee logo"/></a>
                    <a href="#"><img className="socmed-logo" src={InstagramLogo} alt="instagram logo"/></a>
                    <a href="#"><img className="socmed-logo" src={FacebookLogo} alt="facebook logo"/></a>
                </div>
            </div>
            <p className="copyright">©{new Date().getFullYear()} AMRAH JEWELRY</p>
        </footer>
    )
}