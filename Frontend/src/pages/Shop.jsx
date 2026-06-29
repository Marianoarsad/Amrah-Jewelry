// HOOKS & PACKAGES
import { useState, useMemo, useRef, useEffect } from "react";
import {
    useLoaderData,
    useSearchParams,
    useNavigation,
} from "react-router-dom";
import { ChevronDown, ListFilter, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// COMPONENTS
import ProductItem from "../components/ProductItem.jsx";
import ProductGridSkeleton from "../components/UI/ProductSkeleton.jsx";

// SERVICES & DATA
import { productService } from "../services/productService.js";
import { CATEGORIES } from "../data/products.js";

// UTIL
import { currencyFormatter } from "../util/formatting.js";

import styles from "../css/Shop.module.css";

const SORT_OPTIONS = [
    { id: "featured", label: "Featured" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "rating", label: "Top Rated" },
    { id: "newest", label: "Newest" },
];

const PRICE_RANGES = [
    { id: "all", label: "All prices", min: 0, max: Infinity },
    { id: "under15", label: "Under ₱15,000", min: 0, max: 15000 },
    { id: "15to30", label: "₱15,000 – ₱30,000", min: 15000, max: 30000 },
    { id: "over30", label: "Over ₱30,000", min: 30000, max: Infinity },
];

export default function Shop() {
    const products = useLoaderData();
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get("category") || "";
    const searchQuery = searchParams.get("search") || "";

    const [sortBy, setSortBy] = useState("featured");
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState("all");
    const [onlyBestseller, setOnlyBestseller] = useState(false);
    const [onlyNew, setOnlyNew] = useState(false);

    const sortRef = useRef(null);

    // Close the sort menu when clicking outside of it.
    useEffect(() => {
        function handleClick(e) {
            if (sortRef.current && !sortRef.current.contains(e.target)) {
                setShowSortMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    function handleSelectCategory(categoryId) {
        const next = new URLSearchParams(searchParams);
        if (categoryId) next.set("category", categoryId);
        else next.delete("category");
        next.delete("search");
        setSearchParams(next);
    }

    // Apply client-side search, filters, and sorting on top of the loaded list.
    const visibleProducts = useMemo(() => {
        let list = [...products];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    (p.description || "").toLowerCase().includes(q),
            );
        }

        const range = PRICE_RANGES.find((r) => r.id === priceRange);
        if (range && range.id !== "all") {
            list = list.filter(
                (p) => p.price >= range.min && p.price < range.max,
            );
        }

        if (onlyBestseller) list = list.filter((p) => p.bestseller);
        if (onlyNew) list = list.filter((p) => p.isNew);

        switch (sortBy) {
            case "price-asc":
                list.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                list.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case "newest":
                list.sort(
                    (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
                );
                break;
            default: // featured: bestsellers and popular first
                list.sort(
                    (a, b) =>
                        (b.bestseller ? 2 : 0) +
                        (b.popular ? 1 : 0) -
                        ((a.bestseller ? 2 : 0) + (a.popular ? 1 : 0)),
                );
        }

        return list;
    }, [
        products,
        searchQuery,
        priceRange,
        onlyBestseller,
        onlyNew,
        sortBy,
    ]);

    const activeFilterCount =
        (priceRange !== "all" ? 1 : 0) +
        (onlyBestseller ? 1 : 0) +
        (onlyNew ? 1 : 0);

    const heading = activeCategory
        ? activeCategory
        : searchQuery
          ? `Results for “${searchQuery}”`
          : "Shop All";

    function clearFilters() {
        setPriceRange("all");
        setOnlyBestseller(false);
        setOnlyNew(false);
    }

    return (
        <section className={styles.shop}>
            {/* CATEGORY RAIL */}
            <div className={styles.shopStyleContainer}>
                <button
                    className={`${styles.shopStyle} ${
                        !activeCategory ? styles.categoryActive : ""
                    }`}
                    onClick={() => handleSelectCategory("")}
                >
                    <span className={styles.allCategory}>All</span>
                    <span>Everything</span>
                </button>
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        className={`${styles.shopStyle} ${
                            activeCategory === cat.id
                                ? styles.categoryActive
                                : ""
                        }`}
                        onClick={() => handleSelectCategory(cat.id)}
                    >
                        <img src={cat.image} alt={cat.label} />
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* PRODUCT GRID */}
            <div className={styles.shopGridContainer}>
                {/* UPPER BAR */}
                <div className={styles.shopGridUpper}>
                    <div className={styles.shopGridUpperLeft} ref={sortRef}>
                        <button
                            className={styles.controlBtn}
                            onClick={() => setShowSortMenu((s) => !s)}
                        >
                            SORT BY
                            <ChevronDown size={18} color="#c7464e" />
                        </button>
                        <AnimatePresence>
                            {showSortMenu && (
                                <motion.ul
                                    className={styles.sortMenu}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.18 }}
                                >
                                    {SORT_OPTIONS.map((opt) => (
                                        <li
                                            key={opt.id}
                                            className={
                                                sortBy === opt.id
                                                    ? styles.sortActive
                                                    : ""
                                            }
                                            onClick={() => {
                                                setSortBy(opt.id);
                                                setShowSortMenu(false);
                                            }}
                                        >
                                            {opt.label}
                                            {sortBy === opt.id && (
                                                <Check size={14} />
                                            )}
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                        <p className={styles.countLabel}>
                            {visibleProducts.length} PRODUCTS
                        </p>
                    </div>

                    <div className={styles.shopGridUpperMiddle}>
                        <h3>{heading}</h3>
                    </div>

                    <div className={styles.shopGridUpperRight}>
                        <button
                            className={styles.controlBtn}
                            onClick={() => setShowFilters((s) => !s)}
                        >
                            FILTER
                            {activeFilterCount > 0 && (
                                <span className={styles.filterCount}>
                                    {activeFilterCount}
                                </span>
                            )}
                            <ListFilter
                                size={16}
                                style={{ marginLeft: ".4rem", color: "#c7464e" }}
                            />
                        </button>
                    </div>
                </div>

                {/* FILTER PANEL */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            className={styles.filterPanel}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className={styles.filterInner}>
                                <div className={styles.filterGroup}>
                                    <h4>Price</h4>
                                    <div className={styles.filterChips}>
                                        {PRICE_RANGES.map((r) => (
                                            <button
                                                key={r.id}
                                                className={`${styles.chip} ${
                                                    priceRange === r.id
                                                        ? styles.chipActive
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setPriceRange(r.id)
                                                }
                                            >
                                                {r.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.filterGroup}>
                                    <h4>Collections</h4>
                                    <div className={styles.filterChips}>
                                        <button
                                            className={`${styles.chip} ${
                                                onlyBestseller
                                                    ? styles.chipActive
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setOnlyBestseller((v) => !v)
                                            }
                                        >
                                            Bestsellers
                                        </button>
                                        <button
                                            className={`${styles.chip} ${
                                                onlyNew ? styles.chipActive : ""
                                            }`}
                                            onClick={() => setOnlyNew((v) => !v)}
                                        >
                                            New Arrivals
                                        </button>
                                    </div>
                                </div>

                                {activeFilterCount > 0 && (
                                    <button
                                        className={styles.clearFilters}
                                        onClick={clearFilters}
                                    >
                                        <X size={14} /> Clear all
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* GRID / SKELETON / EMPTY */}
                {isLoading ? (
                    <ProductGridSkeleton count={8} />
                ) : visibleProducts.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p className={styles.emptyTitle}>No pieces found</p>
                        <p className={styles.emptyText}>
                            Try adjusting your filters or browsing another
                            category.
                        </p>
                        <button
                            className={styles.emptyBtn}
                            onClick={() => {
                                clearFilters();
                                handleSelectCategory("");
                            }}
                        >
                            View all jewelry
                        </button>
                    </div>
                ) : (
                    <ul className={styles.shopGridMain}>
                        {visibleProducts.map((product) => (
                            <ProductItem
                                product={product}
                                key={product._id}
                                price={currencyFormatter.format(product.price)}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    const products = await productService.getProducts();

    if (!category) return products;

    // Tolerant category matching (handles singular/plural and casing).
    const normalized = category.toLowerCase().replace(/s$/, "");
    const filtered = products.filter((product) =>
        product.category.toLowerCase().replace(/s$/, "").includes(normalized),
    );

    return filtered.length ? filtered : products;
}
