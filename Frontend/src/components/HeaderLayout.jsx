import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, User, LogOut, Menu, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import UserProgressContext from "../store/UserProgressContext.jsx";
import AuthContext from "../store/authContext.jsx";
import ToastContext from "../store/ToastContext.jsx";
import { CartButton, WishlistButton } from "./UI/CartButton.jsx";
import Modal from "./UI/Modal.jsx";
import { CATEGORIES } from "../data/products.js";
import styles from "../css/Navigation.module.css";
const headlines = ["Lorem ipsum dolor sit amet consectetur adipiscing elit", "Tempus leo eu aenean sed diam urna tempor!", "Pulvinar vivamus fringilla lacus nec metus bibendum egestas!"];
export default function HeaderLayout() {
  const progress = useContext(UserProgressContext);
  const auth = useContext(AuthContext);
  const toast = useContext(ToastContext);
  const location = useLocation();
  const [mobile, setMobile] = useState(false);
  const [category, setCategory] = useState("");
  const [headline, setHeadline] = useState(0);
  function close() {
    setMobile(false);
    setCategory("");
  }
  function logout() {
    auth.logout();
    toast.addToast("You've been signed out.", {
      type: "info"
    });
  }
  const categoryLinks = CATEGORIES.map(cat => <NavLink key={cat.id} to={`/shop?category=${cat.id}`} onClick={close}>{cat.label}</NavLink>);
  return <>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {location.pathname === "/" && <div className={styles.announcement}><button aria-label="Previous announcement" onClick={() => setHeadline((headline + 2) % 3)}><ChevronLeft size={14} /></button><p>{headlines[headline]}</p><button aria-label="Next announcement" onClick={() => setHeadline((headline + 1) % 3)}><ChevronRight size={14} /></button></div>}
        <header className={styles.header} onKeyDown={e => {
      if (e.key === "Escape") setCategory("");
    }} onBlur={e => {
      if (!e.currentTarget.contains(e.relatedTarget)) setCategory("");
    }}>
            <div className={styles.top}>
                <div className={styles.utilities}><button className={styles.mobileToggle} aria-label="Open navigation" onClick={() => setMobile(true)}><Menu /></button><button aria-label="Open search" onClick={progress.showSearch}><Search /><span className={styles.searchLabel}>Search</span></button></div>
                <Link to="/" className={styles.logo} onClick={close}><img src="/amrah-logo-text-red.png" alt="Amrah Jewelry" width="995" height="150" /></Link>
                <div className={styles.utilities}><WishlistButton onClick={close} /><CartButton onClick={progress.showCart} /><button className={styles.account} aria-label={auth.isAuthenticated ? "Sign out" : "Sign in"} onClick={auth.isAuthenticated ? logout : progress.showAuth}>{auth.isAuthenticated ? <LogOut /> : <User />}</button></div>
            </div>
            <nav className={styles.desktop} aria-label="Main navigation" onMouseLeave={() => setCategory("")}>
                <NavLink to="/shop" onClick={close}>All Jewelry</NavLink>
                {CATEGORIES.map(cat => <div className={styles.navItem} key={cat.id} onMouseEnter={() => setCategory(cat.id)}><NavLink to={`/shop?category=${cat.id}`} onClick={close}>{cat.label}</NavLink><button aria-label={`Explore ${cat.label}`} aria-expanded={category === cat.id} aria-controls="category-menu" onClick={() => setCategory(category === cat.id ? "" : cat.id)}><ChevronDown size={12} /></button></div>)}
                {category && <div id="category-menu" className={styles.mega}><div><p className="eyebrow">Categories</p>{categoryLinks}</div><div><p className="eyebrow">Style</p>{["GEMSTONE", "HOOPS", "HUGGIES", "STUDS"].map(label => <Link key={label} to="#">{label}</Link>)}</div><div><p className="eyebrow">Material</p><Link to="#">GOLD</Link><Link to="#">SILVER</Link></div><Link to={`/shop?category=${category}`} onClick={close}><img src={CATEGORIES.find(c => c.id === category).image} alt={category} /></Link></div>}
            </nav>
        </header>
        <Modal open={mobile} onClose={close} className={styles.mobilePanel} aria-label="Navigation"><div className={styles.mobileHead}><img src="/amrah-logo-text-red.png" alt="Amrah Jewelry" width="160" /><button aria-label="Close navigation" onClick={close}><X /></button></div><nav aria-label="Mobile navigation"><Link to="/shop" onClick={close}>All Jewelry</Link>{categoryLinks}<Link to="/wishlist" onClick={close}>My Wishlist</Link><button onClick={() => {
          close();
          auth.isAuthenticated ? logout() : progress.showAuth();
        }}>{auth.isAuthenticated ? "Sign Out" : "Sign In"}</button></nav></Modal>
    </>;
}
