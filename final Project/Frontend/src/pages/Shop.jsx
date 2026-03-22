import styles from '../css/Shop.module.css';

// PACKAGES
import { ChevronDown, ListFilter } from 'lucide-react';

// COMPONENTS
import ProductItem from '../components/UI/ProductItem.jsx';

// ASSETS
import sampleImage1 from '../assets/pearl.png'

export default function Shop({}) {
    
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
                        <p>108 products</p>
                        
                    </div>
                    <div className={styles.shopGridUpperMiddle}>
                        <h3>Shop</h3>
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
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />

                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />

                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />

                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />

                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                </ul>
            </div>
        </section>
    )
}