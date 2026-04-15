// HOOKS & PACKAGES
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, ListFilter } from 'lucide-react';

// COMPONENTS
import ProductItem from '../components/ProductItem.jsx';

// ASSETS
import sampleImage1 from '../assets/pearl.png';

// UTIL
import { currencyFormatter } from '../util/formatting.js';

import styles from '../css/Shop.module.css';

export default function Shop({}) {
    
    const location = useLocation();
    
    const [ products, setProducts ] = useState([]);

    // DESTRUCTURE FROM Search.jsx
    const { filteredProducts, category } = location.state || {};

    // FETCH PRODUCTS
    useEffect(() => {

        if (filteredProducts) {
            setProducts(filteredProducts);
            
        } else {
            async function getProducts () {
                const response = await fetch ('http://localhost:8000/products/getProducts');
                const products = await response.json();

                setProducts(products);
            }

            getProducts();
        }
    });

    return (
        <section className={styles.shop}>
            {/* CATEGORY */}
            <div className={styles.shopStyleContainer}>
                <div className={styles.shopStyle}>
                    <a>
                        <img src={sampleImage1} alt='sample-image'/>
                    </a>
                    <span>Lorem Ipsum</span>
                </div>
                <div className={styles.shopStyle}>
                    <a>
                        <img src={sampleImage1} alt='sample-image'/>
                    </a>
                    <span>Lorem Ipsum</span>
                </div>
                <div className={styles.shopStyle}>
                    <a>
                        <img src={sampleImage1} alt='sample-image'/>
                    </a>
                    <span>Lorem Ipsum</span>
                </div>
                <div className={styles.shopStyle}>
                    <a>
                        <img src={sampleImage1} alt='sample-image'/>
                    </a>
                    <span>Lorem Ipsum</span>
                </div>
            </div>
            {/* PRODUCT GRID */}
            <div className={styles.shopGridContainer}>
                {/* UPPER */}
                <div className={styles.shopGridUpper}>
                    <div className={styles.shopGridUpperLeft}>
                        <button>
                            SORT BY
                            <ChevronDown  size={24} color="#c7464e"/>
                        </button>
                        <p>{products.length} PRODUCTS</p>
                        
                    </div>
                    <div className={styles.shopGridUpperMiddle}>
                        {category ? <h3>{category}</h3> : <h3>Shop</h3>}
                    </div>
                    <div className={styles.shopGridUpperRight}>
                        <button>
                            FILTER
                            <ListFilter size={16} style={{ marginLeft: '.4rem', color: '#c7464e' }}/>
                        </button>
                    </div>
                </div>
                {/* MAIN */}
                <ul className={styles.shopGridMain}>
                    {products.map((product) => (
                        <ProductItem
                            product={product}
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            category={product.category}
                            description={product.description}
                            price={currencyFormatter.format(product.price)}
                        />
                    ))}
                </ul>
            </div>
        </section>
    )
}