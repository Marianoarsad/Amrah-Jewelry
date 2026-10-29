import { Link } from "react-router-dom";
import styles from "../css/Hero.module.css";
export default function Hero() {
  return <section className={styles.hero}><div className={styles.copy}><p className="eyebrow">NEW IN</p><h1>Timeless<br /><em>Collection</em></h1><p>Introducing timeless designs</p><Link to="/shop" className={styles.cta}>Shop now</Link></div><img src="/hero-background-5.webp" srcSet="/hero-background-mobile.webp 900w, /hero-background-5.webp 1600w" sizes="(max-width: 767px) 100vw, 55vw" alt="Pearl and gold jewelry worn with a black jacket" width="4400" height="4400" fetchPriority="high" /></section>;
}
