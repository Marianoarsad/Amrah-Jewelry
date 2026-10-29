export function catalogCategories(products, metadata) {
    return [...new Set(products.map((p) => p.category).filter(Boolean))].map((id) => {
        const known = metadata.find((c) => c.id === id);
        const product = products.find((p) => p.category === id);
        return { id, label: known?.label || id, image: known?.image || product.image };
    });
}
