import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/products.js";
import { catalogCategories } from "../util/catalog.js";
export default function Categories({
  products
}) {
  return <section className="editorial-section"><div className="section-heading"><p className="eyebrow">Amrah Jewelry</p><h2>Shop by Category</h2></div><div className="category-grid">{catalogCategories(products, CATEGORIES).map(cat => <Link key={cat.id} to={`/shop?category=${encodeURIComponent(cat.id)}`}><img src={cat.image} alt={cat.label} loading="lazy" width="400" height="400" />{cat.label}</Link>)}</div></section>;
}
