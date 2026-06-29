import { NavLink } from "react-router-dom";

import styles from "../css/NavItemMinimized.module.css";

export default function NavItemMinimized({
    category,
    setActiveCategory,
    setHeaderHover,
}) {
    const lowerCaseCategory = category.toLowerCase();

    return (
        <li key={category} className={styles.navItem}>
            <NavLink
                to={`/shop?category=${lowerCaseCategory}`}
                onMouseEnter={() => {
                    setActiveCategory(lowerCaseCategory);
                }}
                onClick={() => {
                    setHeaderHover(false);
                    setActiveCategory("");
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
            >
                {category}
            </NavLink>
        </li>
    );
}
