import assert from "node:assert/strict";
import { catalogCategories } from "./catalog.js";
const metadata = [{ id: "ring", label: "Rings", image: "ring.jpg" }];
assert.deepEqual(catalogCategories([{ category: "ring" }, { category: "ring" }, { category: "custom", image: "custom.jpg" }, {}], metadata), [{ id: "ring", label: "Rings", image: "ring.jpg" }, { id: "custom", label: "custom", image: "custom.jpg" }]);
assert.deepEqual(catalogCategories([], metadata), []);
console.log("Catalog category checks passed");
