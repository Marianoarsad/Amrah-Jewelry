// ============================================================================
// MOCK PRODUCT CATALOG
// ----------------------------------------------------------------------------
// Used as a graceful fallback whenever the backend (localhost:8000) is
// unreachable, so the storefront is fully functional standalone.
// Product shape mirrors what the backend is expected to return
// (`_id`, `name`, `category`, `price`, `description`, ...) plus a few extra
// fields the enhanced UI uses (rating, images, materials, sizes, flags).
// ============================================================================

// PRODUCT IMAGERY (filenames keep their on-disk casing for cross-platform builds)
import img1 from "../assets/product-test-image-1.jpg";
import img2 from "../assets/product-test-image-2.jpg";
import img3 from "../assets/product-test-image-3.JPG";
import img4 from "../assets/product-test-image-4.JPG";
import img5 from "../assets/product-test-image-5.JPG";
import img6 from "../assets/product-test-image-6.JPG";
import img7 from "../assets/product-test-image-7.JPG";
import imgPearl from "../assets/pearl.png";
import imgPearlBracelet from "../assets/pearl-bracelet.jpg";
import imgGrid1 from "../assets/grid-image-1.png";
import imgGrid2 from "../assets/grid-image-2.png";
import imgGrid3 from "../assets/grid-image-3.png";
import imgGrid4 from "../assets/grid-image-4.png";
import imgGrid5 from "../assets/grid-image-5.png";
import imgGrid6 from "../assets/grid-image-6.png";
import imgGrid7 from "../assets/grid-image-7.png";
import imgGrid8 from "../assets/grid-image-8.png";

// SWATCH IMAGES FOR MATERIAL OPTIONS
const ROSE_GOLD = imgGrid1;
const YELLOW_GOLD = imgGrid2;
const WHITE_GOLD = imgGrid3;

// Category metadata used by the shop category rail and filters.
export const CATEGORIES = [
    { id: "earring", label: "Earrings", image: img2 },
    { id: "necklace", label: "Necklaces", image: img5 },
    { id: "ring", label: "Rings", image: img4 },
    { id: "bracelet", label: "Bracelets", image: imgPearlBracelet },
];

const materialSet = [
    { name: "18k Rose Gold", image: ROSE_GOLD },
    { name: "18k Yellow Gold", image: YELLOW_GOLD },
    { name: "18k White Gold", image: WHITE_GOLD },
];

