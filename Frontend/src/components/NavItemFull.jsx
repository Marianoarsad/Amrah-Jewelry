import { NavLink } from "react-router-dom";

import styles from "../css/NavItemFull.module.css";

export default function NavItemFull({
    category,
    headerHover,
    activeCategory,
    setActiveCategory,
}) {
    const lowercaseCategory = category.toLowerCase();

    return (
        <li className={styles.navItem}>
            <NavLink
                to={`/shop?category=${lowercaseCategory}`}
                className={`
                    ${headerHover ? styles.navHover : styles.nav} 
                    ${activeCategory === `${lowercaseCategory}` ? styles.active : ""}
                `}
                onMouseEnter={() => {
                    setActiveCategory(`${lowercaseCategory}`);
                }}
            >
                {category}
            </NavLink>
        </li>
    );
}
