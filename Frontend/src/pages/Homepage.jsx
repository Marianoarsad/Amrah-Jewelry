import { useLoaderData, Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import Categories from "../components/Categories.jsx";
import Follow from "../components/Follow.jsx";
import { productService } from "../services/productService.js";
import storyImage from "../assets/signin-img.webp";
export default function Homepage() {
    const products = useLoaderData();
    return <><Hero/><Categories products={products}/><PopularProducts products={products}/><section className="editorial-story"><img src={storyImage} alt="Amrah jewelry collection" loading="lazy"/><div><p className="eyebrow">Amrah Jewelry</p><h2>Timeless designs</h2><p>Introducing timeless designs</p><Link className="text-link" to="/shop">Explore the collection</Link></div></section><Follow/></>;
}
// eslint-disable-next-line react-refresh/only-export-components -- React Router lazy routes consume this loader.
export async function loader() { return productService.getProducts(); }