export const PRODUCTS = [
    // ----------------------------- EARRINGS --------------------------------
    {
        _id: "amr-e01",
        name: "Aurora Pearl Drop Earrings",
        category: "earring",
        price: 18500,
        rating: 4.8,
        reviews: 142,
        description: "Freshwater pearls suspended from a fine gold thread.",
        longDescription:
            "The Aurora Drops pair a luminous freshwater pearl with a whisper-thin gold thread for a look that moves with you. Hand-finished by our artisans, each pearl is hand-selected for its mirror-like lustre, making no two pairs exactly alike.",
        details: [
            "Cultured freshwater pearls",
            "Hypoallergenic gold posts",
            "Length: 32mm",
        ],
        materials: materialSet,
        sizes: ["Small", "Medium", "Large"],
        images: [img2, imgGrid1, imgGrid5],
        popular: true,
        bestseller: true,
        isNew: false,
    },
    {
        _id: "amr-e02",
        name: "Solene Gold Hoops",
        category: "earring",
        price: 12900,
        rating: 4.6,
        reviews: 98,
        description: "Everyday medium hoops with a polished finish.",
        longDescription:
            "Solene Hoops strike the balance between statement and staple. Lightweight enough for all-day wear, with a high-polish 18k finish that catches the light from every angle.",
        details: ["18k gold vermeil", "Snap-back closure", "Diameter: 25mm"],
        materials: materialSet,
        sizes: ["Small", "Medium", "Large"],
        images: [imgGrid6, img2, imgGrid2],
        popular: true,
        bestseller: false,
        isNew: false,
    },
    {
        _id: "amr-e03",
        name: "Celeste Diamond Studs",
        category: "earring",
        price: 34900,
        rating: 4.9,
        reviews: 211,
        description: "Brilliant-cut solitaire studs that go with everything.",
        longDescription:
            "A forever-classic. The Celeste Studs feature ethically sourced brilliant-cut stones set in a four-prong basket that lifts the stone toward the light. The gift that never goes out of style.",
        details: ["0.5ct total weight", "Four-prong basket setting", "Butterfly backs"],
        materials: materialSet,
        sizes: ["One Size"],
        images: [imgGrid7, imgGrid3, img2],
        popular: false,
        bestseller: true,
        isNew: true,
    },
    {
        _id: "amr-e04",
        name: "Marisol Shell Huggies",
        category: "earring",
        price: 9800,
        rating: 4.4,
        reviews: 64,
        description: "Petite huggies inspired by the sea.",
        longDescription:
            "The Marisol Huggies hug the lobe with a delicate shell motif. A subtle nod to coastal mornings, perfect for stacking up the ear.",
        details: ["Gold vermeil", "Mother-of-pearl inlay", "Diameter: 12mm"],
        materials: materialSet,
        sizes: ["One Size"],
        images: [imgGrid8, imgGrid4, img2],
        popular: false,
        bestseller: false,
        isNew: true,
    },

    // ----------------------------- NECKLACES -------------------------------
    {
        _id: "amr-n01",
        name: "Lumiere Pearl Necklace",
        category: "necklace",
        price: 23400,
        rating: 4.9,
        reviews: 187,
        description: "A single luminous pearl on a fine cable chain.",
        longDescription:
            "The Lumiere centres a single AAA-grade pearl on a delicate cable chain that sits perfectly at the collarbone. Understated elegance for day or evening.",
        details: ["AAA freshwater pearl", "Adjustable 40–45cm chain", "Lobster clasp"],
        materials: materialSet,
        sizes: ['16"', '18"', '20"'],
        images: [img5, imgPearl, imgGrid1],
        popular: true,
        bestseller: true,
        isNew: false,
    },
    {
        _id: "amr-n02",
        name: "Aria Gold Pendant",
        category: "necklace",
        price: 19900,
        rating: 4.7,
        reviews: 121,
        description: "A sculptural pendant that catches the light.",
        longDescription:
            "Aria's hand-formed pendant drapes beautifully, its softly organic silhouette designed to layer or stand alone. Cast in recycled gold.",
        details: ["Recycled 18k gold", "Adjustable chain", "Pendant: 18mm"],
        materials: materialSet,
        sizes: ['16"', '18"', '20"'],
        images: [img1, imgGrid2, img5],
        popular: true,
        bestseller: false,
        isNew: false,
    },
    {
        _id: "amr-n03",
        name: "Vesper Layered Chain",
        category: "necklace",
        price: 27500,
        rating: 4.6,
        reviews: 73,
        description: "A pre-styled double-layer chain set.",
        longDescription:
            "Get the layered look in one piece. Vesper combines a fine box chain with a textured rope chain for instant dimension, no detangling required.",
        details: ["Two-in-one layered design", "18k gold vermeil", "38cm + 45cm"],
        materials: materialSet,
        sizes: ["One Size"],
        images: [imgGrid3, img5, imgGrid7],
        popular: false,
        bestseller: false,
        isNew: true,
    },
    {
        _id: "amr-n04",
        name: "Selene Moonstone Choker",
        category: "necklace",
        price: 21800,
        rating: 4.8,
        reviews: 90,
        description: "Rainbow moonstone on a close-fitting choker.",
        longDescription:
            "Selene frames a glowing rainbow moonstone in a fine bezel set close to the throat. A little bit celestial, a little bit bold.",
        details: ["Rainbow moonstone", "Bezel setting", "Adjustable 33–38cm"],
        materials: materialSet,
        sizes: ["One Size"],
        images: [imgGrid4, img5, imgGrid8],
        popular: true,
        bestseller: false,
        isNew: true,
    },

    // ------------------------------- RINGS ---------------------------------
    {
        _id: "amr-r01",
        name: "Eterna Solitaire Ring",
        category: "ring",
        price: 45900,
        rating: 5.0,
        reviews: 264,
        description: "A timeless brilliant-cut solitaire.",
        longDescription:
            "The Eterna is our signature engagement-worthy solitaire. A single brilliant-cut stone rises from a slim band in a six-prong crown that maximises sparkle.",
        details: ["1.0ct centre stone", "Six-prong setting", "Comfort-fit band"],
        materials: materialSet,
        sizes: ["5", "6", "7", "8"],
        images: [img4, imgGrid3, imgGrid7],
        popular: true,
        bestseller: true,
        isNew: false,
    },
    {
        _id: "amr-r02",
        name: "Liana Stacking Band",
        category: "ring",
        price: 8900,
        rating: 4.5,
        reviews: 138,
        description: "A delicate band made for stacking.",
        longDescription:
            "Liana is the building block of every ring stack. Slim, smooth and endlessly mixable, wear one or wear five.",
        details: ["Recycled 18k gold", "1.4mm band width", "Comfort-fit"],
        materials: materialSet,
        sizes: ["5", "6", "7", "8"],
        images: [imgGrid1, img4, imgGrid5],
        popular: false,
        bestseller: true,
        isNew: false,
    },
    {
        _id: "amr-r03",
        name: "Orla Signet Ring",
        category: "ring",
        price: 15600,
        rating: 4.6,
        reviews: 57,
        description: "A modern take on the classic signet.",
        longDescription:
            "Orla reimagines the heirloom signet with a softly domed face ready for engraving. A piece designed to be passed down.",
        details: ["18k gold vermeil", "Engravable face", "Domed profile"],
        materials: materialSet,
        sizes: ["6", "7", "8", "9"],
        images: [imgGrid2, img4, imgGrid6],
        popular: false,
        bestseller: false,
        isNew: true,
    },
    {
        _id: "amr-r04",
        name: "Nova Pavé Eternity Ring",
        category: "ring",
        price: 38200,
        rating: 4.9,
        reviews: 102,
        description: "A continuous line of pavé-set stones.",
        longDescription:
            "Nova wraps the finger in an unbroken line of hand-set pavé stones. Brilliant from every angle, a modern symbol of forever.",
        details: ["Hand-set pavé", "0.75ct total weight", "Shared-prong setting"],
        materials: materialSet,
        sizes: ["5", "6", "7", "8"],
        images: [imgGrid5, imgGrid3, img4],
        popular: true,
        bestseller: false,
        isNew: true,
    },

    // ----------------------------- BRACELETS -------------------------------
    {
        _id: "amr-b01",
        name: "Cove Pearl Bracelet",
        category: "bracelet",
        price: 16400,
        rating: 4.7,
        reviews: 119,
        description: "A row of freshwater pearls on gold.",
        longDescription:
            "The Cove Bracelet threads hand-picked freshwater pearls along a fine gold chain for a piece that feels both classic and contemporary.",
        details: ["Freshwater pearls", "Adjustable 16–19cm", "Lobster clasp"],
        materials: materialSet,
        sizes: ["One Size"],
        images: [imgPearlBracelet, imgPearl, imgGrid1],
        popular: true,
        bestseller: true,
        isNew: false,
    },
    {
        _id: "amr-b02",
        name: "Mira Tennis Bracelet",
        category: "bracelet",
        price: 41200,
        rating: 4.9,
        reviews: 168,
        description: "A flexible line of brilliant-cut stones.",
        longDescription:
            "Mira is the bracelet you never take off. A flexible line of shared-prong stones that catches light with every movement of the wrist.",
        details: ["2.0ct total weight", "Shared-prong line", "Double-lock clasp"],
        materials: materialSet,
        sizes: ['6.5"', '7"', '7.5"'],
        images: [img6, imgGrid7, imgGrid3],
        popular: true,
        bestseller: false,
        isNew: false,
    },
    {
        _id: "amr-b03",
        name: "Tide Chain Bracelet",
        category: "bracelet",
        price: 11800,
        rating: 4.4,
        reviews: 71,
        description: "A bold curb chain with a polished finish.",
        longDescription:
            "Tide brings a little weight to the wrist with a sculpted curb chain. Wear it solo for an effortless statement or stack with finer chains.",
        details: ["18k gold vermeil", "5mm curb links", "Adjustable 17–20cm"],
        materials: materialSet,
        sizes: ["One Size"],
        images: [img7, imgGrid6, imgGrid2],
        popular: false,
        bestseller: false,
        isNew: true,
    },
    {
        _id: "amr-b04",
        name: "Wren Charm Bracelet",
        category: "bracelet",
        price: 13900,
        rating: 4.6,
        reviews: 84,
        description: "A fine chain ready for your charms.",
        longDescription:
            "Wren is the start of a story. A delicate chain with secure jump rings designed to carry the charms that mean the most to you.",
        details: ["Recycled gold chain", "3 secure charm stations", "Adjustable length"],
        materials: materialSet,
        sizes: ["One Size"],
        images: [img3, imgGrid8, imgGrid4],
        popular: false,
        bestseller: true,
        isNew: true,
    },
];

// Ensure every product exposes a primary `image` (the first gallery image) so
// consumers that read the catalog directly — homepage carousel, search, related
// products — get a working image without depending on the service normalizer.
PRODUCTS.forEach((product) => {
    if (!product.image) product.image = product.images?.[0];
});

// Convenience lookups -------------------------------------------------------
export function getProductById(id) {
    return PRODUCTS.find((p) => p._id === id);
}

export function getPopularProducts() {
    return PRODUCTS.filter((p) => p.popular);
}

export default PRODUCTS;
