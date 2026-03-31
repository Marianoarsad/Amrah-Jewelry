// HOOKS & LIBRARIES
import { createContext, useState } from "react";

// SERVICES (Helper Functions)
import { authService } from '../services/authService.js';

const SearchContext = createContext({
    products: null,
    filterProducts: () => {},
});

export function AuthContextProvider({ children }) {

    const [ products, setProducts ] = useState([]);

    async function filterProducts (query) {
        const filteredProducts = await fetch(`http://localhost:8000/products/search?category=${query}`);

        setProducts(filteredProducts);
        return filteredProducts;
    }

    const searchContext = {
        products,
        filterProducts,
    }

    return <SearchContext.Provider value={searchContext}>{children}</SearchContext.Provider>
}

export default SearchContext;