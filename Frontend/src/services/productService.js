// ============================================================================
// PRODUCT SERVICE
// ----------------------------------------------------------------------------
// Tries the real backend first; if it is unreachable (e.g. running the
// frontend standalone) it gracefully falls back to the bundled mock catalog
// so the storefront always has products to show.
// ============================================================================

import PRODUCTS, { getProductById as getMockById } from "../data/products.js";

const API_URL = "http://localhost:8000/products";

// A short timeout so a missing backend doesn't stall the UI for long.
function fetchWithTimeout(url, ms = 2500) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    return fetch(url, { signal: controller.signal }).finally(() =>
        clearTimeout(timer),
    );
}

// Ensure every product (from backend or mock) has the fields the UI expects.
function normalize(product) {
    const images =
        product.images && product.images.length
            ? product.images
            : product.image
              ? [product.image]
              : [];

    return {
        rating: 4.5,
        reviews: 0,
        materials: [],
        sizes: ["One Size"],
        details: [],
        ...product,
        image: product.image || images[0],
        images,
    };
}

export const productService = {
    async getProducts() {
        try {
            const response = await fetchWithTimeout(`${API_URL}/getProducts`);
            if (!response.ok) throw new Error("Bad response");
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("Empty product list");
            }
            return data.map(normalize);
        } catch (error) {
            // Graceful fallback to the bundled catalog.
            return PRODUCTS.map(normalize);
        }
    },

    async getProductById(id) {
        try {
            const response = await fetchWithTimeout(
                `${API_URL}/getProduct/${id}`,
            );
            if (!response.ok) throw new Error("Bad response");
            const data = await response.json();
            if (!data || !data._id) throw new Error("Not found");
            return normalize(data);
        } catch (error) {
            const mock = getMockById(id);
            return mock ? normalize(mock) : null;
        }
    },
};

export default productService;
