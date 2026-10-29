// HOOKS & LIBRARIES
import { useContext, useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Search as SearchIcon } from "lucide-react";

// CONTEXT
import UserProgressContext from "../store/UserProgressContext.jsx";

// COMPONENTS
import Modal from "./UI/Modal.jsx";

// DATA
import { PRODUCTS, CATEGORIES } from "../data/products.js";

// UTIL
import { catalogCategories } from "../util/catalog.js";
import { productService } from "../services/productService.js";
import { currencyFormatter } from "../util/formatting.js";

import FallbackImage from "../assets/pearl.png";
import styles from "../css/Search.module.css";



export default function Search() {
    const userProgressCtx = useContext(UserProgressContext);
    const navigate = useNavigate();

    const [catalog, setCatalog] = useState(PRODUCTS);
    const popular = (catalog.some((p) => p.popular) ? catalog.filter((p) => p.popular) : catalog).slice(0, 5);
    const [query, setQuery] = useState("");

    const open = userProgressCtx.progress === "search";

    // Reset the query each time the search modal is opened.
    useEffect(() => {
        if (open) setQuery("");
    }, [open]);

    useEffect(() => {
        if (!open) return;
        let cancelled = false;
        productService.getProducts().then((items) => { if (!cancelled) setCatalog(items); });
        return () => { cancelled = true; };
    }, [open]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return catalog.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                (p.description || "").toLowerCase().includes(q),
        ).slice(0, 6);
    }, [query, catalog]);

    function handleClose() {
        userProgressCtx.close();
    }

    function goToCategory(categoryId) {
        userProgressCtx.close();
        navigate(`/shop?category=${categoryId}`);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const q = query.trim();
        userProgressCtx.close();
        navigate(q ? `/shop?search=${encodeURIComponent(q)}` : "/shop");
    }

    const hasQuery = query.trim().length > 0;

    return (
        <Modal
            aria-label="Search jewelry"
            className={styles.search}
            open={open}
            onClose={open ? handleClose : null}
        >
            <div className={styles.searchHeader}>
                <span className={styles.brandMark}>AMRAH</span>
                <button
                    onClick={handleClose}
                    className={styles.closeBtn}
                    aria-label="Close search"
                >
                    <X size={22} />
                </button>
            </div>

            <div className={styles.searchInner}>
                <div className={styles.intro}>
                    <h2>Find your perfect piece</h2>
                    <p>Search our collections, or explore what others love.</p>
                </div>

                <form className={styles.searchForm} onSubmit={handleSubmit}>
                    <div className={styles.searchInputWrap}>
                        <SearchIcon
                            size={22}
                            color="#c7464e"
                            className={styles.searchLeadingIcon}
                        />
                        <input
                            className={styles.searchInput}
                            type="search"
                            aria-label="Search jewelry"
                            placeholder="Search for rings, pearls, gifts…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        {hasQuery && (
                            <button
                                type="button"
                                className={styles.clearInput}
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </form>

                {/* LIVE RESULTS */}
                {hasQuery && (
                    <div className={styles.results}>
                        {results.length === 0 ? (
                            <p className={styles.noResults}>
                                No matches for “{query}”. Press Enter to browse
                                the full shop.
                            </p>
                        ) : (
                            <ul>
                                {results.map((p) => (
                                    <li
                                        key={p._id}
                                        className={styles.resultItem}
                                    >
                                        <Link className={styles.resultLink} to={`/product/${p._id}`} onClick={handleClose}>
                                        <img
                                            src={p.image || FallbackImage}
                                            alt={p.name}
                                        />
                                        <div>
                                            <p className={styles.resultName}>
                                                {p.name}
                                            </p>
                                            <p className={styles.resultCat}>
                                                {p.category}
                                            </p>
                                        </div>
                                        <span className={styles.resultPrice}>
                                            {currencyFormatter.format(p.price)}
                                        </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* CATEGORY + POPULAR (idle state) */}
                {!hasQuery && (
                    <>
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>
                                Shop by category
                            </h3>
                            <div className={styles.categoryContainer}>
                                {catalogCategories(catalog, CATEGORIES).map((cat) => (
                                    <button
                                        type="button"
                                        key={cat.id}
                                        className={styles.categoryCard}
                                        onClick={() => goToCategory(cat.id)}
                                    >
                                        <span className={styles.categoryThumb}>
                                            <img
                                                src={cat.image}
                                                alt={cat.label}
                                            />
                                        </span>
                                        <span>{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>
                                Popular right now
                            </h3>
                            <ul className={styles.popularGrid}>
                                {popular.map((p) => (
                                    <li
                                        key={p._id}
                                        className={styles.popularItem}
                                    >
                                        <Link className={styles.popularLink} to={`/product/${p._id}`} onClick={handleClose}>
                                        <div className={styles.popularImgWrap}>
                                            <img
                                                src={p.image || FallbackImage}
                                                alt={p.name}
                                            />
                                        </div>
                                        <p className={styles.popularName}>
                                            {p.name}
                                        </p>
                                        <p className={styles.price}>
                                            {currencyFormatter.format(p.price)}
                                        </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </>
                )}
            </div>
        </Modal>
    );
}
